var accessToken;
var insertData;

function fbStampToDbDateTime(fbTimeOffSet){
    if(fbTimeOffSet.indexOf('T') > 0){
        var date = new Date(fbTimeOffSet.substring(0, fbTimeOffSet.indexOf('T')));
        var fbStamp = (date.getMonth() + 1) + '/' + date.getDate() + '/' + date.getFullYear();
    }else{
        var date = new Date(fbTimeOffSet);
        var fbStamp = (date.getMonth() + 1) + '/' + date.getDate() + '/' + date.getFullYear();
    }
    return date;
}

function fbStampToDbDate(fbTimeOffSet){
    if(fbTimeOffSet.indexOf('T') > 0){
        var date = new Date(fbTimeOffSet.substring(0, fbTimeOffSet.indexOf('T')));
        var temp = date.toISOString();
        var fbStamp = (date.getMonth() + 1) + '/' + date.getDate() + '/' + date.getFullYear();
        var stamp = temp.split("T");
    }else{
        var date = new Date(fbTimeOffSet);
        var fbStamp = (date.getMonth() + 1) + '/' + date.getDate() + '/' + date.getFullYear();
        var stamp = fbTimeOffSet.split("T");
    }
    console.log(stamp[0]);
    return stamp[0];
}

function fbStampToDbTime(fbTimeOffSet){
    var d = new Date(fbTimeOffSet.replace(' ', 'T'));
    var t = d.getTime();
    return t;
}

function updateFriends() {
    var dfd = $.Deferred();
    getFriendsFb().done(function (friendParse) {
                        insertFriendsDb(friendParse).done(function () {
                                                          dfd.resolve(friendParse);
                                                          });
                        });
    return dfd.promise();
}

var updateEvents = function () {
    var dfd = $.Deferred();
    getFriendsDb().done(function (friendIdList) {
                        getEventIdsFb(friendIdList).done(function (friendEventsParse) {
                                                         insertEventIdsDb(friendEventsParse);
                                                         dfd.resolve("blah");
                                                         });
                        });
    return dfd.promise();
}

function getFriendsFb() {
    var dfd = $.Deferred();
    FB.api('/me/friends?access_token=' + accessToken, function (friendData) {
           var friendParse = friendData.data;
           dfd.resolve(friendParse);
           });
    return dfd.promise();
}

function insertFriendsDb(friendParse) {
    var dfd = $.Deferred();
    var db = window.openDatabase("Database", "1.0", "Cordova Demo", 200000);
    db.transaction(function (tx) {
                   for (i = 1; i <= friendParse.length - 1; i++) {
                   tx.executeSql("INSERT INTO FRIENDS ('name', 'fbId','touched') VALUES (?,?,?)", [friendParse[i].name, friendParse[i].id, todaysStamp]);
                   }
                   }, errorCB, function () {
                   var friendsUpdateTime = new Date().getTime();
                   window.localStorage.setItem("friendUpdateTime", friendsUpdateTime);
                   dfd.resolve("reesolved");
                   });
    return dfd.promise();
}

function getFriendsDb() {
    var dfd = $.Deferred();
    var db3 = window.openDatabase("Database", "1.0", "Cordova Demo", 200000);
    db3.transaction(function (tx) {
                    tx.executeSql('SELECT * FROM FRIENDS', [], function (tx, results) {
                                  var len = results.rows.length;
                                  var friendIdList = results.rows.item(0).fbId;
                                  for (var i = 1; i < len; i++) {
                                  friendIdList = friendIdList + "," + results.rows.item(i).fbId;
                                  }
                                  dfd.resolve(friendIdList);
                                  }, errorCB);
                    }, errorCB);
    return dfd.promise();
}

function getEventIdsFb(friendIdList) {
    var dfd = $.Deferred();
    FB.api({
           method: 'fql.query',
           query: "SELECT eid,uid,rsvp_status,start_time  FROM event_member WHERE uid IN(" + friendIdList + ") AND start_time >= now() AND rsvp_status = 'attending'",
           access_token: accessToken
           },
           function (friendEventsParse) {
           dfd.resolve(friendEventsParse);
           });
    return dfd.promise();
}

