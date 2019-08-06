const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Creat a Schema
const quizQuestions = new Schema(
	{
      id: Number,
      questionStatement : { type: String,required: true },
	  option1 : { type: String, required: true },
	  option2: { type: String, required: true },
	  option3 : { type: String, required: true },
	  option4 : { type: String, required: true },
	  rightAnswer : { type: String, required: true },
	  relatedArticleID : [{type : Number, default:0}]
	}
  
);

// export the new Schema so we could modify it using Node.js
module.exports = QuestionInfo = mongoose.model("question", quizQuestions);