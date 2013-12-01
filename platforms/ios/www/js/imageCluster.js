            //If we want to populate row by row we should switch argument to eveningHashSubset[i]
            //Since we've already filtered through friendGroup and created eveningHashSubset we can probably parse through eveningHashSubset[i].eventIdArray 
            //We should create list elements with handlers set and create some low cpu expansion for header click event

            function getEventRow(eventId,eventClass){
            	    console.log("getEventRow eventID: "+eventId);
            	    var eventRowHtml;

            	    		    var eventImageClusterHtml;

            	var displayTextZero = typeof fbArray[fbArray[eventId].friendIdArray[0]] !=   "undefined"  ? fbArray[fbArray[eventId].friendIdArray[0]].nameArray[0]  + " " + fbArray[fbArray[eventId].friendIdArray[0]].nameArray[1] : "event-undefined";
                
            	 var friendName = typeof fbArray[fbArray[eventId].friendIdArray[0]] !=   "undefined"  ?"<div class='friend-first-name-wrap'>"+fbArray[fbArray[eventId].friendIdArray[0]].nameArray[0]  + "</div><div class='friend-first-last-wrap'>" + fbArray[fbArray[eventId].friendIdArray[0]].nameArray[1] +"</div>" : "event-undefined";
                 var eventName = typeof fbArray[eventId] !=   "undefined"  ? fbArray[eventId].name : "eventNameUndefined";
                 
            	 var friendPre = '<div class="event-friend-img-wrap"><img class="event-friend-img" style="pointer-events:none" width=50 height=50 src="'; 

            	 var eventPre = '<img class="event-img" style="pointer-events:none" width=50 height=50 src="'; 
	         var post1 = '">'; 
	         var post = '"></div>'; 
	         var friendTitlePre = '<div class="event-friend-img-wrap event-friend-img">';
	         var titlePost = '"></div>';  
            	 var friendImg = typeof fbArray[eventId].friendIdArray[0] != "undefined"  ? friendPre + "https://graph.facebook.com/"+fbArray[fbArray[eventId].friendIdArray[0]].fbId +"/picture?width=50&height=50" + post : friendPre + "images/pinkX.png"+ post;
            	 var eventImg = typeof fbArray[eventId].friendIdArray[0] != "undefined"  ? eventPre + "https://graph.facebook.com/"+eventId +"/picture?width=50&height=50" + post1 : eventPre + "images/pinkX.png"+ post;
          	 
            	 if(fbArray[eventId].friendIdArray.length == 0){
            	 
            	 return '<div class="row-wrap"><div class="event-wrap '+eventClass+'"><div class="row-pic event-pic">'+eventImg+'</div><div class="row-title-wrap event-title-wrap"><div class="row-title event-title">'+eventName+'</div></div></div><div class="friend-wrap"><div class="row-pic-wrap friend-pic-wrap" id="friend-'+eventId+'"><div class="row-pic friend-pic">'+friendImg+'</div></div><div class="row-title-wrap friend-title-wrap"><div class="row-title friend-title">'+friendName+'</div></div></div></div>';
            	 
            	 } else if (fbArray[eventId].friendIdArray.length == 1){
            	 
                  //return '<div class="row-wrap"><div class="event-wrap '+eventClass+'"><div class="row-pic-wrap event-pic-wrap"><div class="row-pic event-pic">'+eventImg+'</div></div><div class="row-title-wrap event-title-wrap"><div class="row-title event-title">'+eventName+'</div></div></div><div class="friend-wrap"><div class="row-pic-wrap friend-pic-wrap" id="friend-'+eventId+'"><div class="row-pic friend-pic">'+friendImg+'</div></div><div class="row-title-wrap friend-title-wrap"><div class="row-title friend-title">'+friendName+'</div></div></div></div>';
                 // return '<div class="row-wrap"><div class="event-wrap '+eventClass+'"><div class="row-pic-wrap event-pic-wrap">'+eventImg+'</div><div class="row-title-wrap event-title-wrap"><div class="row-title event-title">'+eventName+'</div></div></div><div class="friend-wrap"><div class="row-pic-wrap friend-pic-wrap" id="friend-'+eventId+'"><div class="row-pic friend-pic">'+friendImg+'</div></div><div class="row-title-wrap friend-title-wrap"><div class="row-title friend-title">'+friendName+'</div></div></div></div>';
                 
                                   return '<div class="row-wrap"><div class="event-wrap '+eventClass+'">'+eventImg+'<div class="row-title-wrap event-title-wrap"><div class="row-title event-title">'+eventName+'</div></div></div><div class="friend-wrap"><div class="row-pic-wrap friend-pic-wrap" id="friend-'+eventId+'"><div class="row-pic friend-pic">'+friendImg+'</div></div><div class="row-title-wrap friend-title-wrap"><div class="row-title friend-title">'+friendName+'</div></div></div></div>';



            	 } else {
            	 var pre = '<div class="event-friend-img-wrap-quad"><img class="event-friend-img-quad" style="pointer-events:none" width=25 height=25 src="';      
		 var preLeft = '<div class="event-friend-img-wrap-quad left"><img class="event-friend-img-quad" style="pointer-events:none" width=25 height=25 src="'; 
		 var preRight = '<div class="event-friend-img-wrap-quad right"><img class="event-friend-img-quad" style="pointer-events:none" width=25 height=25 src="'; 
	         var post = '"></div>'; 
	         var friendImgQuad = typeof fbArray[eventId].friendIdArray[0] != "undefined"  ? friendPre + "https://graph.facebook.com/"+fbArray[fbArray[eventId].friendIdArray[0]].fbId +"/picture?width=25&height=25" + post : friendPre + "images/pinkX.png"+ post;
            	 var friendNameQuad = typeof fbArray[fbArray[eventId].friendIdArray[0]] !=   "undefined"  ?"<div class='friend-first-name-wrap'>"+fbArray[fbArray[eventId].friendIdArray[0]].nameArray[0]  + "</div><div class='friend-first-last-wrap'>" + fbArray[fbArray[eventId].friendIdArray[0]].nameArray[1] +"</div><div class='extra-attendees-wrap'>+ "+(fbArray[eventId].friendIdArray.length - 1)+" more</div>" : "event-undefined";

            	 
            	 var zero = typeof fbArray[eventId].friendIdArray[0] != "undefined"  ? preLeft + "https://graph.facebook.com/"+fbArray[fbArray[eventId].friendIdArray[0]].fbId +"/picture?width=25&height=25" + post : pre + "images/pinkX.png"+ post;
		 var one = typeof fbArray[eventId].friendIdArray[1] != "undefined" ? preRight + "https://graph.facebook.com/"+fbArray[fbArray[eventId].friendIdArray[1]].fbId +"/picture?width=25&height=25" + post : pre + "images/pinkX.png"+ post;      
		 var two = typeof fbArray[eventId].friendIdArray[2] != "undefined" ? preLeft + "https://graph.facebook.com/"+fbArray[fbArray[eventId].friendIdArray[2]].fbId +"/picture?width=25&height=25" + post : pre + "images/pinkX.png"+ post;
                 var three = typeof fbArray[eventId].friendIdArray[3] != "undefined" ? preRight + "https://graph.facebook.com/"+fbArray[fbArray[eventId].friendIdArray[3]].fbId +"/picture?width=25&height=25" + post : pre + "images/pinkX.png"+ post;

                 return '<div class="row-wrap"><div class="event-wrap '+eventClass+'"><div class="row-pic-wrap event-pic-wrap"><div class="row-pic event-pic">'+eventImg+'</div></div><div class="row-title-wrap event-title-wrap"><div class="row-title event-title">'+eventName+'</div></div></div><div class="friend-wrap"><div class="row-pic-wrap friend-pic-wrap" id="friend-'+eventId+'"><div class="attendee-quad-row"><div class="friend-pic-wrap-quad"><div class="friend-pic-quad">'+zero+'</div></div><div class="friend-pic-wrap-quad"><div class="friend-pic-quad">'+one+'</div></div></div><div class="attendee-quad-row"><div class="friend-pic-wrap-quad"><div class="friend-pic-quad">'+two+'</div></div><div class="friend-pic-wrap-quad"><div class="friend-pic-quad">'+three+'</div></div></div></div></div><div class="row-title-wrap friend-title-wrap"><div class="row-title friend-title">'+friendNameQuad+'</div></div></div></div>';
            	 }
            }

            function getEventHtml(evening){
            	    if(evening.eventIdArray.length == 0){
            	    }else if(evening.eventIdArray.length == 1){
            	    	    return getEventRow(evening.eventIdArray[0]);
            	    	     }else if(evening.eventIdArray.length == 2){
            	    	     	              	    	     return getEventRow(evening.eventIdArray[0]) + getEventRow(evening.eventIdArray[1]);            	    	     	     
            	    	     	      }else if(evening.eventIdArray.length == 3){            	    	     	      	      
            	    	     	      	                  	    	     return getEventRow(evening.eventIdArray[0]) + getEventRow(evening.eventIdArray[1]) + getEventRow(evening.eventIdArray[2]);
            	    	     	      	       }else{
            	    	     return getEventRow(evening.eventIdArray[0]) + getEventRow(evening.eventIdArray[1]) + getEventRow(evening.eventIdArray[2]) + getEventRow(evening.eventIdArray[3]);
            	    }
            }
           
            function getImageCluster(groupArray){    
		    if(groupArray.length == 0){ 
		    	
		    	    	           var pre = '<div class="event-friend-img-wrap" style="height:100px;width:100px"><img class="event-friend-img" width=50 height=50 src="';      
	           var post = '"></div>'; 
		    	    var zero = typeof groupArray[0] != "undefined" ? pre + "https://graph.facebook.com/"+fbArray[groupArray[0]].fbId +"/picture?width=50&height=50" + post : pre + "images/pinkX.png"+ post;
	     		    return '<div class="attendee-wrap"><div class="attendee-block" style="height:100px;width:100px">'+zero+'</div></div>'; 

		    	    }else if ((groupArray.length == 1)){
		    	    	    
	  	  	           var pre = '<div class="event-friend-img-wrap" ><img class="event-friend-img" width=50 height=50 src="';      
	          var post = '"></div>'; 
	  	  var zero = typeof groupArray[0] != "undefined" ? pre + "https://graph.facebook.com/"+fbArray[groupArray[0]].fbId +"/picture?width=50&height=50" + post : pre + "images/pinkX.png"+ post;
	  	  
	  	  if(fbArray[groupArray[0]].type == 'friend'){

		  	  return '<div class="attendee-wrap"><div class="attendee-block" style="height:50px;width:50px">'+zero+'</div></div>'; 

	  	  }else if (fbArray[groupArray[0]].type == 'event'){

	  	  return '<div class="attendee-wrap"><div class="attendee-block" style="height:50px;width:50px">'+zero+'</div></div>'; 

	  	  }	  	  	  
			}else{				
				if(fbArray[groupArray[0]].type == 'friend'){
		 var pre = '<div class="event-friend-img-wrap"><img class="event-friend-img" width=25 height=25 src="';      
		 var preLeft = '<div class="event-friend-img-wrap left"><img class="event-friend-img" width=25 height=25 src="'; 
		 var preRight = '<div class="event-friend-img-wrap right"><img class="event-friend-img" width=25 height=25 src="'; 
	         var post = '"></div>'; 
		  var titlePre = '<div class="friend-img-wrap event-friend-img">';
	         var titlePost = '"></div>';
	         var zero = typeof groupArray[0] != "undefined"  ? preLeft + "https://graph.facebook.com/"+fbArray[groupArray[0]].fbId +"/picture?width=50&height=50" + post : pre + "images/pinkX.png"+ post;
		 var one = typeof groupArray[1] != "undefined" ? preRight + "https://graph.facebook.com/"+fbArray[groupArray[1]].fbId +"/picture?width=50&height=50" + post : pre + "images/pinkX.png"+ post;      
		 var two = typeof groupArray[2] != "undefined" ? preLeft + "https://graph.facebook.com/"+fbArray[groupArray[2]].fbId +"/picture?width=50&height=50" + post : pre + "images/pinkX.png"+ post;
                 var three = typeof groupArray[3] != "undefined" ? preRight + "https://graph.facebook.com/"+fbArray[groupArray[3]].fbId +"/picture?width=50&height=50" + post : pre + "images/pinkX.png"+ post;
             
                 var displayTextZero = typeof fbArray[groupArray[0]] !=   "undefined"  ? fbArray[groupArray[0]].nameArray[0]  + " " + fbArray[groupArray[0]].nameArray[1] : "event-undefined";
                 var displayTextOne = typeof fbArray[groupArray[1]] != "undefined" ? fbArray[groupArray[1]].nameArray[0]      + " " + fbArray[groupArray[1]].nameArray[1] : "event-undefined";      
		 var displayTextTwo = typeof fbArray[groupArray[2]] != "undefined" ? fbArray[groupArray[2]].nameArray[0]      + " " + fbArray[groupArray[2]].nameArray[1] : "event-undefined";
                 var displayTextThree = typeof fbArray[groupArray[3]] != "undefined" ?  fbArray[groupArray[3]].nameArray[0]   + " " + fbArray[groupArray[3]].nameArray[1] : "event-undefined";

		 return '<div class="attendee-wrap-event-quad"><div class="attendee-block-event-quad">'+zero+'<div class="event-title-display-wrap"><div class="event-title-display">'+displayTextZero+'</div></div></div><div class="attendee-block-event-quad">'+one+'<div class="event-title-display-wrap"><div class="event-title-display">'+displayTextOne+'</div></div></div><div class="attendee-block-event-quad">'+two+'<div class="event-title-display-wrap"><div class="event-title-display">'+displayTextTwo+'</div></div></div><div class="attendee-block-event-quad">'+three+'<div class="event-title-display-wrap"><div class="event-title-display">'+displayTextThree+'</div></div></div></div>';

                 }else if (fbArray[groupArray[0]].type == 'event'){
                 	
                 	  var pre = '<div class="event-friend-img-wrap"><img class="event-friend-img" width=25 height=25 src="';      
	         var post = '"></div>'; 
	         var titlePre = '<div class="event-friend-img-wrap event-friend-img">';
	         var titlePost = '"></div>';                                                                                                                
	          
		 var zero = typeof groupArray[0] != "undefined"  ? pre + "https://graph.facebook.com/"+fbArray[groupArray[0]].fbId +"/picture?width=25&height=25" + post : pre + "images/pinkX.png"+ post;
		 var one = typeof groupArray[1] != "undefined" ? pre + "https://graph.facebook.com/"+fbArray[groupArray[1]].fbId +"/picture?width=25&height=25" + post : pre + "images/pinkX.png"+ post;      
		 var two = typeof groupArray[2] != "undefined" ? pre + "https://graph.facebook.com/"+fbArray[groupArray[2]].fbId +"/picture?width=25&height=25" + post : pre + "images/pinkX.png"+ post;
                 var three = typeof groupArray[3] != "undefined" ? pre + "https://graph.facebook.com/"+fbArray[groupArray[3]].fbId +"/picture?width=25&height=25" + post : pre + "images/pinkX.png"+ post;
              
                 var displayTextZero = typeof fbArray[groupArray[0]] !=   "undefined"  ? fbArray[groupArray[0]].displayName  : "event-undefined";
                 var displayTextOne = typeof fbArray[groupArray[1]] != "undefined" ? fbArray[groupArray[1]].displayName : "event-undefined";      
		 var displayTextTwo = typeof fbArray[groupArray[2]] != "undefined" ? fbArray[groupArray[2]].displayName: "event-undefined";
                 var displayTextThree = typeof fbArray[groupArray[3]] != "undefined" ?  fbArray[groupArray[3]].displayName: "event-undefined";

		 return '<div class="attendee-wrap-event-quad"><div class="attendee-block-event-quad">'+zero+'<div class="event-title-display-wrap"><div class="event-title-display">'+displayTextZero+'</div></div></div><div class="attendee-block-event-quad">'+one+'<div class="event-title-display-wrap"><div class="event-title-display">'+displayTextOne+'</div></div></div><div class="attendee-block-event-quad">'+two+'<div class="event-title-display-wrap"><div class="event-title-display">'+displayTextTwo+'</div></div></div><div class="attendee-block-event-quad">'+three+'<div class="event-title-display-wrap"><div class="event-title-display">'+displayTextThree+'</div></div></div></div>';
			}  
                }
}

