var dateHashMap = new Array();

function popDate(k,e){
    var exHeight = ((74*34)+50);
    var moreText = " More Events";
    
    
    
    if(expandedDate != null){
        
        $("#event-list-wrap-trans-"+k).html("<div class='exEvent' style='height:74px;width;100px;background:green'>hi</div><div class='exEvent' style='height:74px;width;100px;background:green'>hi</div><div class='exEvent' style='height:74px;width;100px;background:green'>hi</div><div class='exEvent' style='height:74px;width;100px;background:green'>hi</div><div class='exEvent' style='height:74px;width;100px;background:green'>hi</div><div class='exEvent' style='height:74px;width;100px;background:green'>hi</div><div class='exEvent' style='height:74px;width;100px;background:green'>hi</div><div class='exEvent' style='height:74px;width;100px;background:green'>hi</div><div class='exEvent' style='height:74px;width;100px;background:green'>hi</div><div class='exEvent' style='height:74px;width;100px;background:green'>hi</div><div class='exEvent' style='height:74px;width;100px;background:green'>hi</div><div class='exEvent' style='height:74px;width;100px;background:green'>hi</div><div class='exEvent' style='height:74px;width;100px;background:green'>hi</div><div class='exEvent' style='height:74px;width;100px;background:green'>hi</div><div class='exEvent' style='height:74px;width;100px;background:green'>hi</div><div class='exEvent' style='height:74px;width;100px;background:green'>hi</div><div class='exEvent' style='height:74px;width;100px;background:green'>hi</div><div class='exEvent' style='height:74px;width;100px;background:green'>hi</div><div class='exEvent' style='height:74px;width;100px;background:green'>hi</div><div class='exEvent' style='height:74px;width;100px;background:green'>hi</div><div class='exEvent' style='height:74px;width;100px;background:green'>hi</div><div class='exEvent' style='height:74px;width;100px;background:green'>hi</div><div class='exEvent' style='height:74px;width;100px;background:green'>hi</div><div class='exEvent' style='height:74px;width;100px;background:green'>hi</div><div class='exEvent' style='height:74px;width;100px;background:green'>hi</div><div class='exEvent' style='height:74px;width;100px;background:green'>hi</div><div class='exEvent' style='height:74px;width;100px;background:green'>hi</div><div class='exEvent' style='height:74px;width;100px;background:green'>hi</div><div class='exEvent' style='height:74px;width;100px;background:green'>hi</div><div class='exEvent' style='height:74px;width;100px;background:green'>hi</div><div class='exEvent' style='height:74px;width;100px;background:green'>hi</div><div class='exEvent' style='height:74px;width;100px;background:green'>hi</div><div class='exEvent' style='height:74px;width;100px;background:green'>hi</div><div class='exEvent' style='height:74px;width;100px;background:green'>hi</div>"+ getMorebutton(k,moreText));
        
        $("#event-list-wrap-trans-"+expandedDate).css("height","272px");
        
        $("#event-list-wrap-trans-"+k).css("height",exHeight);
        
    }else{
        $("#event-list-wrap-trans-"+k).html("<div class='exEvent' style='height:74px;width;100px;background:green'>hi</div><div class='exEvent' style='height:74px;width;100px;background:green'>hi</div><div class='exEvent' style='height:74px;width;100px;background:green'>hi</div><div class='exEvent' style='height:74px;width;100px;background:green'>hi</div><div class='exEvent' style='height:74px;width;100px;background:green'>hi</div><div class='exEvent' style='height:74px;width;100px;background:green'>hi</div><div class='exEvent' style='height:74px;width;100px;background:green'>hi</div><div class='exEvent' style='height:74px;width;100px;background:green'>hi</div><div class='exEvent' style='height:74px;width;100px;background:green'>hi</div><div class='exEvent' style='height:74px;width;100px;background:green'>hi</div><div class='exEvent' style='height:74px;width;100px;background:green'>hi</div><div class='exEvent' style='height:74px;width;100px;background:green'>hi</div><div class='exEvent' style='height:74px;width;100px;background:green'>hi</div><div class='exEvent' style='height:74px;width;100px;background:green'>hi</div><div class='exEvent' style='height:74px;width;100px;background:green'>hi</div><div class='exEvent' style='height:74px;width;100px;background:green'>hi</div><div class='exEvent' style='height:74px;width;100px;background:green'>hi</div><div class='exEvent' style='height:74px;width;100px;background:green'>hi</div><div class='exEvent' style='height:74px;width;100px;background:green'>hi</div><div class='exEvent' style='height:74px;width;100px;background:green'>hi</div><div class='exEvent' style='height:74px;width;100px;background:green'>hi</div><div class='exEvent' style='height:74px;width;100px;background:green'>hi</div><div class='exEvent' style='height:74px;width;100px;background:green'>hi</div><div class='exEvent' style='height:74px;width;100px;background:green'>hi</div><div class='exEvent' style='height:74px;width;100px;background:green'>hi</div><div class='exEvent' style='height:74px;width;100px;background:green'>hi</div><div class='exEvent' style='height:74px;width;100px;background:green'>hi</div><div class='exEvent' style='height:74px;width;100px;background:green'>hi</div><div class='exEvent' style='height:74px;width;100px;background:green'>hi</div><div class='exEvent' style='height:74px;width;100px;background:green'>hi</div><div class='exEvent' style='height:74px;width;100px;background:green'>hi</div><div class='exEvent' style='height:74px;width;100px;background:green'>hi</div><div class='exEvent' style='height:74px;width;100px;background:green'>hi</div><div class='exEvent' style='height:74px;width;100px;background:green'>hi</div>"+ getMorebutton(k,moreText));
        
        $("#event-list-wrap-trans-"+k).css("height",exHeight);
    }
    expandedDate = k;
    enable_scroll();
}


