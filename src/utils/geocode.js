const axios = require('axios');

const geocode = (address, callback) => {
  const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoibWlnZ3llbGdyYW5qZXJvIiwiYSI6ImNrbGI0c3AzZDBhaDQydXMzdGk2MnJ6aGYifQ.V-U3p28SHBuY6069Mseocw&limit=1';
  axios.get(url)
    .then(({data}) => {
      if(data.features.length === 0) {
        callback('Unable to find location. Try another search.', undefined)
      } else {
        callback(undefined, {
          latitude: data.features[0].center[1],
          longitude: data.features[0].center[0],
          location: data.features[0].place_name
        })
      }
    })
    .catch((err) => {
     callback('Unable to connect to map service', undefined);
    })
}

module.exports = geocode;