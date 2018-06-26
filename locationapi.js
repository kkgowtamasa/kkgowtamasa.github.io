var API_KEY = 'AIzaSyDwm0TRzCCZ315QzaPQpTwtmtMT4gibADI';
var lat = '';
var log = '';
var uriresource = "https://maps.googleapis.com/maps/api/geocode/json?latlng="+lat+','+log+"&key=";


this.showLocation = function(latlog) {
	lat = latlog.coords.latitude;
	log = latlog.coords.longitude;
	uriresource = "https://maps.googleapis.com/maps/api/geocode/json?latlng="+lat+','+log+"&key="+API_KEY;
	$.ajax({
	method : "get",
	url : uriresource,
	success: function(data) {
		var len = data.results.length;
		var str = [];
		for(var i=len-3; i<len; i++) {
			str.push(data.results[i].formatted_address);
		}
		$('#location').html(str);
	},
	error: function(errorInfo) {
		alert(JSON.stringify(errorInfo,null,4));
	}
});
}

function errorHandler() {
	alert('failed');
}
function getLocation() {
    if (navigator.geolocation) {
        //navigator.geolocation.getCurrentPosition(showLocation);
		 var geolocation = navigator.geolocation;
		 geolocation.getCurrentPosition(showLocation, errorHandler);
    } else {
        x.innerHTML = "Geolocation is not supported by this browser.";
    }
}



function updateOnlineStatus() {
	if(navigator.onLine) {
		getLocation();
	}
	$('#location').html("");
	$("#locstatus").removeClass('offline').addClass('online');
}

function updateOfflineStatus() {
	$('#location').html("You are offline!");
	$("#locstatus").removeClass('online').addClass('offline');
}


window.addEventListener('load', function() {
window.addEventListener('online', updateOnlineStatus);
window.addEventListener('offline', updateOfflineStatus);
});