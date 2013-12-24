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

                         		$(".more-events-text-wrap").tap(function(e){
                                                                //alert("tap");
                         				disable_scroll();
                         				$(this).addClass('more-events-button-touched');
                         				//populateDate($(this).attr('data-dateId'),e);
                                        popDate($(this).attr('data-dateId'),e);
                         				$(this).removeClass('more-events-button-touched');
                                                                
                                                        //expandedDate = $(this).attr('data-dateId');
                         		});

                    	}

    //Doc readey happens when initial fb button page is loaded, is not triggereed after auth
    $(document).ready(function () {
    		       });//Doc Ready End


    $(document).on("pageinit", "#date-page", function (event) {
        $("#dateMainList").listview();
        $("#dateMainList").listview('refresh');
        $('[data-position=fixed]').fixedtoolbar({
            tapToggle: false
        });
    });
