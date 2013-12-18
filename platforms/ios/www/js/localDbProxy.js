function createTable1(){
    var dfd = $.Deferred();
    var db1 = window.openDatabase("Database", "1.0", "Cordova Demo", 200000);
    //db1.transaction(createTable, errorCB, function (tx) {
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
/*
function createTable(tx){
    
    tx.executeSql('DROP TABLE IF EXISTS FRIENDS');
    tx.executeSql('DROP TABLE IF EXISTS FRIENDS_EVENTS');
    tx.executeSql('DROP TABLE IF EXISTS EVENTS');
    tx.executeSql('CREATE TABLE IF NOT EXISTS FRIENDS (fbId unique, name,touched DATETIME)');
    tx.executeSql('CREATE TABLE FRIENDS_EVENTS(id unique,touched DATETIME DEFAULT CURRENT_TIMESTAMP,startTime DATETIME,eventFbId,friendFbId,UNIQUE(eventFbId, friendFbId))');
    tx.executeSql('CREATE TABLE EVENTS(id PRIMARY KEY,touched DATETIME DEFAULT CURRENT_TIMESTAMP,start_time DATETIME,update_time DATETIME,eventFbId unique, name, description, end_time,attending_count,pic,pic_big,pic_square,pic_cover,ticket_uri,timezone,unsure_count,venue_street,venue_city,venue_state,venue_country,venue_zip,venue_latitude,venue_longitude,venue_id,venue_name,venue_located_in,pic_small,all_members_count,can_invite_friends,creator,declined_count,app_id,feed_targeting,has_profile_pic,host,is_date_only,not_replied_count,privacy)');
}


function populateFriendtable(tx) {
    tx.executeSql('INSERT INTO FRIENDS (fbId, data, name,touched) VALUES (1, "First row", "Betty","32424")');
    tx.executeSql('INSERT INTO FRIENDS (fbId, data, name,touched) VALUES (2, "Second row", "Alph","923492349")');
}

// Query the database
//
function queryDB(tx) {
    tx.executeSql('SELECT * FROM FRIENDS', [], querySuccess, errorCB);
}

// Query the success callback
//
function querySuccess(tx, results) {
    var len = results.rows.length;
    console.log("DEMO table: " + len + " rows found.");
    for (var i=0; i<len; i++){
        console.log("Row = " + i + " ID = " + results.rows.item(i).id + " Data =  " + results.rows.item(i).data);
    }
}
*/
// Transaction error callback
//
function errorCB(err) {
    console.log("Error processing SQL code: "+err.code+" message: "+err.message);
}

// Transaction success callback
//
function successCB() {
    var db = window.openDatabase("Database", "1.0", "Cordova Demo", 200000);
    db.transaction(queryDB, errorCB);
}


