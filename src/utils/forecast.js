const request = require("request")

const forecast = ((latitude,longitude, callback) => {
    const url = "https://api.openweathermap.org/data/2.5/weather?lat="+latitude+"&lon="+longitude+"&appid=c42106050e49e259d4b56fe02d3c00dd&units=metric"
    request({ url, json:true}, (error, {body}) => {
        if (error) {
            callback('Unable to connect to weather service!',undefined)
        } else if (body.error) {
            callback('Unable to find location',undefined)
        } else {
            callback(undefined,body.main.temp)
        }
    })
})

module.exports = forecast