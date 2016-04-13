//Creamos la conexión con nuestra mongodb a trabés de mongoose.

var mongoHost = process.env.MONGO_ADDR || 'localhost';
var mongoPort = process.env['MONGO_PORT'] || '27017';
mongoose.connect('mongodb://'+mongoHost+':'+mongoPort+'/it-blogs');

//Implementamos CORS para nuestra API  

var allowCrossDomain = function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
}

//Aquí definimos los middlewares de express

module.exports = function (app) {
  if(process.env.NODE_ENV == 'prod'){
    app.use(logger('common', { skip: function(req, res) { return res.statusCode < 400 }, stream: __dirname + '/../morgan.log' }));
  }else{
    app.use(logger('dev'));
  }
  app.use(compression({
      threshold: 512
  }));

  app.use(bodyParser.json());
  app.use(validator());
  app.use(cookieParser());

  //Hacemos uso de nuestro middleware creado anteriormente.

  app.use(allowCrossDomain);
  app.use(session({
      resave: true,
      saveUninitialized: true,
      secret: pkg.name
  }));

};