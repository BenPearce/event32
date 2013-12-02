    var friendArray = new Array();
    var eveningHash = new Array();
    var dateStateArray = new Array();
    var dateTrackingArray = new Array();
    var tapped = false;
    var eveningTapped = false;
    var selectedFriendGroup = [];
    var eventTapped = false;
    var friendTapped = false;
    var geocoder = new google.maps.Geocoder();
    var lock = false;
    var fbArray = {};
    var batchItteration = 0;
    var deviceWidth = (window.innerWidth > 0) ? window.innerWidth : screen.width;
    var pageWidth = deviceWidth != 'undefined'? parseInt(deviceWidth * .97): 320;
    //console.log("deviceWidth: "+deviceWidth);
    //var pageWidth = parseInt(deviceWidth) * (.97);
    var pageHalfWidth = parseInt(pageWidth) / 2;
    var halfwidth = (parseInt(deviceWidth) / parseInt(2)) - 25;
    var halfwidth = (parseInt(deviceWidth)) - 10;
    var selectedFriendGroup = new Array();
    var eventInsertionCountInternal = 0;
    var friendCount1;
    var eveningCountArray = new Array();
    var expandedDate = null;
    var exDateIndex;
    var testGap;

function moreEvents(dateId){	
}

/*
function populateCalendar(friendIdList){

	selectedFriendGroup = friendIdList;
	var tempFriendCount = 0;
	var tempEventCount = 0;
		$(".date-list-elem").html("");
	                      for (var i = 0; i < 28; i++) {
	     $("#dateMainList").append("<li class='date-list-elem-outter' style='z-index:"+(28-i)+"' id='date-elem-"+i+"-list' name='"+i+"' ><div  class='date-list-elem-wrap'><div name='"+i+"'  class='date-list-elem' id='date-elem-"+i+"'>"+getDateHeader(eveningHash[i])+"</div> <div id='event-list-wrap-trans-"+i+"' class='event-list-wrap-trans'> <div id='event-list-wrap-border-"+i+"' class='event-list-wrap-border'>  <div id='event-list-wrap-outter-"+i+"' class='event-list-wrap-outter'> <div id='event-list-wrap-"+i+"' class='event-list-wrap'></div></div></div></div></div></li>");
        dateTrackingArray[i] = 0;
    }
	$.each(friendIdList,function(i,friendId){
			tempFriendCount = tempFriendCount +1;
		$.each(fbArray[friendId].eventIdArray,function(j,eventId){
				dateTrackingArray[fbArray[eventId].dateId] = dateTrackingArray[fbArray[eventId].dateId] +1;
				if(dateTrackingArray[fbArray[eventId].dateId]<= 4){
				tempEventCount = tempEventCount+1;
				$("#event-list-wrap-" + fbArray[eventId].dateId).append(getEventRow(eventId));
				
				}else if(dateTrackingArray[fbArray[eventId].dateId] == 5){
					$("#event-list-wrap-trans-"+ fbArray[eventId].dateId).append(getMorebutton(fbArray[eventId].dateId));
				} else{					
				}	
		});
	});
	setFriendTap();
}
*/



function populateDate(k){
//alert("pop date");

	//testGap = $("#event-list-wrap-ex" +expandedDate).height();

		         	 //$("#event-list-wrap-ex" +expandedDate).html("");
		         	 //event-list-wrap-ex
		         	 /*
		         	  $("#event-list-wrap-ex-" +expandedDate).height("0");
		         	 $("#event-list-wrap-ex-" +expandedDate).empty();
		         	 */
		         	 if(expandedDate != null){
		         	 	 //alert("no null");
		         	   //$("#event-list-wrap-" +expandedDate).height("200");
		         	   $("#event-list-wrap-"+expandedDate).css("height","222px");
		         	 //$("#event-list-wrap-" +expandedDate).empty();
		         	 //$("#event-list-wrap-"+expandedDate).find(".exEvent").remove();
		         	   $(".exEvent").remove();
		         	 }

	var exHeight = (74*((eveningHash[k].eventIdArray.length)));

             //$("#event-list-wrap-ex-" +k).height(exHeight);
             //$("#event-list-wrap-ex-" +k).height("800");
             
             //$("#event-list-wrap-ex" +k).height("200");
             //alert( $("#event-list-wrap-ex" +k).html());
             //$("#event-list-wrap-"+k).height("700");
             //$("#event-list-wrap-"+k).css("height","700px");
             $("#event-list-wrap-"+k).css("height",exHeight);
             
            
             
             	
          //$("#event-list-wrap-ex" +k).height("500");
            /*
            	if(expandedDate==null){

	}else if(k>expandedDate){

			var scrollDiff = (74*((eveningHash[expandedDate].eventIdArray.length)-3));
			var y = $(window).scrollTop();  //your current y position on the page      
                    	$(window).scrollTop(y-testGap); 
   
	}else if(k == expandedDate){
		   
	}else{
		
	}
           */ 
           
           var html = "";
           
	for (var i = 3; i < eveningHash[k].eventIdArray.length; i++) {
		html = html +getEventRow(fbArray[eveningHash[k].eventIdArray[i]].fbId,"exEvent");
		//$("#event-list-wrap-" +k).append(getEventRow(fbArray[eveningHash[k].eventIdArray[i]].fbId,"exEvent"));
	}
	$("#event-list-wrap-" +k).append(html);
	
		expandedDate = k;
		

		
}


