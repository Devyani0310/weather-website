const path = require('path') 
const express = require("express")
const hbs = require('hbs')
const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')


const app = express()

const publicDirectory = path.join(__dirname,"../public")
const viewPath = path.join(__dirname,'../templates/views')
const partialPath = path.join(__dirname,'../templates/partials')

app.set('view engine','hbs')
app.set('views',viewPath)
hbs.registerPartials(partialPath)

app.use(express.static(publicDirectory))

app.get('',(req, res) => {
    res.render('index',{
        title: 'Weather app',
        name: 'Devyani'
    })
})

app.get('/help',(req,res) => {
    res.render('help',{
        msg: "YOU ARE FOOL. GET LOST!!!",
        title: 'Weather app',
        name: 'Devyani'
    })
})

app.get('/about',(req,res) => {
    res.render('about',{
        title: 'Weather app',
        name: 'Devyani'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: "Please provide a location"
        })
    }

    geocode(req.query.address,(error,{latitude,longitude,location}={}) => {
        if (error) {
            return res.send({ error })
        }
        
        forecast(latitude,longitude, (error,forecastData) => {
            if (error) {
                return res.send({ error })
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
    
})

app.get('/products',(req,res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }
    
    console.log(req.query)
    res.send({
        products: []
    })
})

app.get('/help/*',(req,res) => {
    res.render('404', {
        title: '404',
        name: 'Devyani',
        errormsg: 'Help page not available'
    })
})

app.get('*',(req,res) => {
    res.render('404', {
        title: '404',
        name: 'Devyani',
        errormsg: 'Page not found'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})