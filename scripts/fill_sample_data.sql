PRAGMA foreign_keys = "ON";

insert into login(useremail, password) values ("abc@email.com","abc");
insert into login(useremail, password) values ("pqr@email.com","pqr");
INSERT INTO topics (name,duration,useremail,questions,status) values ("GK","00:30:00","abc@email.com","{q:'who is PM',a:'modi'}","open"),
("SS","00:20:00","pqr@email.com","{q:'what is national food',a:'rice'}","open"),
("Language","00:15:00","pqr@email.com","{q:'what are different languages speak in India',a:['hindi','english']}","open");
