var moreEventsLocked = false;
var moreEventExLock = false;
var evILock = false;

function wheel(e) {
    preventDefault(e);
}

function preventDefault(e) {
    e = e || window.event;
    if (e.preventDefault)
        e.preventDefault();
    e.returnValue = false;
}

function keydown(e) {
    for (var i = keys.length; i--;) {
        if (e.keyCode === keys[i]) {
            preventDefault(e);
            return;
        }
    }
}

function disable_scroll() {
    if (window.addEventListener) {
        window.addEventListener('DOMMouseScroll', wheel, false);
    }
    window.onmousewheel = document.onmousewheel = wheel;
    document.onkeydown = keydown;
}

function enable_scroll() {
    if (window.removeEventListener) {
        window.removeEventListener('DOMMouseScroll', wheel, false);
    }
    window.onmousewheel = document.onmousewheel = document.onkeydown = null;
}

function setSwipe(evSel) {
    evSel.on("swipeleft", function (event) {
             alert("swipe left");
             });
    
    evSel.on("swiperight", function (event) {
             alert("swipe right");
             });
}

$(document).bind('pageinit', function () {});

function setButtons() {
    $('.ev-map-button').tap(function () {
                            var id = $(this).attr('data-evId');
                            var iframe = document.createElement('iframe');
                            $("#popupMap").popup("open");
                            $("#map-wrap").html(iframe);
                            $("#map-wrap iframe").attr("src", "map.html?coordinate=" + eventList[id].venue.coordinate);
                            $("#map-wrap iframe").trigger('create');
                            $("#map-wrap").trigger('create');
                            $("#map-wrap iframe").css({
                                                      "height": "100%",
                                                      "width": "100%"
                                                      });
                            
                            $("#popupMap .map-back").tap(function () {
                                                         $("#popupMap").popup("close");
                                                         });
                            
                            $("#popupMap").css({
                                               "display": "block",
                                               "margin": "auto",
                                               "width": "80%",
                                               "height": "70%",
                                               "position": "fixed",
                                               "left": "-2%",
                                               "top": "0%",
                                               "border-right": "solid rgba(0, 0, 0, 0.65) 40px",
                                               "border-left": "solid rgba(0, 0, 0, 0.65) 40px",
                                               "border-top": "solid rgba(0, 0, 0, 0.65) 60px",
                                               "border-bottom": "solid rgba(0, 0, 0, 0.65) 60px"
                                               });
                            });
    
    $(".ev-i-button").touchstart(function () {
                                 $(this).addClass("ev-info-touched");
                                 });
    
    $(".ev-i-button").touchend(function () {
                               $(this).removeClass("ev-info-touched");
                               });
    
    $(".ev-i-button").tap(function () {
                          if (!evILock) {
                          evILock = true;
                          var id = $(this).attr('data-evId');
                          var desc = eventList[id].description;
                          $("#ev-info-pop").popup("open");
                          $("#ev-desc-pop").html("");
                          var html = "<div id='ev-desc-wrap'><img id='ev-i-pic' src='https://graph.facebook.com/" + eventList[id].fbId + "/picture?height=200&width=200'><div class ='ev-desc-i'>" + desc + "</div></div>";
                          $("#ev-desc-pop").html(html);
                          $("#ev-info-pop").css({
                                                "padding": "10px"
                                                });
                          $("#ev-desc-wrap").css({
                                                 "overflow-y": "hidden!important",
                                                 "width": "100%!important",
                                                 "height": "100%!important"
                                                 });
                          $(".ev-desc-i").css({
                                              "word-wrap": "break-word",
                                              "width": "100%",
                                              "height": "140px",
                                              "overflow-y": "scroll",
                                              "font-size": "10pt"
                                              });
                          $("#ev-i-pic").css({
                                             "margin": "20px auto",
                                             "width": "200px",
                                             "height": "200px"
                                             });
                          $("#ev-info-pop").css({
                                                "display": "block",
                                                "margin": "auto",
                                                "width": "80%",
                                                "height": "70%",
                                                "position": "fixed",
                                                "left": "-15px",
                                                "top": "0px",
                                                "border-right": "solid rgba(0, 0, 0, 0.65) 40px",
                                                "border-left": "solid rgba(0, 0, 0, 0.65) 40px",
                                                "border-top": "solid rgba(0, 0, 0, 0.65) 60px",
                                                "border-bottom": "solid rgba(0, 0, 0, 0.65) 60px"
                                                });
                          setInterval(function () {
                                      evILock = false;
                                      }, 700);
                          }
                          });
    
    $(".ev-map-button").touchstart(function () {
                                   $(this).addClass('ev-map-button-touched');
                                   
                                   });
    
    $(".ev-map-button").touchend(function () {
                                 $(this).removeClass('ev-map-button-touched');
                                 });
    
    $(".ev-rsvp-button").touchstart(function () {
                                    $(this).addClass('ev-rsvp-button-touched');
                                    
                                    });
    
    $(".ev-rsvp-button").touchend(function () {
                                  $(this).removeClass('ev-rsvp-button-touched');
                                  });
    
    var rsvpLock = false;
    
    $(".ev-rsvp-button").tap(function () {
                             if (!rsvpLock) {
                             rsvpLock = true;
                             var id = $(this).attr('data-evId');
                             var name = eventList[id].name;
                             $("#ev-rsvp-pop").popup("open");
                             $("#ev-rsvp-text").html("");
                             var html = "<div id='ev-rsvp-wrap'><div id='rsvp-head'>You Have RSVP'd to:</div><div id='rsvp-ev-wrap'><img id='ev-rsvp-pic' src='https://graph.facebook.com/" + eventList[id].fbId + "/picture?width=50&height=50'><div class ='ev-rsvp-i'>" + name + "</div></div></div>";
                             $("#ev-rsvp-text").html(html);
                             
                             $("#rsvp-head").css({
                                                 "margin": "10px auto",
                                                 "width": "95%",
                                                 "font-size": "16pt",
                                                 "font-style": "bold",
                                                 "margin-bottom": "10px"
                                                 });
                             
                             $("#ev-rsvp-text").css({
                                                    "overflow-y": "hidden!important",
                                                    "width": "100%!important",
                                                    "height": "100%!important"
                                                    });
                             
                             $("#rsvp-ev-wrap").css({
                                                    "box-shadow": "2px 2px 2px #888888"
                                                    });
                             
                             $(".ev-rsvp-i").css({
                                                 "word-wrap": "break-word",
                                                 "width": "175px",
                                                 "height": "50px",
                                                 "overflow-y": "scroll",
                                                 "display": "inline-block",
                                                 "font-size": "8pt",
                                                 "height": "40px",
                                                 "margin-bottom": "13px",
                                                 "margin-left": "5px"
                                                 });
                             
                             
                             $("#ev-rsvp-pic").css({
                                                   "margin": "auto",
                                                   "width": "50px",
                                                   "height": "50px",
                                                   "display": "inline-block"
                                                   });
                             
                             $("#ev-rsvp-pop a").tap(function () {
                                                     $("#ev-rsvp-pop").popup("close");
                                                     $("#ev-rsvp-pop").css({
                                                                           "display": "none"
                                                                           });
                                                     });
                             
                             $("#ev-rsvp-pop").css({
                                                   "width": "230px",
                                                   "height": "130px",
                                                   "margin-left": "-15px",
                                                   "padding": "10px",
                                                   "position": "fixed",
                                                   "top": "0px",
                                                   "left": "0px",
                                                   "display": "block",
                                                   "border-right": "solid rgba(0, 0, 0, 0.65) 50px",
                                                   "border-left": "solid rgba(0, 0, 0, 0.65) 50px",
                                                   "border-top": "solid rgba(0, 0, 0, 0.65) 100px",
                                                   "border-bottom": "solid rgba(0, 0, 0, 0.65) 250px"
                                                   });
                             
                             setInterval(function () {
                                         rsvpLock = false;
                                         }, 600);
                             }
                             });
    
    $(".fr-i-button").touchstart(function () {
                                 $(this).addClass('fr-i-button-touched');
                                 });
    
    $(".fr-i-button").touchend(function () {
                               $(this).removeClass('fr-i-button-touched');
                               });
    
    $(".fr-mail-button").touchstart(function () {
                                    $(this).addClass('fr-mail-button-touched');
                                    });
    
    $(".fr-mail-button").touchend(function () {
                                  $(this).removeClass('fr-mail-button-touched');
                                  });
    
    var frMailLock = false;
    
    $(".fr-mail-button").tap(function () {
                             if (!frMailLock) {
                             frMailLock = true;
                             var id = $(this).attr('data-evId');
                             var desc = eventList[id].description;
                             $("#fr-mail-pop").popup("open");
                             $("#fr-mail-text").html("");
                             var frName = "<div id='fr-mail-first'>" + eventList[eventList[id].friendIdArray[0]].nameArray[0] + "</div><div id='fr-mail-last'>" + eventList[eventList[id].friendIdArray[0]].nameArray[1] + "</div>";
                             var html = "<div id='fr-mail-outter'><div id='fr-mail-head'><div id='mail-to'>To:</div><img id='fr-mail-pic' src='https://graph.facebook.com/" + eventList[eventList[id].friendIdArray[0]].fbId + "/picture?width=50&height=50'><div id='fr-mail-name'>" + frName + "</div></div><div data-role='fieldcontain'><textarea cols='38' rows='12' name='textarea' id='fr-mail-text'></textarea></div><input id='fr-mail-send' type='submit' value='Send'></div>";
                             $("#fr-mail-text").html(html);
                             $("#fr-mail-pop a").tap(function () {
                                                     $("#fr-mail-pop").popup("close");
                                                     $("#fr-mail-pop").css({
                                                                           "display": "none"
                                                                           });
                                                     });
                             
                             $("#fr-mail-text").css({
                                                    "overflow-y": "hidden!important",
                                                    "width": "100%!important",
                                                    "height": "100%!important",
                                                    "margin": "auto"
                                                    });
                             
                             $("#mail-to").css({
                                               "width": "50px",
                                               "height": "50px",
                                               "font-size": "26pt",
                                               "margin-right": "8px",
                                               "float": "left"
                                               });
                             
                             $("#fr-mail-head").css({
                                                    "height": "50px",
                                                    "display": "block",
                                                    "margin-bottom": "20px"
                                                    });
                             
                             $("#fr-mail-pic").css({
                                                   "width": "50px",
                                                   "height": "50px",
                                                   "float": "left"
                                                   });
                             
                             $("#fr-mail-name").css({
                                                    "width": "50px",
                                                    "height": "50px",
                                                    "float": "left",
                                                    "margin-left": "7px",
                                                    "font-size": "14pt"
                                                    });
                             
                             $("#fr-mail-send").css({
                                                    "margin": "10px auto",
                                                    "width": "100%",
                                                    "height": "40px"
                                                    });
                             
                             $(".fr-mail-i").css({
                                                 "word-wrap": "break-word",
                                                 "width": "100%",
                                                 "height": "385px",
                                                 "overflow-y": "scroll"
                                                 });
                             
                             $("#fr-mail-i").css({
                                                 "margin": "20px auto",
                                                 "width": "200px",
                                                 "height": "200px"
                                                 });
                             
                             $("#fr-mail-pop").css({
                                                   "width": "250px",
                                                   "height": "350px",
                                                   "margin-left": "-48px",
                                                   "padding": "10px",
                                                   "top": "0px",
                                                   "left": "14px",
                                                   "display": "block",
                                                   "position": "fixed",
                                                   "z-index": "5000!important",
                                                   "border-right": "solid rgba(0, 0, 0, 0.65) 60px",
                                                   "border-left": "solid rgba(0, 0, 0, 0.65) 60px",
                                                   "border-top": "solid rgba(0, 0, 0, 0.65) 50px",
                                                   "border-bottom": "solid rgba(0, 0, 0, 0.65) 310px"
                                                   });
                             
                             $(this).addClass("fixed-pop");
                             
                             setInterval(function () {
                                         frMailLock = false;
                                         }, 600);
                             }
                             });
}

