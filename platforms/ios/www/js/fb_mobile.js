var dateHashMap = new Array();
var exListHeight;

function popDate(k,e){
    $("#event-wrap-in-"+expandedDate).removeClass("ami-ex");
    var exHeight = ((74*(dateHash[k].eventList.length)));
    var exHtml = "";
    var moreText = " More Events";
    
    for(i=0;i<=dateHash[k].eventList.length - 1;i++){
        var exHtml = exHtml +getEventRow(eventList[dateHash[k].eventList[i]].fbId,"");
    }
    
    if(expandedDate != null){
        if(k<expandedDate){
        var y = $(window).scrollTop();  //your current y position on the page
        $(window).scrollTop(y-(74*(exListHeight - 3)));
        }
        
        $("#event-wrap-in-"+expandedDate).css("height","222px");
        $("#event-wrap-in-"+k).addClass("ami-ex");
        $("#event-wrap-in-"+k).html(exHtml);
        $("#event-wrap-in-"+k).css("height",exHeight);
    }else{
        $("#event-wrap-in-"+k).addClass("ami-ex");
        $("#event-wrap-in-"+k).html(exHtml);
        $("#event-wrap-in-"+k).css("height",exHeight);
    }
    exListHeight = dateHash[k].eventList.length;
    expandedDate = k;
}

var uiEventCount = 0;

function popCal(){
    for (i=0;i<33;i++){
        if(typeof dateHash[i] != 'undefined'){
            uiEventCount = uiEventCount +parseInt(dateHash[i].eventList.length);
            $("#dateMainList").append("<li class='date-list-elem-outter' style='z-index:"+(28-i)+"' id='date-elem-"+i+"-list' name='"+i+"' >"+getDateHeader(dateHash[i])+"<div id='event-list-wrap-trans-"+i+"' class='event-list-wrap-trans'><div id='event-wrap-in-"+i+"' class='event-wrap-in'></div></div></li>");
            $("#event-wrap-in-"+i).append(getEventRow(eventList[dateHash[i].eventList[0]].fbId,"topEvent"));
        }else{
            continue;
        }
        if(typeof dateHash[i].eventList[1] != "undefined"){
            $("#event-wrap-in-"+i).append(getEventRow(eventList[dateHash[i].eventList[1]].fbId,"topEvent"));
        }else{
            var moreText = (dateHash[i].eventList.length - 4) +" More Events";
             $("#event-wrap-in-"+i).append("<div id='more-events-marker-"+i+"'></div>");
            $("#event-list-wrap-trans-"+ i).append(getMorebutton(i,moreText));
            continue;
        }
        
        if(typeof dateHash[i].eventList[2] != "undefined"){
            $("#event-wrap-in-"+i).append(getEventRow(eventList[dateHash[i].eventList[2]].fbId,"topEvent"));
        }else{
            var moreText = (dateHash[i].eventList.length - 4) +" More Events";
            $("#event-wrap-in-"+i).append("<div id='more-events-marker-"+i+"'></div>");
            $("#event-list-wrap-trans-"+ i).append(getMorebutton(i,moreText));
            continue;
        }
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
                                          //console.log("create table");
                                          updateFriends().done(function () {
                                                            //console.log("update friends");
                                                               updateEvents().done(function () {
                                                                                   //console.log("line before update attr");
                                                                                   updateEventAttr().done(function(){
                                                                                                          popUi().done(function(){
                                                                                                                       //console.log("pop UI done");
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
