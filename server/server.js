const mongoose = require("mongoose");
const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const logger = require("morgan");
const schema = require("./models/UserInfo");
const register = require("./routes/api/Register");
const admin = require("./routes/api/adminApis")
const {mongodbURI} = require("./config/config");
const port = process.env.PORT || 5000;
console.log("db connection string "+mongodbURI);
const passport = require('passport');
var session = require("express-session");

//Passport config/
require('./config/passport')(passport)
mongoose.connect(
mongodbURI,
{useNewUrlParser: true}
)
.then(() => console.log('Mongodb connected '))
.catch(err=> console.log('error while connecting with the database '+err))

//Passport middleware
app.use(passport.initialize());
app.use(passport.session());


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(session({
  secret: 'igniteAI',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}))


//use routes
app.use('/routes/api',register);
app.use('/routes/api',admin);
app.use('/',require('./routes/index'));


app.listen(port,(err) => {	
  if (err) { console.log(err); };
  console.log('Listening on port ' + port);
});
