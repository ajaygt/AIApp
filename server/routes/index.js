const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../config/auth');

router.get('/',(req,res) => {
	
	req.session.count++;
	console.log(req.session.count);
	res.send("Welcome to home page")
})

router.get('/home',ensureAuthenticated, (req,res) => {
	res.send('Wecome to home ')
})
router.get('/loginFailure',(req,res) => {
	res.json({success : false , msg:" Login failed !!!"})
})

module.exports = router;
