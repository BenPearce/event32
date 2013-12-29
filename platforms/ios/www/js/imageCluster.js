//If we want to populate row by row we should switch argument to eveningHashSubset[i]
//Since we've already filtered through friendGroup and created eveningHashSubset we can probably parse through eveningHashSubset[i].eventIdArray
//We should create list elements with handlers set and create some low cpu expansion for header click event
//test
function getEventRow(eventId,eventClass){
    var eventRowHtml;
    
    var eventImageClusterHtml;
    
    var displayTextZero = typeof eventList[eventList[eventId].friendIdArray[0]] !=   "undefined"  ? eventList[eventList[eventId].friendIdArray[0]].nameArray[0]  + " " + eventList[eventList[eventId].friendIdArray[0]].nameArray[1] : "event-undefined";
    
    var friendName = typeof eventList[eventList[eventId].friendIdArray[0]] !=   "undefined"  ?"<div class='friend-first-name-wrap'>"+eventList[eventList[eventId].friendIdArray[0]].nameArray[0]  + "</div><div class='friend-first-last-wrap'>" + eventList[eventList[eventId].friendIdArray[0]].nameArray[1] +"</div>" : "event-undefined";
    var eventName = typeof eventList[eventId] !=   "undefined"  ? eventList[eventId].name : "eventNameUndefined";
    
    var friendPre = '<img class="event-friend-img friend-wrap"   id="friend-'+eventId+'" style="pointer-events:none" width=50 height=50 src="';
    
    var eventPre = '<img class="event-img" style="pointer-events:none" src="';
    var post1 = '">';
    var post = '"></div>';
    var friendTitlePre = '<div class="event-friend-img-wrap event-friend-img">';
    var titlePost = '"></div>';
    var friendImg = typeof eventList[eventId].friendIdArray[0] != "undefined"  ? friendPre + "https://graph.facebook.com/"+eventList[eventList[eventId].friendIdArray[0]].fbId +"/picture?width=50&height=50" + post : friendPre + "images/pinkX.png"+ post;
    var eventImg = typeof eventList[eventId].friendIdArray[0] != "undefined"  ? eventPre + "https://graph.facebook.com/"+eventId +"/picture?width=50&height=50" + post1 : eventPre + "images/pinkX.png"+ post;
    
    if(eventList[eventId].friendIdArray.length == 0){
        
        return '<div class="row-wrap '+eventClass+'"><div id="'+eventId+'" class="event-wrap '+eventClass+'"><div class="row-pic event-pic">'+eventImg+'</div><div class="row-title-wrap event-title-wrap"><div class="row-title event-title">'+eventName+'</div></div></div><div class="friend-wrap"><div class="row-pic-wrap friend-pic-wrap" id="friend-'+eventId+'"><div class="row-pic friend-pic">'+friendImg+'</div></div></div><div id="event-ex-'+eventId+'" class="event-ex"></div></div>';
        
    } else if (eventList[eventId].friendIdArray.length == 1){
        
        return '<div class="row-wrap '+eventClass+'"><div id="'+eventId+'" class="event-wrap">'+eventImg+'<div class="row-title-wrap event-title-wrap">'+eventName+'</div></div>'+friendImg+'<div id="event-ex-'+eventId+'" class="event-ex"></div></div>';
        
    } else {
        var pre = '<img class="event-friend-img-quad" style="pointer-events:none" width=25 height=25 src="';
        var preUL = '<img class="quadUl event-friend-img-quad" style="pointer-events:none" width=25 height=25 src="';
        var preUR = '<img class="quadUr event-friend-img-quad" style="pointer-events:none" width=25 height=25 src="';
        var preBL = '<img class="quadBl event-friend-img-quad" style="pointer-events:none" width=25 height=25 src="';
        var preBR = '<img class="quadBr event-friend-img-quad" style="pointer-events:none" width=25 height=25 src="';
        var post = '">';
        
        var zero = typeof eventList[eventId].friendIdArray[0] != "undefined"  ? preUL + "https://graph.facebook.com/"+eventList[eventList[eventId].friendIdArray[0]].fbId +"/picture?width=25&height=25" + post : preUL + "images/pinkX.png"+ post;
        var one = typeof eventList[eventId].friendIdArray[1] != "undefined" ? preUR + "https://graph.facebook.com/"+eventList[eventList[eventId].friendIdArray[1]].fbId +"/picture?width=25&height=25" + post : preUR + "images/pinkX.png"+ post;
        var two = typeof eventList[eventId].friendIdArray[2] != "undefined" ? preBL + "https://graph.facebook.com/"+eventList[eventList[eventId].friendIdArray[2]].fbId +"/picture?width=25&height=25" + post : preBL + "images/pinkX.png"+ post;
        var three = typeof eventList[eventId].friendIdArray[3] != "undefined" ? preBR + "https://graph.facebook.com/"+eventList[eventList[eventId].friendIdArray[3]].fbId +"/picture?width=25&height=25" + post : preBR + "images/pinkX.png"+ post;
        
        return '<div class="row-wrap '+eventClass+'"><div id="'+eventId+'" class="event-wrap">'+eventImg+'<div class="row-title-wrap event-title-wrap">'+eventName+'</div></div><div class="friend-wrap" id="friend-'+eventId+'">'+zero+one+two+three+'</div></div><div id="event-ex-'+eventId+'" class="event-ex"></div></div>';
        
    }
}

