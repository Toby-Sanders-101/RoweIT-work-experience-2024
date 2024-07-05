const lbl = document.getElementById("lbl");
const main = document.getElementById("main");
const place = document.getElementById("place");

const apiUrl = 'https://data.hub.api.metoffice.gov.uk/sitespecific/v0/point/daily?includeLocationName=true';
const geoLocationURL = 'http://api.openweathermap.org/geo/1.0/direct?limit=10&appid=6402c225d96bf92e014058fdf0737e80';

function getDayName(dateString) {
    const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const dayNumber = new Date(dateString).getDay();
    return dayNames[dayNumber];
}

function getDataFrom(latitude, longitude) {
	fetch(apiUrl+"&latitude="+latitude+"&longitude="+longitude, {headers : {apikey : "eyJ4NXQiOiJOak16WWpreVlUZGlZVGM0TUdSalpEaGtaV1psWWpjME5UTXhORFV4TlRZM1ptRTRZV1JrWWc9PSIsImtpZCI6ImdhdGV3YXlfY2VydGlmaWNhdGVfYWxpYXMiLCJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiJ0czM1MTc2N0BjYWxseXdpdGguYWMudWtAY2FyYm9uLnN1cGVyIiwiYXBwbGljYXRpb24iOnsib3duZXIiOiJ0czM1MTc2N0BjYWxseXdpdGguYWMudWsiLCJ0aWVyUXVvdGFUeXBlIjpudWxsLCJ0aWVyIjoiVW5saW1pdGVkIiwibmFtZSI6InNpdGVfc3BlY2lmaWMtNWI2ZmNlNDItZDk5MC00MDRlLWJkN2YtZjA2ZGVmNjhmODZlIiwiaWQiOjUwNjIsInV1aWQiOiIzMDM4ODgzZi0yNWMzLTQyOGItOTYxMC0yYTRkOGQ4ZDNlNjMifSwiaXNzIjoiaHR0cHM6XC9cL2FwaS1tYW5hZ2VyLmFwaS1tYW5hZ2VtZW50Lm1ldG9mZmljZS5jbG91ZDo0NDNcL29hdXRoMlwvdG9rZW4iLCJ0aWVySW5mbyI6eyJ3ZGhfc2l0ZV9zcGVjaWZpY19mcmVlIjp7InRpZXJRdW90YVR5cGUiOiJyZXF1ZXN0Q291bnQiLCJncmFwaFFMTWF4Q29tcGxleGl0eSI6MCwiZ3JhcGhRTE1heERlcHRoIjowLCJzdG9wT25RdW90YVJlYWNoIjp0cnVlLCJzcGlrZUFycmVzdExpbWl0IjowLCJzcGlrZUFycmVzdFVuaXQiOiJzZWMifX0sImtleXR5cGUiOiJQUk9EVUNUSU9OIiwic3Vic2NyaWJlZEFQSXMiOlt7InN1YnNjcmliZXJUZW5hbnREb21haW4iOiJjYXJib24uc3VwZXIiLCJuYW1lIjoiU2l0ZVNwZWNpZmljRm9yZWNhc3QiLCJjb250ZXh0IjoiXC9zaXRlc3BlY2lmaWNcL3YwIiwicHVibGlzaGVyIjoiSmFndWFyX0NJIiwidmVyc2lvbiI6InYwIiwic3Vic2NyaXB0aW9uVGllciI6IndkaF9zaXRlX3NwZWNpZmljX2ZyZWUifV0sInRva2VuX3R5cGUiOiJhcGlLZXkiLCJpYXQiOjE3MTk4MjY0NTAsImp0aSI6IjU0ZTMzM2IwLTk2ZjMtNGYyNS1hZmI0LTc2YTI2OTIzNjJhOCJ9.A2NbUmp3tj-sigI2Sv58_aKnd3hB6WypKS-K0Ey136URxMVV16VaUs9yC_vPJD10gJDbWtZh9rashHFe4vh1Gnt7guuKqXoqNkbIdEuG5jQA2-0WzH0yVYJM8z5lmi1pCPp4YJR6YkMuwpMC_F0hj5MluOGADDpR1Fn13XOlAzyeHUlIXAI0u7bi3Nqn5t5p5N1H6kjZMBMqHd6iIpWmqxvtw6hAI-4R6CwY8zsq3x2sr-VLw8D_ITijdaUJSROxluIIuQwOBMX2FYYKOUq1DDadOkrUalghqRaDmmU5DXw68fEtL-ZPgf3vaS__ZTQexaF8WenSpkz2zTo_AQ2_Lg=="}})
    .then(function(response) {
                return response.json();
            }).then(function(data) {
                console.log(data);
				main.innerHTML = "";
				for (let i = 0; i < 8; i++) {
					var obj = data.features[0].properties.timeSeries[i];
					
					var div = document.createElement("div");
					main.appendChild(div);
					div.appendChild(document.createElement("br"));
					div.appendChild(document.createElement("br"));
					
					var time = document.createElement("p");
					var dateStringUS = obj.time.slice(5,7)+"/"+obj.time.slice(8,10)+"/"+obj.time.slice(0,4);
					var dateStringUK = obj.time.slice(8,10)+"/"+obj.time.slice(5,7)+"/"+obj.time.slice(0,4);
					time.innerHTML = getDayName(dateStringUS) + "-" + dateStringUK;
					div.appendChild(time);
					
					var temp = document.createElement("span");
					temp.innerHTML = "Temperature: "+obj.dayLowerBoundMaxTemp + "&deg;C";
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
					rain.innerHTML = "<br>Precipitation coverage: " + obj.dayProbabilityOfPrecipitation + "%";
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
				}
            });
}

function getPosition(place) {
	fetch(geoLocationURL+"&q="+place).then(function(response) {
		return response.json();
	}).then(function(data) {
		console.log(data);
		var latitude = data[0].lat;
		var longitude = data[0].lon;
		lbl.innerHTML = data[0].name + ", " + data[0].country;
		getDataFrom(latitude, longitude);
	});
}

function search() {
	getPosition(place.value);
}

