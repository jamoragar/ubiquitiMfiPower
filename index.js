connect = require('ssh2-connect');
exec = require('ssh2-exec');
var express = require('express');
var bodyParser = require('body-parser');

var app = express();

app.use(bodyParser.json());//Soporte para codificar en JSON
app.use(bodyParser.urlencoded({extended: true}));
app.use(function(req, res, next){
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
});

//Inicializacion del Web Server, escuchando en el puerto 737
var server = app.listen(737, function(){
	console.log("App listening at 737");
});

app.post('/Semaforo', function(req, res){
  var entrada = req.body.entrada;
  var estado = req.body.estado;

    connect({host: '[[DEVICE_IP]]', port:22, username: 'ubnt', password: 'ubnt', algorithms: { kex: ['diffie-hellman-group1-sha1'], cipher: ['3des-cbc']}}, function(err, ssh){
      child = exec({cmd: 'echo ' + estado + ' > /proc/power/output' + entrada, ssh:ssh, pty: true}, function(err, stdout, stderr){
          console.log(stdout);
          res.json("Llamada exitosa");
        });
    })
});

//
// setInterval(function () {
//   TurnInOnOff();
//   if(estado === 1){
//     estado = 0;
//   }
//   else{
//     estado = 1;
//   }
// }, 2500);
