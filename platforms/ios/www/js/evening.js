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
    this.weekday;
    this.weekDayLong;
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
    result.weekDay = new Array(7);
    
    result.weekDay[0]="Sun";
    result.weekDay[1]="Mon";
    result.weekDay[2]="Tue";
    result.weekDay[3]="Wed";
    result.weekDay[4]="Thur";
    result.weekDay[5]="Fri";
    result.weekDay[6]="Sat";
    /*
    result.weekDay[0]="Sunday";
    result.weekDay[1]="Monday";
    result.weekDay[2]="Tuesday";
    result.weekDay[3]="Wednesday";
    result.weekDay[4]="Thursday";
    result.weekDay[5]="Friday";
    result.weekDay[6]="Saturday";
     */
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
    result.weekDayLong = result.weekDay[result.convertedData.getDay()]
    //console.log("weekDayLong "+result.weekDayLong);
    result.formattedDate = result.convertedData.toString().substr(0, result.convertedData.toString().indexOf(":") - 3);
    //result.formattedDate.substr(0, result.formattedDate.toString().indexOf(" "));
    //console.log("formatted Date: "+result.formattedDate);
    result.dateStringArray = result.formattedDate.split(" ");
    //console.log("dateStringArray[2] "+result.dateStringArray[2]);
    //if(){
    //console.log(result.dateStringArray[1]);
    //result.monthNumber = result.dateStringArray[0] = "Jan" ?   result.dateStringArray[0] = "Feb" ?     : "2"  : "1";
    if(result.dateStringArray[1] == "Jan"){
        result.monthNumber = "1";
    }else if((result.dateStringArray[1] == "Feb")|(result.dateStringArray[1] == "February")){
        result.monthNumber = "2";
    }else if((result.dateStringArray[1] == "Mar")|(result.dateStringArray[1] == "March")){
        result.monthNumber = "3";
    }else if((result.dateStringArray[1] == "April")|(result.dateStringArray[1] == "Apr")){
        result.monthNumber = "4";
    }else if(result.dateStringArray[1] == "May"){
        result.monthNumber = "5";
    }else if((result.dateStringArray[1] =="June")|(result.dateStringArray[1] =="Jun")){
        result.monthNumber = "6";
    }else if((result.dateStringArray[1] == "July")|(result.dateStringArray[1] == "Jul")){
        result.monthNumber = "7";
    }else if((result.dateStringArray[1] == "Aug")|(result.dateStringArray[1] == "August")){
        result.monthNumber = "8";
    }else if((result.dateStringArray[1] == "Sept")|(result.dateStringArray[1] == "Sep")|(result.dateStringArray[1] == "September")){
        result.monthNumber = "9";
    }else if((result.dateStringArray[1] == "Oct")|(result.dateStringArray[1] == "October")){
        result.monthNumber = "10";
    }else if((result.dateStringArray[1] == "Nov")|(result.dateStringArray[1] == "November")){
        result.monthNumber = "11";
    }else if((result.dateStringArray[1] == "Dec")|(result.dateStringArray[1] == "December")){
        result.monthNumber = "12";
    }
    //console.log(result.monthNumber);
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