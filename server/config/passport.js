const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

//Load User model
const User = require('./../models/UserInfo');
module.exports = function(passport) {
	passport.use(
	new LocalStrategy({usernameField : 'username'},(username,password,done) =>{	
		User.findOne({username : username})
		.then(user => {
			if(!user){
				console.log("username does not exist ")
				return done(null,false,{message: "Username does not exist"});
			}
			
			//Match password
			bcrypt.compare(password,user.password, (err,isMatch) =>{
				if(err) throw err;
				if(isMatch){
					console.log("user found and password match")
					return done(null,user)
				} else {
					console.log("password incorrect");
					return done(null,false,{message:"password incorrect"})
				}
			})
	//});
		})
	})
	)
	passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((id, done) => {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});
}