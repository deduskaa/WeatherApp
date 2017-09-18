var mykey = config.MY_API_KEY;
function loadScript() {
  var script = document.createElement('script');
  script.type = 'text/javascript';
  script.src = 'https://maps.googleapis.com/maps/api/js?v=3' +
      '&key=' + mykey;
  document.body.appendChild(script);
}

$(document).ready( function(){
	loadScript();
	var longitude, latitude, requestURL,
	location = $('.location'),
	degrees = $('.degrees'),
	weatherDescription = $('.description'),
	icon = $('.animation');
	
	function getLocation(){
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(showPosition);
			navigator.geolocation.getCurrentPosition(initMap);
		}else {
			alert("Geolocation is not supported by this browser.");
		}
	}

	function initMap(position) {
        var location = {lat: position.coords.latitude, lng: position.coords.longitude};
        var map = new google.maps.Map(document.getElementById('map'), {
          zoom: 12,
          center: location
        });
        var marker = new google.maps.Marker({
          position: location,
          map: map
        });

        map.addListener('center_changed', function(){
		});
    }
	
	function showPosition(position) {
		longitude = position.coords.longitude;
		latitude = position.coords.latitude;
		requestURL = 'https://fcc-weather-api.glitch.me//api/current?lat=' +latitude+ '&lon=' + longitude;
		$.getJSON(requestURL, function(jsonData){
			printData(jsonData);
		});
	}

	function printData(data) {
		location.html(data.name + ", " + data.sys.country);
		degrees.html(data.main.temp + ' <a href="#">&#8451</a>');
		weatherDescription.html(data.weather[0].main);
		icon.html('<img src="' + data.weather[0].icon + '">');
		degrees.on('click', 'a', function toFahrenheit(){
			if(degrees.hasClass('celcius')) {
				var temp = data.main.temp * (9/5) + 32; 
				degrees.html(temp + ' <a href="#">&#8457</a>');
				degrees.removeClass('celcius');
			} else {
				degrees.addClass('celcius');
				degrees.html(data.main.temp + ' <a href="#">&#8451</a>');
			}
		});
	}
	getLocation();

});

