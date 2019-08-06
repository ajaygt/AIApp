module.exports = {
	ensureAuthenticated : function(req,res,next){
		if(req.isAuthenticated()){
			next();
		} else {
			res.sendStatus(403).json({msg:"Forbidden"});
		}
	}
}