const geocode = require('./geocode/geo.js');
const weather = require('./weather/weather');

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

console.log('argv', argv);

geocode.geocodeAddress(argv.address, (errorMsg, result) => {
    if (errorMsg) {
        console.log(errorMsg);
    } else {
        console.log(result.address);
        weather.getWeather(result.latitude, result.longitude, (errorMsg, result) => {
            if (errorMsg) {
                console.log(errorMsg);
            } else {
                console.log(JSON.stringify(result, undefined, 2));
            }
        });
    }
});

