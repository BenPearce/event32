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

function setSwipe(evSel){
    evSel.on("swipeleft", function(event) {
             alert("swipe left");
             });
    
    evSel.on("swiperight", function(event) {
             alert("swipe right");
             });
}

$(document).bind('pageinit', function() {
                 //setButtons();
                 });

function setButtons(){
    console.log("set buttons");
    
    $('.ev-map-button').tap(function(){
                            //alert("rsvp");
                            var id = $(this).attr('data-evId');
                            
                            console.log("map fbId: "+id);
                            
                            var iframe = document.createElement('iframe');
                            console.log("coordinate: "+eventList[id].venue.coordinate);
                            iframe.src = "map.html?coordinate=" + eventList[id].venue.coordinate;
                            
                            $("#popupMap").popup("open");
                            //$("#popupMap").append(iframe);
                            /*
                             $("#map-wrap").html("");
                             $("#map-wrap").html(iframe);
                             */
                            $("#map-wrap").html(iframe);
                            //$("#popupMap").html(iframe);
                            /*
                             $("#popupMap").css({
                             "margin": "auto",
                             "width": "80%",
                             "height": "70%"
                             });
                             */
                            $("#popupMap").css({
                                               "margin": "auto",
                                               "width": "80%",
                                               "height": "70%",
                                               "position": "fixed",
                                               "left": "-2%",
                                               "top":"0%",
                                               "border-right": "solid rgba(0, 0, 0, 0.65) 40px",
                                               "border-left": "solid rgba(0, 0, 0, 0.65) 40px",
                                               "border-top": "solid rgba(0, 0, 0, 0.65) 60px",
                                               "border-bottom": "solid rgba(0, 0, 0, 0.65) 60px"
                                               });
                            
                            /*
                             ("#popupMap iframe").css({
                             "margin": "auto",
                             "width": "200px",
                             "height": "200px"
                             });
                             */
                            /*
                             $("#popupMap iframe").contents().find( "#map_canvas" )
                             .css( { "width": "200px!important", "height" : "200px"!important} );
                             */
                            /*
                             $("#popupMap iframe")
                             .css( { "width": "200px!important", "height" : "200px!important"} );
                             
                             $("#popupMap").find("#map_canvas")
                             .css( { "width": "200px!important", "height" : "200px!important"} );
                             
                             $( "#popupMap iframe" )
                             .attr( "width", "200" )
                             .attr( "height", "200" );
                             */
                            
                            });
    
    
    
    /*
     $(".ev-rsvp-button").tap(function(){
     //alert("rsvp");
     var id = $(this).attr('data-evId');
     console.log("rsvp tap");
     $("#myPopupDiv").popup("open");
     });
     */
    
    $(".ev-i-button").touchstart(function(){
                                 $(this).addClass("ev-info-touched");
                                 });
    
    $(".ev-i-button").touchend(function(){
                               $(this).removeClass("ev-info-touched");
                               });
    
    $(".ev-i-button").tap(function(){
                          if(!evILock){
                          evILock= true;
                          console.log("ev-i tap");
                          var id = $(this).attr('data-evId');
                          
                          console.log(id);
                          var desc = eventList[id].description;
                          
                          $("#ev-info-pop").popup("open");
                          $("#ev-desc-pop").html("");
                          var html="<div id='ev-desc-wrap'><img id='ev-i-pic' src='https://graph.facebook.com/"+eventList[id].fbId +"/picture?width=50&height=50'><div class ='ev-desc-i'>"+desc+"</div></div>";
                          $("#ev-desc-pop").addClass('ev-desc-i');
                          
                          $("#ev-desc-pop").html(html);
                          
                          $("#ev-info-pop").css({
                                                /*"overflow-y":"hidden",*/
                                                "padding":"10px"
                                                });
                          
                          $("#ev-desc-wrap").css({
                                                 "overflow-y":"hidden!important",
                                                 "width":"100%!important",
                                                 "height":"100%!important"
                                                 });
                          
                          
                          $(".ev-desc-i").css({
                                              "word-wrap":"break-word",
                                              "width": "100%",
                                              "height":"385px",
                                              "overflow-y":"scroll"
                                              
                                              });
                          
                          
                          $("#ev-i-pic").css({
                                             "margin": "20px auto",
                                             "width": "200px",
                                             "height": "200px"
                                             });
                          
                          $("#ev-info-pop").css({
                                                /*
                                                 "-webkit-overflow-scrolling": "touch";
                                                 "overflow-y":"auto";
                                                 */
                                                
                                                "margin": "auto",
                                                "width": "80%",
                                                "height": "70%",
                                                "position": "fixed",
                                                "left": "-5%",
                                                "top":"5s%",
                                                "border-right": "solid rgba(0, 0, 0, 0.65) 40px",
                                                "border-left": "solid rgba(0, 0, 0, 0.65) 40px",
                                                "border-top": "solid rgba(0, 0, 0, 0.65) 60px",
                                                "border-bottom": "solid rgba(0, 0, 0, 0.65) 60px"
                                                });
                          
                          setInterval(function(){
                                      evILock = false;
                                      },600);
                          
                          }
                          });
    
    
    
    
    /*
     
     .checkTouched
     
     .mapTouched
     */
    
    /*
     $(".map-button").tap(function(){
     console.log("ev id "+$(this).attr('data-evId'));
     //eventList[
     var evId = $(this).attr('data-evId');
     console.log("event: "+eventList[evId]);
     console.log("venue: "+eventList[evId].venue);
     console.log("latitude: "+eventList[evId].venue.venue_latitude);
     console.log("longitude: "+eventList[evId].venue.venue_longitude);
     var iframe = document.createElement('iframe');
     iframe.src = "map.html?coordinate="+eventList[evId].venue.venue_longitude+","+eventList[evId].venue.venue_latitude;
     $(".mapWrap").html(iframe);
     $(".mapWrap").append("chomp");
     console.log("map click done");
     //$(".popupMap1").html(iframe);
     
     });
     */
    $(".ev-map-button").touchstart(function(){
                                   $(this).addClass('ev-map-button-touched');
                                   
                                   });
    
    $(".ev-map-button").touchend(function(){
                                 $(this).removeClass('ev-map-button-touched');
                                 });
    
    $(".ev-rsvp-button").touchstart(function(){
                                    $(this).addClass('ev-rsvp-button-touched');
                                    
                                    });
    
    $(".ev-rsvp-button").touchend(function(){
                                  $(this).removeClass('ev-rsvp-button-touched');
                                  });
    
    var rsvpLock = false;
    
    $(".ev-rsvp-button").tap(function(){
                             console.log("ev-rsvp-tap");
                             /*
                              var id = $(this).attr('data-evId');
                              alert("You have RSVP'd to: "+eventList[id].name);
                              */
                             if(!rsvpLock){
                             rsvpLock = true;
                             console.log("ev-i tap");
                             var id = $(this).attr('data-evId');
                             
                             console.log(id);
                             var name = eventList[id].name;
                             
                             $("#ev-rsvp-pop").popup("open");
                             $("#ev-rsvp-text").html("");
                             var html="<div id='ev-rsvp-wrap'><div id='rsvp-head'>You Have RSVP'd to:</div><div id='rsvp-ev-wrap'><img id='ev-rsvp-pic' src='https://graph.facebook.com/"+eventList[id].fbId +"/picture?width=50&height=50'><div class ='ev-rsvp-i'>"+name+"</div></div></div>";
                             /*$("#ev-rsvp-text").addClass('ev-desc-i');*/
                             
                             $("#ev-rsvp-text").html(html);
                             //$(this).addClass("orange-check");
                             /*
                              $("#ev-rsvp-pop").css({
                              "padding":"10px",
                              "padding-top":"30px!important"
                              });
                              */
                             $("#rsvp-head").css({
                                                 /*"overflow-y":"hidden",*/
                                                 "margin":"10px auto",
                                                 "width":"95%",
                                                 "font-size":"16pt",
                                                 "font-style":"bold",
                                                 "margin-bottom":"10px"
                                                 });
                             
                             $("#ev-rsvp-text").css({
                                                    "overflow-y":"hidden!important",
                                                    "width":"100%!important",
                                                    "height":"100%!important"
                                                    });
                             
                             $("#rsvp-ev-wrap").css({
                                                    "box-shadow": "2px 2px 2px #888888"
                                                    });
                             
                             $(".ev-rsvp-i").css({
                                                 "word-wrap":"break-word",
                                                 "width": "175px",
                                                 "height":"50px",
                                                 "overflow-y":"scroll",
                                                 "display":"inline-block",
                                                 "font-size":"8pt",
                                                 "height": "40px",
                                                 "margin-bottom": "13px",
                                                 "margin-left": "5px"
                                                 });
                             
                             
                             $("#ev-rsvp-pic").css({
                                                   "margin": "auto",
                                                   "width": "50px",
                                                   "height": "50px",
                                                   "display":"inline-block"
                                                   });
                             /*
                              $("#ev-rsvp-pop a").css({
                              "margin-right":"18px",
                              "margin-top": "100px"
                              });
                              */
                             
                             $("#ev-rsvp-pop a").tap(function(){
                                                     //alert("tap");
                                                     //$( "#myPopupDiv" ).popup( "close" )
                                                     $("#ev-rsvp-pop").popup("close");
                                                     $("#ev-rsvp-pop").css({"display":"none"});
                                                     console.log("done");
                                                     });
                             
                             $("#ev-rsvp-pop").css({
                                                   /*
                                                    "-webkit-overflow-scrolling": "touch";
                                                    "overflow-y":"auto";
                                                    */
                                                   /*"margin": "auto",*/
                                                   "width": "230px",
                                                   "height": "130px",
                                                   "margin-left":"-15px",
                                                   "padding":"10px",
                                                   "position":"fixed",
                                                   "top":"0px",
                                                   "left":"0px",
                                                   "display":"block",
                                                   /*"margin-top": "30px",*/
                                                   
                                                   /*
                                                    "position": "absolute",
                                                    
                                                    "left": "5px",
                                                    "top":"5px",
                                                    */
                                                   
                                                   "border-right": "solid rgba(0, 0, 0, 0.65) 50px",
                                                   "border-left": "solid rgba(0, 0, 0, 0.65) 50px",
                                                   "border-top": "solid rgba(0, 0, 0, 0.65) 100px",
                                                   "border-bottom": "solid rgba(0, 0, 0, 0.65) 250px"
                                                   
                                                   });
                             
                             setInterval(function(){
                                         rsvpLock = false;
                                         },600);
                             
                             }
                             
                             
                             });
    
    /*
     <div data-role="popup" id="ev-rsvp-pop">
     <a href="#" data-rel="back" data-role="button" data-theme="a" data-icon="delete" data-iconpos="notext" class="ui-btn-right">Close</a>
     <div id="ev-rsvp-text">desc</div>
     </div>
     */
    
    $(".fr-i-button").touchstart(function(){
                                 console.log("ts");
                                 $(this).addClass('fr-i-button-touched');
                                 });
    
    $(".fr-i-button").touchend(function(){
                               console.log("te");
                               $(this).removeClass('fr-i-button-touched');
                               });
    
    $(".fr-mail-button").touchstart(function(){
                                    $(this).addClass('fr-mail-button-touched');
                                    });
    
    $(".fr-mail-button").touchend(function(){
                                  $(this).removeClass('fr-mail-button-touched');
                                  });
    
    var frMailLock = false;
    
    $(".fr-mail-button").tap(function(){
                             console.log("fr mail start");
                             if(!frMailLock){
                             console.log("inside fr mail lock")
                             frMailLock = true;
                             //console.log("ev-i tap");
                             var id = $(this).attr('data-evId');
                             
                             console.log("id: "+id);
                             var desc = eventList[id].description;
                             
                             $("#fr-mail-pop").popup("open");
                             $("#fr-mail-text").html("");
                             //var html="<div id='ev-desc-wrap'><img id='fr-mail-pic' src='https://graph.facebook.com/"+eventList[id].fbId +"/picture?width=50&height=50'><div class ='fr-mail-i'>"+desc+"</div></div>";
                             
                             //var html="<div id='ev-desc-wrap'><img id='fr-mail-pic' src='https://graph.facebook.com/"+eventList[id].fbId +"/picture?width=50&height=50'><div class ='fr-mail-i'>"+desc+"</div></div>";
                             
                             //    var friendName1 = typeof eventList[eventList[eventId].friendIdArray[0]] !=   "undefined"  ?eventList[eventList[eventId].friendIdArray[0]].nameArray[0]  + " " + eventList[eventList[eventId].friendIdArray[0]].nameArray[1]+" is going" : "event-undefined";
                             
                             //var frName = "<div id='fr-mail-first'>"+eventList[eventList[id].friendIdArray[0]].nameArray[0]+"</div><div id='fr-mail-last'>"+eventList[eventList[id].friendIdArray[0]].nameArray[q]+"";
                             
                             //console.log("frName "+frName);
                             
                             var html="<div id='fr-mail-outter'><div data-role='fieldcontain'><textarea cols='38' rows='12' name='textarea' id='fr-mail-text'></textarea></div><input id='fr-mail-send' type='submit' value='Send'></div>";
                             
                             //$("#fr-mail-text").addClass('ev-desc-i');
                             //$("#ev-desc-pop").addClass('fr-mail-i');
                             $("#fr-mail-text").html(html);
                             
                             $("#fr-mail-pop a").tap(function(){
                                                     //alert("tap");
                                                     //$( "#myPopupDiv" ).popup( "close" )
                                                     $("#fr-mail-pop").popup("close");
                                                     $("#fr-mail-pop").css({"display":"none"});
                                                     console.log("done");
                                                     });
                             
                             $("#fr-mail-text").css({
                                                    "overflow-y":"hidden!important",
                                                    "width":"100%!important",
                                                    "height":"100%!important",
                                                    "margin":"auto"
                                                    });
                             
                             
                             $("#fr-mail-pic").css({
                                                   "margin": "auto",
                                                   "width": "200px",
                                                   "height": "200px"
                                                   });
                             
                             $("#fr-mail-send").css({
                                                    "margin": "10px auto",
                                                    "width": "100%",
                                                    "height": "40px"
                                                    });
                             
                             
                             $(".fr-mail-i").css({
                                                 "word-wrap":"break-word",
                                                 "width": "100%",
                                                 "height":"385px",
                                                 "overflow-y":"scroll"
                                                 
                                                 });
                             
                             
                             $("#fr-mail-i").css({
                                                 "margin": "20px auto",
                                                 "width": "200px",
                                                 "height": "200px"
                                                 });
                             /*
                              $("#ev-rsvp-pop").css({
                              "width": "230px",
                              "height": "130px",
                              "margin-left":"-28px",
                              "padding":"10px",
                              "border-right": "solid rgba(0, 0, 0, 0.65) 50px",
                              "border-left": "solid rgba(0, 0, 0, 0.65) 50px",
                              "border-top": "solid rgba(0, 0, 0, 0.65) 100px",
                              "border-bottom": "solid rgba(0, 0, 0, 0.65) 150px"
                              
                              });
                              */
                             
                             
                             $("#fr-mail-pop").css({
                                                   /*
                                                    "margin": "auto",
                                                    "width": "80%",
                                                    "height": "70%",
                                                    */
                                                   
                                                   "width": "250px",
                                                   "height": "380px",
                                                   "margin-left":"-48px",
                                                   "padding":"10px",
                                                   "top":"0px",
                                                   "left":"14px",
                                                   "display":"block",
                                                   "position": "fixed",
                                                   "z-index":"5000!important",
                                                   //"left": "-5%",
                                                   //"top":"5%",
                                                   "border-right": "solid rgba(0, 0, 0, 0.65) 60px",
                                                   "border-left": "solid rgba(0, 0, 0, 0.65) 60px",
                                                   "border-top": "solid rgba(0, 0, 0, 0.65) 50px",
                                                   "border-bottom": "solid rgba(0, 0, 0, 0.65) 310px"
                                                   });
                             
                             $(this).addClass("fixed-pop");
                             
                             
                             setInterval(function(){
                                         frMailLock = false;
                                         },600);
                             
                             }
                             console.log("fr mail end");
                             });
    
    /*
     $(".fr-mail-button").tap(function(){
     console.log("mail tap");
     $("#fr-mail-pop").popup("open");
     //$("#fr-mail-pop").html("");
     
     
     
     var html="<div id='fr-mail-outter'><div data-role='fieldcontain'><textarea cols='40' rows='8' name='textarea' id='fr-mail-text'></textarea></div><input class='fr-mail-send' type='submit' value='Send'></div>";
     
     //$("#fr-mail-pop").addClass('ev-desc-i');
     $("#fr-mail-wrap").html("");
     $("#fr-mail-wrap").html(html);
     
     //fr-mail-pop-popup
     
     $("#fr-mail-outter").css({
     "margin": "20px auto",
     "width": "200px",
     "height": "5850px"
     });
     
     
     
     $("#fr-mail-pop").css({
     
     "margin": "auto",
     "width": "100%",
     "height": "440px",
     //"position": "absolute",
     //"position": "fixed",
     
     "left": "-14%",
     "top":"2%",
     
     "border-right": "solid rgba(0, 0, 0, 0.65) 40px",
     "border-left": "solid rgba(0, 0, 0, 0.65) 40px",
     "border-top": "solid rgba(0, 0, 0, 0.65) 60px",
     "border-bottom": "solid rgba(0, 0, 0, 0.65) 60px"
     
     });
     });
     */
}

