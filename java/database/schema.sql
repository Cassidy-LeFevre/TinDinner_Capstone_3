BEGIN TRANSACTION;

DROP TABLE IF EXISTS users, request, restaurant,
request_user, request_restaurant, participant, participant_request;
DROP SEQUENCE IF EXISTS seq_user_id, seq_request_id, seq_restaurant_id, seq_participant_id;

CREATE SEQUENCE seq_user_id
  INCREMENT BY 1
  NO MAXVALUE
  NO MINVALUE
  CACHE 1;
  
CREATE SEQUENCE seq_participant_id
  INCREMENT BY 1
  NO MAXVALUE
  START WITH 1000;
  
 CREATE SEQUENCE seq_restaurant_id
  INCREMENT BY 1
  NO MAXVALUE
  START WITH 2000;
  
 CREATE SEQUENCE seq_request_id
 	INCREMENT BY 1
	NO MAXVALUE
	START WITH 3000;

CREATE TABLE users (
	user_id int DEFAULT nextval('seq_user_id'::regclass) NOT NULL,
	username varchar(50) NOT NULL,
	password_hash varchar(200) NOT NULL,
	role varchar(50) NOT NULL,
	CONSTRAINT PK_user PRIMARY KEY (user_id)
);

CREATE TABLE participant (
	participant_id int DEFAULT nextval('seq_participant_id') NOT NULL,
	username varchar(50) NOT NULL,
	CONSTRAINT PK_participant PRIMARY KEY (participant_id)
);

CREATE TABLE request (
	request_id int DEFAULT nextval('seq_request_id') NOT NULL,
	user_id int NOT NULL,
	decision_date_time TIMESTAMP NOT NULL,
	CONSTRAINT FK_request_creator_id FOREIGN KEY (user_id) REFERENCES users (user_id),
	CONSTRAINT PK_request PRIMARY KEY (request_id)
);

CREATE TABLE restaurant (
	restaurant_id int DEFAULT nextval('seq_restaurant_id'),
	restaurant_name varchar(50) NOT NULL,
	zip_code varchar(20) NOT NULL,
	hours varchar(250) NOT NULL, 
	state_city varchar(50) NOT NULL, 
	type varchar(200) NOT NULL, 
	address varchar(250) NOT NULL,
	phone_number varchar(20), 
	thumbnail_url varchar(500),
	CONSTRAINT PK_restaurant PRIMARY KEY (restaurant_id)
);

CREATE TABLE request_restaurant(
	restaurant_id int NOT NULL, 
	request_id int NOT NULL,
	CONSTRAINT FK_request_id FOREIGN KEY (request_id) REFERENCES request (request_id),
	CONSTRAINT FK_restaurant_id FOREIGN KEY (restaurant_id) REFERENCES restaurant (restaurant_id)
);



CREATE TABLE participant_request(
	request_id int NOT NULL,
	participant_id int NOT NULL,
	CONSTRAINT FK_request_id FOREIGN KEY (request_id) REFERENCES request (request_id),
	CONSTRAINT FK_participant_id FOREIGN KEY (participant_id) REFERENCES participant (participant_id)
);

INSERT INTO users (username,password_hash,role) VALUES ('user','$2a$08$UkVvwpULis18S19S5pZFn.YHPZt3oaqHZnDwqbCW9pft6uFtkXKDC','ROLE_USER');
INSERT INTO users (username,password_hash,role) VALUES ('admin','$2a$08$UkVvwpULis18S19S5pZFn.YHPZt3oaqHZnDwqbCW9pft6uFtkXKDC','ROLE_ADMIN');


COMMIT TRANSACTION;
