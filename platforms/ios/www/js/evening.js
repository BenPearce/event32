function evening() {
    this.dateCode;
    this.covertedData;
    this.eventList;
    this.formattedDate;
    this.id;
    this.topArray;
    this.botArray;
    this.friendIdArray;
    this.eventIdArray;
    this.friendListEventCalendarState;
    this.dateStringArray;
    this.touched = false;
    this.init;
    this.htmlString;
    this.eveningState;
    this.dateArray;
    this.monthNumber;
    this.insertEventId;
    this.insertFriendId;
    this.topEventsHtml;
    this.eventExHtml;
    this.generateHtml;
}

function makeEvening(integer) {
    var result = new evening();
    var proximity = makeListElement();
    $.extend(result, proximity);
    result.friendIdArray = new Array();
    result.eventIdArray = new Array();
    result.eventList = new Array();
    result.topArray = new Array();
    result.botArray = new Array();
    result.dateArray = new Array(); 
    result.topEventsHtml = "";
    result.eventExHtml = "";
    result.generateHtml = function(){
    	    /*
    	    $.each(){
    	    	    
    	    }
    	    */
    }
    
    result.insertEventId = function(eventId){
    	   result.eventIdArray.push(eventId);
    	   //result.topEventsHtml = topEventsHtml +;
    }
    
    result.insertFriendId = function(friendId){
    	    result.friendIdArray.push(friendId); 
    	    //result.eventExHtml = topEventsHtml +;
    }
    
    result.friendListEventCalendarState = setBit(0,0);

    //result.friendListEventCalendarState & setBit (0,3)
    result.id = integer;
    //result.convertedData = integerToDate(integer);
    result.convertedData = integer;
    result.convertedData = integerToDate(integer);
    result.formattedDate = result.convertedData.toString().substr(0, result.convertedData.toString().indexOf(":") - 3);
    //result.formattedDate.substr(0, result.formattedDate.toString().indexOf(" "));
    result.dateStringArray = result.formattedDate.split(" ");
    //if(){ 
  
    //result.monthNumber = result.dateStringArray[0] = "Jan" ?   result.dateStringArray[0] = "Feb" ?     : "2"  : "1";  
    if(result.dateStringArray[1] == "Jan"){
    	 result.monthNumber = "1";    
    }else if(result.dateStringArray[1] == "Feb"){       
    	 result.monthNumber = "2";     
    }else if(result.dateStringArray[1] == "Mar"){     
    	 result.monthNumber = "3";      	     
    }else if(result.dateStringArray[1] == "April"){     
    	 result.monthNumber = "4";  
    }else if(result.dateStringArray[1] == "May"){     
    	 result.monthNumber = "5";  
    }else if(result.dateStringArray[1] =="June"){     
    	 result.monthNumber = "6";  
    }else if(result.dateStringArray[1] == "July"){     
    	    result.monthNumber = "7";  
    }else if(result.dateStringArray[1] == "Aug"){     
         result.monthNumber = "8";  
    }else if(result.dateStringArray[1] == "Sept"){     
    	   result.monthNumber = "9";  
    }else if(result.dateStringArray[1] == "Oct"){     
          result.monthNumber = "10";  
    }else if(result.dateStringArray[1] == "Nov"){     
    	   result.monthNumber = "11";  
    }else if(result.dateStringArray[1] == "Dec"){     
           result.monthNumber = "12";  
    }
      /*     
    dateStringArray[0] = "Feb" ? "2" :
    dateStringArray[0] = "Feb" ? "3" :
    dateStringArray[0] = "Feb" ? "4" :                  
    dateStringArray[0] = "Feb" ? "5" :
    dateStringArray[0] = "Feb" ? "6" :
    dateStringArray[0] = "Feb" ? "7" :
    dateStringArray[0] = "Feb" ? "8" :
    dateStringArray[0] = "Feb" ? "9" :
    dateStringArray[0] = "Feb" ? "10" :
    dateStringArray[0] = "Feb" ? "11" :
    dateStringArray[0] = "Feb" ? "12" :
        */
      //result.monthNumber =  result.dateStringArray[0] = "Jan" ? "1" : result.dateStringArray[0] = "Feb" ? "2" : result.dateStringArray[0] = "Feb" ? "3" : result.dateStringArray[0] = "Feb" ? "4" : result.dateStringArray[0] = "Feb" ? "5" : result.dateStringArray[0] = "Feb" ? "6" : result.dateStringArray[0] = "Feb" ? "7" : result.dateStringArray[0] = "Feb" ? "8" : result.dateStringArray[0] = "Feb" ? "9" : result.dateStringArray[0] = "Feb" ? "10" : result.dateStringArray[0] = "Feb" ? "11" : result.dateStringArray[0] = "Feb" ? "12" : "";
    
    


    
    //result.dateCode = dateToInteger(result.convertedData);
    result.dateCode = integer;
    result.domClone = $("<div><li class='evening' id='date-elem-"+result.id+"-list'><div class='date-list-elem' id='date-elem-"+result.id+"'><div class='date-wrap'><div class='day-name-wrap'></div><div class='day-num-wrap'></div><div class='month-wrap'></div></div><div class='date-img-cluster'><div class='date-img-cluster-inner'><div class='img-cluster-top'></div><div class='img-cluster-bot'></div></div></div></div><div class='eventExpand'></div></li></div>");

    result.domClone.attr('id', integer);
    result.id = integer;

    return result;
}
