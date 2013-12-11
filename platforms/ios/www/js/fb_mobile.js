/*
    (function (d, s, id) {
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) {
            return;
        }
        js = d.createElement(s);
        js.id = id;
        js.src = "http://connect.facebook.net/en_US/all.js";
        fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
    */


   //window.fbAsyncInit = function () {

//window.localStorage.removeItem('runned');

/*
   document.addEventListener('resume', function () {
                             
                             alert("resume");
                             });

document.addEventListener('pause', function () {
                          
                          alert("pause");
                          });
 */

//var db = window.openDatabase("Database", "1.0", "PhoneGap Demo", 200000);
var accessToken;

function updateFriends(){
    //alert("update friend token: "+accessToken);
    FB.api('/me/friends?access_token='+accessToken,function(friendData){
           //console.log(JSON.stringify(friendData));
                 //db.transaction(insertFriend("hi"), errorCB, successCB);
           var friendParse = friendData.data;
           
           var insertData = "INSERT INTO 'friends' ('name', 'fbId', 'touched') VALUES";
           //var insertData = "INSERT INTO 'friends' ('name', 'fbId') VALUES";
           
           insertData = insertData + "('"+friendParse[0].name+"','"+friendParse[0].id+"','"+todaysStamp+"')";
           //insertData = insertData + "('"+friendParse[0].name+"','"+friendParse[0].id+"')";
           
           for(i=1;i<=friendParse.length - 1;i++){
           //console.log(i);
           insertData = insertData + ",('"+friendParse[i].name+"','"+friendParse[i].id+"','"+todaysStamp+"')"
           //insertData = insertData + ",('"+friendParse[i].name+"','"+friendParse[i].id+"')"
           }
           
           /*
           $.each(friendData.data,function(i,value){
                  
                  insertData = insertData + ",("+value.name+","+value.id+")"
                  //console.log("name: "+JSON.stringify(value.name));
                  //console.log("fbId: "+JSON.stringify(value.id));
                  //db.transaction(insertFriend(value.id,value.name), errorCB, successCB);
                   //db.transaction(insertFriend, errorCB, successCB);
                  });
            */
           insertData = insertData +";"
           console.log(insertData);
           /*
           var db1 = window.openDatabase("Database", "1.0", "PhoneGap Demo", 200000);
           db1.transaction(populateDB1, errorCB, successCB);
           */
           /*
           var db2 = window.openDatabase("Database", "1.0", "Cordova Demo", 200000);
           //db1.transaction(createTable, errorCB, createTableSuccess);
           db2.transaction(insertFriends, errorCB, insertFriendsSuccess);
           */
           
           var db = window.openDatabase("Database", "1.0", "Cordova Demo", 200000);
           //db.transaction(populateDB, errorCB, successCB);
           //db.transaction(insertFriends, errorCB, insertFriendsSuccess);
           //db.transaction(insertFriends, errorCB, successCB);
           db.transaction(insertFriends, errorCB, function(){
                          var db3 = window.openDatabase("Database", "1.0", "Cordova Demo", 200000);
                          db3.transaction(queryDB, errorCB);
                          
                          });
           
         
           
           //alert("mark 1");
           /*
           db.transaction( function (tx) {
                          tx.executeSql('DROP TABLE IF EXISTS DEMO');
                          tx.executeSql('CREATE TABLE IF NOT EXISTS DEMO (id unique, data)');
                          tx.executeSql('INSERT INTO DEMO (id, data) VALUES (1, "First row")');
                          tx.executeSql('INSERT INTO DEMO (id, data) VALUES (2, "Second row")');
                          }, errorCB,  function successCB() {
                          var db = window.openDatabase("Database", "1.0", "PhoneGap Demo", 200000);
                          db.transaction( function (tx) {
                                         tx.executeSql('SELECT * FROM DEMO', [],  function (tx, results) {
                                                       // this will be empty since no rows were inserted.
                                                       console.log("Insert ID = " + results.insertId);
                                                       // this will be 0 since it is a select statement
                                                       console.log("Rows Affected = " + results.rowAffected);
                                                       // the number of rows returned by the select statement
                                                       alert("Insert ID = " + results.rows.length);
                                                       }, errorCB);
                                         }, errorCB);
                          });
           */
          
           
           /*
           db.transaction(function (tx) {tx.executeSql("INSERT INTO 'friends' ('name', 'fbId', 'touched') VALUES ('2', 'Second row', 'Second row')")},errorCB,function(tx){
                         
                          //'SELECT * FROM DEMO', [], querySuccess, errorCB
                          
                          //db.transaction(function (tx) {tx.executeSql("SELECT * FROM friends")},errorCB,function(tx,results){alert(results)});
                          tx.executeSql('SELECT * FROM DEMO', [], querySuccess, errorCB);
                          db.transaction(function (tx) {tx.executeSql("SELECT * FROM friends", [], function(tx,results){alert(results)}, errorCB)}, errorCB);
                          //db.transaction(function (tx) {tx.executeSql("SELECT * FROM friends")},errorCB,function(tx,results){alert(results)});
                          //tx.executeSql('SELECT * FROM friends', [], function(tx,results){alert(results);}, errorCB);
                          
                          });
            */
           
           
           //}
           
           
           
           //});
});

    /*
                                        db.transaction(function (tx) {
                                                 
                                        tx.executeSql('SELECT * FROM friends',[], errorCB, function(tx,results){
                                                      alert("select resulte: "+results.rows.length);
                                                      //console.log("Select CB");
                                                      //console.log("db resulte: "+results.rows.length);
                                                      });
                                        
                                        });
                                        */
                                       // }
                          //alert("Select Before");
                          /*
                          db.transaction(function (tx) {
                                         
                          tx.executeSql('SELECT * FROM DEMO', [], function(tx,results){
                                        //console.log("Select CB");
                                        //console.log("db resulte: "+results.rows.length);
                                        }
                                        , errorCB);
                                         
                            });
                          */
                             //});


           
           
           /*
           db.transaction(function (tx) {
         tx.executeSql('INSERT INTO friends (fbId, touched) VALUES ('+hi+', '+todaysStamp+')');
        //INSERT INTO Table ( Column1, Column2 ) VALUES ( Value1, Value2 ), ( Value1, Value2 )
        // tx.executeSql('INSERT INTO serials (serial) VALUES (' + data[i] + ')')
                          });
            */
 
    
    /*
    FB.api(
           {
           method: 'fql.query',
           query: 'SELECT uid2 FROM friend WHERE uid1 = me()',
           access_token:accessToken
           },
           function(friendData) {
           //console.log("friendData: "+JSON.stringify(friendData));
           $.each(friendData,function(){
                  console.log("name: "+friendData.name);
                  db.transaction(insertFriend(friendData.id,friendData.name), errorCB, successCB);
                  });
            
                  //}
           }
        );
     */

}

