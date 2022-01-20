var express = require('express');
var router = express.Router();
var axios = require("axios").default;

var options = {
  method: 'GET',
  url: 'https://community-open-weather-map.p.rapidapi.com/weather',
  params: {
    q: 'Hanoi',
    lat: '0',
    lon: '0',
    callback: 'test',
    id: '2172797',
    lang: 'null',
    units: 'metric',
    mode: 'JSON'
  },
  headers: {
    'x-rapidapi-host': 'community-open-weather-map.p.rapidapi.com',
    'x-rapidapi-key': 'a8b09de809msh0d522743a578a8cp1d3a4fjsnaf7c12993fdf'
  }
};

const getData = async () => await axios.request(options).then(function (response) {
  data = response.data;
  data = data.slice(5, data.length - 1);
  data = JSON.parse(data);
  person = Math.floor(Math.random() * 10);
  newData = {
    temperature: data.main.temp,
    humidity: data.main.humidity,
    person: person
  };
  data = newData;
  console.log(data);
}).catch(function (error) {
  console.error(error);
});

(() => {
  getData();
  setInterval(getData, 60000000);
})()

router.get('/', function(req, res, next) {
  res.send(data);
});

module.exports = router;
