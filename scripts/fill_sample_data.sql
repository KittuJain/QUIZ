PRAGMA foreign_keys = "ON";
INSERT INTO topics (name,duration,useremail) values ('GK','00:30:00','abc@email.com'),
('SS','00:20:00','pqr@email.com'),('Language','00:15:00','pqr@email.com');

insert into login(useremail, password) values ("abc@email.com","abc");
insert into login(useremail, password) values ("pqr@email.com","pqr");