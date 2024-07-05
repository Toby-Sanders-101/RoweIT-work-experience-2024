const lbl = document.getElementById("lbl");
const main = document.getElementById("main");
const place = document.getElementById("place");

const apiUrl = 'https://data.hub.api.metoffice.gov.uk/sitespecific/v0/point/';
const geoLocationURL = 'http://api.openweathermap.org/geo/1.0/direct?limit=10&appid=6402c225d96bf92e014058fdf0737e80';

var allData = {daily: null, hourly: null};
var daily = true;

function getDayName(dateString) {
    const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const dayNumber = new Date(dateString).getDay();
    return dayNames[dayNumber];
}

function getDataFrom(latitude, longitude, timePeriod = "daily") {
	fetch(apiUrl+timePeriod+"?includeLocationName=true&latitude="+latitude+"&longitude="+longitude, {headers : {apikey : "eyJ4NXQiOiJOak16WWpreVlUZGlZVGM0TUdSalpEaGtaV1psWWpjME5UTXhORFV4TlRZM1ptRTRZV1JrWWc9PSIsImtpZCI6ImdhdGV3YXlfY2VydGlmaWNhdGVfYWxpYXMiLCJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiJ0czM1MTc2N0BjYWxseXdpdGguYWMudWtAY2FyYm9uLnN1cGVyIiwiYXBwbGljYXRpb24iOnsib3duZXIiOiJ0czM1MTc2N0BjYWxseXdpdGguYWMudWsiLCJ0aWVyUXVvdGFUeXBlIjpudWxsLCJ0aWVyIjoiVW5saW1pdGVkIiwibmFtZSI6InNpdGVfc3BlY2lmaWMtNWI2ZmNlNDItZDk5MC00MDRlLWJkN2YtZjA2ZGVmNjhmODZlIiwiaWQiOjUwNjIsInV1aWQiOiIzMDM4ODgzZi0yNWMzLTQyOGItOTYxMC0yYTRkOGQ4ZDNlNjMifSwiaXNzIjoiaHR0cHM6XC9cL2FwaS1tYW5hZ2VyLmFwaS1tYW5hZ2VtZW50Lm1ldG9mZmljZS5jbG91ZDo0NDNcL29hdXRoMlwvdG9rZW4iLCJ0aWVySW5mbyI6eyJ3ZGhfc2l0ZV9zcGVjaWZpY19mcmVlIjp7InRpZXJRdW90YVR5cGUiOiJyZXF1ZXN0Q291bnQiLCJncmFwaFFMTWF4Q29tcGxleGl0eSI6MCwiZ3JhcGhRTE1heERlcHRoIjowLCJzdG9wT25RdW90YVJlYWNoIjp0cnVlLCJzcGlrZUFycmVzdExpbWl0IjowLCJzcGlrZUFycmVzdFVuaXQiOiJzZWMifX0sImtleXR5cGUiOiJQUk9EVUNUSU9OIiwic3Vic2NyaWJlZEFQSXMiOlt7InN1YnNjcmliZXJUZW5hbnREb21haW4iOiJjYXJib24uc3VwZXIiLCJuYW1lIjoiU2l0ZVNwZWNpZmljRm9yZWNhc3QiLCJjb250ZXh0IjoiXC9zaXRlc3BlY2lmaWNcL3YwIiwicHVibGlzaGVyIjoiSmFndWFyX0NJIiwidmVyc2lvbiI6InYwIiwic3Vic2NyaXB0aW9uVGllciI6IndkaF9zaXRlX3NwZWNpZmljX2ZyZWUifV0sInRva2VuX3R5cGUiOiJhcGlLZXkiLCJpYXQiOjE3MTk4MjY0NTAsImp0aSI6IjU0ZTMzM2IwLTk2ZjMtNGYyNS1hZmI0LTc2YTI2OTIzNjJhOCJ9.A2NbUmp3tj-sigI2Sv58_aKnd3hB6WypKS-K0Ey136URxMVV16VaUs9yC_vPJD10gJDbWtZh9rashHFe4vh1Gnt7guuKqXoqNkbIdEuG5jQA2-0WzH0yVYJM8z5lmi1pCPp4YJR6YkMuwpMC_F0hj5MluOGADDpR1Fn13XOlAzyeHUlIXAI0u7bi3Nqn5t5p5N1H6kjZMBMqHd6iIpWmqxvtw6hAI-4R6CwY8zsq3x2sr-VLw8D_ITijdaUJSROxluIIuQwOBMX2FYYKOUq1DDadOkrUalghqRaDmmU5DXw68fEtL-ZPgf3vaS__ZTQexaF8WenSpkz2zTo_AQ2_Lg=="}})
    .then(function(response) {
                return response.json();
            }).then(function(data) {
                console.log(data);
				allData[timePeriod] = data;
				if (daily && timePeriod=="daily") {
					presentDaily();
				}
				else if (!daily && timePeriod=="hourly") {
					presentHourly();
				}
            });
}

