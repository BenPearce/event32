//var eventList = new Array();
var eventList = {};
var friendList = {};
//var dateHash = {};
var dateHash = new Array();
var accessToken;
var insertData;

//Table Initialize

function createTable1(){
    //console.log("create table");
    var dfd = $.Deferred();
    var db1 = window.openDatabase("Database", "1.0", "Cordova Demo", 200000);
    db1.transaction(function (tx) {
                    tx.executeSql('DROP TABLE IF EXISTS FRIENDS');
                    tx.executeSql('DROP TABLE IF EXISTS FRIENDS_EVENTS');
                    tx.executeSql('DROP TABLE IF EXISTS EVENTS');
                    tx.executeSql('CREATE TABLE IF NOT EXISTS FRIENDS (fbId unique, name,touched DATE)');
                    tx.executeSql('CREATE TABLE FRIENDS_EVENTS(id unique,touched DATETIME,startTime DATETIME,eventFbId, formattedDate DATE, formattedTime TIME,formattedDateTime DATETIME,friendFbId,UNIQUE(eventFbId, friendFbId))');
                    tx.executeSql('CREATE TABLE EVENTS(id INTEGER PRIMARY KEY AUTOINCREMENT,touched DATE,start_time DATE,update_time DATETIME,eventFbId unique, name, description, end_time, formattedDate DATE, formattedTime TIME,formattedDateTime DATETIME,attending_count,pic,pic_big,pic_square,pic_cover,ticket_uri,timezone,unsure_count,venue_street,venue_city,venue_state,venue_country,venue_zip,venue_latitude,venue_longitude,venue_id,venue_name,venue_located_in,pic_small,all_members_count,can_invite_friends,creator,declined_count,app_id,feed_targeting,has_profile_pic,host,is_date_only,not_replied_count,privacy,dateHash INTEGER)');
                    
                    },errorCB9,function(){
                    dfd.resolve("friendIdList1");
                    });
    return dfd.promise();
}

//Controller Functions

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
                                                         deleteExpiredFriendsEvents().done(function(){
                                                                                           insertEventIdsDb(friendEventsParse).done(function(){
                                                                                                                                    dfd.resolve("blah");
                                                                                                                                    });
                                                                                           });
                                                         });
                        });
    return dfd.promise();
}

var updateEventAttr = function () {
    var dfd = $.Deferred();
    getEventIDsDb().done(function (friendIdList1) {
                         getEventAttrFb(friendIdList1).done(function (eventAttrParse) {
                                                            deleteExpiredEvents().done(function(){
                                                                                       insertEventArrtDb(eventAttrParse).done(function(){
                                                                                                                              getEventsImplementation().done(function(){
                                                                                                                                                             dfd.resolve("friendIdList1");                                                     });
                                                                                                                              });
                                                                                       });
                                                            });
                         });
    return dfd.promise();
}

//Fb Functions

function getFriendsFb() {
    var dfd = $.Deferred();
    FB.api('/me/friends?access_token=' + accessToken, function (friendData) {
           var friendParse = friendData.data;
           dfd.resolve(friendParse);
           });
    return dfd.promise();
}

function getEventIdsFb(friendIdList) {
    var dfd = $.Deferred();
    FB.api({
           method: 'fql.query',
           //The top query is more efficient but it's filtering out todays dates
           //query: "SELECT eid,uid,rsvp_status,start_time  FROM event_member WHERE uid IN(" + friendIdList + ") AND start_time >= now() AND rsvp_status = 'attending'",
           query: "SELECT eid,uid,rsvp_status,start_time  FROM event_member WHERE uid IN(" + friendIdList + ") AND rsvp_status = 'attending'",
           access_token: accessToken
           },
           function (friendEventsParse) {
           dfd.resolve(friendEventsParse);
           });
    return dfd.promise();
}

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

