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

function setEventTap(){
    console.log("set event tap");
    /*
    $(".event-img-wrap").css('border','solid red 2px');
    
    $(".event-img-wrap").tap(function(){
                        $(".event-img").css('border','solid green 2px');
                        });
     */

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


}



    function setFriendTap(){
        
        $(".more-events-text-wrap").touchstart(function(){
                                 $(this).addClass('more-events-button-touched');
                                               
                                               setInterval(function(){
                                                           moreEventsLocked = false;
                                                           },600);
                                 });
        
        $(".more-events-text-wrap").touchend(function(e){
                                             if(!moreEventsLocked){
                                             moreEventsLocked = true;
                                             popDate(e,this);
                                             }
                                 $(this).removeClass('more-events-button-touched');
                                 });
/*
                         		$(".more-events-text-wrap").tap(function(e){

     
                         		});
*/
                    	}

    //Doc readey happens when initial fb button page is loaded, is not triggereed after auth
    $(document).ready(function () {
                      
                      $("#all").click(function(){
                                      alert("exListHeight: "+exListHeight);
                                      var y = $(window).scrollTop();  //your current y position on the page
                                      $(window).scrollTop(y-(74*(exListHeight - 3)));
                                      });
    		       });//Doc Ready End


    $(document).on("pageinit", "#date-page", function (event) {
        $("#dateMainList").listview();
        $("#dateMainList").listview('refresh');
        $('[data-position=fixed]').fixedtoolbar({
            tapToggle: false
        });
    });
