    //var eventList = new Array();
var eventList = {};

function createTable1(){
    var dfd = $.Deferred();
    var db1 = window.openDatabase("Database", "1.0", "Cordova Demo", 200000);
    db1.transaction(function (tx) {
                    tx.executeSql('DROP TABLE IF EXISTS FRIENDS');
                    tx.executeSql('DROP TABLE IF EXISTS FRIENDS_EVENTS');
                    tx.executeSql('DROP TABLE IF EXISTS EVENTS');
                    tx.executeSql('CREATE TABLE IF NOT EXISTS FRIENDS (fbId unique, name,touched DATE)');
                    tx.executeSql('CREATE TABLE FRIENDS_EVENTS(id unique,touched DATETIME,startTime DATETIME,eventFbId, formattedDate DATE, formattedTime TIME,formattedDateTime DATETIME,friendFbId,UNIQUE(eventFbId, friendFbId))');
                    tx.executeSql('CREATE TABLE EVENTS(id INTEGER PRIMARY KEY AUTOINCREMENT,touched DATE,start_time DATE,update_time DATETIME,eventFbId unique, name, description, end_time, formattedDate DATE, formattedTime TIME,formattedDateTime DATETIME,attending_count,pic,pic_big,pic_square,pic_cover,ticket_uri,timezone,unsure_count,venue_street,venue_city,venue_state,venue_country,venue_zip,venue_latitude,venue_longitude,venue_id,venue_name,venue_located_in,pic_small,all_members_count,can_invite_friends,creator,declined_count,app_id,feed_targeting,has_profile_pic,host,is_date_only,not_replied_count,privacy,dateHash INTEGER)');
                    
                    },errorCB,function(){
                    dfd.resolve("friendIdList1");
                    });
    return dfd.promise();
}

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


function deleteExpiredFriendsEvents(){
    var dfd = $.Deferred();
    var db4 = window.openDatabase("Database", "1.0", "Cordova Demo", 200000);
    db4.transaction(function (tx) {
                    var stat1 = "DELETE FROM FRIENDS_EVENTS WHERE formattedDate < date('"+getTodaysDate()+"')";
                    var stat2 = "DELETE FROM FRIENDS_EVENTS WHERE formattedDate < date('2014-01-11')";

                    tx.executeSql(stat2,function(){console.log("Error");},function(){
                                  dfd.resolve("friendParse");
                                  });
                    });
    return dfd.promise();
}

