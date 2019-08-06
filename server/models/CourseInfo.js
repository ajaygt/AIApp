const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Creat a Schema
const courseInfo = new Schema(
	{
      id: Number,
      title : { type: String,required: true },
	  uploadedTime : {type: Date, default: Date.now}
	}
);

// export the new Schema so we could modify it using Node.js
module.exports = CourseInfo = mongoose.model("course", courseInfo);