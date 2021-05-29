// var portNumber = process.env.PORT || 3000

fetch('').then((response) => {
    response.json().then((data) => {
        if(data.error){
            console.log(data.error)
        }
        else{
            console.log(data.puzzle)
        }
    })
})

var forecast = document.getElementsByClassName('forecast')[0]
var weatherForm = document.getElementsByClassName('weatherForm')[0]
var searchBar = document.getElementsByClassName('search-bar')[0]
var placeName = document.getElementsByClassName('place-name')[0]
var currentTemp = document.getElementsByClassName('current-temp')[0]
var weatherCondition = document.getElementsByClassName('weather-condition')[0]
var maxTemp = document.getElementsByClassName('max-temp')[0]
var minTemp = document.getElementsByClassName('min-temp')[0]
var avgTemp = document.getElementsByClassName('avg-temp')[0]
var sunrise = document.getElementsByClassName('sunrise')[0]
var sunset = document.getElementsByClassName('sunset')[0]
var forecastTitle = document.getElementsByClassName('forecast-title')[0]
var weatherIcon = document.getElementsByClassName('weather-icon')[0]


weatherForm.addEventListener('submit', (e) => {

    e.preventDefault()

    forecastTitle.innerText = "Loading..."
    forecast.style.display = "block"

    var address = searchBar.value

    var url = '/weather?city=' + encodeURIComponent(address)

    fetch(url).then((response) => {
        response.json().then((data) => {
            if(data.error){
                console.log(data.error)
                forecastTitle.innerText = data.error
            }
            else{
                console.log(data)
                weatherIcon.src = data.icon
                forecastTitle.innerText = "Today's weather forecast"
                placeName.innerHTML = '<b>Location : </b>' + data.placeName
                currentTemp.innerHTML = '<b>Current Temperature : </b>' + data.current_temp + ' degree celcius'
                weatherCondition.innerHTML = '<b>Weather Conditions : </b>' + data.condition
                maxTemp.innerHTML = '<b>Max. Temperature</b> : ' + data.max_temp + ' degree celcius'
                minTemp.innerHTML = '<b>Min. Temperature : </b>' + data.min_temp + ' degree celcius'
                avgTemp.innerHTML = '<b>Avg. Temperature : </b>' + data.avg_temp + ' degree celcius'
                sunrise.innerHTML = '<b>Sunrise Time : </b>' + data.sunrise
                sunset.innerHTML = '<b>Sunset Time : </b>' + data.sunset

            }
        })
    })


    console.log(searchBar.value)
})