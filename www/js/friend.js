function friend() {
    this.data;
    this.domClone;
    this.eventList;
    this.fbId;
    this.name;
    this.init;
    this.expand;
    this.eventList;
    this.friendCount;
    this.tonight;
    this.local;
    this.nameArray;
    this.fbIdArray;
    this.eventIdArray;
    this.dateIdArray;
    this.picUrl;
    this.eventListHtml;
    this.insertEvent;
    this.type;
    this.eveningArray;
    this.dateTruthTable;
    this.dateState;
    this.eventSelectors;
    this.dateMask;
    this.eveningEventArray;
    this.dateBitArray;
}

function makeFriend(rawData, fbId, index) {
    var result = new friend();
    var proximity = makeListElement(rawData);
    $.extend(result, rawData);
    result.eventIdArray = new Array();
    result.dateIdArray = new Array();
    result.eventList = new Array();
    result.eveningArray = new Array();
    result.dateBitArray = new Array();
    
    for(i=0;i<=32;i++){
    	result.dateBitArray[setBit(i)] = new Array();  
    }
    result.eveningEventArray = {};
    result.dateState = setBit(0,0);
    result.eventSelectors = {};
    //result.eventSelectors = new Array();
    result.tonight = false;
    result.local = false;
    result.type = "friend";
/*
     typeof rawData != "undefined"  ? result.data =  rawData : throw "eventNameUndefined";
     typeof fbId != "undefined"  ? result.fbId = fbId : throw "eventNameUndefined";
     typeof rawData.name != "undefined"  ? result.nameArray =  rawData.name.split(" ") : throw "eventNameUndefined";
     typeof rawData.picture.data.url != "undefined"  ?  result.picUrl =  rawData.picture.data.url : throw "eventNameUndefined";
     */
     
     if (typeof rawData != "undefined"){
     	   result.data =  rawData;
     }else{
     	  throw "eventNameUndefined"   
     }
     
          
     if (typeof fbId != "undefined"){
     	   result.fbId = fbId;
     }else{
     	  throw "eventNameUndefined"   
     }
     
          
     if (typeof rawData.name != "undefined"){
     	   result.nameArray =  rawData.name.split(" ");
     }else{
     	  throw "eventNameUndefined"   
     }
     
          
     if (typeof rawData.picture.data.url != "undefined"){
     	   result.picUrl =  rawData.picture.data.url;
     }else{
     	  throw "eventNameUndefined"   
     }
     
    //result.fbId = fbId;
    result.dateMask = 0;

    //result.nameArray = rawData.name.split(" ");
    //result.nameArray = rawData.name.split(" ");
    //result.picUrl = rawData.picture.data.url;

    result.eventListHtml= "";
    
    result.populateTempEveningHash = function (){
    	    $.each(result.eventSelectors, function(dateIndex, eventId) {
    	    	 result.dateState = result.dateState &  setBit(0,dateIndex);
    	    	       eveningHashSubset[dateIndex].friendIdArray.push(result.fbId);
    	    		    eveningHashSubset[dateIndex].eventIdArray.push(eventId);
});
    };
    
    
    result.insertEvent = function(eventId, dateCode){
    	    
    	    //eveningEventArray[dateCode]
    	    //Look up the date
    	    //Calculate the hash code
    	    //Start with original mask of all zeros
    	    //When I bring in an event master or it with original
    	   // result.dateMask = mask[dateCode] | result.dateMask;
    	    //Store all masks in an array of length 32
            console.log("event-friend insert start");
            /*
    	    var i = parseInt(dateCode);
    	    result.eveningEventArray.dateCode = eventId;
    	    result.eventSelectors[parseInt(dateCode)] = eventId;   	
    	    //result.dateState = result.dateState &fbArray[eventId].dateState;
    	    result.dateState = setBit(result.dateState,mask(dateCode));
    	    result.dateBitArray[dateCode].push(eventId);
    	    */
    	    
    	    result.eventIdArray.push(eventId);
    	    //result.eventIdArray[eventId];
    	    //result.eventListHtml = result.eventListHtml + "<div class='event-sub-elem'><img class='event-list-elem-fixed-img' width=25 height=25 src='https://graph.facebook.com/"+fbArray[eventId].fbId+"/picture?width=50&height=50'><div class='event-sub-elem-name'>"+fbArray[eventId].formattedDate+"</div></div>";
   console.log("event-friend insert end");
    }
    
    
    result.domClone = $("<li class='friend invisible' data-role='collapsible' data-collapsed='true'><div style='display:block;width:%100' class='friend-wrap'><div class='friend-img-wrap' style='display:inline-block;border:12px solid black'><img class='fbProfileImg' style='vertical-align:middle;border:1px solid hsl(0, 0%, 93%)' height = '50' width = '50' src=''></div><div  class='name-wrap' style='display:inline-block;vertical-align:top;margin-left:10px;margin-top:3px'><div style='display:block;font-size:12pt;font-weight:none' class='first-name-wrap'></div><div class='last-name-wrap' style='display:block;width:80px;font-style:italic;font-size:12px'></div><div class='friend-extras' style='display:block;width:160px'><div class='tonight' style='display:none;font-style:italic;font-size:12px;color:blue'>tonight </div><div class='local' style='display:none;font-style:italic;font-size:12px;color:green'>local</div></div></div><div class='eventCountWrap' style = 'display:inline;position:relative;float:right;margin-right:50px;margin-top:14px'><img class='arrow' style ='vertical-align:middle;margin:0px 5px;position:absolute;top:0px;opacity:.35' width=25px src='images/tri_side.png' style='display:inline'></div></div><div style='display:none' class='eventExpand'></div></li>");
    result.friendCount = index;
    result.domClone.attr('id', fbId);
    result.domClone.attr('friendcount', index);
    var temp = rawData.name.substr(0, rawData.name.indexOf(" "));
    result.domClone.find('.first-name-wrap').append(result.nameArray[0] + " " + result.nameArray[result.nameArray.length - 1]);
    var temp = rawData.name.substr(rawData.name.indexOf(" "));
    result.domClone.find('.fbProfileImg').attr("src", result.picUrl);   
    result.dateCode;

    return result;
}
