const User = require("../../models/UserInfo");
const Topic = require("../../models/TopicInfo");
const Course = require("../../models/CourseInfo");
const Article = require("../../models/ArticleInfo");
const Question = require("../../models/QuestionInfo");
const express = require('express');
const router = express.Router();
const passport = require('passport');
const { ensureAuthenticated } = require('../../config/auth');
var session = require("express-session");

module.exports = router;

/** @api POST /routes/api/addTopic
	@desc api to save new topic information
	@access private
**/
  router.post('/addTopic', (req, res) => {
	  console.log(req.body);
	  Topic.findOne({"title":req.body.title})
	  .then((topic) => {
		  if(topic == null){
			  const newTopic = new Topic(	
				  req.body
				)
				newTopic.save().then(topic => res.json(topic))
		  } else {
			  res.json({err:'Topic Title is already taken. Please use a different Title'})
		  }
	  })
	  .catch(err => res.json({err:err}));
  });
  
  /** @api POST /routes/api/addCourse
	@desc api to save new course information
	@access private
**/
  router.post('/addCourse', (req, res) => {
	  console.log(req.body);
	  Course.findOne({"title":req.body.title})
	  .then((course) => {
		  if(course == null){
			  const newCourse = new Course(	
				  req.body
				)
			  newCourse.save().then(course => res.json(course))
		  } else {
			  res.json({err:'Course Title is already taken. Please use a different Title'})
		  }
	  })
	  .catch(err => res.json({err:err}));
  });
  
    /** @api POST /routes/api/addArticle
	@desc api to save new Article information
	@access private
**/
  router.post('/addArticle', (req, res) => {
	  console.log(req.body);
	  Article.findOne({"title":req.body.title})
	  .then((article) => {
		  if(article == null){
			  const newArticle = new Article(	
				  req.body
				)
			  newArticle.save().then(article => res.json(article))
		  } else {
			  res.json({err:'Article Title is already taken. Please use a different Title'})
		  }
	  })
	  .catch(err => res.json({err:err}));
  });
      /** @api POST /routes/api/addQuizQuestion
	@desc api to add new question
	@access private
**/
  router.post('/addQuizQuestion', (req, res) => {
	  console.log(req.body);
	  Question.findOne({"questionStatement":req.body.questionStatement})
	  .then((question) => {
		  if(question == null){
			  const newQuestion = new Question(	
				  req.body
				)
			  newQuestion.save().then(question => res.json(question))
		  } else {
			  res.json({err:'Question Statement is already taken. Please use a different Question Statement'})
		  }
	  })
	  .catch(err => res.json({err:err}));
  });
  
   /** @api GET /routes/api/getTopicByMe
	@desc api to get Topic details
	@access private
**/
  router.get('/getTopicByMe', (req, res) => {
	  console.log(req.body);
	  Topic.find({})
	  .then((topic) => {
			  res.json({topic})
	  })
	  .catch(err => res.json({err:err}));
  });
  /** @api GET /routes/api/getCourseByMe
	@desc api get Course details
	@access private
**/
  router.get('/getCourseByMe', (req, res) => {
	  Course.find({})
	  .then((course) => {
			  res.json({course})
	  })
	  .catch(err => res.json({err:err}));
  });
  /** @api GET /routes/api/getArticlesByMe
	@desc api get Article details
	@access private
**/
  router.get('/getArticlesByMe', (req, res) => {
	  Article.find({})
	  .then((article) => {
			  res.json({article})
	  })
	  .catch(err => res.json({err:err}));
  });
   /** @api GET /routes/api/getQuestionsByMe
	@desc api get question details
	@access private
**/
  router.get('/getQuestionsByMe', (req, res) => {
	  Question.find({})
	  .then((question) => {
			  res.json({question})
	  })
	  .catch(err => res.json({err:err}));
  });
    /** @api GET /routes/api/getAllUserInfo
	@desc api get All User Information.
	@access private
**/
  router.get('/getAllUsersInfo', (req, res) => {
	  User.find({})
	  .then((user) => {
			  res.json({user})
	  })
	  .catch(err => res.json({err:err}));
  });
    /** @api GET /routes/api/getCourseTopicHierarchy
	@desc Course and related topics..
	@access private
**/
  router.get('/getCourseTopicHierarchy', (req, res) => {
	  Course.find({}).lean().exec()
	  .then((course) => {
			let index =0;
			getAllTopics(course,index);
			function getAllTopics(course,i){
			Topic.find({relatedCourseID:course[i]._id})
				.then((topics) => {
					course[i]["relatedTopics"] = topics;
					i = i+1;
					if( i == course.length){
						res.json(course);
				    } else {
						console.log("Continuing the loop ");
						getAllTopics(course,i);
					}
				})
				.catch(err => res.json({err:err}));
			}
		  })
	  .catch(err => res.json({err:err}));
  });
    /** @api GET /routes/api/getTopicArticleHierarchy
	@desc api get All User Information.
	@access private
**/
  router.get('/getTopicArticleHierarchy', (req, res) => {
	  Topic.find({}).lean().exec()
	  .then((topic) => {
			  let index =0;
			  getArticle(topic,index);
			  function getArticle (topic,i){
				  Article.find({relatedTopicID : topic[i]._id})
				  .then((article)=>{	
					  topic[i]["relatedArticle"] = article;
					  i = i+1;
						if(i == topic.length){
							res.json(topic);
						} else {
							getArticle(topic,i);
						}
				  })
				.catch(err => res.json({err:err}));
			  }
	  })
	  .catch(err => res.json({err:err}));
  });
  
  router.get('/dummyArticle', (req, res) => {
	  console.log(req.body);
	  Article.find({relatedTopicID : "5ccae793a05ada2240d3cf89"})
	  .then((article) => {
			res.json(article);
	  })
	  .catch(err => res.json({err:err}));
  });