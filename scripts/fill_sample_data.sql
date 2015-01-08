PRAGMA foreign_keys = "ON";

insert into login(useremail, password) values ("abc@email.com","abc");
insert into login(useremail, password) values ("pqr@email.com","pqr");

insert into topics (name,duration,useremail) values ('GK','00:30:00','abc@email.com');
insert into topics (name,duration,useremail) values ('SS','00:20:00','pqr@email.com');
insert into topics (name,duration,useremail) values ('Language','00:15:00','pqr@email.com');
