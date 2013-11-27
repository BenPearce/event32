function event() {
    this.dateCode;
    this.venue;
    this.friendList;
    this.start_time;
    this.name;
    this.timezone;
    this.fbId;
    this.rsvp_status;
    this.expand;
    this.mapButton;
    this.evening;
    this.buttonList;
    this.formattedDate;
    this.formattedTime;
    this.fillCss;
    this.local;
    this.tonight;
    this.tap;
    this.description;
    this.friendIdArray;
    this.listElem;
    this.localDisplay;
    this.insertFriend;
    this.friendListHtml;
    this.type;
    this.dateState;
    this.eveningListArray;
    this.eveningInstanceCount;
    this.dateId;
}

function makeEvent(data) {
    var result = new event();
    var proximity = makeListElement(data);
    $.extend(result, proximity);
    result.venue = makeVenue(data.venue);
    result.data = data;
    result.type = "event";
    result.localDisplay ="";
    //result.mapButton = makeMapButton(result);
    result.eveningListArray = new Array();
    result.eveningInstanceCount = {};
    console.log("data.start_time: "+data.start_time);
      var tempDate = new Date(data.start_time.substring(0, data.start_time.indexOf('T')));
    //var tempDate = new Date(data.start_time);
    console.log("tempDate: "+tempDate);
        //tempDate = new Date(result.start_time);
    //This line of code is critical if it is removed '00:00:00' will be listed as one day late
    
    if (result.formattedTime == '00:00:00') {
        tempDate = new Date(tempDate.getTime() + (24 * 60 * 60 * 1000));
    }
    
    //result.dateId =tempDate;
    result.dateId = dateToInteger(tempDate);
    console.log("result.dateId: "+result.dateId);
    //console.log("dat id set: "+result.dateId);
    //result.description = data.description;
    
         if (typeof  data.description != "undefined"){
     	     result.description
     }else{
     	  throw "eventDescriptionUndefined";   
     }
    
    result.friendIdArray = new Array();
    result.friendList = new Array();
    //result.timezone = data.timezone;
    /*
     if (typeof  data.timezone != "undefined"){
     	     result.timezone = data.timezone;
     }else{
     	  throw "eventTimeZoneUndefined";   
     }
    */
   // result.fbId = data.id;    
                 if (typeof  data.id != "undefined"){
     	      result.fbId = data.id;
     }else{
     	  throw "eventFbIdUndefined"   
     }
    
    //result.name = data.name;
    //result.name = typeof data.name != "undefined" ? data.name : throw "eventNameUndefined";  


     if (typeof data.name != "undefined"){
     	   result.name = data.name
     }else{
     	  throw "eventNameUndefined";   
     }
    

    result.displayName = result.name.substr(0, 45);
    
    
    
    result.displayName = result.displayName.substr(0,result.displayName.lastIndexOf(" "));
        
    
    result.insertFriend = function(friendId, dateCode){
    	    eventInsertionCountInternal = eventInsertionCountInternal +1;
    	    console.log("eveinging instance count: "+result.eveningInstanceCount[result.fbId]);
    	    console.log("eveinging instance type: "+typeof result.eveningInstanceCount[result.fbId]);
    	    
    	 
    	    if(typeof result.eveningInstanceCount[result.fbId] != 'undefined'){
    	    	 result.eveningInstanceCount[result.fbId] =  parseInt(result.eveningInstanceCount[result.fbId]) + 1;
    	    	 console.log("friendI pushed count: "+result.eveningInstanceCount[result.fbId]);
    	    }else{
    	    	 console.log("else trig");

    	    	 result.eveningInstanceCount[result.fbId] = 1;  
    	    	 
    	    	     	    	 console.log("else trig"+result.eveningInstanceCount[result.fbId]);

    	    }
	   
    	    result.friendIdArray.push(friendId);
    	    //result.eventListHtml = result.eventListHtml + "<div class='event-sub-elem'><img class='event-list-elem-fixed-img' width=25 height=25 src='https://graph.facebook.com/"+fbArray[eventId].fbId+"/picture?width=50&height=50'><div class='event-sub-elem-name'>"+fbArray[eventId].name+"</div></div>";
    	    result.friendListHtml = result.friendListHtml + "<div class='event-sub-elem'><img class='event-list-elem-fixed-img' width=25 height=25 src='https://graph.facebook.com/"+fbArray[friendId].fbId+"/picture?width=50&height=50'><div class='event-sub-elem-name'>"+fbArray[friendId].name+"</div></div>";
    }

    /*
    if(result.name.length > result.displayName.length){
    	result.displayName = result.displayName + "...";    
    }
    */
    //result.rsvp_status = data.rsvp_status;
    /*
         if (typeof data.rsvp_status != "undefined"){
     	   result.rsvp_status = data.rsvp_status;
     }else{
     	  throw "eventRSVPUndefined";
     }
    */
    
             if (typeof data.start_time != "undefined"){
     	       result.start_time = data.start_time;
     }else{
     	  throw "eventStartTimeUndefined";  
     }
    
    result.local = false;
    result.tonight = false;
    var temp = new Date(data.start_time);
    
    result.formattedTime = result.start_time.substr(result.start_time.indexOf("T") + 1);
    
    
    var temp1 = temp.getHours();
    result.pictureUrl = data.picture.data.url;
    temp = new Date(result.start_time);
    //This line of code is critical if it is removed '00:00:00' will be listed as one day late
    if (result.formattedTime == '00:00:00') {
        temp = new Date(temp.getTime() + (24 * 60 * 60 * 1000));
        result.formattedTime = "";

    } else {
        result.formattedTime = result.formattedTime.substr(0, result.formattedTime.length - 3);

        if (result.formattedTime.substr(0, 2)) {
            if (parseInt(result.formattedTime.substr(0, 2)) > 12) {
                result.formattedTime = ", " + (parseInt(result.formattedTime.substr(0, 2)) - 12) + result.formattedTime.substr(2, 5) + "pm";
            } else if (parseInt(result.formattedTime.substr(0, 2)) == 12) {
                result.formattedTime = ", " + (parseInt(result.formattedTime.substr(0, 2))) + result.formattedTime.substr(2, 5) + "pm";
            } else {
                if (parseInt(result.formattedTime.substr(0, 2)) > 10) {
                    result.formattedTime = ", " + (parseInt(result.formattedTime.substr(0, 2))) + result.formattedTime.substr(2, 5) + "am";
                } else {
                    result.formattedTime = ", " + (parseInt(result.formattedTime.substr(1, 2))) + result.formattedTime.substr(2, 5) + "am";
                }
            }
        }
    }

    
    result.dateCode = dateToInteger(temp);
        result.dateState = setBit(0,result.dateCode);
    
    temp = temp.toString().substr(0, temp.toString().indexOf(":") - 3);
    result.formattedDate = temp;
    result.formattedDate = result.formattedDate.substr(0, result.formattedDate.length - 5);

    //result.domClone = $("<div><li id='"+result.fbId+"-list' class='event'><div id='"+result.fbId+"'  class='event-wrap'><div id='"+result.fbId+"-flyer' class='flyer-wrap'><div class='event-name-wrap'><div class='event-name'>"+result.displayName+"</div></div><div class='flyer-img-wrap'><img id='"+result.fbId+"-event-img' class='event-img' src='https://graph.facebook.com/"+result.fbId+"/picture?width=70&height=70'></div><div class='formatted-date-wrap'><div class='formatted-date'>"+result.formattedDate+result.formattedTime+"</div></div></div><div id='"+result.fbId+"-friend-group' class='attendee-wrap'></div><div class='venue-wrap'></div><div class='formatted-time-wrap'></div><div class='distance-wrap'>"+result.venue.clientDistance +"</div></div><div class='event-desc-wrap'></div><div class='button-wrap'>hi<a href='.pop-map' data-rel='popup' data-role='button' class='map-button'>MAP</a><a id='' href='' data-role='button' class='rsvp-button'>RSVP</a></div></li><div>");
    result.domClone = $("<div><li id='"+result.fbId+"-list' class='event'><div id='"+result.fbId+"'  class='event-wrap'><div id='"+result.fbId+"-flyer' class='flyer-wrap'><div class='flyer-group-display-wrap'>"+result.description+"</div><div class='event-name-wrap'><div class='event-name'>"+result.displayName+"</div></div><div class='flyer-img-wrap'><img id='"+result.fbId+"-event-img' class='event-img' src='https://graph.facebook.com/"+result.fbId+"/picture?width=70&height=70'><div class='local-display'>"+result.localDisplay+"</div></div><div class='formatted-date-wrap'><div class='formatted-date'>"+result.formattedDate+result.formattedTime+"</div></div></div><div id='"+result.fbId+"-friend-group' class='attendee-wrap'></div><div class='formatted-time-wrap'></div><div class='distance-wrap'>"+result.venue.clientDistance +"</div></div></li><div>");
    //result.listElem = "<div class='event-list-elem-fixed'><img class='event-list-elem-fixed-img' src='https://graph.facebook.com/"+result.fbId+"/picture?width=70&height=70'><div class='event-list-elem-fixed-name'>"+result.displayName+"</div></div>";
    //result.buttonList = makeButtonList(result);
    //result.domClone.append(result.buttonList.wrap);
    result.domClone.find(".event-name-wrap").css("font-size", "10pt");
    result.domClone.find(".formatted-date-wrap").css("font-size", "10pt");
    result.evening = makeEvening(result);

    return result;
}