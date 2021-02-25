const axios = require('axios');

const forecast = (latitude, longitude, callback) => {
  const url = 'http://api.weatherstack.com/current?access_key=ab9201d6c2a249211e850e0cbff4557e&query='+latitude+','+longitude;
  axios.get(url)
    .then(({data}) => {
      if(data.error) {
        callback('Unable to find location!', undefined);
      } else {
        callback(undefined, data.current.weather_descriptions[0] + '. It is currently ' + data.current.temperature + ' degrees out. But it feels like ' + 
        data.current.feelslike + ' degrees');
      }
    })
    .catch((err) => {
      callback('Unable to connect to weather service', undefined);
    })
}

module.exports = forecast;