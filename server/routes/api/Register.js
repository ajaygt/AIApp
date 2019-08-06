const User = require("../../models/UserInfo");
const bcrypt = require('bcryptjs');
const express = require('express');
const router = express.Router();
const passport = require('passport');
const { ensureAuthenticated } = require('../../config/auth');
var session = require("express-session");


module.exports = router;

/** @api POST /routes/api/signup
	@desc api to save new user information
	@access public 
**/
  router.post('/signup', (req, res) => {
	  User.findOne({"username":req.body.username})
	  .then((user) => {
		  if(user == null){
			  req.body.password = GenarateHash(req.body.password);
			  const newUser = new User(	
				  req.body
				)
			  newUser.save().then(user => res.json(user))
		  } else {
			  res.json({msg:'Username already taken. Please Try with a different Username'})
		  }
	  })
	  .catch(err => console.log(err));
  });
  /** @api POST /routes/api/login
	@desc api login existing client
	@access public 
**/
  router.post('/login', (req, res,next) => {
	  console.log("POST login logic has hit");
	  passport.authenticate('local',{
		  successRedirect: '/',
		  failureRedirect : '/loginFailure'
	  })(req,res,next)
  });
  
  router.get('/dashboard',ensureAuthenticated, (req, res) => {
	  console.log("Dashboard request has been hit ");
	  res.json({msg:successful});
  });
  
  /** @api DELETE /routes/api/deleteUser
	@desc api to delete user information
	@access public
**/
  router.delete('/deleteUser', (req, res) => {
	  User.findOne({"username":req.body.username})
	  .then((user) => {
		  if(user == null){
			  res.json({msg: "User intended to be deleted deos not exist."})
		  } else {
			  user.remove().then(() => res.json({msg: "Successfully removed the user."}))
		  }
	  })
	  .catch(err => console.log(err));
  });
    /** @api GET /routes/api/getUserInfo
	@desc api to fetch User Info
	@access public
**/
  router.get('/getUserInfo', (req, res) => {
	  User.findOne({"username":req.body.username})
	  .then((user) => {
		  if(user == null){
			  res.json({msg: "User Not Found"});
		  } else {
			  user.password = 'somethingThatYouDontKnow!!';
			  res.json({userInfo : user});
		  }
	  })
	  .catch(err => res.json({errMsg:err}));
  });
   /** @api POST /routes/api/resetPassword
	@desc api to fetch User Info
	@access public
**/
  router.post('/resetPassword', (req, res) => {
	  User.findOne({"username":req.body.username})
	  .then((user) => {
		  if(user == null){
			  res.json({msg: "User Not Found"});
		  } else {
				if(req.body.newPassword == req.body.confirmPassword){
				user.password = GenarateHash(req.body.newPassword);
			    user.save().then(user => res.json(user));
				} else {
					res.json({msg : "New password and Confirm password doesn't match"});
				}
		  }
	  })
	  .catch(err => res.json({errMsg:err}));
  });
  
var GenarateHash = function (pwd){
	let salt = bcrypt.genSaltSync(10);
	return bcrypt.hashSync(pwd,salt);
};
var ComparePassword = function (pwd,hash){
	return bcrypt.compareSync(pwd, hash);
}
 
