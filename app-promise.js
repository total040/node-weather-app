const axios = require('axios');
const yargs = require('yargs');

const argv = yargs
    .options({
        a: {
            demand: true,
            alias: 'address',
            describe: 'Type an address',
            string: true
        }
    })
    .help()
    .alias('help', 'h')
    .argv;

var encodedAddress = encodeURIComponent(argv.address);

var geoUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`;

axios.get(geoUrl).then((response) => {
    if (response.data.status === 'ZERO_RESULTS') {
        throw new Error('Unable to find requested address');
    }
    console.log(response.data.results[0].formatted_address);
    var lat = response.data.results[0].geometry.location.lat;
    var lon = response.data.results[0].geometry.location.lng;
    var weatherUrl = `https://api.forecast.io/forecast/b49b62b9456d20368b320bc7276e83be/${lat},${lon}`;
    return axios.get(weatherUrl);
}).then((response) => {
    var temperature = response.data.currently.temperature;
    var feels_like = response.data.currently.apparentTemperature;
    console.log('Temperature: ', temperature);
    console.log('And it feels like: ', feels_like);
}).catch((e) => {
    if (e.code === 'ENOTFOUND') {
        console.log('Unable to connect to API servers');
    }
   console.log(e.message);
});

