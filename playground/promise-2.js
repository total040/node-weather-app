const request = require('request');

var geocodeAddress = (address) => {

    return new Promise ((resolve, reject) => {

        var encodedAddress = encodeURIComponent(address);

        var url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`;

        request({
            url : url,
            json: true
        }, (error, response, body) => {
            if (error) {
                reject('Unable to connect to Google servers');
            } else if (body.status === 'ZERO_RESULTS') {
                reject('Unable to find requested address');
            } else if (body.status === 'OK') {
                resolve({
                    address: body.results[0].formatted_address,
                    latitude: body.results[0].geometry.location.lat,
                    longitude: body.results[0].geometry.location.lng
                });
            }
        });
    });

};

geocodeAddress('Sydney').then((location) => {
    console.log('Location: ', JSON.stringify(location, undefined,2))
}).catch((errorMsg) => {
    console.log(errorMsg);
});