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

function eventExpand(element){
    console.log("event expand");
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
    //}
}

function contract(exIndex,elem,transition){
    console.log("contract start");
    $(elem).removeClass("expanded");

        if(transition){
            console.log("contract trans");
            $("#event-wrap-in-"+exIndex).css("height","280px");
            //if(exIndex != lastIndex){
                console.log("line before html trans");
                $("#event-wrap-in-"+exIndex).html(getEventRow(eventList[dateHash[exIndex].eventList[0]].fbId,"",exIndex)+getEventRow(eventList[dateHash[exIndex].eventList[1]].fbId,"",exIndex)+getEventRow(eventList[dateHash[exIndex].eventList[2]].fbId,"",exIndex)+getEventRow(eventList[dateHash[exIndex].eventList[3]].fbId,"",exIndex));
                    //$("#event-wrap-in-"+exIndex).html("");
            //}

        }else{
            console.log("contract non-trans");
            $("#event-wrap-in-"+exIndex).addClass("notransition");
            $("#event-wrap-in-"+exIndex).css("height","280px");
            console.log("line before html non-trans");
            $("#event-wrap-in-"+exIndex).html("");
       
            $("#event-wrap-in-"+exIndex).html(getEventRow(eventList[dateHash[exIndex].eventList[0]].fbId,"",exIndex)+getEventRow(eventList[dateHash[exIndex].eventList[1]].fbId,"",exIndex)+getEventRow(eventList[dateHash[exIndex].eventList[2]].fbId,"",exIndex)+getEventRow(eventList[dateHash[exIndex].eventList[3]].fbId,"",exIndex));

            $doc.scrollTop($doc.scrollTop() + $("#date-elem-"+k+"-list").offset().top - pos);
            $("#event-wrap-in-"+exIndex).height();
            $("#event-wrap-in-"+exIndex).removeClass("notransition");
                //$("#event-wrap-in-"+exIndex).html("");
        }

    $("#divider-wrap-"+exIndex).removeClass("cnt");
     $("#divider-wrap-"+exIndex).addClass("ex");
    console.log("contract end");

    var moreText = (dateHash[exIndex].eventList.length - 4);

    $("#event-wrap-in-"+exIndex).css("height","280px");
    $("#event-wrap-in-"+exIndex).append("<div id='more-events-"+i+"' class='more-events'>"+moreText+" more events</div>");
}

function expand(cntIndex,elem){
    console.log("expand");
    var exHtml = "";
    for(i=0;i<=dateHash[cntIndex].eventList.length - 1;i++){
        var exHtml = exHtml +getEventRow(eventList[dateHash[k].eventList[i]].fbId,"",cntIndex);
    }
    
    $(elem).addClass("expanded");
    //var exHeight = ((74*(dateHash[cntIndex].eventList.length)));
    var exHeight = ((61*(dateHash[cntIndex].eventList.length)));
    $("#event-wrap-in-"+cntIndex).html(exHtml);
    $("#event-wrap-in-"+cntIndex).css("height",exHeight);
    dateLength[cntIndex] = exHeight;
    
    $("#divider-wrap-"+cntIndex).removeClass("ex");
    $("#divider-wrap-"+cntIndex).addClass("cnt");
    //$("#more-events-"+exIndex).css("display","none");
}

function popDate1(e,elem){
    console.log("pop date 1");
    k = $(elem).attr('data-dateId');
    var $this = $("date-elem-"+k+"-list");
    pos = $("#date-elem-"+k+"-list").offset().top;
    $doc = $(document);
    firstExpand = (lastIndex == null);
    selected = (expandedDate == k);
    below = (k<expandedDate);
    expanded = $(elem).is(".expanded");

    if((lastIndex != k) & !firstExpand){
        console.log("one");
        contract(lastIndex,exSelector,false);
        contract(k,elem,true);
    }else{
        console.log("two");
        contract(k,elem,true);
    }

    /*
    
    if(expanded){
        if((lastIndex != k) & !firstExpand){
            contract(lastIndex,exSelector,false);
            contract(k,elem,true);
        }else{
            contract(k,elem,true);
        }
        
    }else if(!expanded){
        if((lastIndex != k) & !firstExpand){
            contract(lastIndex,exSelector,false);
            expand(k,elem);
        }else{
            expand(k,elem);
        }
    }
     */
    exListHeight = dateHash[k].eventList.length;
    lastIndex = k;
    exSelector = elem;
    console.log("pop date 1 end");
    setEventTap();
    setButtons();
}

function popDate(e,elem){
    console.log("popDate");
    k = $(elem).attr('data-dateId');
    var $this = $("date-elem-"+k+"-list");
    pos = $("#date-elem-"+k+"-list").offset().top;
    $doc = $(document);
    firstExpand = (lastIndex == null);
    selected = (expandedDate == k);
    below = (k<expandedDate);
    expanded = $(elem).is(".expanded");
    
    if((lastIndex != k) & !firstExpand){
        contract(lastIndex,exSelector,false);
        expand(k,elem);
    }else{
        expand(k,elem);
    }
    /*
    
if(expanded){
    if((lastIndex != k) & !firstExpand){
        contract(lastIndex,exSelector,false);
        contract(k,elem,true);
    }else{
        contract(k,elem,true);
    }
    
}else if(!expanded){
    if((lastIndex != k) & !firstExpand){
        contract(lastIndex,exSelector,false);
        expand(k,elem);
    }else{
        expand(k,elem);
    }
}
     */
    exListHeight = dateHash[k].eventList.length;
    lastIndex = k;
    exSelector = elem;
    
    setEventTap();
    setButtons();
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
                continue;
            }
            
            if(typeof dateHash[i].eventList[1] != "undefined"){
                $("#event-wrap-in-"+i).append(getEventRow(eventList[dateHash[i].eventList[1]].fbId,"topEvent",i));
            }else{
                var moreText = (dateHash[i].eventList.length - 4);
                $("#event-wrap-in-"+i).css("height","55px");
                continue;
            }
            
            if(typeof dateHash[i].eventList[2] != "undefined"){
                $("#event-wrap-in-"+i).append(getEventRow(eventList[dateHash[i].eventList[2]].fbId,"topEvent",i));
            }else{
                var moreText = (dateHash[i].eventList.length - 4);
                $("#event-wrap-in-"+i).css("height","110px");
                continue;
            }
            
            if(typeof dateHash[i].eventList[3] != "undefined"){
                $("#event-wrap-in-"+i).append(getEventRow(eventList[dateHash[i].eventList[3]].fbId,"topEvent"));
                
            }else{
                var moreText = (dateHash[i].eventList.length - 4);
                $("#event-wrap-in-"+i).css("height","165px");
                continue;
            }
            if(dateHash[i].eventList.length > 4){
            var moreText = (dateHash[i].eventList.length - 4);
            $("#event-wrap-in-"+i).css("height","280px");
            $("#event-wrap-in-"+i).append("<div id='more-events-"+i+"' class='more-events'>"+moreText+" more events</div>");
            }else{
                $("#event-wrap-in-"+i).css("height","220px");
            }
        }
    }
    
    stickyList();
    setFriendTap();
    setEventTap();
    setButtons();
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