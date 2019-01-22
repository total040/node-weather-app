const request = require('request');

var test = () => {
  console.log('test');
};

var geocodeAddress = (address, callback) => {

    var encodedAddress = encodeURIComponent(address);

    var url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`;

    request({
        url : url,
        json: true
    }, (error, response, body) => {
        if (error) {
            callback('Unable to connect to Google servers');
        } else if (body.status === 'ZERO_RESULTS') {
            callback('Unable to find requested address');
        } else if (body.status === 'OK') {
            callback(undefined, {
                address: body.results[0].formatted_address,
                latitude: body.results[0].geometry.location.lat,
                longitude: body.results[0].geometry.location.lng
            });
        }
    });

};

module.exports.geocodeAddress = geocodeAddress;