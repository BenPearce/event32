var moreEventsLocked = false;

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
    
    function setFriendTap(){
        
        $(".more-events-text-wrap").touchstart(function(){
                                 $(this).addClass('more-events-button-touched');
                                 });
        
        $(".more-events-text-wrap").touchend(function(){
                                 $(this).removeClass('more-events-button-touched');
                                 });

                         		$(".more-events-text-wrap").tap(function(e){
                                                                //alert("tap");
                         				//disable_scroll();
                                                                if(!moreEventsLocked){
                                                                moreEventsLocked = true;
                         				
                         				//populateDate($(this).attr('data-dateId'),e);
                                        popDate(e,this);
                         				
                                                                setInterval(function(){
                                                                moreEventsLocked = false;
                                                                            },500);
                                                                }
                         		});

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