var touchedDate;
var selectedEvId = null;
var selectedFrId = null;
var sameRow;
var sameDate;
var first = true;
var dateCnt = false;
var selectedBool = false;

function setEventTap(selPrefix) {
    console.log("set event tap selPrefix: "+selPrefix);
    $(selPrefix+".friend-wrap").tap(function () {
                          /*$(this).parent().addClass('events-touched');*/
                          });
    
    $(selPrefix+".friend-wrap").touchend(function () {});
    
    $(selPrefix+".friend-wrap").touchstart(function () {
                                 console.log("!!!!!!!!!!!!");

                                 var evId = $(this).attr('data-evId');
                                 var dateId = $(this).attr('data-dateHash');
                                 var isSelected = $(this).hasClass('friend-selected') & $(this).hasClass('event-selected');
                                 var touched = $(this).parents().eq(2).hasClass('friend-touched');
                                 //var selected = $(this).parents().eq(2).hasClass('friend-selected');

                                 var formerFriendSelected = $("#friend-" + selectedEvId).parents().eq(2).hasClass('friend-selected');
                                 var friendSelected = $(this).parents().eq(2).hasClass('friend-selected');
                                 var eventSelected = $(this).parents().eq(2).hasClass('event-selected');
                                 var selected = friendSelected || eventSelected;
                                 var formerEventSelected = $("#" + selectedEvId).parents().eq(2).hasClass('event-selected');
                                 //var formerFriendSelected = $("#" + selectedEvId).parents().eq(2).hasClass('event-selected');

                                 var formerSelected = formerFriendSelected || formerEventSelected;

               

                                 if (!touched & !friendSelected & !eventSelected) {
                                 
                                 console.log("not touched not selected");
                                 $(this).parents().eq(2).removeClass('event-touched');
                                 $(this).parents().eq(2).addClass('friend-touched');
                                 return;
                                 }
                                 var tempHeight = $(this).parents().eq(3).height();

                                 //if (!selectedBool){
                                   if(!($(this).parents().eq(3).hasClass('hasSelected'))){

                                 
                                 //if (!formerFriendSelected) {
                                 //console.log("height increase");
                                 $(this).parents().eq(3).css('height', tempHeight + 65);
                                 }

                                 if (eventSelected) {
                                 console.log("event selected fr");
                                 $(this).parents().eq(2).removeClass('event-selected');
                                 $(this).parents().eq(2).removeClass('event-touched');
                                 $(this).parents().eq(2).addClass('friend-touched');
                                 $(this).parents().eq(2).addClass('friend-selected');
                                 selectedBool = true;
                                 $(this).parents().eq(3).addClass('hasSelected');

                                  //return;
                                 } else if (formerSelected) {
                                 //console.log("former event selected fr");
                                 var tempHeight1 = $("#" + selectedEvId).parents().eq(3).height();
                                 
                                 if (!(selectedEvId == $(this).attr('data-evId'))) {
                                 $("#" + selectedEvId).parents().eq(4).addClass("notransition");
                                 $("#" + selectedEvId).parents().eq(2).removeClass('friend-selected');
                                 $("#" + selectedEvId).parents().eq(2).removeClass('event-selected');
                                 selectedBool = false;
                                 $(this).parents().eq(3).removeClass('hasSelected');

                                 $("#" + selectedEvId).parents().eq(4).removeClass("notransition");
                                 
                                 } else {

                                 $("#" + selectedEvId).parents().eq(4).addClass("notransition");
                                 var tempHeight1 = $("#" + selectedEvId).parents().eq(3).height();

                                 $("#" + selectedEvId).parents().eq(3).height(tempHeight1 - 65);
                                 $("#" + selectedEvId).parents().eq(2).removeClass('friend-selected');
                                 $("#" + selectedEvId).parents().eq(2).removeClass('event-selected');
                                 selectedBool = false;
                                 $(this).parents().eq(3).removeClass('hasSelected');
                                 $("#" + selectedEvId).parents().eq(4).removeClass("notransition");
                                 
                                 }
                                 
                                 } else if (formerEventSelected) {
                                 
                                 }
                                 
                              if (!touched & selected) {
                                 
                                 } else if (touched & !selected) {
                                 $(this).parents().eq(4).addClass("notransition");
                                 $(this).parents().eq(2).addClass('friend-selected');
                                 selectedBool = true;
                                 $(this).parents().eq(3).addClass('hasSelected');

                                 $(this).parents().eq(4).removeClass("notransition");

                                 }
                                 selectedEvId = $(this).attr('data-evId');

                                 });
    
   
    $(selPrefix+".event-img-wrap").touchstart(function () {
                                    console.log("!!!!!!!!!!!!");
                                    console.log("selectedEvId tap: "+selectedEvId);

                                    var evId = $(this).attr('data-evId');
                                    var dateId = $(this).attr('data-dateHash');
                                    var isSelected = $(this).hasClass('event-selected') & $(this).hasClass('event-selected');
                                    var touched = $(this).parents().eq(2).hasClass('event-touched');
                                    var selected = $(this).parents().eq(2).hasClass('event-selected');
                                    var friendSelected = $(this).parents().eq(2).hasClass('friend-selected');
                                    var formerEventSelected = $("#" + selectedEvId).parents().eq(2).hasClass('event-selected');
                                    var formerFriendSelected = $("#" + selectedEvId).parents().eq(2).hasClass('friend-selected');
                                    var formerSelected = formerEventSelected || formerFriendSelected;
                                    
                                    if (!touched & !selected& !friendSelected) {
                                    
                                    $(this).parents().eq(2).removeClass('friend-touched');
                                    $(this).parents().eq(2).addClass('event-touched');
                                    return;
                                    }
                                    
                                    //if (!formerEventSelected) {
                                    var tempHeight = $(this).parents().eq(3).height();
                                              console.log("selected bool: "+selectedBool);
                                              
                                    //if (!selectedBool){
                                    if(!($(this).parents().eq(3).hasClass('hasSelected'))){

                                    
                                    console.log("height increase");
                                    
                                    $(this).parents().eq(3).css('height', tempHeight + 65);
                                    
                                    }
                                    
                                    //This element in friend selected state
                                    if (friendSelected) {

                                    $(this).parents().eq(2).removeClass('friend-selected');
                                    $(this).parents().eq(2).removeClass('friend-touched');
                                    $(this).parents().eq(2).addClass('event-touched');

                                    $(this).parents().eq(2).addClass('event-selected');
                                    selectedBool = true;
                                    $(this).parents().eq(3).addClass('hasSelected');
                                    //Some event selected
                                    } else if (formerSelected) {
                                    //console.log("former event selected ev");
                                    var tempHeight1 = $("#" + selectedEvId).parents().eq(3).height();
                                    
                                    //Is this the event already selected
                                    
                                    console.log("hu"+(selectedEvId == $(this).attr('id')));
                                    
                                    //This event isn't already selected contract it
                                    if (!(selectedEvId == $(this).attr('id'))) {
                                    
                                    $("#" + selectedEvId).parents().eq(4).addClass("notransition");
                                    $("#" + selectedEvId).parents().eq(2).removeClass('event-selected');
                                    $("#" + selectedEvId).parents().eq(2).removeClass('friend-selected');
                                    selectedBool = false;
                                    $(this).parents().eq(3).removeClass('hasSelected');

                                    $("#" + selectedEvId).parents().eq(4).removeClass("notransition");
                                    
                                    //This event is already selected contract it and contract container by row height
                                    } else {
                                    
                                    $("#" + selectedEvId).parents().eq(4).addClass("notransition");
                                    var tempHeight1 = $("#" + selectedEvId).parents().eq(3).height();
                                    console.log("height decrease 1");

                                    $("#" + selectedEvId).parents().eq(3).height(tempHeight1 - 65);
                                    $("#" + selectedEvId).parents().eq(2).removeClass('event-selected');
                                    $("#" + selectedEvId).parents().eq(2).removeClass('friend-selected');
                                    selectedBool = false;
                                    $(this).parents().eq(3).removeClass('hasSelected');
                                    $("#" + selectedEvId).parents().eq(4).removeClass("notransition");
                                    
                                    }
                                    }//formerEventSelected END
                                    
                                    //Logic pertaining to touched element
                                if (touched & !selected) {
                                    
                                    $(this).parents().eq(4).addClass("notransition");

                                    $(this).parents().eq(2).addClass('event-selected');
                                    selectedBool = true;
                                    $(this).parents().eq(3).addClass('hasSelected');

                                    //console.log("ev select added");


                              
                                    
                                    $(this).parents().eq(4).removeClass("notransition");
                                    
                                    }
                                    
                                    selectedEvId = $(this).attr('id');
                                    console.log("selectedEvId set: "+selectedEvId);
                                   // console.log("logic test: "+ $("#" + selectedEvId).parents().eq(2).hasClass('event-selected'));

                                    });
    
    
    $(selPrefix+".event-img-wrap").touchend(function () {});
}


