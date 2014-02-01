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
    var mainCalendar = makeCalendar();
    var displayCalendar;
    var tempDate = new Date();
    var todaysStamp = tempDate.getDate();


   var date = new Date();
   var todaysStamp = (date.getMonth() + 1) + '/' + date.getDate() + '/' + date.getFullYear();

    var storage = window.localStorage;

function populateDate(k,e){
          var exHeight = ((74*34)+50);            
          var moreText = " More Events";
    
    

			if(expandedDate != null){

		         	 	 $("#event-list-wrap-trans-"+k).html("<div class='exEvent' style='height:74px;width;100px;background:green'>hi</div><div class='exEvent' style='height:74px;width;100px;background:green'>hi</div><div class='exEvent' style='height:74px;width;100px;background:green'>hi</div><div class='exEvent' style='height:74px;width;100px;background:green'>hi</div><div class='exEvent' style='height:74px;width;100px;background:green'>hi</div><div class='exEvent' style='height:74px;width;100px;background:green'>hi</div><div class='exEvent' style='height:74px;width;100px;background:green'>hi</div><div class='exEvent' style='height:74px;width;100px;background:green'>hi</div><div class='exEvent' style='height:74px;width;100px;background:green'>hi</div><div class='exEvent' style='height:74px;width;100px;background:green'>hi</div><div class='exEvent' style='height:74px;width;100px;background:green'>hi</div><div class='exEvent' style='height:74px;width;100px;background:green'>hi</div><div class='exEvent' style='height:74px;width;100px;background:green'>hi</div><div class='exEvent' style='height:74px;width;100px;background:green'>hi</div><div class='exEvent' style='height:74px;width;100px;background:green'>hi</div><div class='exEvent' style='height:74px;width;100px;background:green'>hi</div><div class='exEvent' style='height:74px;width;100px;background:green'>hi</div><div class='exEvent' style='height:74px;width;100px;background:green'>hi</div><div class='exEvent' style='height:74px;width;100px;background:green'>hi</div><div class='exEvent' style='height:74px;width;100px;background:green'>hi</div><div class='exEvent' style='height:74px;width;100px;background:green'>hi</div><div class='exEvent' style='height:74px;width;100px;background:green'>hi</div><div class='exEvent' style='height:74px;width;100px;background:green'>hi</div><div class='exEvent' style='height:74px;width;100px;background:green'>hi</div><div class='exEvent' style='height:74px;width;100px;background:green'>hi</div><div class='exEvent' style='height:74px;width;100px;background:green'>hi</div><div class='exEvent' style='height:74px;width;100px;background:green'>hi</div><div class='exEvent' style='height:74px;width;100px;background:green'>hi</div><div class='exEvent' style='height:74px;width;100px;background:green'>hi</div><div class='exEvent' style='height:74px;width;100px;background:green'>hi</div><div class='exEvent' style='height:74px;width;100px;background:green'>hi</div><div class='exEvent' style='height:74px;width;100px;background:green'>hi</div><div class='exEvent' style='height:74px;width;100px;background:green'>hi</div><div class='exEvent' style='height:74px;width;100px;background:green'>hi</div>"+ getMorebutton(k,moreText));
		         	 	
		         	   $("#event-list-wrap-trans-"+expandedDate).css("height","272px");  

		         	    $("#event-list-wrap-trans-"+k).css("height",exHeight);

		         	 }else{
		         	 	 $("#event-list-wrap-trans-"+k).html("<div class='exEvent' style='height:74px;width;100px;background:green'>hi</div><div class='exEvent' style='height:74px;width;100px;background:green'>hi</div><div class='exEvent' style='height:74px;width;100px;background:green'>hi</div><div class='exEvent' style='height:74px;width;100px;background:green'>hi</div><div class='exEvent' style='height:74px;width;100px;background:green'>hi</div><div class='exEvent' style='height:74px;width;100px;background:green'>hi</div><div class='exEvent' style='height:74px;width;100px;background:green'>hi</div><div class='exEvent' style='height:74px;width;100px;background:green'>hi</div><div class='exEvent' style='height:74px;width;100px;background:green'>hi</div><div class='exEvent' style='height:74px;width;100px;background:green'>hi</div><div class='exEvent' style='height:74px;width;100px;background:green'>hi</div><div class='exEvent' style='height:74px;width;100px;background:green'>hi</div><div class='exEvent' style='height:74px;width;100px;background:green'>hi</div><div class='exEvent' style='height:74px;width;100px;background:green'>hi</div><div class='exEvent' style='height:74px;width;100px;background:green'>hi</div><div class='exEvent' style='height:74px;width;100px;background:green'>hi</div><div class='exEvent' style='height:74px;width;100px;background:green'>hi</div><div class='exEvent' style='height:74px;width;100px;background:green'>hi</div><div class='exEvent' style='height:74px;width;100px;background:green'>hi</div><div class='exEvent' style='height:74px;width;100px;background:green'>hi</div><div class='exEvent' style='height:74px;width;100px;background:green'>hi</div><div class='exEvent' style='height:74px;width;100px;background:green'>hi</div><div class='exEvent' style='height:74px;width;100px;background:green'>hi</div><div class='exEvent' style='height:74px;width;100px;background:green'>hi</div><div class='exEvent' style='height:74px;width;100px;background:green'>hi</div><div class='exEvent' style='height:74px;width;100px;background:green'>hi</div><div class='exEvent' style='height:74px;width;100px;background:green'>hi</div><div class='exEvent' style='height:74px;width;100px;background:green'>hi</div><div class='exEvent' style='height:74px;width;100px;background:green'>hi</div><div class='exEvent' style='height:74px;width;100px;background:green'>hi</div><div class='exEvent' style='height:74px;width;100px;background:green'>hi</div><div class='exEvent' style='height:74px;width;100px;background:green'>hi</div><div class='exEvent' style='height:74px;width;100px;background:green'>hi</div><div class='exEvent' style='height:74px;width;100px;background:green'>hi</div>"+ getMorebutton(k,moreText));
		         	 	
		         	    $("#event-list-wrap-trans-"+k).css("height",exHeight);
    				 }
    				 expandedDate = k;
    				         enable_scroll();
}

