const mongoose = require("mongoose");
var ObjectId = mongoose.Schema.Types.ObjectId;
const Schema = mongoose.Schema;

//Creat a Schema
const topicInfo = new Schema(
	{
      id: Number,
      title : { type: String,required: true },
	  relatedCourseID : [ObjectId],
	  Order : [Number],
	  uploadedTime : {type: Date, default: Date.now }
	}
);

// export the new Schema so we could modify it using Node.js
module.exports = TopicInfo = mongoose.model("topic", topicInfo);