function popCal(){
 
    for (i=0;i<33;i++){
        console.log("dateHash length"+dateHash.length);
        if(typeof dateHash[i] != 'undefined'){
              console.log("dateHas event ID: "+dateHash[i].eventList[0]);
            console.log("Event List Name: "+eventList[dateHash[i].eventList[0]].name);
            $("#dateMainList").append("<li class='date-list-elem-outter' style='z-index:"+(28-i)+"' id='date-elem-"+i+"-list' name='"+i+"' >"+getDateHeader(dateHash[i])+"<div id='event-list-wrap-trans-"+i+"' class='event-list-wrap-trans'></div></li>");
            
            $("#event-list-wrap-trans-" + i).append(getEventRow(eventList[dateHash[i].eventList[0]].fbId,"topEvent"));

        }else{
            continue;
        }
        
        if(typeof dateHash[i].eventList[1] != "undefined"){
            $("#event-list-wrap-trans-" + i).append(getEventRow(eventList[dateHash[i].eventList[1]].fbId,"topEvent"));
        }else{
            var moreText = (dateHash[i].eventList.length - 4) +" More Events";
            $("#event-list-wrap-trans-"+ i).append("<div id='more-events-marker-"+i+"'></div>");
            $("#event-list-wrap-trans-"+ i).append(getMorebutton(i,moreText));
            continue;
        }
        
        if(typeof dateHash[i].eventList[2] != "undefined"){
            $("#event-list-wrap-trans-" + i).append(getEventRow(eventList[dateHash[i].eventList[2]].fbId,"topEvent"));
        }else{
            var moreText = (dateHash[i].eventList.length - 4) +" More Events";
            $("#event-list-wrap-trans-"+ i).append("<div id='more-events-marker-"+i+"'></div>");
            $("#event-list-wrap-trans-"+ i).append(getMorebutton(i,moreText));
            continue;
        }
                /*
        if(typeof dateHash[i].eventList[3] != "undefined"){
            $("#event-list-wrap-trans-" + i).append(getEventRow(eventList[dateHash[i].eventList[3]].fbId,"topEvent"));
        }else{
            $("#event-list-wrap-trans-"+ i).append('<div class="spacer"></div>');
            continue;
        }

        if(typeof dateHash[i].eventList[4] != "undefined"){
            $("#event-list-wrap-trans-" + i).append(getEventRow(eventList[dateHash[i].eventList[4]].fbId,"topEvent"));
        }else{
            $("#event-list-wrap-trans-"+ i).append('<div class="spacer"></div>');
            continue;
        }
        */
        var moreText = (dateHash[i].eventList.length - 4) +" More Events";
        $("#event-list-wrap-trans-"+ i).append("<div id='more-events-marker-"+i+"'></div>");
        $("#event-list-wrap-trans-"+ i).append(getMorebutton(i,moreText));
        
    }
    
    setFriendTap();
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
