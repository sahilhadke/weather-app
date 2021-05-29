const request = require('request')
require('dotenv').config()

const geocode = (address, callback) => {

    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) + '.json?access_token=' + process.env.MAPBOX_API + ''

    request({url : url, json: true}, (error, response) => {               

        if(error){  
            callback('ERROR: Cannot connect to weather api', undefined)
        } 
        else if(response.body.features.length == 0) {
            callback('ERROR: No match found', undefined)

        } else {

            long = response.body.features[0].center[0]
            lat = response.body.features[0].center[1]
            placeName = response.body.features[0].place_name

            callback(undefined, {lat, long, placeName})            
        }
    })   

}

module.exports = geocode