var touchedDate;
var selectedEvId = null;
var sameRow;
var sameDate;
var first = true;
var dateCnt = false;

function setEventTap(){
    console.log("set event tap");
    /*
     $(".event-img-wrap").css('border','solid red 2px');
     
     $(".event-img-wrap").tap(function(){
     $(".event-img").css('border','solid green 2px');
     });
     */
    
    $(".friend-wrap").tap(function(){
                          
                          /*$(this).parent().addClass('events-touched');*/
                          });
    
    $(".friend-wrap").touchend(function(){
                               
                               });
    
    $(".friend-wrap").touchstart(function(){
                                 console.log("friend-wrap tap");
                                 var evId = $(this).attr('data-evId');
                                 var dateId = $(this).attr('data-dateHash');
                                 var isSelected = $(this).hasClass('friend-selected') & $(this).hasClass('event-selected');
                                 var touched = $(this).parents().eq(2).hasClass('friend-touched');
                                 var selected = $(this).parents().eq(2).hasClass('friend-selected');
                                 var formerFriendSelected = $("#friend-"+selectedEvId).parents().eq(2).hasClass('friend-selected');
                                 var friendSelected = $(this).parents().eq(2).hasClass('friend-selected');
                                 var eventSelected = $(this).parents().eq(2).hasClass('event-selected');
                                 var formerEventSelected = $("#"+selectedEvId).parents().eq(2).hasClass('event-selected');
                                 
                                 
                                 
                                 if(eventSelected){
                                 
                                 console.log("has friend-selected");
                                 $(this).parents().eq(2).removeClass('event-selected');
                                 $(this).parents().eq(2).addClass('friend-selected');
                                 
                                 }else if(formerFriendSelected){
                                 console.log("former friend");
                                 var tempHeight1 = $("#"+selectedEvId).parents().eq(3).height();
                                 
                                 if(eventSelected){
                                 //console.log("former friend/event");
                                 console.log("this has friend-selected");
                                 $(this).parents().eq(2).removeClass('event-selected');
                                 $(this).parents().eq(2).addClass('friend-selected');
                                 }else{
                                 console.log("friend cont else");
                                 $("#"+selectedEvId).parents().eq(4).addClass("notransition");
                                 var tempHeight1 = $("#"+selectedEvId).parents().eq(3).height();
                                 $("#"+selectedEvId).parents().eq(3).height(tempHeight1 - 100);
                                 $("#"+selectedEvId).parents().eq(2).removeClass('friend-selected');
                                 $("#"+selectedEvId).parents().eq(4).removeClass("notransition");
                                 }
                                 
                                 }else if(formerEventSelected){
                                 
                                 }
                                 
                                 /*
                                  if(formerFriendSelected){
                                  
                                  if(eventSelected){
                                  console.log("has event-selected");
                                  $(this).parents().eq(2).removeClass('event-selected');
                                  $(this).parents().eq(2).addClass('friend-selected');
                                  }else{
                                  $("#friend-"+selectedEvId).parents().eq(4).addClass("notransition");
                                  $("#friend-"+selectedEvId).parents().eq(2).removeClass('friend-selected');
                                  var tempHeight3 = $("#friend-"+selectedEvId).parents().eq(3).height();
                                  $("#friend-"+selectedEvId).parents().eq(2).css('height',tempHeight3 - 50);
                                  $("#friend-"+selectedEvId).parents().eq(4).removeClass("notransition");
                                  }
                                  
                                  }else if(eventSelected){
                                  console.log("has event-selected");
                                  $(this).parents().eq(2).removeClass('event-selected');
                                  $(this).parents().eq(2).addClass('friend-selected');
                                  }
                                  */
                                 
                                 
                                 
                                 if(!touched & !selected){
                                 console.log("!touched & !selected");
                                 $(this).parents().eq(2).removeClass('event-touched');
                                 $(this).parents().eq(2).addClass('friend-touched');
                                 }else if(!touched & selected){
                                 console.log("!touched & selected");
                                 }else if (touched & !selected){
                                 console.log("touched & !selected go");
                                 $(this).parents().eq(4).addClass("notransition");
                                 $(this).parents().eq(2).addClass('friend-selected');
                                 var tempHeight = $(this).parents().eq(3).height();
                                 $(this).parents().eq(3).css('height', tempHeight + 100);
                                 $(this).parents().eq(4).removeClass("notransition");
                                 
                                 }
                                 selectedEvId = $(this).attr('data-evId');
                                 });
    
    
    $(".event-img-wrap").touchstart(function(){
                                    
                                    console.log("ev-img-wrap trig");
                                    var evId = $(this).attr('data-evId');
                                    var dateId = $(this).attr('data-dateHash');
                                    var isSelected = $(this).hasClass('event-selected') & $(this).hasClass('event-selected');
                                    
                                    var touched = $(this).parents().eq(2).hasClass('event-touched');
                                    var selected = $(this).parents().eq(2).hasClass('event-selected');
                                    var friendSelected = $(this).parents().eq(2).hasClass('friend-selected');
                                    var formerEventSelected = $("#"+selectedEvId).parents().eq(2).hasClass('event-selected');
                                    
                                    
                                    if(friendSelected){
                                    
                                    console.log("has friend-selected");
                                    $(this).parents().eq(2).removeClass('friend-selected');
                                    $(this).parents().eq(2).addClass('event-selected');
                                    
                                    }else if(formerEventSelected){
                                    
                                    console.log("former event selected");
                                    var tempHeight1 = $("#"+selectedEvId).parents().eq(3).height();
                                    
                                    if(friendSelected){
                                    console.log("this has friend-selected");
                                    $(this).parents().eq(2).removeClass('friend-selected');
                                    $(this).parents().eq(2).addClass('event-selected');
                                    }else{
                                    console.log("event cont else");
                                    $("#"+selectedEvId).parents().eq(4).addClass("notransition");
                                    var tempHeight1 = $("#"+selectedEvId).parents().eq(3).height();
                                    $("#"+selectedEvId).parents().eq(3).height(tempHeight1 - 100);
                                    $("#"+selectedEvId).parents().eq(2).removeClass('event-selected');
                                    $("#"+selectedEvId).parents().eq(4).removeClass("notransition");
                                    }
                                    }
                                    
                                    if(!touched & !selected){
                                    console.log("!touched & !selected");
                                    $(this).parents().eq(2).removeClass('friend-touched');
                                    $(this).parents().eq(2).addClass('event-touched');
                                    }else if(!touched & selected){
                                    console.log("!touched & selected");
                                    }else if (touched & !selected){
                                    console.log("touched & !selected");
                                    $(this).parents().eq(4).addClass("notransition");
                                    var tempHeight = $(this).parents().eq(3).height();
                                    $(this).parents().eq(2).addClass('event-selected');
                                    
                                    if(formerEventSelected){
                                    console.log("last event selected");
                                    }else{
                                    console.log("last event selected else");
                                    if(formerEventSelected){
                                    
                                    }else{
                                    $(this).parents().eq(3).css('height', tempHeight + 100);
                                    }
                                    }
                                    
                                    $(this).parents().eq(4).removeClass("notransition");
                                    
                                    }
                                    
                                    selectedEvId = $(this).attr('id');
                                    });
    
    
    $(".event-img-wrap").touchend(function(){
                                  });
    
}