function deleteExpiredFriendsEvents(){
    var dfd = $.Deferred();
    var db4 = window.openDatabase("Database", "1.0", "Cordova Demo", 200000);
    db4.transaction(function (tx) {
                    var stat1 = "DELETE FROM FRIENDS_EVENTS WHERE formattedDate < date('"+getTodaysDate()+"')";
                    //var stat2 = "DELETE FROM FRIENDS_EVENTS WHERE formattedDate < date('2014-01-11')";
                    
                    tx.executeSql(stat1,function(){console.log("Error");},function(){
                                  dfd.resolve("friendParse");
                                  });
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
                   }, errorCB10, function () {
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
                                  }, errorCB5);
                    }, errorCB11);
    return dfd.promise();
}

function insertEventIdsDb(friendEventsParse) {
    console.log("inserd Events Triggered");
    var count = 0;
    var dfd = $.Deferred();
    var db4 = window.openDatabase("Database", "1.0", "Cordova Demo", 200000);
    db4.transaction(function (tx) {
                    for (i = 1; i <= friendEventsParse.length - 1; i++) {
                    count = count +1;
                    tx.executeSql("INSERT INTO FRIENDS_EVENTS ('eventFbId','friendFbId','startTime','touched','formattedDate') VALUES (?,?,?,?,?)", [friendEventsParse[i].eid, friendEventsParse[i].uid, friendEventsParse[i].start_time, todaysStamp,fbStampToDbDate(friendEventsParse[i].start_time)]);
                    }
                    }, errorCB6, function () {
                    
                    var friendsEventsUpdateTime = new Date().getTime();
                    window.localStorage.setItem("friendUpdateTime", friendsEventsUpdateTime);
                    console.log("evens inserted");
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
           query: "SELECT name,eid,start_time,description,venue,update_time FROM event WHERE eid IN (" + friendIdList1 + ")",
           access_token: accessToken
           },
           function (eventAttrParse) {
           dfd.resolve(eventAttrParse);
           });
    return dfd.promise();
}

//Db Functions

function getEventArrtDb() {
    var db7 = window.openDatabase("Database", "1.0", "Cordova Demo", 200000);
    db7.transaction(function (tx) {
                    tx.executeSql('SELECT * FROM EVENTS', [], function (tx, results) {
                                  var len5 = results.rows.length
                                  for (var i = 0; i < len5; i++) {
                                  }
                                  }, errorCB13);
                    });
}

function deleteExpiredEvents(){
    var dfd = $.Deferred();
    var db4 = window.openDatabase("Database", "1.0", "Cordova Demo", 200000);
    db4.transaction(function (tx) {
                    var stat1 = "DELETE FROM EVENTS WHERE formattedDate < date('"+getTodaysDate()+"')";
                    var stat2 = "DELETE FROM EVENTS WHERE formattedDate < date('2014-01-11')";
                    tx.executeSql(stat1,function(){console.log("Error");},function(){
                                  dfd.resolve("friendParse");
                                  });
                    });
    return dfd.promise();
}


function tester(tx,updateTime,eventAttrParse){
    
       console.log("updateTime_4: "+updateTime);
    
    tx.executeSql("SELECT eventFbId, touched from FRIENDS_EVENTS WHERE eventFbId = '"+eventAttrParse[i].eid+"'", [], function (tx, results) {
                    console.log("updateTime_5: "+updateTime);

                  console.log("results.touched rows: "+results.rows);
                  console.log("results.touched length: "+results.rows.length);
                  
                  console.log("results.eventFbId 0: "+results.rows.item(0).eventFbId);
                  console.log("results.touched 0: "+results.rows.item(0).touched);
                  


                  });
}

