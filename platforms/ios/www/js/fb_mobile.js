var accessToken;
var insertData;

function updateFriends(){
    FB.api('/me/friends?access_token='+accessToken,function(friendData){

           var db = window.openDatabase("Database", "1.0", "Cordova Demo", 200000);
           db.transaction(function (tx) {
                          
                          var friendParse = friendData.data;
                          for(i=1;i<=friendParse.length - 1;i++){
                          tx.executeSql("INSERT INTO FRIENDS ('name', 'fbId','touched') VALUES (?,?,?)",[friendParse[i].name,friendParse[i].id,todaysStamp]);
                               }
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
                  
                                         var db4 = window.openDatabase("Database", "1.0", "Cordova Demo", 200000);
                                         db4.transaction(function (tx) {

                                        for(i=1;i<=friendEventsParse.length - 1;i++){
                                          //tx.executeSql(insertData1);
                            
tx.executeSql("INSERT INTO FRIENDS_EVENTS ('eventFbId','friendFbId','startTime','touched') VALUES (?,?,?,?)",[friendEventsParse[i].eid,friendEventsParse[i].uid,friendEventsParse[i].start_time,todaysStamp]);
                                                                                      }
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
                                  var friendIdList1 =results.rows.item(0).eventFbId;
                                  for (var i=1; i<len1; i++){
                                  friendIdList1 = friendIdList1 + ","+ results.rows.item(i).eventFbId;
                                  }
                                  //console.log("friendIdList1: "+friendIdList1);
                                  
                                  FB.api(
                                         {
                                         method: 'fql.query',
                                         //"SELECT name FROM event WHERE eid IN (118153501641714,125550270812056,127285060766632)"
                                         query: "SELECT name,eid,start_time FROM event WHERE eid IN ("+friendIdList1+")",
                                         //query: "SELECT name,eid,start_time FROM event WHERE eid IN (534230870005637,539043099523278)",
                                         access_token:accessToken
                                         },
                                         function(eventAttrParse) {
                                         //console.log("eventAttrParse: "+JSON.stringify(eventAttrParse));
                                      
                                          //var insertData3 = "INSERT INTO EVENTS (name,eventFbId,start_time) VALUES";
                                          //insertData3 = insertData3+ '("'+eventAttrParse[0].name+'","'+eventAttrParse[0].eid+'","'+eventAttrParse[0].start_time+'")';
                                         
                          //var isData ='[("'+eventAttrParse[i].name+'","'+eventAttrParse[i].eid+'","'+eventAttrParse[i].start_time+'")]';
                                          var db7 = window.openDatabase("Database", "1.0", "Cordova Demo", 200000);
                                          db7.transaction(function (tx) {
                                                          console.log("eventAttrParse.length: "+eventAttrParse.length);
                                                          for(i=0;i<=eventAttrParse.length - 1;i++){
                                                          console.log("loop");
                                              /*
tx.executeSql('CREATE TABLE EVENTS(id unique,touched DATETIME DEFAULT CURRENT_TIMESTAMP,start_time DATETIME,update_time DATETIME,eventFbId unique, name, description, end_time,attending_count,pic,pic_big,pic_square,ticket_uri,timezone,unsure_count,venue_street,venue_city,venue_state,venue_country,venue_zip,venue_latitude,venue_longitude,venue_id,venue_name,venue_located_in,pic_small,all_members_count,can_invite_friends,creator,declined_count,app_id,feed_targeting,has_profile_pic,host,is_date_only,not_replied_count,privacy)');
                                               */
                                                          
                                                          
tx.executeSql("INSERT INTO EVENTS ('eventFbId','touched','start_time','update_time','end_time','description','name','attending_count','unsure_count','not_replied_count','all_members_count','timezone','ticket_uri','pic_small','pic','pic_big','pic_square','pic_cover','can_invite_friends','creator') VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",[eventAttrParse[i].eid,todaysStamp,eventAttrParse[i].start_time,eventAttrParse[i].update_time,eventAttrParse[i].end_time,eventAttrParse[i].description,eventAttrParse[i].name,eventAttrParse[i].attending_count,eventAttrParse[i].unsure_count,eventAttrParse[i].not_replied_count,eventAttrParse[i].all_members_count,eventAttrParse[i].timezone,eventAttrParse[i].ticket_uri,eventAttrParse[i].pic_small,eventAttrParse[i].pic,eventAttrParse[i].pic_big,eventAttrParse[i].pic_square,eventAttrParse[i].pic_cover,eventAttrParse[i].can_invite_friends,eventAttrParse[i].creator]);
 }
                                          }, errorCB, function(){
                                                          //alert("suck-ces");
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
                                         
                                         
/*
                                         var insertPre = "INSERT INTO EVENTS (name,eventFbId,start_time) VALUES (?,?),"
                                         var insertValues= [("1","foo","hi"), ("2", "bar","gee"), ("3", "baz","din")];
                                         var statement = insertPre + insertValues;
 */
                                         
                                         /*
                                         insertData3 = 'INSERT INTO EVENTS (name,eventFbId,start_time) VALUES("LADIES NIGHT AT THE CONTINENTAL: SQUAREFISH | IRIS | AZALiA SNAiL | MARIA SWEET","534230870005637","2013-12-17T21:00:00-0800"),("Accidental Bear 3 Yr Anniversary Party! Feat Eric Himan & Zbornak!","539043099523278","2013-12-17T21:00:00-0800")'
                                          */
                                         
                                         /*
                                         values_to_insert = [(1,"foo"), (2, "bar"), (3, "baz")]
                                         
                                         cursor.executemany("""
                                                            INSERT INTO some_table ('item_num', 'item_name')
                                                            VALUES (?, ?)""", values_to_insert)
                                                            */
                                      
                                         
                                         
                                                            
                                         /*
                                          var db5 = window.openDatabase("Database", "1.0", "Cordova Demo", 200000);
                                         
                                         db5.transaction(function (tx) {

    tx.executeSql("INSERT INTO EVENTS ('name','start_time','eventFbId') VALUES (?,?,?)",[("3", todaysStamp,"431")]);

                                          }, errorCB, function(){
                                                    
                                                         var db6 = window.openDatabase("Database", "1.0", "Cordova Demo", 200000);
                                                         db6.transaction(function (tx) {
                                                         tx.executeSql('SELECT * FROM EVENTS', [], function (tx, results) {

                                                                       var len4 = results.rows.length
                                                                       for (var i=1; i<len4; i++){

                                                                       }
                                                                                      }, errorCB);
                                                                       
                                                                         });
                                          });
                                */
                                         
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
