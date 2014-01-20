function venue() {
    this.data;
    this.domClone;
    this.defined;
    this.latitude;
    this.longitude;
    this.coordinate;
    this.venue_latitude;
    this.venue_longitude;
    this.zip;
    this.city;
    this.state;
    this.country;
    this.street;
    this.fbId;
    this.map;
    this.test;
    this.exists = false;
    this.location;
    this.clientDistance;
    this.local;
    this.name;
}

function makeVenue(data) {
    console.log("make venue triggered");
    var result = new venue();
    /*
    var proximity = makeListElement(data);
    result.test = "test";
    $.extend(result, proximity);
    if (typeof data != "undefined") {
        result.exists = true;
        if (typeof data.latitude != "undefined" & typeof data.longitude != "undefined") {

            result.latitude = data.latitude;
            result.longitude = data.longitude;
            //result.location = new google.maps.LatLng(result.latitude, result.longitude);
            result.location = "null";
            //result.clientDistance = calcDistance(clientLocation, result.location);
            result.clientDistance = "null";
            if (result.clientDistance < 50) {
                result.local = true;
            } else {
                result.local = false;
            }

            result.coordinate = data.latitude + "," + data.longitude;
            if (typeof data.id != "undefined") {
                result.exists = true;
                result.name = data.name;
                result.fbId = data.id;
                result.photo = data.picture;
            } else {
                result.exists = false;
            }
        } else {
            result.exists = false;
        }

    } else {
        result.exists = false;
    }
     */
    
    result.venue_latitude = data.venue_latitude;
    result.venue_longitude = data.venue_longitude;
    result.coordinate =data.venue_latitude + ","+data.venue_longitude;
    result.name = data.venue_name;
    /*
    console.log("mk venue lat: "+result.venue_latitude);
    console.log("mk venue long: "+result.venue_longitude);
     */
    console.log("mk venue name: "+result.name);
    result.data;
    result.test = "test";
    result.eventDomClone = $("<div class='venueEvent' data-role='collapsible' data-collapsed='true'><h3></h3><p></p></div>");
    result.domClone = $("<div class='venue' data-role='collapsible' data-collapsed='true'><h3></h3><p></p></div>");
    result.getEventHtml = function (event, i) {
        this.domClone.attr("id", i);
        return this.domClone;
    }
    return result;
}