function expand(cntIndex,elem){
    //console.log("expand");
    var exHtml = "";
    for(i=0;i<=dateHash[cntIndex].eventList.length - 1;i++){
        var exHtml = exHtml +getEventRow(eventList[dateHash[k].eventList[i]].fbId,"added",cntIndex);
    }
    var exHtml = exHtml +"<div id='more-events-"+cntIndex+"' class='more-events'></div>";
    $(elem).addClass("expanded");
    //var exHeight = ((74*(dateHash[cntIndex].eventList.length)));
    var exHeight = ((61*(dateHash[cntIndex].eventList.length)));
    $("#event-wrap-in-"+cntIndex).html(exHtml);
    $("#event-wrap-in-"+cntIndex).css("height",exHeight);
    dateLength[cntIndex] = exHeight;
    
    $("#divider-wrap-"+cntIndex).removeClass("ex");
    $("#divider-wrap-"+cntIndex).addClass("cnt");
    $("#more-events-"+cntIndex).css("display","block");
    //$("#event-wrap-in-"+cntIndex).append("<div id='more-events-"+cntIndex+"' class='more-events'></div>");
    //$("#more-events-"+exIndex).css("display","none");
}

function contract(exIndex,elem,transition){
    $(elem).removeClass("expanded");
    
    if(transition){
        $("#event-wrap-in-"+exIndex).css("height","280px");

        $("#event-wrap-in-"+exIndex).html(getEventRow(eventList[dateHash[exIndex].eventList[0]].fbId,"cntAdded",exIndex)+getEventRow(eventList[dateHash[exIndex].eventList[1]].fbId,"cntAdded",exIndex)+getEventRow(eventList[dateHash[exIndex].eventList[2]].fbId,"cntAdded",exIndex)+getEventRow(eventList[dateHash[exIndex].eventList[3]].fbId,"cntAdded",exIndex));
    }else{
        $("#event-wrap-in-"+exIndex).addClass("notransition");
        $("#event-wrap-in-"+exIndex).css("height","280px");
        $("#event-wrap-in-"+exIndex).html("");
        $("#event-wrap-in-"+exIndex).html(getEventRow(eventList[dateHash[exIndex].eventList[0]].fbId,"cntAdded",exIndex)+getEventRow(eventList[dateHash[exIndex].eventList[1]].fbId,"cntAdded",exIndex)+getEventRow(eventList[dateHash[exIndex].eventList[2]].fbId,"cntAdded",exIndex)+getEventRow(eventList[dateHash[exIndex].eventList[3]].fbId,"cntAdded",exIndex));
        
        $doc.scrollTop($doc.scrollTop() + $("#date-elem-"+k+"-list").offset().top - pos);
        $("#event-wrap-in-"+exIndex).height();
        $("#event-wrap-in-"+exIndex).removeClass("notransition");
    }
    
    $("#divider-wrap-"+exIndex).removeClass("cnt");
    $("#divider-wrap-"+exIndex).addClass("ex");
    var moreText = (dateHash[exIndex].eventList.length - 4);    
    $("#event-wrap-in-"+exIndex).css("height","280px");
    $("#event-wrap-in-"+exIndex).append("<div id='more-events-"+i+"' class='more-events'>"+moreText+" more events</div>");
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
        contract(lastIndex,exSelector,false);
        contract(k,elem,true);
    }else{
        contract(k,elem,true);
    }
    
    exListHeight = dateHash[k].eventList.length;
    lastIndex = k;
    exSelector = elem;
    setEventTap(".cntAdded ");
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
    
    exListHeight = dateHash[k].eventList.length;
    lastIndex = k;
    exSelector = elem;
    
    setEventTap(".added ");
    setButtons();
}