function insertEventArrtDb(eventAttrParse) {
    var count = 0;
    var dfd = $.Deferred();
    var test = 99;
    var db7 = window.openDatabase("Database", "1.0", "Cordova Demo", 200000);
    var db_7 = window.openDatabase("Database", "1.0", "Cordova Demo", 200000);

    db7.transaction(function (tx) {
                    for (i = 0; i <= eventAttrParse.length - 1; i++) {
                    count = count +1;
                    //venue_street,venue_city,venue_state,venue_country,venue_zip,venue_latitude,venue_longitude,venue_id,venue_name,venue_located_in
                    
                    //Not getting any of todays dates
                    
                    console.log("incoming eId: "+eventAttrParse[i].eid);
                    
                    
                    var updateTime = eventAttrParse[i].update_time;
                     console.log("updateTime_3: "+updateTime);
                    
                                     tester(tx,updateTime,eventAttrParse);

                    
                    
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
                                  +'venue_street'+","
                                  +'venue_city'+","
                                  +'venue_state'+","
                                  +'venue_country'+","
                                  +'venue_zip'+","
                                  +'venue_latitude'+","
                                  +'venue_longitude'+","
                                  +'venue_id'+","
                                  +'venue_name'+","
                                  +'venue_located_in'+","
                                  +'creator'+ //24
                                  ") VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
                                  
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
                                   eventAttrParse[i].venue.street,
                                   eventAttrParse[i].venue.city,
                                   eventAttrParse[i].venue.state,
                                   eventAttrParse[i].venue.country,
                                   eventAttrParse[i].venue.zip,
                                   eventAttrParse[i].venue.latitude,
                                   eventAttrParse[i].venue.longitude,
                                   eventAttrParse[i].venue.id,
                                   eventAttrParse[i].venue.name,
                                   eventAttrParse[i].venue.located_in,
                                   eventAttrParse[i].creator//24
                                   ]
                                  );
                    }
                    }, errorCB8, function () {
                    var eventsUpdateTime = new Date().getTime();
                    window.localStorage.setItem("friendUpdateTime", eventsUpdateTime);
                    dfd.resolve("friendIdList1");
                    });
    return dfd.promise();
}



function getEventsDb(){
    //var count = 0;
    var dfd = $.Deferred();
    var db9 = window.openDatabase("Database", "1.0", "Cordova Demo", 200000);
    db9.transaction(function (tx) {
                    tx.executeSql('SELECT dateHash as dateHash, EVENTS.eventFbId as eventFbId, EVENTS.formattedDate as formattedStartDate, EVENTS.formattedTime as formattedStartTime, EVENTS.formattedDateTime as formattedStartDateTime, EVENTS.start_time as start_time, FRIENDS_EVENTS.formattedDate as feFormattedDate, FRIENDS_EVENTS.friendFbId, FRIENDS_EVENTS.friendFbId, EVENTS.name as eventName, FRIENDS.name FROM FRIENDS_EVENTS INNER JOIN EVENTS ON FRIENDS_EVENTS.eventFbId = EVENTS.eventFbId INNER JOIN FRIENDS ON FRIENDS_EVENTS.friendFbId = FRIENDS.fbId  ORDER BY EVENTS.formattedDate DESC;', [], function (tx, results) {
                                  /*
                                   for(i=0;i<results.rows.length;i++){
                                   }
                                   */
                                  dfd.resolve("tx1");
                                  }, errorCB3);
                    });
    return dfd.promise();
}

function updateDateIntegerDb(){
    count = 0;
    var dfd = $.Deferred();
    var db10 = window.openDatabase("Database", "1.0", "Cordova Demo", 200000);
    db10.transaction(function (tx) {
                     tx.executeSql('SELECT name, start_time, id, dateHash FROM EVENTS', [], function (tx, results) {
                                   for (var i = 0; i < results.rows.length; i++) {
                                   count = count +1;
                                   //At this pooint were not getting any of todays dates
                                   console.log("start time db insert: "+results.rows.item(i).start_time);
                                   console.log("date to int Insert: "+dateToInteger(results.rows.item(i).start_time));
                                   
                                   tx.executeSql("UPDATE 'EVENTS' SET dateHash = "+dateToInteger(results.rows.item(i).start_time)+" WHERE id ="+results.rows.item(i).id,function(){console.log("Error");},function(){
                                                 //console.log("update dateHash count: "+count);
                                                 
                                                 tx.executeSql('SELECT dateHash, id, dateHash FROM EVENTS', [], function (tx, results) {
                                                               /*
                                                                for(i=0;i<results.rows.length;i++){
                                                                }
                                                                */
                                                               }, errorCB12);
                                                 
                                                 
                                                 dfd.resolve("tx1");
                                                 });
                                   }
                                   }, errorCB7);
                     });
    return dfd.promise();
}

