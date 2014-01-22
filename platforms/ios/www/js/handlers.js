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

    $(".ev-rsvp-button").tap(function(){
                     //alert("rsvp");
                             var id = $(this).attr('data-evId');
                               console.log("rsvp tap");
                          $("#myPopupDiv").popup("open");
                     });
    
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
                            var html="<img id='ev-i-pic' src='https://graph.facebook.com/"+eventList[id].fbId +"/picture?width=50&height=50'><div class ='ev-desc-i'>"+desc+"</div>";
                          $("#ev-desc-pop").addClass('ev-desc-i');
                          
                          $("#ev-desc-pop").html(html);
                          
                          $("#ev-i-pic").css({
                                             "margin": "auto",
                                             "width": "200px",
                                             "height": "200px"
                                             });
                          
                          $("#ev-info-pop").css({
                                                "margin": "auto",
                                                "width": "80%",
                                                "height": "70%",
                                                "position": "fixed",
                                                "left": "-2%",
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
    
    $(".fr-i-button").touchstart(function(){
                                 console.log("ts");
                               $(this).addClass('fr-i-button-touched');
                               });
    
    $(".fr-i-button").touchend(function(){
                               console.log("te");
                               $(this).removeClass('fr-i-button-touched');
                               });
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
                                    
                                    var evId = $(this).attr('data-evId');
                                    var dateId = $(this).attr('data-dateHash');
                                    var isSelected = $(this).hasClass('friend-selected') & $(this).hasClass('event-selected');
                                    
                                    var touched = $(this).parents().eq(1).hasClass('friend-touched');
                                    var selected = $(this).parents().eq(1).hasClass('friend-selected');
                                    
                                    /*
                                    if( ((selectedEvId == $(this).attr('data-evId')) & (selectedEvId !== null))){
                                    console.log("different friend 1");
                                    sameRow = true;
                                    
                                    }else{
                                    sameRow = flase;
                                    }
                                    */

                                    if($("#friend-"+selectedEvId).parents().eq(1).hasClass('friend-selected')){
                                    
                                    if($(this).parents().eq(1).hasClass('event-selected')){
                                    console.log("has event-selected");
                                    $(this).parents().eq(1).removeClass('event-selected');
                                    $(this).parents().eq(1).addClass('friend-selected');
                                    }else{
                                    
                                    $("#friend-"+selectedEvId).parents().eq(3).addClass("notransition");
                                    $("#friend-"+selectedEvId).parents().eq(1).removeClass('friend-selected');
                                    var tempHeight3 = $("#friend-"+selectedEvId).parents().eq(2).height();
                                    $("#friend-"+selectedEvId).parents().eq(2).css('height',tempHeight3 - 50);
                                    $("#friend-"+selectedEvId).parents().eq(3).removeClass("notransition");
                                    
                                    }
                                    
                                    }else if($(this).parents().eq(1).hasClass('event-selected')){
                                    console.log("has event-selected");
                                    $(this).parents().eq(1).removeClass('event-selected');
                                    $(this).parents().eq(1).addClass('friend-selected');
                                    
                                    /*
                                    if($(this).parents().eq(1).hasClass('event-selected')){
                                    console.log("has event-selected");
                                    $(this).parents().eq(1).removeClass('event-selected');
                                    $(this).parents().eq(1).addClass('friend-selected');
                                    }else{
                                    
                                    console.log("contract trig");
                                    
                                    $("#"+selectedEvId).parents().eq(3).addClass("notransition");
                                    $("#"+selectedEvId).parents().eq(1).removeClass('friend-selected');
                                    $("#"+selectedEvId).parents().eq(1).removeClass('event-selected');
                                    var tempHeight1 = $("#"+selectedEvId).parents().eq(2).height();
                                    $("#"+selectedEvId).parents().eq(2).css('height',tempHeight1 - 100);
                                    $("#"+selectedEvId).parents().eq(3).removeClass("notransition");
                                    
                                    }
                                    */
                                     }
                                    
                                    if(!touched & !selected){
                                    
                                    console.log("!touched & !selected");
                                    
                                    $(this).parents().eq(1).removeClass('event-touched');
                                    $(this).parents().eq(1).addClass('friend-touched');
                                    
                                    }else if(!touched & selected){
                                    
                                    console.log("!touched & selected");
                                    
                                    }else if (touched & !selected){
                                    
                                    console.log("touched & !selected");
                                    
                                    $(this).parents().eq(2).addClass("notransition");
                                    $(this).parents().eq(1).addClass('friend-selected');
                                    var tempHeight = $(this).parents().eq(2).height();
                                    $(this).parents().eq(2).css('height', tempHeight + 50);
                                    $(this).parents().eq(2).removeClass("notransition");
                                    
                                    }
                                    

                                      selectedEvId = $(this).attr('data-evId');
                               });

    
    $(".event-img-wrap").touchstart(function(){
                                    console.log("ing-wrap trig");
                                    var evId = $(this).attr('data-evId');
                                    var dateId = $(this).attr('data-dateHash');
                                    var isSelected = $(this).hasClass('event-selected') & $(this).hasClass('event-selected');
                                    
                                    var touched = $(this).parents().eq(1).hasClass('event-touched');
                                    var selected = $(this).parents().eq(1).hasClass('event-selected');
                                    
                                    /*
                                     if( ((selectedEvId == $(this).attr('data-evId')) & (selectedEvId !== null))){
                                     console.log("different friend 1");
                                     sameRow = true;
                                     
                                     }else{
                                     sameRow = flase;
                                     }
                                     */
                                    
                                    //console.log("#friend-"+$("#friend-"+selectedEvId).parents().eq(2).html());
                                    //console.log("#-"+$("#"+selectedEvId).parents().eq(2).html());
                                    
                                    if($(this).parents().eq(1).hasClass('friend-selected')){
                                    console.log("has friend-selected");
                                    $(this).parents().eq(1).removeClass('friend-selected');
                                    $(this).parents().eq(1).addClass('event-selected');
                                    /*
                                    console.log("friend cont else");
                                    
                                     if($(this).parents().eq(1).hasClass('friend-selected')){
                                    console.log("has friend-selected");
                                    $(this).parents().eq(1).removeClass('friend-selected');
                                    $(this).parents().eq(1).addClass('event-selected');
                                     }else{
                                    
                                    $("#friend-"+selectedEvId).parents().eq(3).addClass("notransition");
                                    $("#friend-"+selectedEvId).parents().eq(1).removeClass('friend-selected');
                                    var tempHeight3 = $("#friend-"+selectedEvId).parents().eq(2).height();
                                    $("#friend-"+selectedEvId).parents().eq(2).css('height',tempHeight3 - 50);
                                    $("#friend-"+selectedEvId).parents().eq(3).removeClass("notransition");
                                    
                                    }
                                    */
                                    }else if($("#"+selectedEvId).parents().eq(1).hasClass('event-selected')){
                                    
                                     if($(this).parents().eq(1).hasClass('friend-selected')){
                                    console.log("has friend-selected");
                                    $(this).parents().eq(1).removeClass('friend-selected');
                                    $(this).parents().eq(1).addClass('event-selected');
                                     }else{
                                    
                                    console.log("event cont else");
                                    
                                    $("#"+selectedEvId).parents().eq(3).addClass("notransition");
                                    //$("#"+selectedEvId).parents().eq(1).removeClass('friend-selected');
                                    $("#"+selectedEvId).parents().eq(1).removeClass('event-selected');
                                    var tempHeight1 = $("#"+selectedEvId).parents().eq(2).height();
                                    $("#"+selectedEvId).parents().eq(2).css('height',tempHeight1 - 50);
                                    $("#"+selectedEvId).parents().eq(3).removeClass("notransition");
                                    
                                    }
                                    
                                    }
                                    
                                    if(!touched & !selected){
                                    
                                    console.log("!touched & !selected");
                                    
                                    $(this).parents().eq(1).removeClass('friend-touched');
                                    $(this).parents().eq(1).addClass('event-touched');
                                    
                                    }else if(!touched & selected){
                                    
                                    console.log("!touched & selected");
                                    
                                    }else if (touched & !selected){
                                    
                                    console.log("touched & !selected");
                                    
                                    $(this).parents().eq(2).addClass("notransition");
                                    $(this).parents().eq(1).addClass('event-selected');
                                    var tempHeight = $(this).parents().eq(2).height();
                                    $(this).parents().eq(2).css('height', tempHeight + 50);
                                    $(this).parents().eq(2).removeClass("notransition");
                                    
                                    }
                                    
                                    selectedEvId = $(this).attr('id');

                                 });
                             
    
    $(".event-img-wrap").touchend(function(){

                               });

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
                                             console.log("more events touch end");
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
                                      console.log("left ex touch end");
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
                
                   $('#ev-info-pop').on('popupafteropen', function () {
                                       $(this).css('position','fixed');
                                       //$(this).css('top','100px');
                                       $(this).css('margin-bottom','100px');
                                       console.log("open");
                                       });
                   
                   $('#ev-info-pop').on('popupafterclose', function () {
                                       $(this).css('position','static');
                                       console.log("close");
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
