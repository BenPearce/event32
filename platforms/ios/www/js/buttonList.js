function buttonList() {
	this.domSlider;
	this.wrap;
	this.rsvpButton;
	this.mapButton;
}

function makeButtonList(event) {
    var result = new buttonList();
        result.domSlider;
        //result.wrap = $("<div style='display:none' class='button-wrap'><a style='display:inline-block' href='' data-role='button' class='rsvp-button'>rsvp</a></div>");
        result.wrap = $("<div style='display:none' class='button-wrap'></div>");
        //alert("make Button List");
        //alert(event.venue.exists);
        result.rsvpButton = makeRsvpButton(event);
        result.wrap.append(result.rsvpButton.domClone);
        if (event.venue.exists){
        	result.mapButton = makeMapButton(event);
        	result.wrap.append(result.mapButton.domClone);
        }
        
        
    return result;
}