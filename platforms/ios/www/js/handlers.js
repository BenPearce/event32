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
var sameRow;
var sameDate;
var first = true;
var dateCnt = false;

function setEventTap() {
    
    $(".friend-wrap").tap(function () {
                          /*$(this).parent().addClass('events-touched');*/
                          });
    
    $(".friend-wrap").touchend(function () {});
    
    $(".friend-wrap").touchstart(function () {
                                 
                                 var evId = $(this).attr('data-evId');
                                 var dateId = $(this).attr('data-dateHash');
                                 var isSelected = $(this).hasClass('friend-selected') & $(this).hasClass('event-selected');
                                 var touched = $(this).parents().eq(2).hasClass('friend-touched');
                                 var selected = $(this).parents().eq(2).hasClass('friend-selected');
                                 var formerFriendSelected = $("#friend-" + selectedEvId).parents().eq(2).hasClass('friend-selected');
                                 var friendSelected = $(this).parents().eq(2).hasClass('friend-selected');
                                 var eventSelected = $(this).parents().eq(2).hasClass('event-selected');
                                 var formerEventSelected = $("#" + selectedEvId).parents().eq(2).hasClass('event-selected');
                                 
                                 if (eventSelected) {
                                 
                                 $(this).parents().eq(2).removeClass('event-selected');
                                 $(this).parents().eq(2).addClass('friend-selected');
                                 
                                 } else if (formerFriendSelected) {
                                 
                                 var tempHeight1 = $("#" + selectedEvId).parents().eq(3).height();
                                 
                                 if (eventSelected) {
                                 
                                 $(this).parents().eq(2).removeClass('event-selected');
                                 $(this).parents().eq(2).addClass('friend-selected');
                                 
                                 } else {
                                 
                                 if (!(selectedEvId == $(this).attr('data-evId'))) {
                                 
                                 $("#" + selectedEvId).parents().eq(4).addClass("notransition");
                                 //var tempHeight1 = $("#"+selectedEvId).parents().eq(3).height();
                                 //$("#"+selectedEvId).parents().eq(3).height(tempHeight1 - 100);
                                 $("#" + selectedEvId).parents().eq(2).removeClass('friend-selected');
                                 $("#" + selectedEvId).parents().eq(4).removeClass("notransition");
                                 
                                 } else {
                                 

                                 $("#" + selectedEvId).parents().eq(4).addClass("notransition");
                                 var tempHeight1 = $("#" + selectedEvId).parents().eq(3).height();
                                 $("#" + selectedEvId).parents().eq(3).height(tempHeight1 - 65);
                                 $("#" + selectedEvId).parents().eq(2).removeClass('friend-selected');
                                 $("#" + selectedEvId).parents().eq(4).removeClass("notransition");
                                 
                                 }
                                 
                                 }
                                 
                                 } else if (formerEventSelected) {
                                 
                                 }
                                 
                                 if (!touched & !selected) {
                                 
                                 console.log("not touched not selected");
                                 $(this).parents().eq(2).removeClass('event-touched');
                                 $(this).parents().eq(2).addClass('friend-touched');
                                 
                                 } else if (!touched & selected) {
                                 
                                 } else if (touched & !selected) {

                                 $(this).parents().eq(4).addClass("notransition");
                                 $(this).parents().eq(2).addClass('friend-selected');
                                 
                                 var tempHeight = $(this).parents().eq(3).height();
                                 $(this).parents().eq(3).css('height', tempHeight + 65);
                                 /*
                                  //formerFriendSelected
                                  if(formerFriendSelected){
                                  console.log("former event selected 1");
                                  }else{
                                  
                                  if(formerFriendSelected){
                                  console.log("former event selected 2");
                                  }else{
                                  var tempHeight = $(this).parents().eq(3).height();
                                  $(this).parents().eq(3).css('height', tempHeight + 65);
                                  }
                                  */
                                 
                                 $(this).parents().eq(4).removeClass("notransition");
                                 
                                 }
                                 selectedEvId = $(this).attr('data-evId');
                                 });
    
    $(".event-img-wrap").touchstart(function () {
                                    
                                    var evId = $(this).attr('data-evId');
                                    var dateId = $(this).attr('data-dateHash');
                                    var isSelected = $(this).hasClass('event-selected') & $(this).hasClass('event-selected');
                                    var touched = $(this).parents().eq(2).hasClass('event-touched');
                                    var selected = $(this).parents().eq(2).hasClass('event-selected');
                                    var friendSelected = $(this).parents().eq(2).hasClass('friend-selected');
                                    var formerEventSelected = $("#" + selectedEvId).parents().eq(2).hasClass('event-selected');
                                    
                                    if (friendSelected) {
                                    
                                    $(this).parents().eq(2).removeClass('friend-selected');
                                    $(this).parents().eq(2).addClass('event-selected');
                                    
                                    } else if (formerEventSelected) {
                                    
                                    var tempHeight1 = $("#" + selectedEvId).parents().eq(3).height();
                                    
                                    /*
                                    if (friendSelected) {
                                    $(this).parents().eq(2).removeClass('friend-selected');
                                    $(this).parents().eq(2).addClass('event-selected');
                                    
                                    } else {
                                    */
                                    if (!(selectedEvId == $(this).attr('id'))) {
                                    
                                    $("#" + selectedEvId).parents().eq(4).addClass("notransition");
                                    $("#" + selectedEvId).parents().eq(2).removeClass('event-selected');
                                    $("#" + selectedEvId).parents().eq(4).removeClass("notransition");
                                    
                                    } else {
                                    
                                    $("#" + selectedEvId).parents().eq(4).addClass("notransition");
                                    var tempHeight1 = $("#" + selectedEvId).parents().eq(3).height();
                                    $("#" + selectedEvId).parents().eq(3).height(tempHeight1 - 65);
                                    $("#" + selectedEvId).parents().eq(2).removeClass('event-selected');
                                    $("#" + selectedEvId).parents().eq(4).removeClass("notransition");
                                    
                                    }
                                  // }
                                    
                                    }
                                    
                                    if (!touched & !selected) {
                                    
                                    $(this).parents().eq(2).removeClass('friend-touched');
                                    $(this).parents().eq(2).addClass('event-touched');

                                    } else if (touched & !selected) {
                                    
                                    $(this).parents().eq(4).addClass("notransition");
                                    var tempHeight = $(this).parents().eq(3).height();
                                    $(this).parents().eq(2).addClass('event-selected');

                                    if (!formerEventSelected & !formerEventSelected) {
                                    $(this).parents().eq(3).css('height', tempHeight + 65);

                                    }
                                    
                                    $(this).parents().eq(4).removeClass("notransition");
                                    
                                    }
                                    
                                    selectedEvId = $(this).attr('id');
                                    });
    
    
    $(".event-img-wrap").touchend(function () {});
}

function setFriendTap() {
    $(".more-events-text-wrap").touchstart(function () {
                                           $(this).addClass('more-events-text-wrap-touched');
                                           setInterval(function () {
                                                       moreEventsLocked = false;
                                                       }, 600);
                                           });
    
    $(".more-events-text-wrap").touchend(function (e) {
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