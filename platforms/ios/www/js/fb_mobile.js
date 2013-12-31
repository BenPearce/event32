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
var prevHeight;
var prevEx;
var expanded = false;
var descriptionDateHash;
var descriptionExpanded = false;
var descriptionExpandedevId;

function eventExpand(element){
    /*
    $("#event-wrap-in-"+cntIndex).height();
    $("#event-wrap-in-"+cntIndex).css("height", "");
    */
    var descPos;
    //$("#event-wrap-in-"+dateId).css("height",$("#event-wrap-in-"+dateId).height() - $("#event-ex-"+lastEvIndex).height());
    //var evId = $(element).data("id");
    var dateId = $(element).attr('data-dateHash');
    var evId = $(element).attr("id");
    descriptionExpandedevId = evId;
    evId = parseInt(evId);
    
    //if(evId>lastEvIndex){
       descPos = $("#event-ex-"+evId).offset().top;
     //}

     $("#bot-elem").html(eventList[evId].description);
     
    var txHeight = $("#bot-elem").height();

    if(typeof lastEvIndex != 'undefined'){

    }
    console.log("prev height: "+prevHeight);
    console.log("txHeight: "+txHeight);
    
     $("#bot-elem").html("");
    
   
    var diffHeight;
    console.log("lastEvIndex: "+lastEvIndex);
    $("#event-ex-"+lastEvIndex).addClass("notransition");
    $("#event-ex-"+lastEvIndex).html("");
    $("#event-ex-"+lastEvIndex).css("height","");
    $("#event-ex-"+lastEvIndex).height();
    $("#event-ex-"+lastEvIndex).removeClass("notransition");
   
    //$(document).scrollTop($(document).scrollTop() + $("#event-ex-"+evId).offset().top - descPos);//
    //console.log("description: "+eventList[evId].description);
    console.log("hash: "+dateId);
    descriptionDateHash = dateId;
    var descriptionExpanded;
    console.log("prevEx: "+prevEx);
    if(prevHeight!=null){
    diffHeight = (parseInt(txHeight) - parseInt(prevEx));
      //diffHeight = (parseInt(prevHeight) - parseInt(txHeight));
        console.log("dif height trig: "+diffHeight);
    }else{
        diffHeight = parseInt(txHeight);
    }

     $("#event-wrap-in-"+dateId).addClass("notransition");
     var parentHeight = $("#event-wrap-in-"+dateId).height();
    console.log("parent Height "+parentHeight);
    var summ = (parentHeight+diffHeight);
        prevEx = txHeight;
    console.log("summ: "+summ);
     $("#event-wrap-in-"+dateId).css("height",summ);
    prevHeight = summ;
    console.log("prevHeight set: "+ prevHeight);
     //$("#event-wrap-in-"+dateId).height();
     $("#event-wrap-in-"+dateId).removeClass("notransition");

        var description = eventList[evId].description;
            $("#event-ex-"+evId).html(description);
    //$("#event-ex-"+evId).css(txHeight);
    //$("#event-ex-"+evId).css("display","block");
    $("#event-ex-"+evId).css("height",txHeight);
    $("#event-wrap-in-"+dateId).height();
         //$("#event-wrap-in-"+dateId).css("height",$("#event-wrap-in-"+dateId).height() + $("#event-ex-"+evId).height());
    lastEvIndex = evId;
    // if(evId>lastEvIndex){
    $(document).scrollTop($(document).scrollTop() + $("#event-ex-"+evId).offset().top - descPos);
    $("#event-ex-"+lastEvIndex).height();

         //prevHeight = $("#event-wrap-in-"+dateId).height();
     //}
    /*
       //k = $(elem).attr('data-dateId');
     */
    //$("#event-wrap-in-"+dateId).
    
    descriptionExpanded = true;
}

