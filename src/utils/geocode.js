const request = require('request')
const apiKey = 'fa9a16dcdeec365bc480ec665d2ab410';
const baseUrl = process.env.NODE_ENV === 'production' ? 'https://api.positionstack.com/v1/forward' : 'http://localhost:3000/v1/forward';


const geocode = (address, callback) => {
    const url = `${baseUrl}?access_key=${apiKey}&query=${address}`;


    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to location services!', undefined)
        } else if (body.data.length==0) {
            callback('Unable to find location. Try another search.', undefined)
        } else {
            callback(undefined, {
                latitude: body.data[0].latitude,
                longitude: body.data[0].longitude,
                location: body.data[0].label
            })
        }
    })
}

module.exports = geocode