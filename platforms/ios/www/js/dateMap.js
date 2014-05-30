function dateMap(){
this.map;	
this.dayDifference;
this.populateMap;
this.today;
}

function makeDateMap(){
	var result = new dateMap();
	result.map = new Array();
	result.today = new Date();
	result.today =new Date(result.today.getFullYear(), result.today.getMonth(), result.today.getDate());
	result.dayDifference = function (date){
		this.today.getTime();
		date.getTime();
        }
	result.populateMap = function(){
        for (var i=0;i<150;i++){
        var date = new Date(this.today.getFullYear(), this.today.getMonth(), this.today.getDate() + i)
        this.map[this.dayDifference(date)] = makeDateElement(date);
	}
	}
	return result;
}

function treatAsUTC(date) {
    var result = new Date(date);
    result.setMinutes(result.getMinutes() - result.getTimezoneOffset());
    return result;
}

function daysBetween(startDate, endDate) {
    var millisecondsPerDay = 24 * 60 * 60 * 1000;
    return (treatAsUTC(endDate) - treatAsUTC(startDate)) / millisecondsPerDay;
}

function dateToInteger(date){
	var temp = new Date(date.replace(' ', 'T'));
    var temp = new Date(date.split("T")[0]);
    temp =new Date(temp.getFullYear(),temp.getMonth(), temp.getDate());
	var today = new Date();
	today =new Date(today.getFullYear(),today.getMonth(), today.getDate());
        console.log("dti temp: "+temp);
        console.log("dti today: "+today);
    var dateHash = Math.round((temp.getTime() - today.getTime())/(1000*60*60*24)) + 1;
    console.log("date to int output: "+dateHash);
	return  dateHash;
}

function dateToIntegerReg(date){
	//var temp = new Date(date.replace(' ', 'T'));
    //var temp = new Date(date.split("T")[0]);
    var temp = new Date(date);
    temp = new Date(temp.getFullYear(),temp.getMonth(), temp.getDate());
	var today = new Date();
	today =new Date(today.getFullYear(),today.getMonth(), today.getDate());
    var dateHash = Math.round((temp.getTime() - today.getTime())/(1000*60*60*24)) + 1;
	return  dateHash;
}


function trimDateHash(){

    //lastUpdateDate;
    //lastUpdateInt;
}

/*
function dateToInt(fbDate){
    console.log("fbDate: "+fbDate);
    var tempDate;
    if(fbTimeOffSet.indexOf('T') > 0){
    tempDate = new Date(fbDate.substring(0, fbDate.indexOf('T')));
    }
    if (result.formattedTime == '00:00:00') {
        tempDate = new Date(tempDate.getTime() + (24 * 60 * 60 * 1000));
    }
	var temp = new Date(tempDate);
    temp =new Date(temp.getFullYear(),temp.getMonth(), temp.getDate());
	var today = new Date();
	today =new Date(today.getFullYear(),today.getMonth(), today.getDate());
	return Math.round((temp.getTime() - today.getTime())/(1000*60*60*24)) +1;
}
*/
function integerToDate(integer){
    integer = integer;
	var today = new Date();
	var temp = new Date(today.getFullYear(),today.getMonth(), today.getDate() +integer);
	return temp;
}