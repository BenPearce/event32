function dateMap(){
this.map;	
this.dayDifference;
this.populateMap;
this.today;
}

function makeDateMap(){
	//alert("make date map");
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

function dateToInteger(date){
	var temp = new Date(date);
        temp =new Date(temp.getFullYear(),temp.getMonth(), temp.getDate());

	var today = new Date();

	today =new Date(today.getFullYear(),today.getMonth(), today.getDate());
	
	return Math.round((temp.getTime() - today.getTime())/(1000*60*60*24));
}

function integerToDate(integer){
	var today = new Date();
	var temp = new Date(today.getFullYear(),today.getMonth(), today.getDate() +integer);
	return temp;
	//alert(temp);
}