function getMorebutton(k,text1){
	return '<div id="morEventsButton-'+k+'" class="more-events-button"><div class="cut-away-wrap"><div class="more-events-cut-away"></div></div><div class="more-events-text-wrap"><div id="moreevents-'+k+'" class="more-events-text-inner-wrap"><div class="more-events-text">'+text1+'</div><img src="images/downArrow.png" width=25 class="more-events-img"></div></div></div></div>';
	

}

function getDateHeader(evening){
        return '<div id="dateDisplayer-'+evening.id+'" class="date-row opaque"><div class = "date-abrev-wrap"><div class = "date-abrev-top">'+evening.dateStringArray[0]+"</div><div class='date-abrev-bot'>"+evening.monthNumber+"."+evening.dateStringArray[2]+'</div></div></div>';	
}

function getDateHeaderHtml(i,evening){
            	 var friendName = typeof fbArray[evening.friendIdArray[0]] !=   "undefined"  ?"<div class='friend-first-name-wrap'>"+fbArray[evening.friendIdArray[0]].nameArray[0]  + "</div><div class='friend-first-last-wrap'>" + fbArray[evening.friendIdArray[0]].nameArray[1] +"</div>" : "event-undefined";
                 var eventName = typeof evening !=   "undefined"  ? evening.name : "eventNameUndefined";
                 
            	 var friendPre = '<div class="event-friend-img-wrap"><img class="event-friend-img" width=50 height=50 src="'; 

 var pre = '<div class="event-friend-img-wrap-quad"><img class="event-friend-img-quad" width=25 height=25 src="';      
		 var preLeft = '<div class="event-friend-img-wrap-quad left"><img class="event-friend-img-quad" width=25 height=25 src="'; 
		 var preRight = '<div class="event-friend-img-wrap-quad right"><img class="event-friend-img-quad" width=25 height=25 src="'; 
	         var post = '"></div>'; 
	         var friendImgQuad = typeof evening.friendIdArray[0] != "undefined"  ? friendPre + "https://graph.facebook.com/"+fbArray[evening.friendIdArray[0]].fbId +"/picture?width=25&height=25" + post : friendPre + "images/pinkX.png"+ post;
            	 var friendNameQuad = typeof evening.friendIdArray[0] !=   "undefined"  ?"<div class='friend-first-name-wrap'>"+fbArray[evening.friendIdArray[0]].nameArray[0]  + "</div><div class='friend-first-last-wrap'>" + fbArray[evening.friendIdArray[0]].nameArray[1] +"</div><div class='extra-attendees-wrap'>+ "+(evening.friendIdArray.length - 1)+" more</div>" : "event-undefined";

            	 var zero = typeof evening.friendIdArray[0] != "undefined"  ? preLeft + "https://graph.facebook.com/"+fbArray[evening.friendIdArray[0]].fbId +"/picture?width=25&height=25" + post : pre + "images/pinkX.png"+ post;
		 var one = typeof evening.friendIdArray[1] != "undefined" ? preRight + "https://graph.facebook.com/"+fbArray[evening.friendIdArray[1]].fbId +"/picture?width=25&height=25" + post : pre + "images/pinkX.png"+ post;      
		 var two = typeof evening.friendIdArray[2] != "undefined" ? preLeft + "https://graph.facebook.com/"+fbArray[evening.friendIdArray[2]].fbId +"/picture?width=25&height=25" + post : pre + "images/pinkX.png"+ post;
                 var three = typeof evening.friendIdArray[3] != "undefined" ? preRight + "https://graph.facebook.com/"+fbArray[evening.friendIdArray[3]].fbId +"/picture?width=25&height=25" + post : pre + "images/pinkX.png"+ post;

               return '<div><div class="event-wrap"><div class="row-pic-wrap event-pic-wrap"></div><div class="row-title-wrap event-title-wrap"><div class="date-header">'+evening.formattedDate+'</div></div></div><div id = "eveningFriendGroup-'+i+'" class="event-friend-group-wrap"><div class="attendee-quad-row"><div class="friend-pic-wrap-quad"><div class="friend-pic-quad">'+zero+'</div></div><div class="friend-pic-wrap-quad"><div class="friend-pic-quad">'+one+'</div></div></div><div class="attendee-quad-row"><div class="friend-pic-wrap-quad"><div class="friend-pic-quad">'+two+'</div></div><div class="friend-pic-wrap-quad"><div class="friend-pic-quad">'+three+'</div></div></div></div><div class="row-title-wrap friend-title-wrap"><div class="row-title friend-title">'+friendNameQuad+'</div></div></div></div>';

}

function getImage(elemId){    
	
	  	  var pre = '<div class="event-friend-img-wrap" ><img class="event-friend-img" width=50 height=50 src="';      
	          var post = '"></div>'; 
	  	  var zero = typeof elemId != "undefined" ? pre + "https://graph.facebook.com/"+fbArray[elemId].fbId +"/picture?width=50&height=50" + post : pre + "images/pinkX.png"+ post;
	  	  
	  	  if(fbArray[elemId].type == 'friend'){
	  	  	  
	  	  	  return '<div class="attendee-wrap"><div class="attendee-block " style="height:50px;width:50px">'+zero+'</div></div>'; 
	
	  	  }else if (fbArray[elemId].type == 'event'){
			  	  
	  	  	  return '<div class="attendee-wrap"><div class="attendee-block " style="height:50px;width:50px">'+zero+'</div></div>'; 
}
}
