var dateHashMap = new Array();
var exListHeight;

var firstExpand;
var shortRow;
var selected;
var below;
var expanded;
var exSelector;

function contract(shortRow,expandedDate,elem){
    console.log("contract");
     $(elem).removeClass("expanded");
     //$("#event-wrap-in-"+expandedDate).removeClass("expanded");
    if(shortRow){
        $("#event-wrap-in-"+expandedDate).css("height","0px");
        $("#event-wrap-in-"+expandedDate).html();
    }else{
        $("#event-wrap-in-"+expandedDate).css("height","0px");
    }
}

function expand(k,elem){
    var exHtml = "";
    for(i=0;i<=dateHash[k].eventList.length - 1;i++){
        var exHtml = exHtml +getEventRow(eventList[dateHash[k].eventList[i]].fbId,"");
    }
    
    $(elem).addClass("expanded");
    //$("#event-wrap-in-"+k).addClass("expanded");
    var exHeight = ((74*(dateHash[k].eventList.length)));
    $("#event-wrap-in-"+k).html(exHtml);
    $("#event-wrap-in-"+k).css("height",exHeight);
}

function popDate(e,elem){
    console.log("popDate");
    console.log("elem html: "+$(elem).html());
    k = $(elem).attr('data-dateId');
    
     firstExpand = (expandedDate == null);
     shortRow = (dateHash[k].eventList.length <=3);
     selected = (expandedDate == k);
     below = (k<expandedDate);
     expanded = $(elem).is(".expanded");
     //expanded = $("#event-wrap-in-"+k).is(".expanded");
    //console.log("expanded1: "+$("#event-wrap-in-"+k).is(".expanded"));
    console.log("expanded1: "+$(elem).is(".expanded"));
    
    if(expandedDate != null){
    contract(shortRow,k,exSelector);
    }
    
    if(shortRow & expanded){
        console.log("shortRow & expanded");
        contract (shortRow,k,elem);
        
    } else if (shortRow & !expanded){
        console.log("shortRow & !expanded");
        expand(k,elem);

        if((expandedDate != k) & !firstExpand){
        console.log("(expandedDate != k) & !firstExpand");
        contract(shortRow,expandedDate,exSelector);
        }

    }else if(!shortRow & expanded){
        console.log("!shortRow & expanded");
        contract(shortRow,k,elem);
    }else if(!shortRow & !expanded){
        console.log("!shortRow & !expanded");
        expand(k,elem);

        if((expandedDate != k) & !firstExpand){
            console.log("contract fire");
            //contract (shortRow,expandedDate,elem);
            contract (shortRow,expandedDate,exSelector);
        }
    }
    
    exListHeight = dateHash[k].eventList.length;
    expandedDate = k;
    exSelector = elem;
}

var uiEventCount = 0;

function popCal(){
    for (i=0;i<33;i++){
        if(typeof dateHash[i] != 'undefined'){
                        $("#dateMainList").append("<li class='date-list-elem-outter' style='z-index:"+(28-i)+"' id='date-elem-"+i+"-list' name='"+i+"' >"+getDateHeader(dateHash[i])+"<div id='event-list-wrap-trans-"+i+"' class='event-list-wrap-trans'><div id='event-wrap-in-"+i+"' class='event-wrap-in'></div></div></li>");
            /*
            uiEventCount = uiEventCount +parseInt(dateHash[i].eventList.length);
            $("#event-wrap-in-"+i).append(getEventRow(eventList[dateHash[i].eventList[0]].fbId,"topEvent"));
        }else{
            continue;
             */
       
        
        if(typeof dateHash[i].eventList[0] != "undefined"){
            $("#event-wrap-in-"+i).append(getEventRow(eventList[dateHash[i].eventList[0]].fbId,"topEvent"));
        }else{
            var moreText = (dateHash[i].eventList.length - 4);
            $("#event-wrap-in-"+i).append("<div id='more-events-marker-"+i+"'></div>");
            $("#event-list-wrap-trans-"+ i).append(getMorebutton(i,moreText,"expanded"));
            continue;
        }
        
        if(typeof dateHash[i].eventList[1] != "undefined"){
            $("#event-wrap-in-"+i).append(getEventRow(eventList[dateHash[i].eventList[1]].fbId,"topEvent"));
        }else{
            var moreText = (dateHash[i].eventList.length - 4);
             $("#event-wrap-in-"+i).append("<div id='more-events-marker-"+i+"'></div>");
            $("#event-list-wrap-trans-"+ i).append(getMorebutton(i,moreText,"expanded"));
            continue;
        }
        
        if(typeof dateHash[i].eventList[2] != "undefined"){
            $("#event-wrap-in-"+i).append(getEventRow(eventList[dateHash[i].eventList[2]].fbId,"topEvent"));
        }else{
            var moreText = (dateHash[i].eventList.length - 4);
            $("#event-wrap-in-"+i).append("<div id='more-events-marker-"+i+"'></div>");
            $("#event-list-wrap-trans-"+ i).append(getMorebutton(i,moreText,"expanded"));
            continue;
        }
        var moreText = (dateHash[i].eventList.length - 4);
        $("#event-list-wrap-trans-"+ i).append("<div id='more-events-marker-"+i+"'></div>");
        $("#event-list-wrap-trans-"+ i).append(getMorebutton(i,moreText));
            
    }
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