function getEventsImplementation(){
    var dfd = $.Deferred();
    updateDateIntegerDb().done(function(){
                               getEventsDb().done(function(){
                                                  dfd.resolve("tx1");
                                                  });
                               });
    return dfd.promise();
}

function getTodaysDate(){
    var tempDate = new Date();
    var todaysStamp = tempDate.getFullYear() + '-'+(tempDate.getMonth() + 1) + '-' + tempDate.getDate();
    return todaysStamp;
}

function constructCalObject1(fbId,tx,friend){
    var dfd = $.Deferred();
    //var count = 0;
    /*
     tx.executeSql("SELECT EVENTS.start_time as start_time, EVENTS.description as description,FRIENDS_EVENTS.friendFbId as frId,EVENTS.dateHash as dateHash,EVENTS.name as name, FRIENDS_EVENTS.eventFbId as evId, EVENTS.eventFbId as frEvId FROM FRIENDS_EVENTS JOIN EVENTS ON FRIENDS_EVENTS.eventFbId = EVENTS.eventFbId WHERE EVENTS.eventFbId = '"+fbId+"'", [], function (tx, results) {
     */
    
    tx.executeSql("SELECT * FROM EVENTS WHERE eventFbId = '"+fbId+"'", [], function (tx, results) {
                  
                  
                  //for(l=0;l<results.rows.length; l++){
                  if(parseInt(results.rows.item(0).dateHash)<33){
                  masterEventCount = masterEventCount +1;
                  var event = makeEvent(results.rows.item(0));
                  
                  if(typeof dateHash[event.dateHash] == 'undefined'){
                  dateHash[event.dateHash] = makeEvening(event.dateHash);
                  }
                  
                  if(typeof eventList[event.fbId] == 'undefined'){
                  event.friendIdArray.push(friend.fbId);
                  eventList[event.fbId] = event;
                  //dateHash[event.dateHash].eventList.push(eventList[event.fbId].fbId);
                  dateHash[event.dateHash].eventList.push(event.fbId);
                  }else{
                  eventList[event.fbId].friendIdArray.push(friend.fbId);
                  }
                  //friend.eventIdArray.push(eventList[event.fbId].fbId);
                  friend.eventIdArray.push(event.fbId);
                  
                  }
                  //This is misnamed as it contains friend id's as well
                  eventList[friend.fbId] = friend;
                  // }
                  dfd.resolve("tx1");
                  //dfd.resolve("tx1");
                  }, errorCB2);
    return dfd.promise();
}

var masterEventCount;

function getFriendsEventsDb(friendRow,tx){
    var prmis1 = [];
    var dfd = $.Deferred();
    var friend = makeFriend(friendRow);
    tx.executeSql("SELECT * FROM FRIENDS_EVENTS WHERE friendFbId = '"+friendRow.fbId+"'", [], function (tx, results) {
                  var num = results.rows.length;
                  for(m=0;m<=results.rows.length - 1;m++){
                  JSON.stringify("JSON "+JSON.stringify(results.rows.item(m)));
                  prmis1.push(constructCalObject1(results.rows.item(m).eventFbId,tx,friend));
                  }
                  
                  var fin1 = $.when.apply($, prmis1);
                  
                  fin1.then(function(){
                            dfd.resolve("tx1");
                            });
                  
                  }, errorCB1);
    return dfd.promise();
}

function popUi(){
    masterEventCount = 0;
    var prmis = [];
    var dfd = $.Deferred();
    var db3 = window.openDatabase("Database", "1.0", "Cordova Demo", 200000);
    db3.transaction(function (tx) {
                    tx.executeSql('SELECT * FROM FRIENDS', [], function (tx, results) {
                                  for (var j = 1; j < results.rows.length; j++) {

                                  prmis.push(getFriendsEventsDb(results.rows.item(j),tx));
                                  }
                                  var fin = $.when.apply($, prmis);
                                  
                                  fin.then(function(){
                                           dfd.resolve("tx1");
                                           });
                                  }, errorCB4);
                    }, errorCB14);
    return dfd.promise();
}


// Transaction error callback
function errorCB(err) {
    console.log("Error processing SQL code: "+err.code+" message: "+err.message);
}