function setFriendTap(){
    console.log("set friend tap");
    $(".more-events-text-wrap").touchstart(function(){
                                           console.log("more events start");
                                           $(this).addClass('more-events-text-wrap-touched');
                                           setInterval(function(){
                                                       moreEventsLocked = false;
                                                       },600);
                                           });
    
    $(".more-events-text-wrap").touchend(function(e){
                                         console.log("more events start");
                                         $(this).removeClass('more-events-text-wrap-touched');
                                         if(!moreEventsLocked){
                                         moreEventsLocked = true;
                                         popDate(e,this);
                                         }
                                         });
    
    $(".left-ex-button").touchstart(function(){
                                    console.log("less events start");
                                    });
    
    $(".left-ex-button").touchend(function(e){
                                  console.log("less events end");
                                  popDate1(e,this);
                                  });
}

function stickyList(){
    console.log("stick list trig");
    $(".date-row").sticky({ topSpacing: 0 });
    console.log("stick list end");
}

//Doc readey happens when initial fb button page is loaded, is not triggereed after auth
$(document).ready(function () {
                  
                  
                  $("#header").sticky({ topSpacing: 0 });
                  /*
                   $("#all").click(function(){
                   alert("exListHeight: "+exListHeight);
                   var y = $(window).scrollTop();  //your current y position on the page
                   $(window).scrollTop(y-(74*(exListHeight - 3)));
                   });
                   */
                  });//Doc Ready End

