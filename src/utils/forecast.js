const request = require('request')
const apiKey = 'd3a8a502c1d2f21921b15d01cb7bc706';
const baseUrl = process.env.NODE_ENV === 'production' ? 'https://api.weatherstack.com/current' : 'http://localhost:3000/current';

const url = `${baseUrl}?access_key=${apiKey}&query=${latitude},${longitude}`;


const forecast = (latitude, longitude, callback) => {

    const url = `${baseUrl}?access_key=${apiKey}&query=${latitude},${longitude}`;
    request({ url: url, json: true }, (error, response) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (response.body.error) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, response.body.current.weather_descriptions[0] + ". It is currently " + response.body.current.temperature + " degress out.")
        }
    })
}

module.exports = forecast