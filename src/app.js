const path = require('path')
const express = require('express')
const hbs = require('hbs')
const fetchWeather = require('../utils/fetchWeather')
const geocode = require('../utils/geocode')
const { registerPartials } = require('hbs')


const app = express()

// define paths for the express config
const publicDirectory = path.join(__dirname, '../public')
const viewsDirectory = path.join(__dirname, '../templates/views')
const partialsDirectory = path.join(__dirname, '../templates/partials')

// set paths
app.set('view engine', 'hbs')
app.set('views', (viewsDirectory))
hbs.registerPartials(partialsDirectory)

// setup static directory to serve
app.use(express.static(publicDirectory))

app.get('', (req, res) => {
    res.render('index', {
        bannerTitle: 'Weather Forecast',
    })
})

app.get('/weather', (req,res) => {

    if(!req.query.city){
        return res.send('Please enter something...')
    }
    else{
        geocode(req.query.city, (error, response)=>{
            if(error){
                console.log(error)
            }else{        
                fetchWeather(response, (error, data)=>{
                    if(error){
                        console.log(error);
                        res.send(error);
                    }else{
                        // GGWP
                        console.log(data);
                        res.send(data);
                    }
                })        
            }
        })
    }    
})



app.listen(process.env.PORT || 3000, () => {
    console.log('server started on port 3000')
})
