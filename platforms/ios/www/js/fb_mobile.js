var accessToken;
var insertData;

function updateFriends(callBack){
    FB.api('/me/friends?access_token='+accessToken,function(friendData){
           var db = window.openDatabase("Database", "1.0", "Cordova Demo", 200000);
           db.transaction(function (tx) {
                          var friendParse = friendData.data;
                          for(i=1;i<=friendParse.length - 1;i++){
                          tx.executeSql("INSERT INTO FRIENDS ('name', 'fbId','touched') VALUES (?,?,?)",[friendParse[i].name,friendParse[i].id,todaysStamp]);
                               }
                          }, errorCB, function(){
                          var friendsUpdateTime = new Date().getTime();
                          window.localStorage.setItem("friendUpdateTime",friendsUpdateTime);
                          
                          callBack();
                          });
           });
}

var updateEvents = function(){
    var db3 = window.openDatabase("Database", "1.0", "Cordova Demo", 200000);
    db3.transaction(function (tx) {
                    tx.executeSql('SELECT * FROM FRIENDS', [], function (tx, results) {
                                  var len = results.rows.length;
                                  var friendIdList =results.rows.item(0).fbId;
                                  for (var i=1; i<len; i++){
                                  friendIdList = friendIdList + ","+ results.rows.item(i).fbId;
                                  }
                                  FB.api(
                                         {
                                         method: 'fql.query',
                                         query: "SELECT eid,uid,rsvp_status,start_time  FROM event_member WHERE uid IN("+friendIdList+") AND start_time >= now() AND rsvp_status = 'attending'",
                                         access_token:accessToken
                                         },
                                         function(friendEventsParse) {
                                         var db4 = window.openDatabase("Database", "1.0", "Cordova Demo", 200000);
                                         db4.transaction(function (tx) {

                                        for(i=1;i<=friendEventsParse.length - 1;i++){
tx.executeSql("INSERT INTO FRIENDS_EVENTS ('eventFbId','friendFbId','startTime','touched') VALUES (?,?,?,?)",[friendEventsParse[i].eid,friendEventsParse[i].uid,friendEventsParse[i].start_time,todaysStamp]);
                                                                                      }
                                                         }, errorCB, function(){
                                                         var friendsEventsUpdateTime = new Date().getTime();
                                                         window.localStorage.setItem("friendUpdateTime",friendsEventsUpdateTime);
                                                         //var value = window.localStorage.getItem("key");
                                                         updateEventAttr();
                                                         });
                                         });
                                  }, errorCB);
                    }, errorCB);
}

function updateEventAttr(){
    
    var db4 = window.openDatabase("Database", "1.0", "Cordova Demo", 200000);
    db4.transaction(function (tx) {
                    tx.executeSql('SELECT DISTINCT eventFbId from FRIENDS_EVENTS', [], function (tx, results) {
                                  var len1 = results.rows.length;
                                  var friendIdList1 =results.rows.item(0).eventFbId;
                                  for (var i=1; i<len1; i++){
                                  friendIdList1 = friendIdList1 + ","+ results.rows.item(i).eventFbId;
                                  }

                                  FB.api(
                                         {
                                         method: 'fql.query',
                                         query: "SELECT name,eid,start_time FROM event WHERE eid IN ("+friendIdList1+")",
                                         access_token:accessToken
                                         },
                                         function(eventAttrParse) {
                                          var db7 = window.openDatabase("Database", "1.0", "Cordova Demo", 200000);
                                          db7.transaction(function (tx) {
                                                          for(i=0;i<=eventAttrParse.length - 1;i++){
                                    
tx.executeSql("INSERT INTO EVENTS ('eventFbId','touched','start_time','update_time','end_time','description','name','attending_count','unsure_count','not_replied_count','all_members_count','timezone','ticket_uri','pic_small','pic','pic_big','pic_square','pic_cover','can_invite_friends','creator') VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",[eventAttrParse[i].eid,todaysStamp,eventAttrParse[i].start_time,eventAttrParse[i].update_time,eventAttrParse[i].end_time,eventAttrParse[i].description,eventAttrParse[i].name,eventAttrParse[i].attending_count,eventAttrParse[i].unsure_count,eventAttrParse[i].not_replied_count,eventAttrParse[i].all_members_count,eventAttrParse[i].timezone,eventAttrParse[i].ticket_uri,eventAttrParse[i].pic_small,eventAttrParse[i].pic,eventAttrParse[i].pic_big,eventAttrParse[i].pic_square,eventAttrParse[i].pic_cover,eventAttrParse[i].can_invite_friends,eventAttrParse[i].creator]);
 }
                                          }, errorCB, function(){
                                                          var eventsUpdateTime = new Date().getTime();
                                                          window.localStorage.setItem("friendUpdateTime",eventsUpdateTime);
                                                          
                                                          var db7 = window.openDatabase("Database", "1.0", "Cordova Demo", 200000);
                                                          db7.transaction(function (tx) {
                                                                          tx.executeSql('SELECT * FROM EVENTS', [], function (tx, results) {
                                                                                        
                                                                                        var len5 = results.rows.length
                                                                                        for (var i=0; i<len5; i++){
                                                  console.log("name: "+results.rows.item(i).name+"start: +"+results.rows.item(i).eventFbId)
                                                                                        }
                                                                                        }, errorCB);
                                                                          });
                                          });
                                         });
                                  });
                    });
}

document.addEventListener('deviceready', function () {
                          window.fbAsyncInit = function() {
                          init();
                          }
                          });

function init(){
    alert("init");
    FB.init({
            appId: '253970731442450',
            nativeInterface: CDV.FB,
            //channelUrl: 'http://www.event32ios.com',
            useCachedDialogs: false
            });
    //if(window.localStorage.getItem('firstRun')==null){
    FB.getLoginStatus(function(response){
                      if(response.status == "connected"){
                      alert("connected");
                      accessToken = response.authResponse.accessToken;
                      //alert("connected line before db");
                      //db.transaction(populateDB, errorCB, updateFriends);
                      var db1 = window.openDatabase("Database", "1.0", "Cordova Demo", 200000);
                      //db1.transaction(createTable, errorCB, createTableSuccess);
                      db1.transaction(createTable, errorCB, function(tx){
                                      updateFriends(updateEvents);
                                      });
                      }else if (response.status == "not_authorized"){
                      alert("not_authorized");
                      $("#fb-login-button").text("Facebook Authorization");
                      $("#fb-login-button").css('display','block');
                      }else if (response.status == "unknown"){
                      alert("unknown");
                      $("#fb-login-button").text("Facebook Login");
                      $("#fb-login-button").css('display','block');
                      }
                      });
    
    window.localStorage.setItem('firstRun','1');
    
}
$(document).ready(function () {                  
                  $("#fb-login-button").click(function(){
                                              FB.login($.proxy(function (response) {
                                                               if (response.authResponse) {
                                                               accessToken = response.authResponse.accessToken;
                                                               $("#fb-login-button").css('display','none');
                                                               $.proxy(mainInit('https://graph.facebook.com/me/friends?fields=picture,name,id&access_token=' + accessToken), this);
                                                               } else {
                                                               console.log('User cancelled login or did not fully authorize.');
                                                               }
                                                               }, this), {
                                                       scope: 'user_events,friends_events'
                                                       });
                                              });
                  });
