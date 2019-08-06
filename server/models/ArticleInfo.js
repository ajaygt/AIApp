const mongoose = require("mongoose");
var ObjectId = mongoose.Schema.Types.ObjectId;
const Schema = mongoose.Schema;

//Creat a Schema
const articleInfo = new Schema(
	{
      title : {type:String,required:true},
	  description : { type: String, required: true},
	  data: {type: Buffer, required: true},
	  relatedTopicID : [ObjectId],
	  Order : [Number],
	  uploadedTime : {type: Date, default: Date.now }	
	}
  
);

// export the new Schema so we could modify it using Node.js
module.exports = ArticleInfo = mongoose.model("article", articleInfo);