function scale( width, height, padding, border ) {
    var scrWidth = $( window ).width() - 30,
    scrHeight = $( window ).height() - 30,
    ifrPadding = 2 * padding,
    ifrBorder = 2 * border,
    ifrWidth = width + ifrPadding + ifrBorder,
    ifrHeight = height + ifrPadding + ifrBorder,
    h, w;
    
    if ( ifrWidth < scrWidth && ifrHeight < scrHeight ) {
        w = ifrWidth;
        h = ifrHeight;
    } else if ( ( ifrWidth / scrWidth ) > ( ifrHeight / scrHeight ) ) {
        w = scrWidth;
        h = ( scrWidth / ifrWidth ) * ifrHeight;
    } else {
        h = scrHeight;
        w = ( scrHeight / ifrHeight ) * ifrWidth;
    }
    
    return {
        'width': w - ( ifrPadding + ifrBorder ),
        'height': h - ( ifrPadding + ifrBorder )
    };
};


$( document ).on( "pageinit", function() {
                 
                 $( "#popupMap iframe" )
                 .attr( "width", 0 )
                 .attr( "height", 0 );
                 
                 $( "#popupMap iframe" ).contents().find( "#map_canvas" )
                 .css( { "width" : 0, "height" : 0 } );
                 
                 $( "#popupMap" ).on({
                                     popupbeforeposition: function() {
                                     console.log("popupbeforeposition");
                                     var size = scale( 480, 320, 0, 1 ),
                                     w = size.width,
                                     h = size.height;
                                     
                                     $( "#popupMap iframe" )
                                     .attr( "width", "100%" )
                                     .attr( "height", "100%" );
                                     
                                     $( "#popupMap iframe" ).contents().find( "#map_canvas" )
                                     .css( { "width": w, "height" : h } );
                                     },
                                     popupafterclose: function() {
                                     $( "#popupMap iframe" )
                                     .attr( "width", 0 )
                                     .attr( "height", 0 );
                                     
                                     $( "#popupMap iframe" ).contents().find( "#map_canvas" )
                                     .css( { "width": 0, "height" : 0 } );
                                     }
                                     });
                 
                 });


