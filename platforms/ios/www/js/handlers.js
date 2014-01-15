var moreEventsLocked = false;
var moreEventExLock = false;

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

function setButtons(){
    
    /*
    $(".rsvp-button").tap(function(){
                     alert("rsvp");
                     });
     */
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
    $(".map-button").touchstart(function(){
                                $(this).addClass('mapTouched');
                                
                                });
    
    $(".map-button").touchend(function(){
                              $(this).removeClass('mapTouched');
                              });
    
    $(".rsvp-button").touchstart(function(){
                                 $(this).addClass('checkTouched');
                                 
                                 });
    
    $(".rsvp-button").touchend(function(){
                               $(this).removeClass('checkTouched');
                               });
}

function setEventTap(){
    console.log("set event tap");
    /*
    $(".event-img-wrap").css('border','solid red 2px');
    
    $(".event-img-wrap").tap(function(){
                        $(".event-img").css('border','solid green 2px');
                        });
     */
    
    /*
     
     
     */
    
    $(".friend-wrap").tap(function(){
                       
                          /*$(this).parent().addClass('events-touched');*/
                          });
    
    var touchedDate;
    var selectedEvId = null;
    var sameRow;
    var sameDate;
    var first = true;
    
       $(".friend-wrap").touchstart(function(){
                                    //var first = false;
                                    var dateId = $(this).attr('data-dateHash');

                                    if( (touchedDate == parseInt($(this).attr('data-dateHash')))){
                                    sameDate = true;
                                    }

                                    if( (!(selectedEvId == $(this).attr('data-evId')) & selectedEvId !== null)){
                                    console.log("different friend 1");
                                    sameRow = false;
                                    
                                    }else{
                                    sameRow = true;
                                    }
                                      var height = parseInt($(this).parents().eq(2).height()) + 50;
                                    
                                         $(this).parents().eq(2).addClass("notransition");
                                    
                                    if(selectedEvId !== null){
                                    first = false;
           
      
                                    }

                                    touchedDate = parseInt($(this).attr('data-dateHash'));
                                    //touchedEvId = $(this).attr("id");
                                    /*$(this).parents().eq(2).css('height','');*/
    

                                    /*$(this).parents().eq(2).css('height',height);*/
                                    
                                    /*
                                    $(this).parents().eq(1).removeClass('event-selected');
                                    $(this).parents().eq(1).removeClass('event-touched');
                                    */

                                    var touched = $(this).parents().eq(1).hasClass('friend-touched');
                                    var selected = $(this).parents().eq(1).hasClass('friend-selected');
                                    
                                    $(this).parents().eq(1).removeClass('friend-touched');
                                    $(this).parents().eq(1).removeClass('friend-selected');
                                    $(this).parents().eq(1).removeClass('event-touched');
                                    $(this).parents().eq(1).removeClass('event-selected');
                                    /*
                                    $('.friend-selected').removeClass('friend-selected');
                                    $('.friend-touched').removeClass('friend-touched');
                                    $('.event-selected').removeClass('event-selected');
                                    $('.event-touched').removeClass('event-touched');
                                     */
                                    /*
                                    $(this).removeClass('event-touched');
                                    $(this).removeClass('event-selected');
                                    */
                                    if(touched & selected){
                                    $(this).parents().eq(1).removeClass('friend-selected');
                                    $(this).parents().eq(1).addClass('friend-touched');
                                    
                                    } else if(touched & !selected){
                                    
                                    if(!sameRow){
                                    console.log("different friend 2");
                                    //$("#friend-"+touchedEvId).parents().eq(1).removeClass('friend-touched');
                                    $("#friend-"+selectedEvId).parents().eq(1).removeClass('friend-selected');
                                    //$("#friend-"+selectedEvId).parents().eq(1).removeClass('friend-touched');
                                    }
                                    selectedEvId = $(this).attr('data-evId');
                                        if(first){
                                    console.log("first");
                                    $(this).parents().eq(2).css('height',height);
                                        }
                                    
                                    $(this).parents().eq(1).addClass('friend-touched');
                                    $(this).parents().eq(1).addClass('friend-selected');
                                    
                                    }else if(!touched & !selected){
                                    
                                     $(this).parents().eq(1).addClass('friend-touched');
                                    
                                    }else if(!touched & selected){
                                    
                                    console.log("selected but not touched");
                                    
                                    }else{
                                    
                                    console.log("Logical Error");
                                    
                                    }
                                    $(this).parents().eq(3).removeClass("notransition");
                                    /*
                                    if($(this).parent().hasClass('friend-touched')){
                                    $(this).parent().addClass('friend-selected');
                                    
                                    }else{
                             $(this).parent().removeClass('event-touched');
                             $(this).parent().addClass('friend-touched');
                                    }
                                     */
                                    
                               });
    
    $(".friend-wrap").touchend(function(){

                                 });
    
    $(".event-img-wrap").touchstart(function(){
                                 var dateId = $(this).attr('data-dateHash');
                                    touchedDate = parseInt($(this).attr('data-dateHash'));
                                    
                                  selectedEvId = $(this).attr("id");
                                    console.log("touchedEvId: "+selectedEvId);
                                    /*
                                    $(this).parents().eq(1).removeClass('friend-selected');
                                    $(this).parents().eq(1).removeClass('friend-touched');
                                    */
                                    var touched = $(this).parents().eq(1).hasClass('event-touched');
                                    var selected = $(this).parents().eq(1).hasClass('event-selected');
                                    
                                    
                                    /*
                                     console.log("touch start");
                                     $('.friend-selected').removeClass('friend-selected');
                                     $('.friend-touched').removeClass('friend-touched');
                                    
                                    $('.event-selected').removeClass('event-selected');
                                    $('.event-touched').removeClass('event-touched');
                                    */
                                    
                                    $(this).parents().eq(1).removeClass('friend-touched');
                                    $(this).parents().eq(1).removeClass('friend-selected');
                                    $(this).parents().eq(1).removeClass('event-touched');
                                    $(this).parents().eq(1).removeClass('event-selected');
                                    
                                    if(touched & selected){
                                    $(this).parents().eq(1).removeClass('event-selected');
                                    $(this).parents().eq(1).addClass('event-touched')
                                    }if(touched & !selected){
                                    $(this).parents().eq(1).addClass('event-touched');
                                    $(this).parents().eq(1).addClass('event-selected');
                                    }if(!touched & !selected){
                                    $(this).parents().eq(1).addClass('event-touched');
                                    }else{
                                    console.log("friend state other case");
                                    }
                                    /*
                                 $(this).parent().removeClass('friend-touched');
                                 $(this).parent().addClass('event-touched');
                                             */
                                 });
                             
    
    $(".event-img-wrap").touchend(function(){
                            /*$(this).parent().removeClass('event-touched');
                              $(this).parent().addClass('friend-touched');*/
                               });
/*
    $(".event-img-wrap").touchstart(function(){
                                console.log("event touch");
                                $(this).addClass('events-touched');
                           
                                setInterval(function(){
                                            moreEventExLock = false;
                                            },600);

                                });

    $(".event-img-wrap").touchend(function(){
                                         
                                           if(!moreEventsLocked){
                                           moreEventExLock = true;
                              eventExpand(this);
                                           //popDate(e,this);
                                           }
                                           $(this).removeClass('events-touched');
                                
                                });
    */


}

    function setFriendTap(){
        console.log("set friend tap");
        $(".more-events-text-wrap").touchstart(function(){
                                               $(this).addClass('more-events-text-wrap-touched');
                                               setInterval(function(){
                                                           moreEventsLocked = false;
                                                           },600);
                                 });
        
        $(".more-events-text-wrap").touchend(function(e){
                                             $(this).removeClass('more-events-text-wrap-touched');
                                             if(!moreEventsLocked){
                                             moreEventsLocked = true;
                                             popDate(e,this);
                                             }
                                 });
        
        $(".left-ex-button").touchstart(function(){
                                        console.log("ts");
                                               });
        
        $(".left-ex-button").touchend(function(e){
                                       console.log("te");
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


$( document ).on( "pageinit", function() {
                 $( "#popupMap iframe" )
                 .attr( "width", 0 )
                 .attr( "height", 0 );
                 
                 $( "#popupMap iframe" ).contents().find( "#map_canvas" )
                 .css( { "width" : 0, "height" : 0 } );
                 
                 $( "#popupMap" ).on({
                                     popupbeforeposition: function() {
                                     var size = scale( 480, 320, 0, 1 ),
                                     w = size.width,
                                     h = size.height;
                                     
                                     $( "#popupMap iframe" )
                                     .attr( "width", w )
                                     .attr( "height", h );
                                     
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
        $("#dateMainList").listview();
        $("#dateMainList").listview('refresh');
        $('[data-position=fixed]').fixedtoolbar({
            tapToggle: false
        });
    });