function populateCalendar(calendar){
	displayCalendar = calendar;
	for (var i = 0; i < 28; i++) {
if(typeof calendar[i].eventIdArray[0] != "undefined"){
	
//$("#dateMainList").append("<li class='date-list-elem-outter' style='z-index:"+(28-i)+"' id='date-elem-"+i+"-list' name='"+i+"' >"+getDateHeader(calendar[i])+"<div id='event-list-wrap-trans-"+i+"' class='event-list-wrap-trans'><div id='event-list-wrap-"+i+"' class='event-list-wrap'></div></div></li>");
	$("#dateMainList").append("<li class='date-list-elem-outter' style='z-index:"+(28-i)+"' id='date-elem-"+i+"-list' name='"+i+"' >"+getDateHeader(calendar[i])+"<div id='event-list-wrap-trans-"+i+"' class='event-list-wrap-trans'></div></li>");
		     
$("#event-list-wrap-trans-" + i).append(getEventRow(fbArray[calendar[i].eventIdArray[0]].fbId,"topEvent"));
     
}else{
     	           continue;	
      continue;	     
     }
     if(typeof calendar[i].eventIdArray[1] != "undefined"){
			     $("#event-list-wrap-trans-" + i).append(getEventRow(fbArray[calendar[i].eventIdArray[1]].fbId,"topEvent"));
     }else{
     	     $("#event-list-wrap-trans-"+ i).append('<div class="spacer"></div>');
      continue;	     
     }
     if(typeof calendar[i].eventIdArray[2] != "undefined"){
			     $("#event-list-wrap-trans-" + i).append(getEventRow(fbArray[calendar[i].eventIdArray[2]].fbId,"topEvent"));
     }else{
     	     $("#event-list-wrap-trans-"+ i).append('<div class="spacer"></div>');
     	 continue;     
     }
     var moreText = (calendar[i].eventIdArray.length - 4) +" More Events";
     $("#event-list-wrap-trans-"+ i).append("<div id='more-events-marker-"+i+"'></div>");
     	$("#event-list-wrap-trans-"+ i).append(getMorebutton(i,moreText));
     	//$("#event-list-wrap-trans-"+ i).append("<div id='more-events-marker-"+i+"'></div>");
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
    }
    
    mainCalendar.init();
    
    
    //FQL Queries
    //SELECT eid, name, pic_big, start_time, end_time, location, description, creator, host, venue FROM event WHERE eid IN (SELECT eid FROM event_member WHERE uid = 1317821699) AND update_time >= 1383264000
//SELECT eid, name, pic_big, start_time, end_time, location, description, creator, host, venue FROM event WHERE eid IN (SELECT eid FROM event_member WHERE uid = 1317821699) AND update_time >= 1385942400 AND start_time >= now()

//SELECT name, birthday, email, uid FROM user WHERE uid in (SELECT uid2 FROM friend WHERE uid1 = me())


//SELECT eid, name, pic_big, start_time, end_time, location, description, creator, host, venue FROM event WHERE eid IN (SELECT eid FROM event_member WHERE uid = 1317821699) AND update_time >= 1385942400 AND start_time >= now()

    function mainInit(url) {
    	    /*
        $('body').append("<style>.halfPageWidth {width:" + pageHalfWidth + "px}</style>");
        $('body').append("<style>.halfPageSquare {width:" + pageHalfWidth + "px;height:" + pageHalfWidth + "px}</style>");
        $('body').append("<style>.selectedListFlyer .attendee-wrap{width:" + halfwidth + "px}</style>");
        $('body').append("<style>.selectedListFlyer .flyer-wrap{width:" + halfwidth + "px}</style>");
        $('body').append("<style>.selectedListFlyer .event-name-wrap{width:" + halfwidth + "px}</style>");
        $('body').append("<style>.selectedListFlyer .formatted-date-wrap{width:" + halfwidth + "px}</style>");
        $('body').append("<style>.selectedListFlyer .event-img{width:" + halfwidth + "px;height:" + halfwidth + "px}</style>");
        $('body').append("<style>@-webkit-keyframes eventImgAnim{from {height:50px;width:50px;top:0px;left:0px}to {height:" + halfwidth + "px;width:" + halfwidth + "px;top:34.42px;left:25px}}</style>");
*/
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
        } catch (err) {
        }
        	    if (event.dateId >= 0) {
            //Make sure date isn't more than three monthes in the future
            	      if (parseInt(event.dateId) < 28) {
                if (typeof fbArray[value.id] == "undefined") {
                    //Need to run tests on friend before adding to fbArray
                    fbArray[value.id] = event;
                    eveningHash[parseInt(event.dateId)].eventIdArray.push(value.id);
                    //mainCalendar.init();
                    mainCalendar.eveningArray[parseInt(event.dateId)].eventIdArray.push(value.id);
                    
                    eveningHash[parseInt(event.dateId)].friendListEventCalendarState = eveningHash[parseInt(event.dateId)].friendListEventCalendarState & setBit(0, 3); 
                }
                eveningHash[parseInt(event.dateId)].friendIdArray.push(friendID);
                mainCalendar.eveningArray[parseInt(event.dateId)].friendIdArray.push(value.id);
                
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

function getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2) {
    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(lat2-lat1);  // deg2rad below
    var dLon = deg2rad(lon2-lon1);
    var a =
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
    Math.sin(dLon/2) * Math.sin(dLon/2)
    ;
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    var d = R * c; // Distance in km
    return d;
}

function deg2rad(deg) {
    return deg * (Math.PI/180)
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
                	
                	 for (var i = 0; i < 28; i++) {
                	 eveningHash[i].generateHtml();	 
                	 }
                	
populateCalendar(eveningHash);
                }
            }, this))

            friendsEventObj = {};
            friendsEventObj.batch = batch;
            batch = new Array();
        }); //End of batch call each
    }
