var express = require('express');
var lib = require('../lib/quiz.js');
var quiz = lib.init('data/quiz.db');
var router = express.Router();
var bcrypt = require("bcryptjs");

router.get('/', function(req, res) {
  res.render('index');
});

router.get('/login',function(req,res){
	res.render('login');
});

router.post('/login',function(req,res,next){
	if(req.body.exist){
		loginUser(req,res,next);
	}else{
		registerUser(req,res,next);
	}
});

var registerUser = function(req,res,next){
	var password  = bcrypt.hashSync(req.body.password);
	var new_user = {"email":req.body.email,"password":password};
	quiz.addUser(new_user,function(err,user){
		req.session.userEmail = user.email;
		if(!err)
			res.render('dashboard',{user:user});		
	});
};

module.exports = router;
