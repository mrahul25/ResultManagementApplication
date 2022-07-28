const Express=require('express');
const bodyParser=require('body-parser');

const env=require('dotenv');

const sequelize=require('./server/database/connection');

const route=require('./server/apis/router');

const cookieParser = require("cookie-parser");

const app=Express();
env.config({path:'config.env'});
const port=process.env.PORT||5000;

//parsing middleware
app.use(bodyParser.urlencoded({extended:false}));

//parse application json
app.use(bodyParser.json());

//app.use(cors({origin:'http://localhost:4200'}));
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:4200"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header("Access-Control-Allow-Methods", "GET, POST, DELETE,PUT,OPTIONS"); 
    next();
  });
app.use(cookieParser());



app.use('/api',route);

sequelize.sync().then(result => {
    //console.log(result);
    app.listen(port);
}).catch(err => {
    console.log(err);
});
