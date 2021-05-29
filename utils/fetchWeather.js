const request = require('request')
require('dotenv').config()

// This function requries a object as input with Latitude and Longitude

// The callback returns a object which contains
// Unit : degree celcius
// 1. Current Tempeature (current_temp)
// 2. Weather Conditions (condition)
// 3. Max Tempeature (max_temp)
// 4. Min Tempeature (min_temp)
// 5. Average Tempeature (avg_temp)
// 6. Sunrise Time (sunrise)
// 7. Sunset Time (sunset)

const fetchWeather = ({lat, long, placeName}, callback) => {
        
    const url = 'http://api.weatherapi.com/v1/forecast.json?key=' + process.env.WEATHER_API + '&q='+ lat + ','+ long

    request({url : url, json: true}, (error, response) => {  
        
        if(error){
            callback('ERROR: Couldnt connect to the API', undefined)        
        }
        else if(response.error){

            callback('ERROR: Something went wrong', undefined)             
        }
        else{

            console.log(response.body)
            var data = {
                current_temp : response.body.current.temp_c,
                condition : response.body.current['condition'].text,
                max_temp : response.body.forecast['forecastday'][0]['day'].maxtemp_c,
                min_temp : response.body.forecast['forecastday'][0]['day'].mintemp_c,
                avg_temp : response.body.forecast['forecastday'][0]['day'].avgtemp_c,
                sunrise : response.body.forecast['forecastday'][0]['astro'].sunrise,
                sunset : response.body.forecast['forecastday'][0]['astro'].sunset,
                icon : response.body.current['condition'].icon,
                placeName : placeName
            }

            callback(undefined, data)
        }
        
    })
}

module.exports = fetchWeather