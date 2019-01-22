const request = require('request');

var getWeather = (lat, lon, callback) => {

    var url = `https://api.forecast.io/forecast/b49b62b9456d20368b320bc7276e83be/${lat},${lon}`;

    request({
        url : url,
        json: true
    }, (error, response, body) => {
        if (!error && response.statusCode === 200) {
            callback(undefined, {
                temperature: body.currently.temperature,
                feels_like: body.currently.apparentTemperature
            });
        } else  {
            callback('Unable to connect to Forecast servers');
        }
    });

};

module.exports.getWeather = getWeather;