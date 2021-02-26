const path = require('path');
const express = require('express');
const hbs = require('hbs');
const forecast = require('./utils/forecast');
const geocode = require('./utils/geocode');

console.log(__dirname);
console.log(path.join(__dirname, '../public'));

const app = express();
const port = process.env.PORT || 3000;

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlers engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather App',
    name: 'Miguel Ingelmo'
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About me',
    name: 'Miguel Ingelmo'
  });
});

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help',
    msg: 'Fuck you! <3',
    name: 'Miguel Ingelmo'
  })
});

app.get('/weather', (req, res) => {
  const address = req.query.address;
  if(!address) {
    return res.send({
      error: 'You must provide and address'
    });
  }
  geocode(address, (error, {latitude, longitude, location} = {}) => {
    if (error) {
      res.send({
        error: error
      })
    }
    forecast(latitude, longitude, (error, forecastData) => {
      if (error) {
        res.send({
          error: error
        })
      }
      res.send({
        address: address,
        location: location,
        forecast: forecastData
      });
    });
  });
});

app.get('/products', (req, res) => {
  if (!req.query.search) {
     return res.send({
      error: 'You must providde a search term'
    });
  }
  console.log(req.query.search);
  res.send({
    products: []
  })
});

app.get('/help/*', (req, res) => {
  res.render('404', {
    title: 'Help 404',
    msg: 'Help article not found!',
    name: 'Miguel Ingelmo'
  });
});

app.get('*', (req, res) => {
  res.render('404', {
    title: '404',
    msg: 'Page not found.',
    name: 'Miguel Ingelmo'
  });
});



app.listen(port, () => {
  console.log('Server is up on port ' + port);
});