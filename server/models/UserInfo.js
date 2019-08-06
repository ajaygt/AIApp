const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Creat a Schema
const userInformation = new Schema(
	{
      id: Number,
      username : { type: String, unique: true, required: true },
	  password : { type: String, required: true },
	  firstName: { type: String, required: true },
	  lastName: { type: String, required: true },
	  completedTopicID : [{type : Number, default:0}],
	  numberOfQuizTaken : {type : Number, default:0},
	  numberOfQuestionsAttempted : {type : Number, default:0},
	  answeredCorrect : {type : Number, default:0},
	  answeredIncorrect : {type : Number, default:0},
	  grade : String,
	  email : String,
	  image : { data: Buffer, contentType: String },
	  favouriteArticleId : [Number],
	  createdDate: { type: Date, default: Date.now }
	}
  
);

// export the new Schema so we could modify it using Node.js
module.exports = UserInfo = mongoose.model("user", userInformation);