function presentDaily() {
	let data = allData.daily;
	main.innerHTML = "";
	lbl.innerHTML = data.features[0].properties.location.name;
	for (let i = 1; i < 8; i++) {												//////////
		var obj = data.features[0].properties.timeSeries[i];
		
		var div = document.createElement("pre");
		div.className = "day";
		main.appendChild(div);
		
		var time = document.createElement("span");
		var dateStringUS = obj.time.slice(5,7)+"/"+obj.time.slice(8,10)+"/"+obj.time.slice(0,4);
		var dateStringUK = obj.time.slice(8,10)+"/"+obj.time.slice(5,7)+"/"+obj.time.slice(0,4);
		time.innerHTML = "<br><b>" + getDayName(dateStringUS) + "-" + dateStringUK;
		div.appendChild(time);
		
		var temp = document.createElement("span");
		temp.innerHTML = "<br>Temperature: "+obj.dayLowerBoundMaxTemp + "&deg;C";
		if (obj.dayLowerBoundMaxTemp < 9) {
			temp.style.background = "red";
		}
		else if (obj.dayLowerBoundMaxTemp < 15) {
			temp.style.background = "yellow";
		}
		else {
			temp.style.background = "green";
		}
		div.appendChild(temp);
		
		var wind = document.createElement("span");
		wind.innerHTML = "<br>Wind speed: " + obj.midday10MWindSpeed + " m/s";
		if (obj.midday10MWindSpeed > 12) {
			wind.style.background = "red";
		}
		else if (obj.midday10MWindSpeed > 8) {
			wind.style.background = "yellow";
		}
		else {
			wind.style.background = "green";
		}
		div.appendChild(wind);
		
		var rain = document.createElement("span");
		rain.innerHTML = "<br>Precipitation coverage: " + obj.dayProbabilityOfPrecipitation + "%</b><br>";
		if (obj.dayProbabilityOfPrecipitation > 70) {
			rain.style.background = "red";
		}
		else if (obj.dayProbabilityOfPrecipitation > 35) {
			rain.style.background = "yellow";
		}
		else {
			rain.style.background = "green";
		}
		div.appendChild(rain);
		
		var weatherImage = document.createElement("img");
		var source;
		if (obj.dayProbabilityOfPrecipitation > 40) {
			source = "images/rainy.png";
		}
		else if (obj.midday10MWindSpeed > 14) {
			source = "images/windy.png";
		}
		else if (obj.dayLowerBoundMaxTemp < 4) {
			source = "images/icy.png";
		}
		else if (obj.dayLowerBoundMaxTemp > 16) {
			source = "images/sunny.png";
		}
		else {
			source = "images/cloudy.png";
		}
		weatherImage.src = source;
		weatherImage.width = 80;
		weatherImage.height = 80;
		div.appendChild(weatherImage);
	}
}

function presentHourly() {
	let data = allData.hourly;
	main.innerHTML = "";
	lbl.innerHTML = data.features[0].properties.location.name;
	for (let i = 0; i < 28; i++) {
		var obj = data.features[0].properties.timeSeries[i];
		
		var div = document.createElement("pre");
		div.className = "day";
		main.appendChild(div);
		
		var time = document.createElement("span");
		var dateStringUS = obj.time.slice(5,7)+"/"+obj.time.slice(8,10)+"/"+obj.time.slice(0,4);
		time.innerHTML = "<br><b>" + obj.time.slice(11,16) + "-" + getDayName(dateStringUS);
		div.appendChild(time);
		
		var temp = document.createElement("span");
		temp.innerHTML = "<br>Temperature: "+obj.maxScreenAirTemp + "&deg;C";
		if (obj.maxScreenAirTemp < 9) {
			temp.style.background = "red";
		}
		else if (obj.maxScreenAirTemp < 15) {
			temp.style.background = "yellow";
		}
		else {
			temp.style.background = "green";
		}
		div.appendChild(temp);
		
		var wind = document.createElement("span");
		wind.innerHTML = "<br>Wind speed: " + obj.windSpeed10m + " m/s";
		if (obj.windSpeed10m > 12) {
			wind.style.background = "red";
		}
		else if (obj.windSpeed10m > 8) {
			wind.style.background = "yellow";
		}
		else {
			wind.style.background = "green";
		}
		div.appendChild(wind);
		
		var rain = document.createElement("span");
		rain.innerHTML = "<br>Precipitation coverage: " + obj.probOfPrecipitation + "%</b><br>";
		if (obj.probOfPrecipitation > 70) {
			rain.style.background = "red";
		}
		else if (obj.probOfPrecipitation > 35) {
			rain.style.background = "yellow";
		}
		else {
			rain.style.background = "green";
		}
		div.appendChild(rain);
		
		var weatherImage = document.createElement("img");
		var source;
		if (obj.probOfPrecipitation > 40) {
			source = "images/rainy.png";
		}
		else if (obj.windSpeed10m > 14) {
			source = "images/windy.png";
		}
		else if (obj.maxScreenAirTemp < 4) {
			source = "images/icy.png";
		}
		else if (obj.maxScreenAirTemp > 16) {
			source = "images/sunny.png";
		}
		else {
			source = "images/cloudy.png";
		}
		weatherImage.src = source;
		weatherImage.width = 80;
		weatherImage.height = 80;
		div.appendChild(weatherImage);
	}
}

function switchTimePeriod() {
	daily = !daily;
	if (allData.daily) {
		if (daily) {
			presentDaily();
		}
		else {
			presentHourly();
		}
	}
}

function getPosition(place) {
	fetch(geoLocationURL+"&q="+place).then(function(response) {
		return response.json();
	}).then(function(data) {
		console.log(data);
		try {
			var latitude = data[0].lat;
			var longitude = data[0].lon;
			lbl.innerHTML = data[0].name + ", " + data[0].country;
			getDataFrom(latitude, longitude, "daily");
			getDataFrom(latitude, longitude, "hourly");
		} catch(err) {
			lbl.innerHTML = "No location found with name: "+place;
		}
	});
}

try {
	let p = window.location.href.split("=")[1].replaceAll("+"," ");
	getPosition(p);
} catch(err) {
	lbl.innerHTML = "No location found...";
}

