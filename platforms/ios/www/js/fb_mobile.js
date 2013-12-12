var accessToken;
var insertData;

function updateFriends(){
    FB.api('/me/friends?access_token='+accessToken,function(friendData){
           var friendParse = friendData.data;
           insertData = "INSERT INTO FRIENDS (name, data, fbId,touched) VALUES";
           insertData = insertData + '("'+friendParse[0].name+'","ran","'+friendParse[0].id+'","'+todaysStamp+'")';

           for(i=1;i<=friendParse.length - 1;i++){
           insertData = insertData + ',("'+friendParse[i].name+'","ran","'+friendParse[i].id+'","'+todaysStamp+'")';
           }
           var db = window.openDatabase("Database", "1.0", "Cordova Demo", 200000);
           db.transaction(function (tx) {
                           tx.executeSql(insertData);
                          }, errorCB, function(){
                          updateEvents();
                          });
});
}

function updateEvents(){
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
                                         var insertData1 = "INSERT INTO FRIENDS_EVENTS (eventFbId,friendFbId,startTime) VALUES";
                 insertData1 = insertData1+ '("'+friendEventsParse[0].eid+'","'+friendEventsParse[0].uid+'","'+friendEventsParse[0].start_time+'")';
                                         for(i=1;i<=friendEventsParse.length - 1;i++){
              insertData1 = insertData1 + ',("'+friendEventsParse[i].eid+'","'+friendEventsParse[i].uid+'","'+friendEventsParse[i].start_time+'")';
                                         }
                                         var db4 = window.openDatabase("Database", "1.0", "Cordova Demo", 200000);
                                         db4.transaction(function (tx) {
                                                        tx.executeSql(insertData1);
                                                        }, errorCB, function(){

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
                                  //var friendIdList =results.rows.item(0).fbId;
                                  for (var i=1; i<len1; i++){
                                  console.log("dist event ID's: "+results.rows.item(i).eventFbId)
                                  //friendIdList = friendIdList + ","+ results.rows.item(i).fbId;
                                  }
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
                                                              alert("connected line before db");
                                                              //db.transaction(populateDB, errorCB, updateFriends);
                                                              var db1 = window.openDatabase("Database", "1.0", "Cordova Demo", 200000);
                                                              //db1.transaction(createTable, errorCB, createTableSuccess);
                                                              db1.transaction(createTable, errorCB, function(tx){
                                                                              updateFriends();
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