$(document).on("pageinit", "#date-page", function (event) {
               
               $('#myPopupDiv').on('popupafteropen', function () {
                                   $(this).css('position','fixed');
                                   //$(this).css('top','100px');
                                   
                                   console.log("open");
                                   });
               
               $('#myPopupDiv').on('popupafterclose', function () {
                                   $(this).css('position','static');
                                   console.log("close");
                                   });
               $("#ev-rsvp-pop").on('popupafterclose', function () {
                                    console.log("rsvp page close");
                                    });
               
               $('#ev-info-pop').on('popupafteropen', function () {
                                    //$('body').css('overflow','hidden');
                                    $(this).css('position','fixed');
                                    //$(this).css('top','100px');
                                    $(this).css('margin-bottom','100px');
                                    console.log("open");
                                    });
               
               $('#ev-info-pop').on('popupafterclose', function () {
                                    $(this).css('position','static');
                                    console.log("close");
                                    //$('body').css('overflow','auto');
                                    });
               
               $("#popupMap").on('popupafteropen', function () {
                                 $(this).css('position','fixed');
                                 //$(this).css('top','100px');
                                 //$(this).css('margin-bottom','100px');
                                 console.log("map open");
                                 });
               
               $("#popupMap").on('popupafterclose', function () {
                                 $(this).css('position','static');
                                 console.log("map close");
                                 });
               
               
               $("#dateMainList").listview();
               $("#dateMainList").listview('refresh');
               $('[data-position=fixed]').fixedtoolbar({
                                                       tapToggle: false
                                                       });
               });