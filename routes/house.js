var express = require('express');
var router = express.Router();
const mqtt = require('mqtt')

let data;
var client = mqtt.connect('mqtt://broker.mqtt-dashboard.com');
client.on('connect',function(){
    client.subscribe("iot/suhu");
    console.log("client is sub successfully");
});
client.on('message',function(topic,message){
    data = JSON.parse(message);
})

router.get('/', function(req, res, next) {
  res.send(data);
});

module.exports = router;
