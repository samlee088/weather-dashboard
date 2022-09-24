// API key 17491cca6b7cf053d78af447ad4c8844

var APIKey = "17491cca6b7cf053d78af447ad4c8844";


// var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;

var cityButtons = document.querySelector('#cityButton');
// var cityNames = document.querySelector('cityName');


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
    console.log(city);
    addSearch(city);
    weatherAPI(event);
}





var buttonClick = function(event) {
    // var city = event.target.getAttribute
    city = event.target.getAttribute
    ('data-language');
    console.log(city);
    weatherAPI(event);
}



// Storage for searched cities in local storage

var searchList = [];

// cityButtonSearch add in another eventlistener to add in to array

function addSearch(event) {
searchList.push(event);
   
localStorage.setItem("cities",JSON.stringify(searchList))
loadSearch();
}

// function storeSearch () {
// localStorage.setItem("cities",JSON.stringify(searchList))
// }


// grab stored data and reload it, need to have this happen on the start of the page, and also when an additional search is added

function loadSearch() {
    var searchArray = JSON.parse(localStorage.getItem("cities"));

    $('#cityButton').empty();
   


for (i=0; i<searchArray.length; i++) {

// grab an item from the array
// then take this item value, create a button with the class id, and then append this button to the list

var cityName = searchArray[i];



$('#cityButton').append(
        $(document.createElement('button')).prop({
            type: 'button',
            innerHTML: cityName,
            'data-language':cityName,
            class: 'btn btn-primary m-2 btn-lg btn-block text-center'
        })
)
}
}


function clearCities(event) {
    searchList = [];
    localStorage.setItem("cities",JSON.stringify(searchList));
    
}




function weatherAPI(event) {

    // var city = event.target.getAttribute('data-language');
    // city = event.target.getAttribute('data-language');
    // console.log(city);
    var queryURL = "http://api.openweathermap.org/data/2.5/weather?&q=" + city + "&cnt=6&appid=" + APIKey;

fetch(queryURL)

.then(function (response) {
    return response.json();
})

.then(function(data) {
    $('#data').text(data);
    console.log(data);
    console.log(data.weather[0].description);
    cityName = data.name
    console.log(cityName);

    var currentTemperature = (((1.8)*((data.main.temp)-273.15))+32)

    $('#cityName').text(data.name);
    $('#currentTemperature').text(currentTemperature);
    $('#currentWind').text(data.wind.speed + " wind speed");
    $('#currentHumidity').text(data.main.humidity + " humidity");
    console.log(currentDate);
    var lat = data.coord.lat;
    var lon = data.coord.lon;
    console.log(lat);
    console.log(lon);
   
    weatherData(lat,lon);
})

}

