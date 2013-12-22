var dateHashMap = new Array();
/*
function populateUi(){
    for (i=0;i=32){
        dateHashMap[i] = makeEvening(i,);
        dateHashMap[i].eventIdArray.push(value.id);
    }
}
*/

function popCal(){
    
    for (i=0;i<33;i++){
        console.log("dateHash length"+dateHash.length);
        if(typeof dateHash[i] != 'undefined'){
              console.log("dateHas event ID: "+dateHash[i].eventList[0]);
            console.log("Event List Name: "+eventList[dateHash[i].eventList[0]].name);

                }
    }
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
                      alert("fb login: "+JSON.stringify(response));
                      if (response.status == "connected") {
                      
                      alert("connected");
                      accessToken = response.authResponse.accessToken;
                      createTable1().done(function(){
                                          console.log("create table");
                                          updateFriends().done(function () {
                                                                console.log("update friends");
                                                               updateEvents().done(function () {
                                                                                   console.log("line before update attr");
                                                                                   updateEventAttr().done(function(){
                                                                                              
                                                                                                          popUi().done(function(){
                                                                                                                       console.log("pop UI done");
                                                                                                                       popCal();
                                                                                                                       //console.log("pop ui done");
                                                                                                          /*
                                                                                                                       when.done(function(){
                                                                                                                                 console.log("pipe done");
                                                                                                                  });
                                                                                                                       */     
                                                                                                                
                                                                                                                        });
                                                                                  
                                                                                                          });
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
