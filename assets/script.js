/* Variables */

var APIKey = "17491cca6b7cf053d78af447ad4c8844";
var cityButtons = document.querySelector('#cityButton');


var city ;
var cityName = "";
var currentDate;
var  temperature;
var  humidity;
var  windSpeed;
var   uvIndex;
var cityTypeSearch = document.querySelector('#cityId');
var cityTypeSearchButton = document.querySelector('#citySearch');
var clearSearch = document.querySelector('#clearButton');




var cityInput = function (event) {
    event.preventDefault();
    city = cityTypeSearch.value.trim();
    weatherAPI(event);
    submissionCheck(city);

}

var buttonClick = function(event) {

    city = event.target.getAttribute
    ('data-language');
    console.log(city);
   if (city) {
    weatherAPI(event);
}
}


var searchList = [];

function addSearch(event) {
searchList.push(event);
   
localStorage.setItem("cities",JSON.stringify(searchList))
loadSearch();
}



function loadSearch() {

    searchList = JSON.parse(localStorage.getItem("cities"));

    $('#cityButton').empty();
   


for (i=0; i<searchList.length; i++) {

var cityName = searchList[i];



$('#cityButton').append(
        $(document.createElement('button')).prop({
            type: 'button',
            innerHTML: cityName,
            'data-language':cityName,
            class: 'btn btn-primary m-2 btn-lg btn-block text-center',
          
        }).attr('data-language',cityName)
        
)
}
}


function clearCities(event) {
    searchList = [];
    localStorage.setItem("cities",JSON.stringify(searchList));
    $('#cityButton').empty();
}




function submissionCheck(event) {
    
    var queryURL = "http://api.openweathermap.org/data/2.5/weather?&q=" + city + "&cnt=6&appid=" + APIKey;

    fetch(queryURL)
    .then(function(response){
        if(response.ok)
        addSearch(event);
    })
}



function weatherAPI(event) {

    var queryURL = "http://api.openweathermap.org/data/2.5/weather?&q=" + city + "&cnt=6&appid=" + APIKey;

fetch(queryURL)
.then(function (response) {
    if(response.ok) {
    return response.json().then(function(data) {

        $('#data').text(data);
        cityName = data.name
        var currentTemperature = (((1.8)*((data.main.temp)-273.15))+32).toFixed(2);
        var currentWeatherIcon = " http://openweathermap.org/img/wn/" + data.weather[0].icon + ".png";
        $('#currentDateIcon').attr('src',currentWeatherIcon);
        $('#cityName').text(data.name);
        $('#currentTemperature').text("Temp: " + currentTemperature);
        $('#currentWind').text("Wind Speed: " +data.wind.speed);
        $('#currentHumidity').text("Humidity: " +data.main.humidity);
        var lat = data.coord.lat;
        var lon = data.coord.lon;
       
        weatherData(lat,lon);

    })

}

    else {
        alert (response.statusText);
        return;
    }

}
)
    .catch(function(error) {
        alert('unable to connect to API');
    });
}


function weatherData(la, lo)  {
var  APIKey = "17491cca6b7cf053d78af447ad4c8844";

var weatherURL = "http://api.openweathermap.org/data/2.5/forecast?lat=" + la + "&lon=" + lo + "&appid=" + APIKey;


fetch(weatherURL) 
    .then(function (response) {
        return response.json();
    })

    .then(function(data) {

        console.log(data);

        $('#temperature').text(data.list[0].main.temp);

        console.log(data.list[0].main.temp)


    

        for (i=1;i<6;i++) {
    

            var weatherIcon = " http://openweathermap.org/img/wn/" + data.list[i].weather[0].icon + ".png";

            var tempConversion = (((1.8)*((data.list[i].main.temp)-273.15))+32)
            var timeNow = moment();
            $('#currentDate').text(moment().format('L'));
            // $('#' + i + 'date').text(data.list[i].dt_txt);
            $('#' + i + 'date').text((moment().add(i,'days').format('L')))
            // $('#' + i + "icon").text(data.list[i].weather[0].icon);
            // $('#' + i + "icon").innerHtml(weatherIcon);
              $('#' + i + "icon").attr("src", weatherIcon);
        //    $('#' + i + "icon").prop(weatherIcon);
            // $('#' + i + "icon").attr(" http://openweathermap.org/img/wn/" + data.list[i].weather[0].icon + "@2x.png");
            // $('#' + i + "temp").text(data.list[i].main.temp);
            $('#' + i + "temp").text(tempConversion + "Temperature");
            $('#' + i + "wind").text(data.list[i].wind.speed + " wind speed");
            $('#' + i + "humidity").text(data.list[i].main.humidity + " humidity") ;

       
            for (j=0;j<40;j++)   {
                var unixTimeStamp = data.list[j].dt;
                // var unixTime = function toDate(unixtimeStamp) {
                //     return new Date (
                //         unixTimeStamp * 1000
                //     )
                // }
                // console.log(unixTime);
                var date = new Date();
                date.setDate(date.getDate() + (i-1));
                console.log(date);
                var currentTime = Math.round((date).getTime()/1000);
                // console.log(currentTime);
    // if ((moment().add(i,'days').startOf('day')).isAfter(new Date((data.list[j].dt)*1000)))
    var currentDate = new Date(unixTimeStamp*1000).toLocaleDateString()


        console.log(currentTime,data.list[j].dt);

                if ((currentTime)<=(data.list[j].dt)) {
                    console.log(currentTime);
                    console.log("Yes");
                    console.log(moment().add(j,'days').startOf('day'));
                    console.log(data.list[j].dt_txt);
    
                    var tempConversion = (((1.8)*((data.list[j].main.temp)-273.15))+32).toFixed(2);
    
                    $('#' + i + "temp").text("Temp: " + tempConversion);
                    $('#' + i + "wind").text("Wind Speed: " + data.list[j].wind.speed);
                    $('#' + i + "humidity").text("Humidity: " + data.list[j].main.humidity) ;
                    j=0;
                    break;
                   
                }
                
                else {
                    console.log("No");
                    console.log(moment().add(j,'days').startOf('day'));
                    console.log(data.list[j].dt_txt);
                 
                }
        }

    } 
    })

}
loadSearch();
cityButtons.addEventListener('click', buttonClick);
cityTypeSearchButton.addEventListener('submit', cityInput);
// cityTypeSearchButton.addEventListener('submit',submissionCheck());
clearSearch.addEventListener('click', clearCities);
