function insertEventIdsDb(friendEventsParse) {
    var dfd = $.Deferred();
    var db4 = window.openDatabase("Database", "1.0", "Cordova Demo", 200000);
    db4.transaction(function (tx) {
                    
                    for (i = 1; i <= friendEventsParse.length - 1; i++) {
                    tx.executeSql("INSERT INTO FRIENDS_EVENTS ('eventFbId','friendFbId','startTime','touched') VALUES (?,?,?,?)", [friendEventsParse[i].eid, friendEventsParse[i].uid, friendEventsParse[i].start_time, todaysStamp]);
                    }
                    }, errorCB, function () {
                    var friendsEventsUpdateTime = new Date().getTime();
                    window.localStorage.setItem("friendUpdateTime", friendsEventsUpdateTime);
                    dfd.resolve("reesolved");
                    });
    return dfd.promise();
}

function getEventIDsDb() {
    var dfd = $.Deferred();
    var db4 = window.openDatabase("Database", "1.0", "Cordova Demo", 200000);
    db4.transaction(function (tx) {
                    tx.executeSql('SELECT DISTINCT eventFbId from FRIENDS_EVENTS', [], function (tx, results) {
                                  var len1 = results.rows.length;
                                  var friendIdList1 = results.rows.item(0).eventFbId;
                                  for (var i = 1; i < len1; i++) {
                                  friendIdList1 = friendIdList1 + "," + results.rows.item(i).eventFbId;
                                  }
                                  dfd.resolve(friendIdList1);
                                  });
                    });
    return dfd.promise();
}

function getEventAttrFb(friendIdList1) {
    var dfd = $.Deferred();
    FB.api({
           method: 'fql.query',
           query: "SELECT name,eid,start_time FROM event WHERE eid IN (" + friendIdList1 + ")",
           access_token: accessToken
           },
           function (eventAttrParse) {
           dfd.resolve(eventAttrParse);
           });
    return dfd.promise();
}


function getEventArrtDb() {
    var db7 = window.openDatabase("Database", "1.0", "Cordova Demo", 200000);
    db7.transaction(function (tx) {
                    tx.executeSql('SELECT * FROM EVENTS', [], function (tx, results) {
                                  var len5 = results.rows.length
                                  for (var i = 0; i < len5; i++) {
                                  //console.log("name: " + results.rows.item(i).name + "start: +" + results.rows.item(i).eventFbId)
                                  }
                                  }, errorCB);
                    });
}

var updateEventAttr = function () {
    var dfd = $.Deferred();
    getEventIDsDb().done(function (friendIdList1) {
                         getEventAttrFb(friendIdList1).done(function (eventAttrParse) {
                                                            insertEventArrtDb(eventAttrParse);
                                                            //getEventArrtDb();
                                                            getEventsDb();
                                                            dfd.resolve("friendIdList1");
                                                            });
                         });
    return dfd.promise();
}

