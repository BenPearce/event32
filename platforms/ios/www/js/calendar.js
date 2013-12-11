function calendar() {
this.eveningArray;
this.insertEvening;
this.footerHtml;
this.headerHtml;
this.init;
//this.eventIdArray;
//this.friendIdArray;
this.insertEventId;
this.insertFriendId;
}

function makeCalendar() {
	var result = new calendar();
	
	result.eveningArray = new Array();
	//result.eventIdArray = new Array();
	//result.friendIdArray = new Array();
    
//result.insertEvening;

result.init = function(i){   
	
	for (var i = 0; i < 28; i++) {
        result.eveningArray[i] = makeEvening(i);
    }
    
}
/*
result.insertEventId = function(eventId){
	result.eventIdArray.push(eventId);
}

result.insertFriendId = function(friendId){
	result.friendIdArray.push(friendId);
}
   */ 
    return result;
}
