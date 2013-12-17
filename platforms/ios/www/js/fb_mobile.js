var accessToken;
var insertData;

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
           //console.log("fb start: "+JSON.stringify(eventAttrParse));
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
                                  console.log("name: " + results.rows.item(i).name + "start: +" + results.rows.item(i).eventFbId)
                                  }
                                  }, errorCB);
                    });
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

function fbStampToDbDate(fbTimeOffSet){
    //console.log("fbTimeOffSet: "+fbTimeOffSet);
    //console.log("fbTimeOffSet.indexOf('T') "+fbTimeOffSet.indexOf('T'))
    if(fbTimeOffSet.indexOf('T') > 0){
        var date = new Date(fbTimeOffSet.substring(0, fbTimeOffSet.indexOf('T')));
        //console.log("date1: "+date.toISOString());
        var temp = date.toISOString();
        var fbStamp = (date.getMonth() + 1) + '/' + date.getDate() + '/' + date.getFullYear();
        var stamp = temp.split("T");
    }else{
        var date = new Date(fbTimeOffSet);
        var fbStamp = (date.getMonth() + 1) + '/' + date.getDate() + '/' + date.getFullYear();
         var stamp = fbTimeOffSet.split("T");
    }
   // console.log("fbStamp "+fbStamp);
    //return fbStamp;
    //stampe = new Date();
    console.log(stamp[0]);
    return stamp[0];
}

function fbStampToDbTime(fbTimeOffSet){
    console.log("fbTimeOffSet1 "+fbTimeOffSet);
    var d = new Date(fbTimeOffSet.replace(' ', 'T'));
    var t = d.getTime();
    //console.log("fbTimeOffSet "+fbTimeOffSet);
    //var time = new Date(fbTimeOffSet).getTime();
    //var time = new Date(d);
    console.log("time4 "+t);
    
    //var date = new Date(time*1000);
    /*
    var year    = date.getFullYear();
    var month   = time.getMonth();
    var day     = date.getDay();
    var hour    = date.getHours();
    var minute  = date.getMinutes();
    var seconds = date.getSeconds();
     */
    //var temp = new Date(date.UTC(date));
    //console.log("hour "+hour);
    //console.log("min "+minute);
    //console.log("sec "+seconds);
    //var fbStamp = new Date(temp.getHours()+":"+temp.getMinutes()+":"+temp.getSeconds());
    //var fbStamp = hour+":"+minute+":"+seconds;
     //console.log("fbTimeStamp "+fbStamp);
    return t;
}

function insertEventArrtDb(eventAttrParse) {
    var db7 = window.openDatabase("Database", "1.0", "Cordova Demo", 200000);
    db7.transaction(function (tx) {
                    for (i = 0; i <= eventAttrParse.length - 1; i++) {
                    //console.log("todaysStamp: "+todaysStamp);
                    //formattedDate DATE, formattedTime TIME,formattedDateTime DATETIME
                    //console.log("insert type"+typeof fbStampToDbDateTime(eventAttrParse[i].start_time));
                    //console.log("insert var"+fbStampToDbDateTime(eventAttrParse[i].start_time));
                    //var test = new Date(fbStampToDbDateTime(eventAttrParse[i].start_time));
                    //console.log("test: "+test);
                    tx.executeSql("INSERT INTO EVENTS ('formattedTime','formattedDateTime','formattedDate','eventFbId','touched','start_time','update_time','end_time','description','name','attending_count','unsure_count','not_replied_count','all_members_count','timezone','ticket_uri','pic_small','pic','pic_big','pic_square','pic_cover','can_invite_friends','creator') VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)", [fbStampToDbTime(eventAttrParse[i].start_time),fbStampToDbDateTime(eventAttrParse[i].start_time),fbStampToDbDateTime(eventAttrParse[i].start_time),eventAttrParse[i].eid, todaysStamp, fbStampToDbDate(eventAttrParse[i].start_time), eventAttrParse[i].update_time, eventAttrParse[i].end_time, eventAttrParse[i].description, eventAttrParse[i].name, eventAttrParse[i].attending_count, eventAttrParse[i].unsure_count, eventAttrParse[i].not_replied_count, eventAttrParse[i].all_members_count, eventAttrParse[i].timezone, eventAttrParse[i].ticket_uri, eventAttrParse[i].pic_small, eventAttrParse[i].pic, eventAttrParse[i].pic_big, eventAttrParse[i].pic_square, eventAttrParse[i].pic_cover, eventAttrParse[i].can_invite_friends, eventAttrParse[i].creator]);
                    }
                    }, errorCB, function () {
                    var eventsUpdateTime = new Date().getTime();
                    window.localStorage.setItem("friendUpdateTime", eventsUpdateTime);
                    });
}

function fbStampToDbDateTime(fbTimeOffSet){
    //console.log("fbTimeOffSet: "+fbTimeOffSet);
    //console.log("fbTimeOffSet.indexOf('T') "+fbTimeOffSet.indexOf('T'))
    if(fbTimeOffSet.indexOf('T') > 0){
        var date = new Date(fbTimeOffSet.substring(0, fbTimeOffSet.indexOf('T')));
        console.log("type 1: "+typeof date);
        var fbStamp = (date.getMonth() + 1) + '/' + date.getDate() + '/' + date.getFullYear();
        console.log("type 2: "+typeof fbStamp);
    }else{
        var date = new Date(fbTimeOffSet);
        var fbStamp = (date.getMonth() + 1) + '/' + date.getDate() + '/' + date.getFullYear();
    }
    // console.log("fbStamp "+fbStamp);
    return date;
}

function updateDateIntegerDb(){
    
    
}

 function getEventsDb(){
 //var dfd = $.Deferred();
 var db9 = window.openDatabase("Database", "1.0", "Cordova Demo", 200000);
 //db1.transaction(createTable, errorCB, function (tx) {
 db9.transaction(function (tx) {

                                  tx.executeSql('SELECT EVENTS.formattedDate as formattedStartDate, EVENTS.formattedTime as formattedStartTime, EVENTS.formattedDateTime as formattedStartDateTime, EVENTS.start_time as start_time, FRIENDS_EVENTS.eventFbId, FRIENDS_EVENTS.friendFbId, EVENTS.name as eventName, FRIENDS.name FROM FRIENDS_EVENTS INNER JOIN EVENTS ON FRIENDS_EVENTS.eventFbId = EVENTS.eventFbId INNER JOIN FRIENDS ON FRIENDS_EVENTS.friendFbId = FRIENDS.fbId  ORDER BY EVENTS.formattedDate DESC;', [], function (tx, results) {
                            
                               
 var len6 = results.rows.length
 for (var i = 0; i < len6; i++) {
    //console.log("name: " + results.rows.item(i).name + "eventName:" + results.rows.item(i).eventName+" start time: "+results.rows.item(i).start_time);
                                                //console.log("fb time: "+results.rows.item(i).start_time);
                                                //console.log("Type of EVENTS.formattedDate "+typeof results.rows.item(i).formattedStartDate);
                                                //console.log("EVENTS.formattedDate"+results.rows.item(i).formattedStartDate);
                                                 //console.log("touched: "+results.rows.item(i).touched);

               //alert("name: " + results.rows.item(i).eventFbId);
 }
 
 }, errorCB);
 
 //dfd.resolve("friendIdList1");
 });
 //return dfd.promise();
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
                      //});
                      
                      
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