function getEventHtml(evening){
    if(evening.eventIdArray.length == 0){
    }else if(evening.eventIdArray.length == 1){
        return getEventRow(evening.eventIdArray[0],"topEvent");
    }else if(evening.eventIdArray.length == 2){
        return getEventRow(evening.eventIdArray[0],"topEvent") + getEventRow(evening.eventIdArray[1],"topEvent");
    }else if(evening.eventIdArray.length == 3){
        return getEventRow(evening.eventIdArray[0],"topEvent") + getEventRow(evening.eventIdArray[1],"topEvent") + getEventRow(evening.eventIdArray[2],"topEvent");
    }else{
        return getEventRow(evening.eventIdArray[0],"topEvent") + getEventRow(evening.eventIdArray[1],"topEvent") + getEventRow(evening.eventIdArray[2],"topEvent") + getEventRow(evening.eventIdArray[3],"topEvent");
    }
}

function getMorebutton(k,text1,className){
    return '<div id="morEventsButton-'+k+'" class="more-events-button"><div class="cut-away-wrap"><div class="more-events-cut-away"></div></div><div class="more-events-text-wrap '+className+'"  data-dateId="'+k+'"></div></div></div>';
}

function getDateHeader(evening){
    return '<div id="dateDisplayer-'+evening.id+'" class="date-row opaque"><div class = "date-abrev-wrap"><div class = "date-abrev-top">'+evening.dateStringArray[1]+"</div><div class='date-abrev-bot'>"+evening.monthNumber+"."+evening.dateStringArray[2]+'</div></div></div>';
    
}

function getDateHeaderHtml(i,evening){
    var friendName = typeof eventList[evening.friendIdArray[0]] !=   "undefined"  ?"<div class='friend-first-name-wrap'>"+eventList[evening.friendIdArray[0]].nameArray[0]  + "</div><div class='friend-first-last-wrap'>" + eventList[evening.friendIdArray[0]].nameArray[1] +"</div>" : "event-undefined";
    var eventName = typeof evening !=   "undefined"  ? evening.name : "eventNameUndefined";
    
    var friendPre = '<div class="event-friend-img-wrap"><img class="event-friend-img" width=50 height=50 src="';
    
    var pre = '<div class="event-friend-img-wrap-quad"><img class="event-friend-img-quad" width=25 height=25 src="';
    var preLeft = '<div class="event-friend-img-wrap-quad left"><img class="event-friend-img-quad" width=25 height=25 src="';
    var preRight = '<div class="event-friend-img-wrap-quad right"><img class="event-friend-img-quad" width=25 height=25 src="';
    var post = '"></div>';
    var friendImgQuad = typeof evening.friendIdArray[0] != "undefined"  ? friendPre + "https://graph.facebook.com/"+eventList[evening.friendIdArray[0]].fbId +"/picture?width=25&height=25" + post : friendPre + "images/pinkX.png"+ post;
    var friendNameQuad = typeof evening.friendIdArray[0] !=   "undefined"  ?"<div class='friend-first-name-wrap'>"+eventList[evening.friendIdArray[0]].nameArray[0]  + "</div><div class='friend-first-last-wrap'>" + eventList[evening.friendIdArray[0]].nameArray[1] +"</div><div class='extra-attendees-wrap'>+ "+(evening.friendIdArray.length - 1)+" more</div>" : "event-undefined";
    
    var zero = typeof evening.friendIdArray[0] != "undefined"  ? preLeft + "https://graph.facebook.com/"+eventList[evening.friendIdArray[0]].fbId +"/picture?width=25&height=25" + post : pre + "images/pinkX.png"+ post;
    var one = typeof evening.friendIdArray[1] != "undefined" ? preRight + "https://graph.facebook.com/"+eventList[evening.friendIdArray[1]].fbId +"/picture?width=25&height=25" + post : pre + "images/pinkX.png"+ post;
    var two = typeof evening.friendIdArray[2] != "undefined" ? preLeft + "https://graph.facebook.com/"+eventList[evening.friendIdArray[2]].fbId +"/picture?width=25&height=25" + post : pre + "images/pinkX.png"+ post;
    var three = typeof evening.friendIdArray[3] != "undefined" ? preRight + "https://graph.facebook.com/"+eventList[evening.friendIdArray[3]].fbId +"/picture?width=25&height=25" + post : pre + "images/pinkX.png"+ post;
    
    return '<div><div class="event-wrap" id="'+eventId+'"><div class="row-pic-wrap event-pic-wrap"></div><div class="row-title-wrap event-title-wrap"><div class="date-header">'+evening.formattedDate+'</div></div></div><div id = "eveningFriendGroup-'+i+'" class="event-friend-group-wrap"><div class="attendee-quad-row"><div class="friend-pic-wrap-quad"><div class="friend-pic-quad">'+zero+'</div></div><div class="friend-pic-wrap-quad"><div class="friend-pic-quad">'+one+'</div></div></div><div class="attendee-quad-row"><div class="friend-pic-wrap-quad"><div class="friend-pic-quad">'+two+'</div></div><div class="friend-pic-wrap-quad"><div class="friend-pic-quad">'+three+'</div></div></div></div></div></div>';
    
}

function getImage(elemId){
	
    var pre = '<div class="event-friend-img-wrap" ><img class="event-friend-img" width=50 height=50 src="';
    var post = '"></div>';
    var zero = typeof elemId != "undefined" ? pre + "https://graph.facebook.com/"+eventList[elemId].fbId +"/picture?width=50&height=50" + post : pre + "images/pinkX.png"+ post;
    
    if(eventList[elemId].type == 'friend'){
        
        return '<div class="attendee-wrap"><div class="attendee-block " style="height:50px;width:50px">'+zero+'</div></div>';
        
    }else if (eventList[elemId].type == 'event'){
        
        return '<div class="attendee-wrap"><div class="attendee-block " style="height:50px;width:50px">'+zero+'</div></div>';
    }
}

