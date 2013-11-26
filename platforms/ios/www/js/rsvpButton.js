function rsvpButton() {}

function makeRsvpButton(event) {
    var result = new rsvpButton();
    var button = makeButton();
    $.extend(result, button);
    result.click = function () {
    //$("#rsvp-button-"+event.fbId).text("Loading");
    }
    result.domClone = $("<a id='' href='' style='display:inline-block;margin:5px;0px' data-role='button' class='rsvp-button'>RSVP</a>");
    return result;
}