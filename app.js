const request = require('request')
const yargs = require('yargs')

const argv = yargs
  .options({
      a: {
          demand: true,
          alias: 'address',
          describe: 'Address to fetch weather for',
          string: true
      }
  })
  .help()
  .alias('help', 'h')
  .argv

// console.log(argv)

let encodedAddress = encodeURIComponent(argv.address)

request({
    url: `http://www.mapquestapi.com/geocoding/v1/address?key=0vBOs1it4jVxUjgnNUjaAoATpG4L6wp0&location=${encodedAddress}`,
    json: true
}, (error, response, body) => {
    // console.log(body.results[0].locations[0].street)
    if(body.info.statuscode !== 0){
      console.log('Unable to connect to servers')
  } else if(body.results[0].locations[0].street === "" && body.results[0].locations[0].adminArea6 === "") {
      console.log('Unable to find that address')
    } else if(!body.info.statuscode.messages ) {
      console.log(body.results[0].locations[0].street)
      console.log(`Address: ${body.results[0].providedLocation.location}`)
      console.log(`Latitude: ${body.results[0].locations[0].latLng.lat}`)
      console.log(`Longitude: ${body.results[0].locations[0].latLng.lng}`)
    }
})

// request({
//     url: 'https://maps.googleapis.com/maps/api/geocode/json?address=1301+lombard+st+philadelphia&key=AIzaSyBbCj4HoywHtB75w8zm7NDbVvLiGzhjKgk',
//     json: true
// }, (error, response, body) => {
//
// })
