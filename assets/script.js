/* Variables */

var APIKey = "17491cca6b7cf053d78af447ad4c8844";
var city;
var searchList = [];
var cityButtons = document.querySelector('#cityButton');
var cityTypeSearch = document.querySelector('#cityId');
var cityTypeSearchButton = document.querySelector('#citySearch');
var clearSearch = document.querySelector('#clearButton');



/* Grabs the text input value, and starts 2 functions. Both check to see if they are valid inputs for the API, and then 1-appends city to QuickList 2-runs forecasted data grab
 */
var cityInput = function (event) {
    event.preventDefault();
    city = cityTypeSearch.value.trim();
    weatherAPI(event);
    submissionCheck(city);
}

/* This is function for eventHandler for clicks on the saves cities in the QuickList */
var buttonClick = function(event) {
    city = event.target.getAttribute
    ('data-language');
   if (city) {
    weatherAPI(event);
}
}


/* Functions that are about the localStorage. Adding in note that addSearch and loadSearch are seperated intentionally to have the ability create test to see if eventhandler through submit or click is triggered.*/
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

/* Function to test if submit eventhandler will successfuly run weather API, if so then add in city as a QuickList button option */
function submissionCheck(event) {
    
    var queryURL = "http://api.openweathermap.org/data/2.5/weather?&q=" + city + "&cnt=6&appid=" + APIKey;

    fetch(queryURL)
    .then(function(response){
        if(response.ok)
        addSearch(event);
    })
}


  /* Initial City search from 1st API grabs current day data, and lat and lon. Lat and Lon then passed through 2nd API to get further forecast dadta */
function weatherAPI(event) {

    var queryURL = "http://api.openweathermap.org/data/2.5/weather?&q=" + city + "&cnt=6&appid=" + APIKey;

fetch(queryURL)
    .then(function (response) {
        if(response.ok) {
            return response.json().then(function(data) {
            /* Weather data comes in as Kelvin, converstion to fahrenheit*/
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
    })
    .catch(function(error) {
        alert('unable to connect to API');
    });
    
}


function weatherData(la, lo)  {

var weatherURL = "http://api.openweathermap.org/data/2.5/forecast?lat=" + la + "&lon=" + lo + "&appid=" + APIKey;


fetch(weatherURL) 
    .then(function (response) {
        return response.json();
    })

    .then(function(data) {


    /* the loops with i runs through each of the 5 boxes, each going through a j loop that searches through all 40 array values for a match based off of date. Data from API comes through as Unix time Stamp*/
        for (i=1;i<6;i++) {
    
            var timeNow = moment();

            $('#currentDate').text(moment().format('L'));
            $('#' + i + 'date').text((moment().add(i,'days').format('L')))

            for (j=0;j<40;j++)   {
                var unixTimeStamp = data.list[j].dt;
                var date = new Date();
                date.setDate(date.getDate() + (i-1));
                var currentTime = Math.round((date).getTime()/1000);
                var currentDate = new Date(unixTimeStamp*1000).toLocaleDateString();

                    if ((currentTime)<=(data.list[j].dt)) {
                        var tempConversion = (((1.8)*((data.list[j].main.temp)-273.15))+32).toFixed(2);
                        var weatherIcon = " http://openweathermap.org/img/wn/" + data.list[j].weather[0].icon + ".png";
                        $('#' + i + "icon").attr("src", weatherIcon);
                        $('#' + i + "temp").text("Temp: " + tempConversion);
                        $('#' + i + "wind").text("Wind Speed: " + data.list[j].wind.speed);
                        $('#' + i + "humidity").text("Humidity: " + data.list[j].main.humidity) ;
                        j=0;
                        break;
                    }
            }
        } 
    })

}

loadSearch();
cityButtons.addEventListener('click', buttonClick);
cityTypeSearchButton.addEventListener('submit', cityInput);
clearSearch.addEventListener('click', clearCities);
