function setFriendTap() {
    $(".more-events-text-wrap").touchstart(function () {
                                           $(this).addClass('more-events-text-wrap-touched');
                                           setInterval(function () {
                                                       moreEventsLocked = false;
                                                       }, 600);
                                           });
    
    $(".more-events-text-wrap").touchend(function (e) {
                                         console.log("more event touch end");
                                         $(this).removeClass('more-events-text-wrap-touched');
                                         if (!moreEventsLocked) {
                                         moreEventsLocked = true;
                                         popDate(e, this);
                                         }
                                         });
    
    $(".left-ex-button").touchstart(function () {});
    
    $(".left-ex-button").touchend(function (e) {
                                  popDate1(e, this);
                                  });
}

function stickyList() {
    $(".date-row").sticky({
                          topSpacing: 0
                          });
}

//Doc readey happens when initial fb button page is loaded, is not triggereed after auth
$(document).ready(function () {
                  $("#header").sticky({
                                      topSpacing: 0
                                      });
                  }); //Doc Ready End

function scale(width, height, padding, border) {
    var scrWidth = $(window).width() - 30,
    scrHeight = $(window).height() - 30,
    ifrPadding = 2 * padding,
    ifrBorder = 2 * border,
    ifrWidth = width + ifrPadding + ifrBorder,
    ifrHeight = height + ifrPadding + ifrBorder,
    h, w;
    
    if (ifrWidth < scrWidth && ifrHeight < scrHeight) {
        w = ifrWidth;
        h = ifrHeight;
    } else if ((ifrWidth / scrWidth) > (ifrHeight / scrHeight)) {
        w = scrWidth;
        h = (scrWidth / ifrWidth) * ifrHeight;
    } else {
        h = scrHeight;
        w = (scrHeight / ifrHeight) * ifrWidth;
    }
    
    return {
        'width': w - (ifrPadding + ifrBorder),
        'height': h - (ifrPadding + ifrBorder)
    };
};


