
function createTable(tx){
    
    tx.executeSql('DROP TABLE IF EXISTS FRIENDS');
    tx.executeSql('DROP TABLE IF EXISTS FRIENDS_EVENTS');
    tx.executeSql('DROP TABLE IF EXISTS EVENTS');
    tx.executeSql('CREATE TABLE IF NOT EXISTS FRIENDS (fbId unique, data, name,touched)');
    //UNIQUE(user_id, image_id)
    //tx.executeSql('CREATE TABLE FRIENDS_EVENTS(startTime DATETIME,touched DATETIME DEFAULT CURRENT_TIMESTAMP,UNIQUE(eventFbId, friendFbId))');
    //tx.executeSql('CREATE TABLE FRIENDS_EVENTS(id unique,eventFbId,friendFbId,UNIQUE(eventFbId, friendFbId))');
    //tx.executeSql('CREATE TABLE FRIENDS_EVENTS(id unique,startTime DATETIME,eventFbId,friendFbId,UNIQUE(eventFbId, friendFbId))');
    //tx.executeSql('CREATE TABLE FRIENDS_EVENTS(id unique,startTime DATETIME,eventFbId,friendFbId,UNIQUE(eventFbId, friendFbId))');
    tx.executeSql('CREATE TABLE FRIENDS_EVENTS(id unique,touched DATETIME DEFAULT CURRENT_TIMESTAMP,startTime DATETIME,eventFbId,friendFbId,UNIQUE(eventFbId, friendFbId))');
    /*
    tx.executeSql('CREATE TABLE EVENTS(id unique,touched DATETIME DEFAULT CURRENT_TIMESTAMP,start_time DATETIME,update_time DATETIME,eventFbId unique, name, description, end_time,attending_count,pic,pic_big,pic_square,ticket_uri,timezone,unsure_count,venue_street,venue_city,venue_state,venue_country,venue_zip,venue_latitude,venue_longitude,venue_id,venue_name,venue_located_in,pic_small)');
    */
    tx.executeSql('CREATE TABLE EVENTS(id unique,touched DATETIME DEFAULT CURRENT_TIMESTAMP,start_time DATETIME,update_time DATETIME,eventFbId unique, name, description, end_time,attending_count,pic,pic_big,pic_square,ticket_uri,timezone,unsure_count,venue_street,venue_city,venue_state,venue_country,venue_zip,venue_latitude,venue_longitude,venue_id,venue_name,venue_located_in,pic_small,all_members_count,can_invite_friends,creator,declined_count,app_id,feed_targeting,has_profile_pic,host,is_date_only,not_replied_count,privacy)');
    
    //all_members_count,can_invite_friends,creator,declined_count,app_id,feed_targeting,has_profile_pic,host,is_date_only,not_replied_count,privacy
    
        //tx.executeSql('CREATE TABLE EVENTS(id unique,touched DATETIME DEFAULT CURRENT_TIMESTAMP,time DATETIME,altId unique, name)');

    //Timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
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

/*
function populateDB(tx) {
        //alert("pop db");
         tx.executeSql('DROP TABLE IF EXISTS friends');
        tx.executeSql('DROP TABLE IF EXISTS events');
        tx.executeSql('DROP TABLE IF EXISTS dates');
        //tx.executeSql('DROP TABLE IF EXISTS dates');
         //tx.executeSql('CREATE TABLE IF NOT EXISTS DEMO (id unique, data)');
         tx.executeSql('CREATE TABLE friends (id unique, fbId, name, touched)');
        tx.executeSql('CREATE TABLE events (id unique, fbId, title, description, venueLat, venueLng, venueFbId, venueName, venuePhone, dateHash, dateId, ticketLink)');
        tx.executeSql('CREATE TABLE dates (id unique, hashId)');
          //alert("pop db end");
         //tx.executeSql('CREATE TABLE friends (id unique, fbId, name, touched)');
         //tx.executeSql('INSERT INTO DEMO (id, data) VALUES (1, "First row")');
         //tx.executeSql('INSERT INTO DEMO (id, data) VALUES (2, "Second row")');
    }


function insertFriend(tx) {
    console.log(tx);
    //console.log(str);
    //console.log("insert name: "+name);
    //console.log("insert id: "+id);
    tx.executeSql('INSERT INTO friends (fbId, touched) VALUES (2, "Second row")');
}

function makeTables(){
    alert("make tables");
     tx.executeSql('CREATE TABLE IF NOT EXISTS friends (id unique, fbId  VARCHAR(200), name  VARCHAR(200), touched VARCHAR(200))');
     tx.executeSql('CREATE TABLE IF NOT EXISTS dates (id unique, hashId, touched)');
     tx.executeSql('CREATE TABLE IF NOT EXISTS events (id unique, fbId, name, description, touched)');
}

    // Transaction error callback
    //
    function errorCB(tx, err) {
        alert("Error processing SQL: "+err);
    }

    // Transaction success callback
    //
    function successCB() {
        alert("db success!");
    }
    
    function queryDB(tx) {
    tx.executeSql('SELECT * FROM DEMO', [], querySuccess, errorCB);
}

function querySuccess(tx, results) {
    // this will be empty since no rows were inserted.
    //console.log("Insert ID = " + results.insertId);
    // this will be 0 since it is a select statement
    console.log("Rows Affected = " + results.rowAffected);
    // the number of rows returned by the select statement
    console.log("Insert ID = " + results.rows.length);
    //console.log("results = " + results['First row']);
       //console.log("results = " + results.rows[0]);
       console.log("results = " + results.rows.item(1).id);
       console.log("results = " + results.rows.item(1).data);
    
    
}

function errorCB(err) {
    alert("Error processing SQL: "+err.code);
}
*/