function errorCB1(err) {
    console.log("Error in getFriendsEventsDb processing SQL code: "+err.code+" message: "+err.message);
}

function errorCB2(err) {
    console.log("Error in constructCalObject processing SQL code: "+err.code+" message: "+err.message);
}

function errorCB3(err) {
    console.log("Error in getEventsDb processing SQL code: "+err.code+" message: "+err.message);
}

function errorCB4(err) {
    console.log("Error in popUi4 processing SQL code: "+err.code+" message: "+err.message);
}

function errorCB5(err) {
    console.log("Error in getFriendsDb processing SQL code: "+err.code+" message: "+err.message);
}

function errorCB6(err) {
    console.log("Error in insertEventIdsDb processing SQL code: "+err.code+" message: "+err.message);
}

function errorCB7(err) {
    console.log("Error in updateDateIntegerDb processing SQL code: "+err.code+" message: "+err.message);
}

function errorCB8(err) {
    console.log("Error in insertEventArrtDb processing SQL code: "+err.code+" message: "+err.message);
}

function errorCB9(err) {
    console.log("Error in createTable processing SQL code: "+err.code+" message: "+err.message);
}

function errorCB10(err) {
    console.log("Error in insertFriendsDb processing SQL code: "+err.code+" message: "+err.message);
}

function errorCB11(err) {
    console.log("Error in getFriendsDb processing SQL code: "+err.code+" message: "+err.message);
}

function errorCB12(err) {
    console.log("Error in updateDateIntegerDb processing SQL code: "+err.code+" message: "+err.message);
}

function errorCB13(err) {
    console.log("Error in getEventArrtDb processing SQL code: "+err.code+" message: "+err.message);
}

function errorCB14(err) {
    console.log("Error in popUi14 processing SQL code: "+err.code+" message: "+err.message);
}


/*
 function populateDateHash(results){
 var len6 = results.rows.length
 for (var i = 0; i < len6; i++) {
 console.log("popDate Hash:" + results.rows.item(i).formattedStartDate);
 }
 }
 */
/*
 function constructCalObject(fbId,tx,friend){
 var dfd = $.Deferred();
 var count = 0;
 //console.log("EVENTS input "+fbId);
 //console.log("EVENTS friend "+friend);
 tx.executeSql("SELECT EVENTS.start_time as start_time, EVENTS.description as description,FRIENDS_EVENTS.friendFbId as frId,EVENTS.dateHash as dateHash,EVENTS.name as name, FRIENDS_EVENTS.eventFbId as evId, EVENTS.eventFbId as frEvId FROM FRIENDS_EVENTS JOIN EVENTS ON FRIENDS_EVENTS.eventFbId = EVENTS.eventFbId WHERE EVENTS.eventFbId = '"+fbId+"'", [], function (tx, results) {
 console.log("Friends events length: "+results.rows.length);
 
 for(l=0;l<results.rows.length; l++){
 count = count +1;
 if(parseInt(results.rows.item(l).dateHash)<33){
 //console.log("date hash loop");
 //console.log("description: "+results.rows.item(l).description);
 var event = makeEvent(results.rows.item(l));
 event.friendIdArray.push(friend.fbId);
 if(typeof eventList[event.fbId] == 'undefined'){
 eventList[event.fbId] = event;
 }
 
 if(typeof dateHash[event.dateHash] == 'undefined'){
 //console.log("element added to date hash: "+event.dateHash);
 dateHash[event.dateHash] = makeEvening(event.dateHash);
 //console.log("date hash build len: "+dateHash.length);
 }
 //console.log("pushed event name: "+event.name);
 dateHash[event.dateHash].eventList.push(eventList[event.fbId].fbId);
 friend.eventIdArray.push(eventList[event.fbId].fbId);
 
 }
 
 //This is misnamed as it contains friend id's as well
 eventList[friend.fbId] = friend;
 }
 console.log("final get count:"+count);
 //console.log("line bef inner res");
 dfd.resolve("tx1");
 //dfd.resolve("tx1");
 }, errorCB2);
 return dfd.promise();
 }
 */

