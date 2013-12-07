var express         = require('express'),
  http              = require('http'),
  mongoose          = require('mongoose'),
  path              = require('path'),
  rroute            = require('./lib/rroute'),
  rmodel            = require('./lib/rmodel'),
  connectLivereload = require('connect-livereload'),
  socketIO          = require('socket.io'),
  autoDB            = require('./lib/auto-db');

require('express-mongoose');

//Export
var app = module.exports = express();

var server = http.createServer(app);

var io = socketIO.listen(server);

//Configuration
app.set('port',       process.env.PORT || 8000);
app.set('env',        process.env.NODE_ENV || 'development');
app.set('moreToLog',  '');
app.set('mongoURI',   process.env.MONGOLAB_URI || 'mongodb://localhost:27017/senior-pres');
app.set('routesDir',  path.join(__dirname, 'routes'));
app.set('modelsDir',  path.join(__dirname, 'models'));
app.set('tmpDir',     '.tmp');
app.set('publicDir',  'public');

if(app.get('env') === 'production')
  app.set('io log level', 0);

if(app.get('env') === 'development')
  app.set('io log level', 3);

//Create DB Connection
mongoose.connect(app.get('mongoURI'));
var conn = mongoose.connection;
conn.on('error', function(err){
  'use strict';
  console.error('DB connection error:', err);
  app.use(function(req,res){
    res.status(500);
    res.send('DB connection error');
  });
});

conn.once('open', function(){
  'use strict';

  //Load Mongoose models
  var modelsToLoad = rmodel(app.get('modelsDir'));
  var autoLoadModels = {};
  modelsToLoad.forEach(function(v){
    var metaModel = require(path.join(app.get('modelsDir'),v));
    if(metaModel.hasOwnProperty('name') && metaModel.hasOwnProperty('schema')){
      mongoose.model(metaModel.name, new mongoose.Schema(metaModel.schema));
      if(metaModel.hasOwnProperty('autoLoad')){
        if(metaModel.autoLoad === true)
          metaModel.autoLoad = {};
        if(typeof metaModel.autoLoad === 'object')
          autoLoadModels[metaModel.name] = metaModel.autoLoad;
      }
    }
  });

  if(app.get('env') === 'development')
    app.use(connectLivereload());

  app.use(express.json());
  app.use(express.urlencoded());
  app.use(express.methodOverride());
  app.use(express.cookieParser());
  app.use(app.router);
  app.use(rroute(app.get('routesDir')));

  if(app.get('env') === 'development')
    app.use(express.static(path.join(__dirname, app.get('tmpDir'))));

  app.use(express.static(path.join(__dirname, app.get('publicDir'))));
  app.use('/data', autoDB(autoLoadModels));
  app.use(express.errorHandler());

  io.set('log level', app.get('io log level'));

  //Since heroku's websockets are still in beta and don't work well on school comps
  io.set('transports', ['xhr-polling']);
  io.set('polling duration', 10);

  //Socket.io logic. Probs needs to go somewhere else but #yolo
  io.sockets.on('connection', function(socket){
    //Rebroadcast any `holla` events to all clients
    socket.on('holla', function(msg){
      io.sockets.emit('holla', msg);
    });
  });

  server.listen(app.get('port'), function () {
    console.log('Listening on port ' + app.get('port') + ' in ' + app.get('env') + ' mode.\n', app.get('moreToLog'));
  });

});