$(document).on("pageinit", function () {
               
               $("#popupMap iframe")
               .attr("width", 0)
               .attr("height", 0);
               
               $("#popupMap iframe").contents().find("#map_canvas")
               .css({
                    "width": 0,
                    "height": 0
                    });
               
               $("#popupMap").on({
                                 popupbeforeposition: function () {
                                 var size = scale(480, 320, 0, 1),
                                 w = size.width,
                                 h = size.height;
                                 
                                 $("#popupMap iframe")
                                 .attr("width", "100%")
                                 .attr("height", "100%");
                                 
                                 $("#popupMap iframe").contents().find("#map_canvas")
                                 .css({
                                      "width": w,
                                      "height": h
                                      });
                                 },
                                 popupafterclose: function () {
                                 $("#popupMap iframe")
                                 .attr("width", 0)
                                 .attr("height", 0);
                                 
                                 $("#popupMap iframe").contents().find("#map_canvas")
                                 .css({
                                      "width": 0,
                                      "height": 0
                                      });
                                 }
                                 });
               
               });


$(document).on("pageinit", "#date-page", function (event) {
               
               $('#myPopupDiv').on('popupafteropen', function () {
                                   $(this).css('position', 'fixed');
                                   });
               
               $('#myPopupDiv').on('popupafterclose', function () {
                                   $(this).css('position', 'static');
                                   });
               $("#ev-rsvp-pop").on('popupafterclose', function () {
                                    $(this).css('display', 'none');
                                    });
               
               $('#ev-info-pop').on('popupafteropen', function () {});
               
               $('#ev-info-pop').on('popupafterclose', function () {
                                    $(this).css('position', 'static');
                                    });
               
               $("#popupMap").on('popupafteropen', function () {
                                 $(this).css('position', 'fixed');
                                 });
               
               $("#popupMap").on('popupafterclose', function () {
                                 $(this).css('position', 'static');
                                 });
               
               $("#dateMainList").listview();
               $("#dateMainList").listview('refresh');
               $('[data-position=fixed]').fixedtoolbar({
                                                       tapToggle: false
                                                       });
               });