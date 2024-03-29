var dateHashMap = new Array();
var dateLength = new Array();
var exListHeight;
var firstExpand;
var shortRow;
var selected;
var below;
var expanded;
var exSelector;
var formerShortRow;
var pos;
var $doc;
var lastIndex;
var crossBrowserEvent = 'webkitAnimationEnd oanimationend msAnimationEnd animationend';
var k;
var lastEvIndex;
var geoPosition;

function eventExpand(element){
    //console.log("event expand");
    var descPos;
    var dateId = $(element).attr('data-dateHash');
    var evId = $(element).attr("id");
    evId = parseInt(evId);
    //if(evId>lastEvIndex){
    descPos = $("#event-ex-"+evId).offset().top;
    //}
    $("#event-ex-"+lastEvIndex).addClass("notransition");
    $("#event-ex-"+lastEvIndex).html("");
    $("#event-ex-"+lastEvIndex).css("height","");
    $("#event-ex-"+lastEvIndex).height();
    $("#event-ex-"+lastEvIndex).removeClass("notransition");
    $("#event-wrap-in-"+dateId).addClass("notransition");
    $("#event-wrap-in-"+dateId).css("height","");
    $("#event-wrap-in-"+dateId).height();
    $("#event-wrap-in-"+dateId).removeClass("notransition");
    $("#bot-elem").html(eventList[evId].description);
    
    var txHeight = $("#bot-elem").height();
    
    $("#bot-elem").html("");
    
    var description = eventList[evId].description;

    $("#event-ex-"+evId).html(generateButtons(evId) +getDescriptionHtml(description));
    $("#event-ex-"+evId).css("height",txHeight + 50);
    $("#event-wrap-in-"+dateId).height();
    lastEvIndex = evId;
    // if(evId>lastEvIndex){
    $(document).scrollTop($(document).scrollTop() + $("#event-ex-"+evId).offset().top - descPos);
    setButtons();
    $("#more-events-"+exIndex).css("display","block");
    //$("#event-wrap-in-"+exIndex).append("<div id='more-events-"+i+"' class='more-events'></div>");
    //}
}

var uiEventCount = 0;

function popCal(){
    for (i=0;i<33;i++){
        if(typeof dateHash[i] != 'undefined'){
            
            
            var dateHeader;

            if(dateHash[i].eventList.length < 3){
                dateHeader = getDateHeader(dateHash[i],i,"","");
            }else{
                dateHeader = getDateHeader(dateHash[i],i,"","ex");
            }
            
            $("#dateMainList").append("<li data-role='list-divider' class='date-list-elem-outter'  id='date-elem-"+i+"-list' name='"+i+"' >"+dateHeader+"<div id='event-list-wrap-trans-"+i+"' class='event-list-wrap-trans'><div id='event-wrap-in-"+i+"' class='event-wrap-in animateHeight'></div></div></li>");

            if(typeof dateHash[i].eventList[0] != "undefined"){
                $("#event-wrap-in-"+i).append(getEventRow(eventList[dateHash[i].eventList[0]].fbId,"topEvent",i));
            }else{
                var moreText = (dateHash[i].eventList.length - 4);
                $("#event-wrap-in-"+i).append("<div id='more-events-"+i+"' class='more-events'></div>");
                continue;
            }
            
            if(typeof dateHash[i].eventList[1] != "undefined"){
                $("#event-wrap-in-"+i).append(getEventRow(eventList[dateHash[i].eventList[1]].fbId,"topEvent",i));
            }else{
                var moreText = (dateHash[i].eventList.length - 4);
                $("#event-wrap-in-"+i).css("height","75px");
                $("#event-wrap-in-"+i).append("<div id='more-events-"+i+"' class='more-events'></div>");
                continue;
            }
            
            if(typeof dateHash[i].eventList[2] != "undefined"){
                $("#event-wrap-in-"+i).append(getEventRow(eventList[dateHash[i].eventList[2]].fbId,"topEvent",i));
            }else{
                var moreText = (dateHash[i].eventList.length - 4);
                $("#event-wrap-in-"+i).css("height","140px");
                $("#event-wrap-in-"+i).append("<div id='more-events-"+i+"' class='more-events'></div>");
                continue;
            }
            
            if(typeof dateHash[i].eventList[3] != "undefined"){
                $("#event-wrap-in-"+i).append(getEventRow(eventList[dateHash[i].eventList[3]].fbId,"topEvent"));
                
            }else{
                var moreText = (dateHash[i].eventList.length - 4);
                $("#event-wrap-in-"+i).css("height","205px");
                 $("#event-wrap-in-"+i).append("<div id='more-events-"+i+"' class='more-events'></div>");
                continue;
            }
            if(dateHash[i].eventList.length > 4){
            var moreText = (dateHash[i].eventList.length - 4);
            $("#event-wrap-in-"+i).css("height","280px");
            $("#event-wrap-in-"+i).append("<div id='more-events-"+i+"' class='more-events'>"+moreText+" more events</div>");
            }else{
                $("#event-wrap-in-"+i).css("height","260px");
            }
        }
    }
    
    stickyList();
    setFriendTap();
    setEventTap("");
    setButtons();
}

function locSuccess(position){
    //console.log("lat: "+position.coords.latitude);
    //console.log("lng: "+position.coords.longitude);
}

function locError(){
    //console.log("geo error");
}

document.addEventListener('deviceready', function () {

                          navigator.geolocation.getCurrentPosition(locSuccess, locError);
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
                                                                                                          
                                                                                                          navigator.geolocation.getCurrentPosition(function(pos){
                                                                                                 
                                                                                                                                                   geoPosition = pos;
                                                                                                                                                   popUi().done(function(){
                                                                                                                                                                popCal();
                                                                                                                                                                });
                                                                                                                                                   }, locError);
                                                                                                          
                                                                                                         
                                                                                                          
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