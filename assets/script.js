/* questions section
way to expand the array to know what the avaialble variables are? */





// API key 17491cca6b7cf053d78af447ad4c8844

var APIKey = "17491cca6b7cf053d78af447ad4c8844";

// later make a variable that will store the city name depending on the user's input, including {city, state, country}

// this was a test curl to use in gitbash
// curl https://api.openweathermap.org/data/2.5/weather?q=seattle&appid=17491cca6b7cf053d78af447ad4c8844





// var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;

var cityButtons = document.querySelector('#cityButton');
// var cityNames = document.querySelector('cityName');



var cityName = "";
var currentDate;
var  temperature;
var  humidity;
var  windSpeed;
var   uvIndex;


var buttonClick = function(event) {
    // var city = event.target.getAttribute('data-language');
    // console.log(city);

    weatherAPI(event);
}




function weatherAPI(event) {

    var city = event.target.getAttribute('data-language');
    console.log(city);
    var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;

fetch(queryURL)

.then(function (response) {
    return response.json();
})

.then(function(data) {
    console.log(data);
    console.log(data.weather[0].description);
    cityName = data.name
    console.log(cityName);
    $('#cityName').val(data.name);
    // cityNames.textContent = cityName;
    currentDate = data.main.temp;
    console.log(currentDate);

    // displayData(data);

})

}


// var display = function displayData(list) {
//     $('#cityName').val(list.name);

// }




cityButtons.addEventListener('click', buttonClick);



