function populateCalendar(){
	for (var i = 0; i < 28; i++) {
if(typeof eveningHash[i].eventIdArray[0] != "undefined"){
	
$("#dateMainList").append("<li class='date-list-elem-outter' style='z-index:"+(28-i)+"' id='date-elem-"+i+"-list' name='"+i+"' >"+getDateHeader(eveningHash[i])+"<div id='event-list-wrap-trans-"+i+"' class='event-list-wrap-trans'><div id='event-list-wrap-"+i+"' class='event-list-wrap'></div></div></li>");

			     $("#event-list-wrap-" + i).append(getEventRow(fbArray[eveningHash[i].eventIdArray[0]].fbId,"topEvent"));
     }else{
     	           continue;	
      continue;	     
     }
     if(typeof eveningHash[i].eventIdArray[1] != "undefined"){
			     $("#event-list-wrap-" + i).append(getEventRow(fbArray[eveningHash[i].eventIdArray[1]].fbId,"topEvent"));
     }else{
     	     $("#event-list-wrap-trans-"+ i).append('<div class="spacer"></div>');
      continue;	     
     }
     if(typeof eveningHash[i].eventIdArray[2] != "undefined"){
			     $("#event-list-wrap-" + i).append(getEventRow(fbArray[eveningHash[i].eventIdArray[2]].fbId,"topEvent"));
     }else{
     	     $("#event-list-wrap-trans-"+ i).append('<div class="spacer"></div>');
     	 continue;     
     }
     var moreText = (eveningHash[i].eventIdArray.length - 4) +" More Events";
     	$("#event-list-wrap-trans-"+ i).append(getMorebutton(i,moreText));

     			     //$("#event-list-wrap-trans-"+ i).append(getMorebutton(fbArray[eveningHash[i].eventIdArray[3]].dateId));

     /*
     if(typeof eveningHash[i].eventIdArray[3] != "undefined"){
			     $("#event-list-wrap-" + i).append(getEventRow(fbArray[eveningHash[i].eventIdArray[3]].fbId));
     }else{
     $("#event-list-wrap-trans-"+ i).append('<div class="spacer"></div>');
      continue;
     }
     */
			     //$("#event-list-wrap-" + i).append(getEventRow(eventId));
	//eveningHash[i];
	}
	setFriendTap()
}

        //iphone width 320px
        //FQL SELECT uid, eid, rsvp_status FROM event_member WHERE uid = me() And start_time > 1379480400
        //Logic Functions
        function mask(n) {
            return 1 << n; // shift 1 n-bits left
        }

        // sets a specified bit in flag to 1
        function setBit(flag, bit) {
            return flag | mask(bit);
        }

        // retrieves a specified bit from flag
        function getBit(flag, bit) {
            if (0 == (flag & mask(bit))) {
                return 0;
            } else {
                return 1;
            }
        }

        function calcDistance(p1, p2) {
            return (google.maps.geometry.spherical.computeDistanceBetween(p1, p2) / 1000).toFixed(2);
        }

    for (var i = 0; i < 28; i++) {
        eveningHash[i] = makeEvening(i);
        dateStateArray[i] = mask(i);
        dateTrackingArray[i] = 0;
        //$("#dateDisplayer-"+i).append(getDateHeader(eveningHash[i]));
    }

    function mainInit(url) {
    	    //console.log("Main init");
        $('body').append("<style>.halfPageWidth {width:" + pageHalfWidth + "px}</style>");
        $('body').append("<style>.halfPageSquare {width:" + pageHalfWidth + "px;height:" + pageHalfWidth + "px}</style>");
        $('body').append("<style>.selectedListFlyer .attendee-wrap{width:" + halfwidth + "px}</style>");
        $('body').append("<style>.selectedListFlyer .flyer-wrap{width:" + halfwidth + "px}</style>");
        $('body').append("<style>.selectedListFlyer .event-name-wrap{width:" + halfwidth + "px}</style>");
        $('body').append("<style>.selectedListFlyer .formatted-date-wrap{width:" + halfwidth + "px}</style>");
        $('body').append("<style>.selectedListFlyer .event-img{width:" + halfwidth + "px;height:" + halfwidth + "px}</style>");
        $('body').append("<style>@-webkit-keyframes eventImgAnim{from {height:50px;width:50px;top:0px;left:0px}to {height:" + halfwidth + "px;width:" + halfwidth + "px;top:34.42px;left:25px}}</style>");

        $.get(url, $.proxy(function (response) {
            var batchItem = {};
            batch = new Array();
            friendsEventObj = {};
            var friendCount = response.data.length;
            var batchNo = 0;
            friendTrackingArray = new Array();
            batchItterate(getBatchCallArray(response));

            if (typeof response.paging.next != "undefined") {
                paginationUrl = response.paging.next
            } else {
                paginationUrl = "undefined";
            }
            $("#dateMainList").listview();
            $("#dateMainList").listview('refresh');
        }, this));
    }

    function getBatchCallArray(response) {
        var batchCallArray = new Array();
        var count = 0;
        //Parsing through friends to construct tracking array
        $.each(response.data, $.proxy(function (index, value) {

            if ((count < 50) & ((parseInt(count) + parseInt(batchCallArray.length) + 1 + (parseInt(batchCallArray.length) * 50)) < parseInt(response.data.length))) {

                var batchItem = {
                    "method": "GET"
                };
                friendTrackingArray[count] = value;
                friendTrackingArray[count].number = count;
                batchItem.relative_url = value.id + "/events?fields=name,start_time,picture,venue,description&access_token=" + accessToken.replace('"', '').replace('"', '');
                batch.push(batchItem);
                count = count + 1;
            } else {
                friendsEventObj.batch = batch
                friendsEventObj.friendTrackingArray = friendTrackingArray;
                batchCallArray.push(friendsEventObj);
                count = 0;
                friendsEventObj = {};
                batch = new Array();
                friendTrackingArray = new Array()
            }
        }, this))
        return batchCallArray;
    }

    function parseEvent(value, friendID) {
        try {
            var event = makeEvent(value);
            //tempEventCountGlobal = tempEventCountGlobal +1;
        } catch (err) {
             //console.log("event parse err: " + err);
        }
        	    if (event.dateId >= 0) {
        	    	    //console.log("Parse Event2");
            //Make sure date isn't more than three monthes in the future
            	      if (parseInt(event.dateId) < 28) {
                if (typeof fbArray[value.id] == "undefined") {
                    //Need to run tests on friend before adding to fbArray
                    fbArray[value.id] = event;
                    eveningHash[parseInt(event.dateId)].eventIdArray.push(value.id);
                    eveningHash[parseInt(event.dateId)].friendListEventCalendarState = eveningHash[parseInt(event.dateId)].friendListEventCalendarState & setBit(0, 3); 
                }
                eveningHash[parseInt(event.dateId)].friendIdArray.push(friendID);

                //If we create an operation that pushes to array as well as adds list element
                //console.log("line before insert friend");
                fbArray[friendID].insertEvent(fbArray[value.id].fbId, event.dateId);
                fbArray[value.id].insertFriend(fbArray[friendID].fbId, event.dateId);
                //Local Event Detection
                if (event.venue.clientDistance < 50) {
                    friend.local = true;
                    fbArray[friendID].local = true;
                    event.local = true;
                    fbArray[value.id].local = true;
                }
                //Detection for todays events
                if (event.dateId == 0) {
                    friend.tonight = true;
                    fbArray[friendID].tonight = true;
                    event.tonight = true;
                    fbArray[value.id].tonight = true;
                }
            } //Is there already an entry for date code      
        } //Is date Tonuight
    }

    function parseFriend(friendValue, val, friendIndex) {
        if (JSON.parse(friendValue.body).data.length > 0) {
            friendTrackingArray = val.friendTrackingArray;
            //FIRST ONE OF THESE IS COMING BACK UNSUPPORTED
            if (typeof friendValue.body != "undefined" || typeof JSON.parse(friendValue.body).paging != "undefined" || typeof JSON.parse(friendValue.body).paging != "undefined") {

                var friend = makeFriend(friendTrackingArray[friendIndex], friendTrackingArray[friendIndex].id, friendCount1);
                friendArray.push(friend.fbId);
                var friendID = friendTrackingArray[friendIndex].id;
                if ((typeof fbArray[friendTrackingArray[friendIndex].id]) == "undefined") {
                    //Need to run tests on friend before adding to fbArray
                    fbArray[friendID] = friend;
                }
                friendCount1 = friendCount1 + 1;
                //Parsing through users events
                $.each(JSON.parse(friendValue.body).data, $.proxy(function (index, value) {

                    try {
                        parseEvent(value, friendID);
                    } catch (err) {

                    }

                }, this))
            }
        } else {}
    }

    function batchItterate(batchCallArray) {
        friendCount1 = 0;
        $.each(batchCallArray, function (i, val) {
            friendsEventObj.batch = batch
            FB.api('/', 'post', val, $.proxy(function (response) {
                this.data = response;
                //Parsing through friends Event Object
                $.each(response, $.proxy(function (friendIndex, friendValue) {
                    //Are there events in event array                    
                    if (typeof JSON.parse(friendValue.body).data != "undefined") {

                        try {
                            parseFriend(friendValue, val, friendIndex);
                        } catch (err) {}
                    } else {}               
                }, this));

                batchItteration = batchItteration + 1;
                if (batchItteration == batchCallArray.length) {

//populateCalendar(friendArray);
populateCalendar();
                }
            }, this))

            friendsEventObj = {};
            friendsEventObj.batch = batch;
            batch = new Array();
        }); //End of batch call each
    }
