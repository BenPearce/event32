function mapButton() {}

function makeMapButton(event) {
    var result = new mapButton();
    var button = makeButton();
    $.extend(result, button);
    result.click = function () {
    	    //alert("coor: "+event.venue.coordinate);
        //$('.pop-map').attr('data-position-to','.selectedEvent');
        //$('#page').trigger('pagecreate');
        //$('.pop-map').css("vertical-align",'center");
        //alert(event.venue.coordinate);
        var iframe = document.createElement('iframe');
        iframe.src = "map.html?coordinate=" + event.venue.coordinate;
        $(".mapWrap").html(iframe);
        //$('.pop-map').trigger('create');
    }
    result.domClone = $("<a href='' style='display:inline-block;margin:5px;0px'  data-rel='popup' data-role='button' class='map-button'>MAP</a>");
    return result;
}