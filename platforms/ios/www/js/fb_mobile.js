/*
    (function (d, s, id) {
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) {
            return;
        }
        js = d.createElement(s);
        js.id = id;
        js.src = "http://connect.facebook.net/en_US/all.js";
        fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
    */


   //window.fbAsyncInit = function () {

//window.localStorage.removeItem('runned');
   $(document).ready(function () {
                     alert("doc ready");
                     });

   document.addEventListener('resume', function () {
                             
                             alert("resume");
                             });

document.addEventListener('pause', function () {
                          
                          alert("pause");
                          });

    	      document.addEventListener('deviceready', function () {
                                        //window.fbAsyncInit only necessary for desktop
                                        window.fbAsyncInit = function() {
                                        alert("device ready 2");
                                        init();
                                        }
                                        });

                                        function init(){
                                        alert("init trigger");
                                        console.log("todaysStamp: "+todaysStamp);
                                         //window.localStorage.setItem('runned','i')
                                         if(window.localStorage.getItem('lastRanStamp')==null){
                                         alert("first run");
                                         window.localStorage.setItem('lastRanStamp',todaysStamp)
                                         } else{
                                         alert("last run stamp "+window.localStorage.getItem('lastRanStamp'));
                                         }

                                        /*
                                         var today = new Date();
                                         var tomorrow = new Date();
                                         tomorrow.setDate(today.getDate()+1);
                                         */
                                        
                                        //SELECT eid, name, pic_big, start_time, end_time, location, description, creator, host, venue FROM event WHERE eid IN (SELECT eid FROM event_member WHERE uid = 1317821699) AND update_time >= 1385942400 AND start_time >= now()
                                        
    	      		         /*
    	      	 var db = window.openDatabase("Database", "1.0", "PhoneGap Demo", 200000);
        db.transaction(populateDB, errorCB, successCB);
db.transaction(queryDB, errorCB);
*/
    	      		      
    	      		      
/*
        FB.init({
            //appId: '372363819446082', // App ID from the app dashboard
            appId: '253970731442450',
            //channelUrl: 'http://www.bp2u.com', // Channel file for x-domain comms
            channelUrl: 'www.event32ios.com',
            status: true, // Check Facebook Login status
            xfbml: true
});
 */
 
        
        FB.init({
                appId: '253970731442450',
                nativeInterface: CDV.FB,
                //channelUrl: 'http://www.event32ios.com',
                useCachedDialogs: false
                });
         
        FB.getLoginStatus(function(response){
	console.log("first fb call resp: "+JSON.stringify(response));
        	if(response.status == "connected"){
        		accessToken = response.authResponse.accessToken;
        		    navigator.geolocation.getCurrentPosition(function(position){
        		    		    var loc = {};
      loc.lat = position.coords.latitude;
      loc.lng = position.coords.longitude;
         clientLocation = new google.maps.LatLng(parseFloat(loc.lat), parseFloat(loc.lng));

        		$.proxy(mainInit('https://graph.facebook.com/me/friends?fields=picture,name,id&access_token=' + accessToken), this);
        		});
        	}else if (response.status == "not_authorized"){
        		$("#fb-login-button").text("Facebook Authorization");
        		$("#fb-login-button").css('display','block');
        	}else if (response.status == "unknown"){
        		$("#fb-login-button").text("Facebook Login");
        		$("#fb-login-button").css('display','block');
        	}
        });   
        
                 $("#fb-login-button").click(function(){
         		         FB.login($.proxy(function (response) {
         		         		// alert(JSON.stringify(response.data.shift()));
            if (response.authResponse) {
                accessToken = response.authResponse.accessToken;
                $("#fb-login-button").css('display','none');
                $.proxy(mainInit('https://graph.facebook.com/me/friends?fields=picture,name,id&access_token=' + accessToken), this);

            } else {
                console.log('User cancelled login or did not fully authorize.');
            }
        }, this), {
            scope: 'user_events,friends_events'
        });
         });
                                        }    //}