function contract(shortRow,exIndex,elem,transition){
    console.log("contract");
    $(elem).removeClass("expanded");
    if(shortRow){
        console.log("short row triggered");
        if(transition){
            expanded = false;
            console.log("short cnt row transition block");
            $("#event-wrap-in-"+exIndex).css("height","0px");
            //$("#event-wrap-in-"+exIndex).html("");
            //$doc.scrollTop($doc.scrollTop() + $("#date-elem-"+k+"-list").offset().top - pos);
        }else{
            console.log("short cnt row non-transition block");
            $("#event-wrap-in-"+exIndex).addClass("notransition");
            $("#event-wrap-in-"+exIndex).css("height","0px");
            $("#event-wrap-in-"+exIndex).html("");
            $doc.scrollTop($doc.scrollTop() + $("#date-elem-"+k+"-list").offset().top - pos);
            $("#event-wrap-in-"+exIndex).height();
            $("#event-wrap-in-"+exIndex).removeClass("notransition");
        }
        
    }else{
        if(transition){
            expanded = false;
            console.log("long row cnt transition block");
            $("#event-wrap-in-"+exIndex).css("height","222px");
            if(exIndex != lastIndex){
            $("#event-wrap-in-"+exIndex).html(getEventRow(eventList[dateHash[exIndex].eventList[0]].fbId,"",exIndex)+getEventRow(eventList[dateHash[exIndex].eventList[1]].fbId,"",exIndex)+getEventRow(eventList[dateHash[exIndex].eventList[2]].fbId,"",exIndex));
            }
            
            //$doc.scrollTop($doc.scrollTop() + $("#date-elem-"+k+"-list").offset().top - pos);
        }else{
            console.log("long row cnt non-transition block");
            $("#event-wrap-in-"+exIndex).addClass("notransition");
            $("#event-wrap-in-"+exIndex).css("height","222px");
            $("#event-wrap-in-"+exIndex).html(getEventRow(eventList[dateHash[exIndex].eventList[0]].fbId,"",exIndex)+getEventRow(eventList[dateHash[exIndex].eventList[1]].fbId,"",exIndex)+getEventRow(eventList[dateHash[exIndex].eventList[2]].fbId,"",exIndex));
            $doc.scrollTop($doc.scrollTop() + $("#date-elem-"+k+"-list").offset().top - pos);
            $("#event-wrap-in-"+exIndex).height();
            $("#event-wrap-in-"+exIndex).removeClass("notransition");
        }
    }
}

function expand(cntIndex,elem){
    expanded = true;
    //var dfd = $.Deferred();
    //$("#event-wrap-in-"+k).removeClass("animateHeight");
    console.log("expand");
    var exHtml;
    var exHtml = "";
    
    if(descriptionDateHash == cntIndex){
    
    for(i=0;i<=dateHash[cntIndex].eventList.length - 1;i++){
        
        if(dateHash[k].eventList[i] == descriptionExpandedevId){
            
            console.log("if trigggg");
           var test = $(getEventRow(eventList[dateHash[k].eventList[i]].fbId,"",cntIndex)).find("#event-ex-"+dateHash[k].eventList[i]).html(eventList[dateHash[k].eventList[i]].description);
            
            exHtml = exHtml + test;
            
                     }else{
        
        exHtml = exHtml +getEventRow(eventList[dateHash[k].eventList[i]].fbId,"",cntIndex);
                     }
    }

                     }else{
                       for(i=0;i<=dateHash[cntIndex].eventList.length - 1;i++){
                     exHtml = exHtml +getEventRow(eventList[dateHash[k].eventList[i]].fbId,"",cntIndex);
                     }
                     }
    
    $(elem).addClass("expanded");
    var exHeight = ((74*(dateHash[cntIndex].eventList.length)));
    $("#event-wrap-in-"+cntIndex).html(exHtml);
    $("#event-wrap-in-"+cntIndex).css("height",exHeight);
    dateLength[cntIndex] = exHeight;
    

    
    /*
     $("#event-wrap-in-"+cntIndex).one('crossBrowserEvent',function(e) {
     alert("cross 2");
     });
     */
    //dfd.resolve("tx1");
    //return dfd.promise();
}