function weatherData(la, lo)  {
var  APIKey = "17491cca6b7cf053d78af447ad4c8844";

var weatherURL = "http://api.openweathermap.org/data/2.5/forecast?lat=" + la + "&lon=" + lo + "&appid=" + APIKey;


// var weatherURL = "https://api.openweathermap.org/data/2.5/onecall?lat=${la}&lon=${lo}&exclude=minutely,hourly&units=imperial&appid=${APIKey}";


// var weatherURL ="https://api.openweathermap.org/data/2.5/onecall?lat=${la}&lon=${lo}&exclude=minutely,hourly&units=imperial&appid=${APIKey}";
fetch(weatherURL) 
    .then(function (response) {
        return response.json();
    })

    .then(function(data) {

        console.log(data);

        $('#temperature').text(data.list[0].main.temp);

        console.log(data.list[0].main.temp)


        //initial set for the current day
        // data.list[i].clouds.dt_txt;
        // data.list[i].weather[0].icon;
        // data.list[i].main.temp;
        // data.list[i].wind.speed;
        // data.list[i].main.humidity;


        //this will be for the smaller boxes
        for (i=1;i<6;i++) {
            // create an element of some kind that will create a box
            //date
            //icon
            //temp
            //wind
            //humity

            http://openweathermap.org/img/wn/10d@2x.png

            var weatherIcon = " http://openweathermap.org/img/wn/" + data.list[i].weather[0].icon + "@2x.png";

            var tempConversion = (((1.8)*((data.list[i].main.temp)-273.15))+32)
            var timeNow = moment();
            $('#currentDate').text(moment().format('L'));
            // $('#' + i + 'date').text(data.list[i].dt_txt);
            $('#' + i + 'date').text((moment().add(i,'days').format('L')))
            // $('#' + i + "icon").text(data.list[i].weather[0].icon);
            // $('#' + i + "icon").innerHtml(weatherIcon);
              $('img#' + i + "icon").attr(weatherIcon);
           $('#' + i + "icon").prop(weatherIcon);
            $('#' + i + "icon").attr(" http://openweathermap.org/img/wn/" + data.list[i].weather[0].icon + "@2x.png");
            // $('#' + i + "temp").text(data.list[i].main.temp);
            $('#' + i + "temp").text(tempConversion + "Temperature");
            $('#' + i + "wind").text(data.list[i].wind.speed + " wind speed");
            $('#' + i + "humidity").text(data.list[i].main.humidity + " humidity") ;

        // for (j=1;j<40;j++)   
        //     if ((moment().add(j,'days').startOf('day')).isAfter(data.list[j].dt_txt)) {
        //         console.log("Yes");
        //         console.log(moment().add(j,'days').startOf('day'));
        //         console.log(data.list[j].dt_txt);

        //         var tempConversion = (((1.8)*((data.list[j].main.temp)-273.15))+32)

        //         $('#' + i + "temp").text(tempConversion + "Temperature");
        //         $('#' + i + "wind").text(data.list[j].wind.speed + " wind speed");
        //         $('#' + i + "humidity").text(data.list[j].main.humidity + " humidity") ;
        //     }
            
        //     else {
        //         console.log("No");
        //         console.log(moment().add(j,'days').startOf('day'));
        //         console.log(data.list[j].dt_txt);
        //         i++;
        //     }


      


//             for (j=0;j<40;j++)   {
//             var unixTimeStamp = data.list[j].dt;
//             var unixTime = function toDate(unixtimeStamp) {
//                 return new Date (
//                     unixTimeStamp * 1000
//                 )
//             }
//             console.log(unixTime);
// // if ((moment().add(i,'days').startOf('day')).isAfter(new Date((data.list[j].dt)*1000)))

//             if ((moment().add(i,'days').startOf('day')).isAfter(unixTime)) {
//                 console.log("Yes");
//                 console.log(moment().add(j,'days').startOf('day'));
//                 console.log(data.list[j].dt_txt);

//                 var tempConversion = (((1.8)*((data.list[j].main.temp)-273.15))+32)

//                 $('#' + i + "temp").text(tempConversion + "Temperature");
//                 $('#' + i + "wind").text(data.list[j].wind.speed + " wind speed");
//                 $('#' + i + "humidity").text(data.list[j].main.humidity + " humidity") ;
//                 j=0;
//                 break;
               
//             }
            
//             else {
//                 console.log("No");
//                 console.log(moment().add(j,'days').startOf('day'));
//                 console.log(data.list[j].dt_txt);
//               break;
//             }




            for (j=0;j<40;j++)   {
                var unixTimeStamp = data.list[j].dt;
                var unixTime = function toDate(unixtimeStamp) {
                    return new Date (
                        unixTimeStamp * 1000
                    )
                }
                console.log(unixTime);
                var date = new Date();
                date.setDate(date.getDate() + i);
                console.log(date);
                var currentTime = Math.round((date).getTime()/1000);
                console.log(currentTime);
    // if ((moment().add(i,'days').startOf('day')).isAfter(new Date((data.list[j].dt)*1000)))
    
                if ((currentTime)<(data.list[j].dt)) {
                    console.log("Yes");
                    console.log(moment().add(j,'days').startOf('day'));
                    console.log(data.list[j].dt_txt);
    
                    var tempConversion = (((1.8)*((data.list[j].main.temp)-273.15))+32)
    
                    $('#' + i + "temp").text(tempConversion + "Temperature");
                    $('#' + i + "wind").text(data.list[j].wind.speed + " wind speed");
                    $('#' + i + "humidity").text(data.list[j].main.humidity + " humidity") ;
                    j=0;
                    break;
                   
                }
                
                else {
                    console.log("No");
                    console.log(moment().add(j,'days').startOf('day'));
                    console.log(data.list[j].dt_txt);
                 
                }


 //display these, and then append again to create a row of boxes
            console.log(data.list[i].clouds.dt);
            console.log(data.list[i].weather[0].icon);
            console.log(data.list[i].main.temp);
            console.log(data.list[i].wind.speed);
            console.log(data.list[i].main.humidity);
            console.log(weatherIcon);

           console.log(timeNow);


        }




    } 
    })

}





cityButtons.addEventListener('click', buttonClick);
cityTypeSearchButton.addEventListener('submit', cityInput);
cityTypeSearchButton.addEventListener('submit,', addSearch);
clearSearch.addEventListener('click', clearCities);
















