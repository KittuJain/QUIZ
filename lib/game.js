
var game={};
exports.lib =game;

game.load = function(quizId,db,onComplet){
	var selectQuery = "SELECT id,name,duration,useremail as master,questions FROM topics where id='"+quizId+"';";
	db.get(selectQuery,function(err,game){
		game.questions = JSON.parse(game.questions);
		if(err)
			console.log(err);
		else
			onComplet(null,game);
	})
};

