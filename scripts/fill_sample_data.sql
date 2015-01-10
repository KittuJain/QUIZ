PRAGMA foreign_keys = "ON";

insert into login(useremail, password) values ("abc@email.com","abc");
insert into login(useremail, password) values ("pqr@email.com","pqr");

insert into topics (name,duration,useremail,questions,status) values ("GK","00:30:00","abc@email.com",'[{"q":"who is PM","a":"modi"}]',"open");
insert into topics (name,duration,useremail,questions,status) values ("SS","00:20:00","pqr@email.com",'[{"q":"what is national food","a":"rice"}]',"open");
insert into topics (name,duration,useremail,questions,status) values ("Language","00:15:00","pqr@email.com",'[{"q":"what are different languages speak in India","a":["hindi","english"]}]',"open");
insert into topics (name,duration,useremail,questions,status) values ("India","00:15:00","pqr@email.com",'[{"q":"India belongs to which continent?","a":["asia"]}]',"closed");
insert into participate(useremail, quizId) values ("abc@email.com",2);
