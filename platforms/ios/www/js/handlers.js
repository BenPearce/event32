    
                        	function setFriendTap(){  
                        		//$(".date-displayer").click(function () {
                        		$(".date-displayer").tap(function () {
                        var eveId = $(this).attr('id').toString().substr(parseInt($(this).attr('id').toString().indexOf("-"))+1);
                        eveId = parseInt(eveId);
                        populateCalendar(eveningHash[eveId].friendIdArray);
                        		});
                        		
                         		$(".more-events-button").click(function () {
                         				//I need a fast function that will take a date and a friend list and populate that date
                         			  var eveId = $(this).attr('id').toString().substr(parseInt($(this).attr('id').toString().indexOf("-"))+1);
                                                 eveId = parseInt(eveId);
                         			//This needs to take current date and friendgroup as an imput and add un displayed events to date
                         		});
                         		
                         		$(".friend-pic-wrap").bind('touchstart',function(){
                         		//$(this).toggleClass('friend-wrap-touched','add');
                         		$(this).addClass('friend-pic-wrap-touched');
                         		 
                         		});
                         		
                         		$(".friend-pic-wrap").bind('touchend',function(){
                         		$(this).removeClass('friend-pic-wrap-touched');
                         		});
                         		/*
                         		$(".more-events-text-wrap").click(function () {
                         				alert("tap");
                         					//$(this).addClass('more-events-button-touched');	
                         		});
                         		*/
                         		
                         		
                         		$(".more-events-text-inner-wrap").bind('touchstart',function(){
                         			$(this).addClass('more-events-button-touched');	
                         		});
                         		
                         		$(".more-events-text-inner-wrap").bind('touchend',function(e){
                         				//alert("touchend");
                         			$(this).removeClass('more-events-button-touched');
                         			//var eveId = $(this).attr('id').toString().substr(parseInt($(this).attr('id').toString().indexOf("-"))+1);
                                                 //$(this).removeClass('more-events-button-touched');
                         			var eveId = $(this).attr('id').toString().substr(parseInt($(this).attr('id').toString().indexOf("-"))+1);
                         			//alert("touchend");
                         			populateDate(eveId,e);
                         			//alert(eveId);
                         			//moreevents-
                         		});
                         		
                         		/*
                         		$(".more-events-text-inner-wrap").click('touchend',function(e){
                         			$(this).removeClass('more-events-button-touched');
                         			var eveId = $(this).attr('id').toString().substr(parseInt($(this).attr('id').toString().indexOf("-"))+1);
                         			populateDate(eveId,e);
                                                 //alert(eveId);
                         			//moreevents-
                         		});                 		
                         		
                         		*/
                         		$(".event-wrap").bind('touchstart',function(){
                         			$(this).addClass('event-wrap-touched');	
                         		});
                         		
                         		$(".event-wrap").bind('touchend',function(){
                         			$(this).removeClass('event-wrap-touched');
                         		});
                         		
                         		$(".friend-pic-wrap").bind('touchstart',function(){
                         			$(this).addClass('friend-pic-wrap-touched');	
                         		});
                         		
                         		$(".friend-pic-wrap").bind('touchend',function(){
                         			$(this).removeClass('friend-pic-wrap-touched');	
                         		});
/*
                         		$(".friend-pic-wrap").mouseover(function(){	
                         		});
                         		*/
                         		
                         		
                         		
                                        /*
                                         $(".friend-pic-wrap").tap(function(){
                                         		 if(!friendTapped){
                                         		 	 friendTapped = true;
                        var eventId = $(this).attr('id').toString().substr(parseInt($(this).attr('id').toString().indexOf("-"))+1);
                        eventId = parseInt(eventId);	
                        //alert(fbArray[eventId].name);
    	        		$('.selected-event-ex').toggleClass("selected-event-ex","remove");
    	        		populateCalendar(fbArray[eventId].friendIdArray);    	        		
    	        		//Probably need to replace the line below with something quicker
    	        		
    	        		//var friendGroupHeader = $("#friend-"+eventId).clone();
    	        		//$("#header-pic").html(friendGroupHeader);
    	        		
    	        		setTimeout(function(){
    	        		friendTapped = false;
    	        		},1000);
    	        		
    	        					 }
    	        		
                         }); 
                         */
                         
                         
                        	/*                    	   
                    	   $(".event-friend-group-wrap").tap(function () {
                    	   //$(".event-friend-group-wrap").click(function () { 
                        var eventId = $(this).attr('id').toString().substr(parseInt($(this).attr('id').toString().indexOf("-"))+1);
                        eventId = parseInt(eventId);		 		 
    	        		$('.selected-event-ex').toggleClass("selected-event-ex","remove");
    	        		populateCalendar(eveningHash[eventId].friendIdArray);
                    });	
                    */
                    	}
                    	
                     
    	        	$("#all").tap(function(){	                                
    	        		$('.selected-event-ex').toggleClass("selected-event-ex","remove");
    	        		populateCalendar(friendArray.slice(0));
                         });   	

    //Doc readey happens when initial fb button page is loaded, is not triggereed after auth
    $(document).ready(function () {
    		    //alert("doc ready");
    		    /*
    		    FB.api('/me/permissions', function(response){
    		    		    
    		    });
    		    */
                    
                    $('#testButton').tap(function(){
                    	var y = $(window).scrollTop();  //your current y position on the page      
                    	$(window).scrollTop(y-testGap);   
                    });

                    /*
    		         $(document).bind("scrollstart", function() {
    		         		 
    		         		 if(typeof touchedFriendSelector != "undefined"){
    		        touchedFriendSelector.find(".friend-wrap").css('background','hsl(0, 0%, 93%)');    
    	    		touchedFriendSelector.find(".fbProfileImg").css("border","1px solid hsl(0, 0%, 93%)");
    	    				 }
    		         });
    		         
    		        		      $(document).bind("scrollstop", function() {
    		      		      if(!lock){
    		      		   var ST = $(window).scrollTop();
		   		   ST = parseInt(ST);
		   		   var diff = $(document).height() - $(window).height();
		   		   diff = parseInt(diff);
		   		   var newDiff = ST - diff;
		   		   if (newDiff >= 5){
		   		   	   if(paginationUrl != "undefined"){;
		   		   	   	   mainInit(paginationUrl);
		   		   	   }
		   		   }
		   		      }
    		      });  
    		      */
    });//Doc Ready End


    $(document).on("pageinit", "#date-page", function (event) {
        $("#dateMainList").listview();
        $("#dateMainList").listview('refresh');
        $('[data-position=fixed]').fixedtoolbar({
            tapToggle: false
        });
    });