var updateEvents = function () {
    var dfd = $.Deferred();
    getFriendsDb().done(function (friendIdList) {
                        getEventIdsFb(friendIdList).done(function (friendEventsParse) {
                                                         deleteExpiredFriendsEvents().done(function(){
                                                                                           insertEventIdsDb(friendEventsParse).done(function(){
                                                                                                                                    dfd.resolve("blah");
                                                                                                                                    });
                                                                                           });
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

function getTodaysDate(){
    var tempDate = new Date();
    var todaysStamp = tempDate.getFullYear() + '-'+(tempDate.getMonth() + 1) + '-' + tempDate.getDate();
    return todaysStamp;
}

function insertEventIdsDb(friendEventsParse) {
    var dfd = $.Deferred();
    var db4 = window.openDatabase("Database", "1.0", "Cordova Demo", 200000);
    db4.transaction(function (tx) {
                    for (i = 1; i <= friendEventsParse.length - 1; i++) {
                    tx.executeSql("INSERT INTO FRIENDS_EVENTS ('eventFbId','friendFbId','startTime','touched','formattedDate') VALUES (?,?,?,?,?)", [friendEventsParse[i].eid, friendEventsParse[i].uid, friendEventsParse[i].start_time, todaysStamp,fbStampToDbDate(friendEventsParse[i].start_time)]);
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
                                  }
                                  }, errorCB);
                    });
}

function deleteExpiredEvents(){
    //console.log("Deleted trig");
    var dfd = $.Deferred();
    var db4 = window.openDatabase("Database", "1.0", "Cordova Demo", 200000);
    db4.transaction(function (tx) {
                    var stat1 = "DELETE FROM EVENTS WHERE formattedDate < date('"+getTodaysDate()+"')";
                    var stat2 = "DELETE FROM EVENTS WHERE formattedDate < date('2014-01-11')";
                    //console.log("ln before delete");
                    tx.executeSql(stat1,function(){console.log("Error");},function(){
                                  //console.log("delete success");
                                  dfd.resolve("friendParse");
                                  });
                    });
    return dfd.promise();
}

var updateEventAttr = function () {
    //console.log("updateEventAttr");
    var dfd = $.Deferred();
    getEventIDsDb().done(function (friendIdList1) {
                         //console.log("mark 1");
                         getEventAttrFb(friendIdList1).done(function (eventAttrParse) {
                                                            //console.log("mark 2");
                                                            deleteExpiredEvents().done(function(){
                                                                                       //console.log("mark 3");
                                                                                       insertEventArrtDb(eventAttrParse).done(function(){
                                                                                         //console.log("line before get events imp");
                                                                                                                              getEventsImplementation();
                                                                                                                              dfd.resolve("friendIdList1");
                                                                                                                              });
                                                                                       });
                                                            });
                         });
    return dfd.promise();
}

function insertEventArrtDb(eventAttrParse) {
    //console.log("insert Event Attr trig");
    var dfd = $.Deferred();
    var test = 99;
    var db7 = window.openDatabase("Database", "1.0", "Cordova Demo", 200000);
    db7.transaction(function (tx) {
                    for (i = 0; i <= eventAttrParse.length - 1; i++) {
                    //console.log("eid insert: "+eventAttrParse[i].eid);
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
                                  
                                  [fbStampToDbDateTime(eventAttrParse[i].start_time),//1
                                   fbStampToDbDateTime(eventAttrParse[i].start_time),//2
                                   fbStampToDbDate(eventAttrParse[i].start_time),//3
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
                    //console.log("insert Event Attr success");
                    var eventsUpdateTime = new Date().getTime();
                    window.localStorage.setItem("friendUpdateTime", eventsUpdateTime);
                    //console.log("insert Event Attr res");
                    dfd.resolve("friendIdList1");
                    });
    return dfd.promise();
}

function updateDateIntegerDb(){
    var dfd = $.Deferred();
    var db10 = window.openDatabase("Database", "1.0", "Cordova Demo", 200000);
    db10.transaction(function (tx) {
                     tx.executeSql('SELECT start_time, id, dateHash FROM EVENTS', [], function (tx, results) {
                                   for (var i = 0; i < results.rows.length; i++) {
                                   //console.log("line before update");
                                   tx.executeSql("UPDATE 'EVENTS' SET dateHash = "+dateToInteger(results.rows.item(i).start_time)+" WHERE id ="+results.rows.item(i).id,function(){console.log("Error");},function(){
                                                
                                                 
                                                 tx.executeSql('SELECT dateHash, id, dateHash FROM EVENTS', [], function (tx, results) {
                                                        /*
                                                                for(i=0;i<results.rows.length;i++){
                                                                console.log("hash: "+results.rows.item(i).dateHash);
                                                                }
                                                               */
                                                               }, errorCB);
                                                 
                                                 
                                                 dfd.resolve("tx1");
                                                 });
                                   }
                                   }, errorCB);
                     });
    return dfd.promise();
    
}

function getEventsImplementation(){
    //console.log("get events imp");
    updateDateIntegerDb().done(function(){
                               getEventsDb();
                               });
}
/*
function populateDateHash(results){
     var len6 = results.rows.length
    for (var i = 0; i < len6; i++) {
        console.log("popDate Hash:" + results.rows.item(i).formattedStartDate);
    }
}
 */

function popUi(){
    console.log("popui triggered");
    var dfd = $.Deferred();
    var db3 = window.openDatabase("Database", "1.0", "Cordova Demo", 200000);
    db3.transaction(function (tx) {
                    tx.executeSql('SELECT * FROM FRIENDS', [], function (tx, results) {
                                  console.log("friend select");
                                  for (var j = 1; j < results.rows.length; j++) {
                                  
                                  console.log("results.rows.item(j).fbId "+results.rows.item(j).fbId);
                                          var friend = makeFriend(results.rows.item(j));
                                  //console.log("friend name: "+results.rows.item(j).name);
                                  //console.log("friend id: "+results.rows.item(j).fbId);
                                  
                                  var fbIder = results.rows.item(j).fbId;
                                  /*
                                  tx.executeSql("SELECT * FROM FRIENDS_EVENTS", [], function (tx, results) {
                                                console.log("inner len: "+results.rows.length);
                                                
                                                for(i=0;i<results.rows.length; i++){
                                                console.log("friends events id: "+results.rows.item(i).friendFbId);
                                                }
                                  */
                              //tx.executeSql("SELECT * FROM FRIENDS_EVENTS WHERE friendFbId = "+fbIder, [], function (tx, results) {
                              //tx.executeSql("SELECT * FROM FRIENDS_EVENTS WHERE friendFbId = '654412648'", [], function (tx, results) {
                              tx.executeSql("SELECT * FROM FRIENDS_EVENTS WHERE friendFbId = '"+results.rows.item(j).fbId+"'", [], function (tx, results) {
                                              console.log("friends events");
                                                //console.log("friends events row length: "+results.rows.length);
                                         
                                                for(k=0;k<results.rows.length; k++){
                                            
                                    
                                               //console.log("friends event ID: "+results.rows.item(k).eventFbId);

                                           // tx.executeSql("SELECT FRIENDS_EVENTS.friendFbId as frId,EVENTS.dateHash as dateHash,EVENTS.name as name, FRIENDS_EVENTS.eventFbId as evId, EVENTS.eventFbId as frEvId FROM FRIENDS_EVENTS JOIN EVENTS ON FRIENDS_EVENTS.eventFbId = EVENTS.eventFbId WHERE EVENTS.eventFbId = '594435507287355'", [], function (tx, results) {
                                                         
                                                          tx.executeSql("SELECT FRIENDS_EVENTS.friendFbId as frId,EVENTS.dateHash as dateHash,EVENTS.name as name, FRIENDS_EVENTS.eventFbId as evId, EVENTS.eventFbId as frEvId FROM FRIENDS_EVENTS JOIN EVENTS ON FRIENDS_EVENTS.eventFbId = EVENTS.eventFbId WHERE EVENTS.eventFbId = '"+results.rows.item(k).eventFbId+"'", [], function (tx, results) {
                                                          
                                                          console.log("sel done");
                                                      /*
                                                      SELECT *
                                                      FROM Orders
                                                      LEFT JOIN OrderLines ON OrderLines.OrderID=Orders.ID
                                                      WHERE Orders.ID = 12345
                                            */
                                            
                                            //tx.executeSql("SELECT * FROM EVENTS WHERE eventFbId = '"+results.rows.item(k).eventFbId+"'", [], function (tx, results) {

                                            
                                                          //console.log("friends events row length: "+results.rows.length);
                                                          
                                                          for(l=0;l<results.rows.length; l++){
                                                                        var event = makeEvent(results.rows.item(l));
                                                    //console.log("eventFbId2: "+results.rows.item(l).evId);
                                                     //console.log("frEvId: "+results.rows.item(l).frEvId);
                                                    //console.log("name: "+results.rows.item(l).name);
                                                    console.log("date hash: "+results.rows.item(l).dateHash);
                                                          //console.log("fr id: "+results.rows.item(l).frId);

                                                          //console.log("eventFbId type: "+typeof results.rows.item(l).eventFbId);
                                                          //console.log("eventFbId type: "+typeof eventList[results.rows.item(l).eventFbId]);
                                                          //console.log("eventFbId type: "+(typeof eventList[results.rows.item(l).eventFbId] == 'undefined'));
                                                           //var event = makeEvent(eventList[results.rows.item(l)]);
                                                                                           
                                                 
                                                          if(typeof eventList[results.rows.item(l).eventFbId] == 'undefined'){
                                                            //eventList[results.rows.item(l).eventFbId] = makeEvent(results.rows.item(l));
                                                            //need a join query to have dateHash
                                                            //dateHash[results.rows.item(l).dateHash].eventList.push(results.rows.item(l).eventFbId);
                                                          console.log("undef true");
                                                          }else{
                                                          console.log("hi");
                                                           }
                                                          }
                                                           }, errorCB);
                                                }
                                  /*
                                  if (eventList[typeof results.rows.item(0).fbId] == 'undefined'){
                                  eventList[typeof results.rows.item(0).fbId] = makeEvent(results.rows.item(i));
                                  dateHash[results.rows.item(i).dateHash].event
                                  }
                                     */
                                              //}, errorCB);
                                    }, errorCB);
                                  }
                                  //var len = results.rows.length;
                                  //var friendIdList = results.rows.item(0).fbId;
                                  /*
                                  results.rows.length
                                  for (var i = 1; i < results.rows.length; i++) {
                                  friendIdList = friendIdList + "," + results.rows.item(i).fbId;
                                  }
                                  dfd.resolve(friendIdList);
                                  */
                                  }, errorCB);
                    }, errorCB);
    return dfd.promise();
}


function getEventsDb(){
    var db9 = window.openDatabase("Database", "1.0", "Cordova Demo", 200000);
    db9.transaction(function (tx) {
                    tx.executeSql('SELECT dateHash as dateHash, EVENTS.eventFbId as eventFbId, EVENTS.formattedDate as formattedStartDate, EVENTS.formattedTime as formattedStartTime, EVENTS.formattedDateTime as formattedStartDateTime, EVENTS.start_time as start_time, FRIENDS_EVENTS.formattedDate as feFormattedDate, FRIENDS_EVENTS.friendFbId, FRIENDS_EVENTS.friendFbId, EVENTS.name as eventName, FRIENDS.name FROM FRIENDS_EVENTS INNER JOIN EVENTS ON FRIENDS_EVENTS.eventFbId = EVENTS.eventFbId INNER JOIN FRIENDS ON FRIENDS_EVENTS.friendFbId = FRIENDS.fbId  ORDER BY EVENTS.formattedDate DESC;', [], function (tx, results) {
                                  /*
                                  for(i=0;i<results.rows.length;i++){
                                  console.log("event intersect result: "+results.rows.item(i).eventFbId);
                                  }
                                  */
                                  }, errorCB);
                    });
}

// Transaction error callback
function errorCB(err) {
    console.log("Error processing SQL code: "+err.code+" message: "+err.message);
}