function insertEventArrtDb(eventAttrParse) {
    var test = 99;
    var db7 = window.openDatabase("Database", "1.0", "Cordova Demo", 200000);
    db7.transaction(function (tx) {
                    for (i = 0; i <= eventAttrParse.length - 1; i++) {
                    //console.log("todaysStamp: "+todaysStamp);
                    //formattedDate DATE, formattedTime TIME,formattedDateTime DATETIME
                    //console.log("insert type"+typeof fbStampToDbDateTime(eventAttrParse[i].start_time));
                    //console.log("insert var"+fbStampToDbDateTime(eventAttrParse[i].start_time));
                    //var test = new Date(fbStampToDbDateTime(eventAttrParse[i].start_time));
                    //console.log("test: "+test);
                    tx.executeSql("INSERT INTO EVENTS ("
                                  +'formattedTime'+"," //1
                                  +'formattedDateTime'+"," //2
                                  +'formattedDate'+"," //3
                                  +'eventFbId'+"," //4
                                  +'touched'+"," //5
                                  +'start_time'+"," //6
                                  +'update_time'+"," //7
                                  +'end_time'+"," //8
                                  +'description'+"," //9
                                  +'name'+"," //10
                                  +'attending_count'+"," //11
                                  +'unsure_count'+"," //12
                                  +'not_replied_count'+"," //13
                                  +'all_members_count'+"," //14
                                  +'timezone'+"," //15
                                  +'ticket_uri'+"," //16
                                  +'pic_small'+"," //17
                                  +'pic'+"," //18
                                  +'pic_big'+"," //19
                                  +'pic_square'+"," //20
                                  +'pic_cover'+"," //21
                                  +'can_invite_friends'+"," //22
                                  +'dateHash'+"," //23
                                  +'creator'+ //24
                                  ") VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
                                  
                        [fbStampToDbTime(eventAttrParse[i].start_time),//1
                         fbStampToDbDateTime(eventAttrParse[i].start_time),//2
                         fbStampToDbDateTime(eventAttrParse[i].start_time),//3
                         eventAttrParse[i].eid,//4
                         todaysStamp,//5
                         eventAttrParse[i].start_time,//6
                         eventAttrParse[i].update_time,//7
                         eventAttrParse[i].end_time,//8
                         eventAttrParse[i].description,//9
                         eventAttrParse[i].name,//10
                         eventAttrParse[i].attending_count,//11
                         eventAttrParse[i].unsure_count,//12
                         eventAttrParse[i].not_replied_count,//13
                         eventAttrParse[i].all_members_count,//14
                         eventAttrParse[i].timezone,//15
                         eventAttrParse[i].ticket_uri,//16
                         eventAttrParse[i].pic_small,//17
                         eventAttrParse[i].pic,//18
                         eventAttrParse[i].pic_big,//19
                         eventAttrParse[i].pic_square,//20
                         eventAttrParse[i].pic_cover,//21
                         eventAttrParse[i].can_invite_friends,//22
                         test,//23
                         eventAttrParse[i].creator//24
                         ]
                                  );
                    }
                    }, errorCB, function () {
                    var eventsUpdateTime = new Date().getTime();
                    window.localStorage.setItem("friendUpdateTime", eventsUpdateTime);
                    });
}

function dateHashSelect(results){
    var dfd = $.Deferred();
    var db7 = window.openDatabase("Database", "1.0", "Cordova Demo", 200000);
    db7.transaction(function (tx1) {
                    
                    
                    
                    
                    
                    //tx.executeSql("UPDATE [EVENTS] SET [dateHash] = '1' WHERE (id = 5)",errorCB,function(){
                    //tx.executeSql("UPDATE EVENTS SET dateHash=1 WHERE id=2",errorCB,function(){
                    console.log("line before");
                                  //tx.executeSql("UPDATE EVENTS SET dateHash=1 WHERE id=2",errorCB,function(){
                    //tx.executeSql("UPDATE EVENTS SET dateHash=1 WHERE id=2",function(){
                    //tx.executeSql("UPDATE [EVENTS] SET [dateHash] = 12 WHERE (id = 5)",function(){console.log("Error");},function(){
                    //tx1.executeSql("UPDATE EVENTS SET dateHash = '1' WHERE (id = '10')",function(){console.log("Error");},function(){
                    //tx1.executeSql("UPDATE EVENTS SET dateHash = '1' WHERE (id = '10')",function(){console.log("Error");},function(){
                    
                    //var len7 = results.rows.length;
                    for (var i = 0; i < results.rows.length; i++) {
                    
                      tx1.executeSql("UPDATE 'EVENTS' SET dateHash = 1 WHERE id ="+results.rows.item(i).id,function(){console.log("Error");},function(){
                                     console.log("suck");
                                     dfd.resolve(tx1);
                                   
                                  });
                    
                    }
                    
                    /*
                    tx.executeSql('SELECT * FROM EVENTS', [], function (tx, results) {
                                  console.log("succees");
                                  var len5 = results.rows.length
                                  for (var i = 0; i < len5; i++) {
                                  //console.log("name: " + results.rows.item(i).name + "start: +" + results.rows.item(i).eventFbId)
                         }
                                  }, errorCB);
                                   */
                    });
       return dfd.promise();

}

