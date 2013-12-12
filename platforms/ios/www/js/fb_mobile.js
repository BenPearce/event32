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
                          console.log(insertData);
                           tx.executeSql(insertData);
                          }, errorCB, function(){
                          console.log("insert friends success");
                          
                          
                          updateEvents();
                          /*
                          db3.transaction(function (tx) {
                                          console.log("line before select");
                                          tx.executeSql('SELECT * FROM FRIENDS', [], function (tx, results) {
                           
                                                        }, errorCB);
                                          }, errorCB);
                           */
                          });
});
}

function updateEvents(){
    var db3 = window.openDatabase("Database", "1.0", "Cordova Demo", 200000);
    db3.transaction(function (tx) {
                    console.log("line before select");
                    tx.executeSql('SELECT * FROM FRIENDS', [], function (tx, results) {
                                  
                                   var len = results.rows.length;
                                   console.log("friends table1: " + len + " rows found.");
                                   for (var i=0; i<len; i++){
                                   console.log("Row1 = " + i + " fbId1 = " + results.rows.item(i).fbId + " Data1 =  " + results.rows.item(i).name);
                                   }
                                  
                                  }, errorCB);
                    }, errorCB);
    
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
                                             //alert(JSON.stringify(response.data.shift()));
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