function popDate(e,elem){
    k = $(elem).attr('data-dateId');
    var $this = $("date-elem-"+k+"-list");
    //var $this = $(this);
    pos = $("#date-elem-"+k+"-list").offset().top;
    $doc = $(document);
    firstExpand = (lastIndex == null);
    shortRow = (dateHash[k].eventList.length <=3);
    selected = (expandedDate == k);
    below = (k<expandedDate);
    expanded = $(elem).is(".expanded");
    
    if(shortRow & expanded){
        console.log("shortRow & expanded");
        if((lastIndex != k) & !firstExpand){
            console.log("money spot");
            
            if(formerShortRow){
                contract(formerShortRow,lastIndex,exSelector,true);
            }else{
                contract(formerShortRow,lastIndex,exSelector,false);
            }
            console.log(" before primary short row contract");
            contract (shortRow,k,elem,true);
        }else{
            contract (shortRow,k,elem,true);
        }
        
    } else if (shortRow & !expanded){
        console.log("shortRow & !expanded");
        if((lastIndex != k) & !firstExpand){
            if(formerShortRow){
            contract(formerShortRow,lastIndex,exSelector,true);
            }else{
            contract(formerShortRow,lastIndex,exSelector,false);
            }
            expand(k,elem);
        }else{
            expand(k,elem);
        }
        
    }else if(!shortRow & expanded){
        console.log("!shortRow & expanded");
        
        if((lastIndex != k) & !firstExpand){
            console.log("money spot");
            contract(formerShortRow,lastIndex,exSelector,false);
            contract(shortRow,k,elem,true);
        }else{
            contract(shortRow,k,elem,true);
        }
        
    }else if(!shortRow & !expanded){
        console.log("!shortRow & !expanded");
        if((lastIndex != k) & !firstExpand){
            console.log("money spot");
            contract(formerShortRow,lastIndex,exSelector,false);
            expand(k,elem);
        }else{
            expand(k,elem);
        }
    }
    
    formerShortRow = shortRow;
    exListHeight = dateHash[k].eventList.length;
    lastIndex = k;
    exSelector = elem;
    
    setEventTap();
}

var uiEventCount = 0;

function popCal(){
    for (i=0;i<33;i++){
        if(typeof dateHash[i] != 'undefined'){
            $("#dateMainList").append("<li class='date-list-elem-outter' style='z-index:"+(28-i)+"' id='date-elem-"+i+"-list' name='"+i+"' >"+getDateHeader(dateHash[i])+"<div id='event-list-wrap-trans-"+i+"' class='event-list-wrap-trans'><div id='event-wrap-in-"+i+"' class='event-wrap-in animateHeight'></div></div></li>");
            /*
             uiEventCount = uiEventCount +parseInt(dateHash[i].eventList.length);
             $("#event-wrap-in-"+i).append(getEventRow(eventList[dateHash[i].eventList[0]].fbId,"topEvent"));
             }else{
             continue;
             */
            
            
            if(typeof dateHash[i].eventList[0] != "undefined"){
                $("#event-wrap-in-"+i).append(getEventRow(eventList[dateHash[i].eventList[0]].fbId,"topEvent",i));
            }else{
                var moreText = (dateHash[i].eventList.length - 4);
                $("#event-wrap-in-"+i).append("<div id='more-events-marker-"+i+"'></div>");
                
                $("#event-list-wrap-trans-"+ i).append(getMorebutton(i,moreText,"expanded"));
                continue;
            }
            
            if(typeof dateHash[i].eventList[1] != "undefined"){
                $("#event-wrap-in-"+i).append(getEventRow(eventList[dateHash[i].eventList[1]].fbId,"topEvent",i));
            }else{
                var moreText = (dateHash[i].eventList.length - 4);
                $("#event-wrap-in-"+i).append("<div id='more-events-marker-"+i+"'></div>");
                $("#event-wrap-in-"+i).css("height","74px");
                $("#event-list-wrap-trans-"+ i).append(getMorebutton(i,moreText,"expanded"));
                continue;
            }
            
            if(typeof dateHash[i].eventList[2] != "undefined"){
                $("#event-wrap-in-"+i).append(getEventRow(eventList[dateHash[i].eventList[2]].fbId,"topEvent",i));
            }else{
                var moreText = (dateHash[i].eventList.length - 4);
                $("#event-wrap-in-"+i).append("<div id='more-events-marker-"+i+"'></div>");
                $("#event-wrap-in-"+i).css("height","148px");
                $("#event-list-wrap-trans-"+ i).append(getMorebutton(i,moreText,"expanded"));
                continue;
            }
            
            if(typeof dateHash[i].eventList[3] != "undefined"){
                //$("#event-wrap-in-"+i).append(getEventRow(eventList[dateHash[i].eventList[2]].fbId,"topEvent"));
            }else{
                var moreText = (dateHash[i].eventList.length - 4);
                $("#event-wrap-in-"+i).append("<div id='more-events-marker-"+i+"'></div>");
                $("#event-wrap-in-"+i).css("height","222px");
                $("#event-list-wrap-trans-"+ i).append(getMorebutton(i,moreText,"expanded"));
                continue;
            }
            
            var moreText = (dateHash[i].eventList.length - 4);
            $("#event-list-wrap-trans-"+ i).append("<div id='more-events-marker-"+i+"'></div>");
            $("#event-wrap-in-"+i).css("height","222px");
            $("#event-list-wrap-trans-"+ i).append(getMorebutton(i,moreText));
            
        }
    }
    setFriendTap();
    
    setEventTap();
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