function updateDateIntegerDb(){
    console.log("update triggered");
    var db10 = window.openDatabase("Database", "1.0", "Cordova Demo", 200000);
    db10.transaction(function (tx) {
                     
                     tx.executeSql('SELECT start_time, id, dateHash FROM EVENTS', [], function (tx, results) {
                                   /*
                                   var len5 = results.rows.length
                                   for (var i = 0; i < len5; i++) {
                                   console.log("idy: " + results.rows.item(i).id + "dateHashy: " + results.rows.item(i).dateHash)
                                   }
                                   */
                                   dateHashSelect(results).done(function(tx1){
                                                                console.log("deffered done");
                                                                console.log("Success");
                                                                tx1.executeSql('SELECT start_time, id, dateHash  FROM EVENTS', [], function (tx1, results1) {
                                                                               var len6 = results.rows.length;
                                                                               for (var i = 0; i < len6; i++) {
                                                                               console.log("ider: " + results1.rows.item(i).id + "dateHasher: " + results1.rows.item(i).dateHash);
                                                                               }
                                                                               
                                                                               
                                                                               }, errorCB);
                                                                
                                                                });
                                   
                     
                      }, errorCB);
                     
                     
                      });
    
}

function getEventsDb(){
    //var dfd = $.Deferred();
    updateDateIntegerDb();
    var db9 = window.openDatabase("Database", "1.0", "Cordova Demo", 200000);
    db9.transaction(function (tx) {
                    
                    tx.executeSql('SELECT EVENTS.formattedDate as formattedStartDate, EVENTS.formattedTime as formattedStartTime, EVENTS.formattedDateTime as formattedStartDateTime, EVENTS.start_time as start_time, FRIENDS_EVENTS.eventFbId, FRIENDS_EVENTS.friendFbId, EVENTS.name as eventName, FRIENDS.name FROM FRIENDS_EVENTS INNER JOIN EVENTS ON FRIENDS_EVENTS.eventFbId = EVENTS.eventFbId INNER JOIN FRIENDS ON FRIENDS_EVENTS.friendFbId = FRIENDS.fbId  ORDER BY EVENTS.formattedDate DESC;', [], function (tx, results) {
                                  
                                  var len6 = results.rows.length
                                  
                                  //loop through results
                                  for (var i = 0; i < len6; i++) {
                                  //console.log("name: " + results.rows.item(i).name + "eventName:" + results.rows.item(i).eventName+" start time: "+results.rows.item(i).start_time);
                                  }
                                  
                                  }, errorCB);
                    
                    });
    
}

document.addEventListener('deviceready', function () {
                          window.fbAsyncInit = function () {
                          init();
                          }
                          });

function init() {
    FB.init({
            appId: '253970731442450',
            nativeInterface: CDV.FB,
            //channelUrl: 'http://www.event32ios.com',
            useCachedDialogs: false
            });
    //if(window.localStorage.getItem('firstRun')==null){
    FB.getLoginStatus(function (response) {
                      if (response.status == "connected") {
                      alert("connected");
                      accessToken = response.authResponse.accessToken;
                      //var db1 = window.openDatabase("Database", "1.0", "Cordova Demo", 200000);
                      //db1.transaction(createTable, errorCB, function (tx) {
                      createTable1().done(function(){

                                          updateFriends().done(function () {
                                                               updateEvents().done(function () {
                                                                                   updateEventAttr();
                                                                                   });
                                                              });
                                          });

                      } else if (response.status == "not_authorized") {
                      alert("not_authorized");
                      $("#fb-login-button").text("Facebook Authorization");
                      $("#fb-login-button").css('display', 'block');
                      } else if (response.status == "unknown") {
                      alert("unknown");
                      $("#fb-login-button").text("Facebook Login");
                      $("#fb-login-button").css('display', 'block');
                      }
                      });
    window.localStorage.setItem('firstRun', '1');
}

$(document).ready(function () {
                  $("#fb-login-button").click(function () {
                                              FB.login($.proxy(function (response) {
                                                               if (response.authResponse) {
                                                               accessToken = response.authResponse.accessToken;
                                                               $("#fb-login-button").css('display', 'none');
                                                               $.proxy(mainInit('https://graph.facebook.com/me/friends?fields=picture,name,id&access_token=' + accessToken), this);
                                                               } else {
                                                               console.log('User cancelled login or did not fully authorize.');
                                                               }
                                                               }, this), {
                                                       scope: 'user_events,friends_events'
                                                       });
                                              });
                  });
