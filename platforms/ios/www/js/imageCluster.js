//If we want to populate row by row we should switch argument to eveningHashSubset[i]
//Since we've already filtered through friendGroup and created eveningHashSubset we can probably parse through eveningHashSubset[i].eventIdArray
//We should create list elements with handlers set and create some low cpu expansion for header click event
//test

function getEventRow(eventId,eventClass,datIndex){
    console.log("eventClass: "+eventClass);
    var eventRowHtml;
    
    var eventImageClusterHtml;
    
    var mapVis = "";
    
    if(!eventList[eventId].hasVenue){
        mapVis = "invisible";
    }
    
    var displayTextZero = typeof eventList[eventList[eventId].friendIdArray[0]] !=   "undefined"  ? eventList[eventList[eventId].friendIdArray[0]].nameArray[0]  + " " + eventList[eventList[eventId].friendIdArray[0]].nameArray[1] : "event-undefined";
    
    var friendName = typeof eventList[eventList[eventId].friendIdArray[0]] !=   "undefined"  ?"<div class='friend-first-name-wrap'>"+eventList[eventList[eventId].friendIdArray[0]].nameArray[0]  + "</div><div class='friend-first-last-wrap'>" + eventList[eventList[eventId].friendIdArray[0]].nameArray[1] +" is going</div>" : "event-undefined";
    
    var friendName1 = typeof eventList[eventList[eventId].friendIdArray[0]] !=   "undefined"  ?eventList[eventList[eventId].friendIdArray[0]].nameArray[0]  + " " + eventList[eventList[eventId].friendIdArray[0]].nameArray[1]+" is going" : "event-undefined";
    
    var eventName = typeof eventList[eventId] !=   "undefined"  ? eventList[eventId].name : "eventNameUndefined";
    var friendGroupName = typeof eventList[eventId] !=   "undefined"  ? eventList[eventId].name : "eventNameUndefined";
    
    var friendPre = '<div data-evId="'+eventId+'"  id="friend-'+eventId+'" data-dateHash="'+datIndex+'" class="event-friend-img friend-wrap"><div class="friend-score">'+eventList[eventList[eventId].friendIdArray[0]].eventIdArray.length+'</div><img class="friend-img" style="pointer-events:none" width=50 height=50 src="';
    
    var local;
    var localText;
    
    if(eventList[eventId].venue.local){
        //console.log("local detected");
        local = "<div style='display:none' class='loc-icon'>L</div>";
        localText = "<div style='display:inline'>, <div style='display:inline' class='loc-text'> Local</div></div>";
    }else{
        local = "<div style='display:none' class='loc-icon'>L</div>";
        localText = "<div style='display:none'>, <div style='display:inline' class='loc-text'>, Local</div></div>";
    }
    
    var eventPre = '<div id="'+eventId+'" data-dateHash="'+datIndex+'" class="event-img-wrap">'+local+'<img class="event-img" style="pointer-events:none" src="';
    var post1 = '"></div>';
    var post = '"></div>';
    var friendTitlePre = '<div class="event-friend-img-wrap event-friend-img">';
    var titlePost = '"></div>';
    var friendImg = typeof eventList[eventId].friendIdArray[0] != "undefined"  ? friendPre + "https://graph.facebook.com/"+eventList[eventList[eventId].friendIdArray[0]].fbId +"/picture?width=100&height=100" + post : friendPre + "images/profileIcon1_25.png"+ post;
    var eventImg = typeof eventList[eventId].friendIdArray[0] != "undefined"  ? eventPre + "https://graph.facebook.com/"+eventId +"/picture?width=50&height=50" + post1 : eventPre + "images/profileIcon1_25.png"+ post;
    
    
    
    var startTime = "<div style='display:inline' class='start-time'>"+eventList[eventId].formattedTime+"</div>";
    //var venueName = eventList[eventId].venue.name;
    
    var venueName =  eventList[eventId].venue.name != null ? eventList[eventId].venue.name  :  "" ;
    
    if(eventList[eventId].friendIdArray.length == 0){
        
        return '<div class="row-wrap '+eventClass+'"><div class="event-wrap '+eventClass+'"><div class="row-pic event-pic">'+'<div class="event-outter">'+eventImg+'</div></div><div class="row-title-wrap event-title-wrap"><div class="friend-name">'+friendName1+'</div><div class="row-title event-title">'+eventName+'</div></div></div><div class="friend-wrap"><div class="row-pic-wrap friend-pic-wrap" id="friend-'+eventId+'"><div class="row-pic friend-pic">'+'<div class="friend-outter">'+friendImg+'</div></div></div></div><div id="event-ex-'+eventId+'" class="event-ex"></div></div>';
        
    } else if (eventList[eventId].friendIdArray.length == 1){
        /*
         code for quad button
         return '<div class="event-touched row-wrap '+eventClass+'"><div class="event-outter"><div class="event-wrapper">'+eventImg+'<div class="event-name"><div class="event-name-inner"><div class="event-title">'+eventName+'</div><div class="event-extra-info">'+startTime+localText+'</div></div></div></div><div class="ev-button-exp"><div class="ev-button-exp-wrap"><div class="ev-button-top"><div data-evId="'+eventId+'" class="ev-i-button fnct-icon"></div><div data-evId="'+eventId+'" class="ev-rsvp-button fnct-icon"></div><div data-evId="'+eventId+'" class="ev-map-button fnct-icon"></div></div><div class="ev-button-bottom"><div data-evId="'+eventId+'" class="ev-tag-button fnct-icon"></div><div class="ev-check-in-button fnct-icon"></div><div class="ev-buy-button fnct-icon"></div></div></div></div></div><div class="friend-outter"><div class="friend-wrapper">'+friendImg+'<div class="friend-name"><div class="friend-name-inner">'+friendName1+'</div></div></div><div class="fr-button-exp"><div class="fr-button-exp-wrap"><div class="fr-button-top"><div class="fr-i-button fnct-icon"></div><div data-evId="'+eventId+'" class="fr-mail-button fnct-icon"></div><div class="fr-post-button fnct-icon"></div></div><div class="fr-button-bottom"><div class="fr-plus-button fnct-icon"></div><div class="fr-comm-button fnct-icon"></div><div class="fr-half-button fnct-icon"></div></div></div></div></div></div>';
         */
        
        return '<div class="event-touched row-wrap '+eventClass+'"><div class="event-outter"><div class="event-wrapper">'+eventImg+'<div class="event-name"><div class="event-name-inner"><div class="event-title">'+eventName+'</div><div class="event-extra-info">'+startTime+localText+'</div></div></div></div><div class="ev-button-exp"><div class="ev-button-exp-wrap"><div class="ev-button-top"><div data-evId="'+eventId+'" class="ev-i-button fnct-icon"></div><div data-evId="'+eventId+'" class="ev-rsvp-button fnct-icon"></div><div data-evId="'+eventId+'" class="ev-map-button fnct-icon '+mapVis+'"></div></div></div></div></div><div class="friend-outter"><div class="friend-wrapper">'+friendImg+'<div class="friend-name"><div class="friend-name-inner">'+friendName1+'</div></div></div><div class="fr-button-exp"><div class="fr-button-exp-wrap"><div class="fr-button-top"><div class="fr-i-button fnct-icon"></div><div data-evId="'+eventId+'" class="fr-mail-button fnct-icon"></div><div class="fr-post-button fnct-icon"></div></div></div></div></div></div>';
        
    } else {
        var pre = '<img class="event-friend-img-quad" style="pointer-events:none" width=25 height=25 src="';
        var preUL = '<img class="quadUl event-friend-img-quad" style="pointer-events:none" width=25 height=25 src="';
        var preUR = '<img class="quadUr event-friend-img-quad" style="pointer-events:none" width=25 height=25 src="';
        var preBL = '<img class="quadBl event-friend-img-quad" style="pointer-events:none" width=25 height=25 src="';
        var preBR = '<img class="quadBr event-friend-img-quad" style="pointer-events:none" width=25 height=25 src="';
        var post = '">';
        
        var zero = typeof eventList[eventId].friendIdArray[0] != "undefined"  ? preUL + "https://graph.facebook.com/"+eventList[eventList[eventId].friendIdArray[0]].fbId +"/picture?width=50&height=50" + post : "";
        var one = typeof eventList[eventId].friendIdArray[3] != "undefined" ? preUR + "https://graph.facebook.com/"+eventList[eventList[eventId].friendIdArray[3]].fbId +"/picture?width=50&height=50" + post : "";
        var two = typeof eventList[eventId].friendIdArray[2] != "undefined" ? preBL + "https://graph.facebook.com/"+eventList[eventList[eventId].friendIdArray[2]].fbId +"/picture?width=50&height=50" + post : "";
        var three = typeof eventList[eventId].friendIdArray[1] != "undefined" ? preBR + "https://graph.facebook.com/"+eventList[eventList[eventId].friendIdArray[1]].fbId +"/picture?width=50&height=50" + post : "";
        
        var friendName2 = "";
        
        
        for (var i=0;i<eventList[eventId].friendIdArray.length;i++){
            
            if(0 < i < eventList[eventId].friendIdArray.length -1){
                friendName2 = friendName2 +" ,";
            }else{
                friendName2 = friendName2 +" and" ;
            }
            
            friendName2 = friendName2 + eventList[eventList[eventId].friendIdArray[i]].nameArray[0]  + " " + eventList[eventList[eventId].friendIdArray[i]].nameArray[1];
        }
        /*
         code for double button row
         return '<div class="event-touched row-wrap '+eventClass+'"><div class="event-outter"><div class="event-wrapper">'+eventImg+'<div class="event-name"><div class="event-name-inner"><div class="event-title">'+eventName+'</div><div class="event-extra-info">'+startTime+localText+'</div></div></div></div><div class="ev-button-exp"><div class="ev-button-exp-wrap"><div class="ev-button-top"><div data-evId="'+eventId+'" class="ev-i-button fnct-icon"></div><div class="ev-rsvp-button data-evId="'+eventId+'" fnct-icon"></div><div data-evId="'+eventId+'" class="ev-map-button fnct-icon"></div></div><div class="ev-button-bottom"><div data-evId="'+eventId+'" class="ev-tag-button fnct-icon"></div><div class="ev-check-in-button fnct-icon"></div><div class="ev-buy-button fnct-icon"></div></div></div></div></div><div class="friend-outter"><div class="friend-wrapper"><div data-evId="'+eventId+'"  id="friend-'+eventId+'" data-dateHash="'+datIndex+'" class="event-friend-img friend-wrap">'+zero+one+two+three+'</div><div class="friend-name"><div class="friend-name-inner">'+friendName2+'</div></div></div><div class="fr-button-exp"><div class="fr-button-exp-wrap"><div class="fr-button-top"><div class="fr-i-button fnct-icon"></div><div data-evId="'+eventId+'" class="fr-mail-button fnct-icon"></div><div class="fr-post-button fnct-icon"></div></div><div class="fr-button-bottom"><div class="fr-plus-button fnct-icon"></div><div class="fr-comm-button fnct-icon"></div><div class="fr-half-button fnct-icon"></div></div></div></div></div></div>';
         */
        
        return '<div class="event-touched row-wrap '+eventClass+'"><div class="event-outter"><div class="event-wrapper">'+eventImg+'<div class="event-name"><div class="event-name-inner"><div class="event-title">'+eventName+'</div><div class="event-extra-info">'+startTime+localText+'</div></div></div></div><div class="ev-button-exp"><div class="ev-button-exp-wrap"><div class="ev-button-top"><div data-evId="'+eventId+'" class="ev-i-button fnct-icon"></div><div class="ev-rsvp-button fnct-icon" data-evId="'+eventId+'" ></div><div data-evId="'+eventId+'" class="ev-map-button fnct-icon '+mapVis+'"></div></div></div></div></div><div class="friend-outter"><div class="friend-wrapper"><div data-evId="'+eventId+'"  id="friend-'+eventId+'" data-dateHash="'+datIndex+'" class="event-friend-img friend-wrap">'+zero+one+two+three+'</div><div class="friend-name"><div class="friend-name-inner">'+friendName2+'</div></div></div><div class="fr-button-exp"><div class="fr-button-exp-wrap"><div class="fr-button-top"><div class="fr-i-button fnct-icon"></div><div data-evId="'+eventId+'" class="fr-mail-button fnct-icon"></div><div class="fr-post-button fnct-icon"></div></div></div></div></div></div>';
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
    
    return '<div class="more-events-text-wrap '+className+'"  data-dateId="'+k+'"></div>';
}

function getLeftExButton(k,text1,className){
    
    return '<div class="left-ex-button '+className+'"  data-dateId="'+k+'">Hi</div>';
}

function getDateHeader(evening,k,cnt,ex){
    
    return '<div id="divider-wrap-'+evening.id+'" class="divider-wrap '+cnt+' '+ex+'"><div id="dateDisplayer-'+evening.id+'"  class="date-row opaque"><div class = "date-abrev-wrap"><div class="left-ex-wrap"><div class="left-ex-button"  data-dateId="'+k+'"></div></div><div class="right-ex-wrap"><div class="more-events-text-wrap"  data-dateId="'+k+'"></div></div><div class="date-wrap-inner"><div class="date-header"><div class="date-header">'+evening.weekDayLong+' '+evening.monthNumber+'.'+evening.dateStringArray[2]+'</div></div></div></div></div></div>';
}

function getDescriptionHtml(description){
    return '<div id="description-wrap">'+description+'</div>';
}

function generateButtons(evId){
    return '<div class="button-wrap" id="button-wrap-'+evId+'"><div class = "map-button" data-evId="'+evId+'" id="map-button-'+evId+'"></div><div class = "rsvp-button" id="rsvp-button-'+evId+'" data-evId="'+evId+'"></div></div>';
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