function updateEvents(){
    
    
}

    	      document.addEventListener('deviceready', function () {
                                        
                                       
                                        
                                        //window.fbAsyncInit only necessary for desktop
                                        
                                        
                                        window.fbAsyncInit = function() {
                                        init();
                                        }
                                        
                                        
                                        });

                                        function init(){
                                            //alert("init");
                                            FB.init({
                                                    appId: '253970731442450',
                                                    nativeInterface: CDV.FB,
                                                    //channelUrl: 'http://www.event32ios.com',
                                                    useCachedDialogs: false
                                                    });
                                              //if(window.localStorage.getItem('firstRun')==null){
                                            FB.getLoginStatus(function(response){
                                                              //alert("login status response");
                                                              if(response.status == "connected"){
                                                              alert("connected");
                                                              accessToken = response.authResponse.accessToken;
                                                              alert("connected line before db");
                                                              //db.transaction(populateDB, errorCB, updateFriends);
                                                              var db1 = window.openDatabase("Database", "1.0", "Cordova Demo", 200000);
                                                              //db1.transaction(createTable, errorCB, createTableSuccess);
                                                              db1.transaction(createTable, errorCB, function(tx){
                                                                              updateFriends();
                                                                              /*
                                                                              var db = window.openDatabase("Database", "1.0", "Cordova Demo", 200000);
                                                                              db.transaction(populateDB, errorCB, updateFriends);
                                                                              */
                                                                              });

                                                              
                                                                 //updateFriends();
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
                                                  /*
                                         } else{
                                              db.transaction(populateDB, errorCB, successCB);
                                              //updateFriends();
                                    //alert("last run stamp "+window.localStorage.getItem('firstRun'));
                                             window.localStorage.getItem('lastFriendIdUpdate');
                                             window.localStorage.getItem('lastFriendFieldUpdate');
                                             window.localStorage.getItem('lastEventIdUpdate');
                                             window.localStorage.getItem('lastEventFieldUpdate');
                                         }
                                                   */

                                        /*
                                         var today = new Date();
                                         var tomorrow = new Date();
                                         tomorrow.setDate(today.getDate()+1);
                                         */
                                        
                                        //SELECT eid, name, pic_big, start_time, end_time, location, description, creator, host, venue FROM event WHERE eid IN (SELECT eid FROM event_member WHERE uid = 1317821699) AND update_time >= 1385942400 AND start_time >= now()
                                        
    	      		         /*
    	      	 var db = window.openDatabase("Database", "1.0", "PhoneGap Demo", 200000);
        db.transaction(populateDB, errorCB, successCB);
db.transaction(queryDB, errorCB);
*/
    	      		      
    	      		      
/*
        FB.init({
            //appId: '372363819446082', // App ID from the app dashboard
            appId: '253970731442450',
            //channelUrl: 'http://www.bp2u.com', // Channel file for x-domain comms
            channelUrl: 'www.event32ios.com',
            status: true, // Check Facebook Login status
            xfbml: true
});
 */
 
        

                                        }    //}
$(document).ready(function () {
                  //alert("doc ready");


$("#fb-login-button").click(function(){
                            FB.login($.proxy(function (response) {
                                             alert(JSON.stringify(response.data.shift()));
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
