BEGIN TRANSACTION;

DROP TABLE IF EXISTS users, request, restaurant,
request_user, request_restaurant;
DROP SEQUENCE IF EXISTS seq_user_id, seq_request_id, seq_restaurant_id;

CREATE SEQUENCE seq_user_id
  INCREMENT BY 1
  NO MAXVALUE
  NO MINVALUE
  CACHE 1;
  
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

CREATE TABLE request (
	request_id int DEFAULT nextval('seq_request_id'),
	creator_id int NOT NULL,
	CONSTRAINT FK_request_creator_id FOREIGN KEY (creator_id) REFERENCES users (user_id),
	CONSTRAINT PK_request PRIMARY KEY (request_id)
);

CREATE TABLE restaurant (
	restaurant_id int DEFAULT nextval('seq_restaurant_id'),
	restaurant_name varchar(50) NOT NULL,
	zip_code varchar(20) NOT NULL,
	hours varchar(250) NOT NULL, 
	type varchar(20) NOT NULL, 
	address varchar(250) NOT NULL,
	phone_number varchar(20), 
	thumbnail_url varchar(500),
	CONSTRAINT PK_restaurant PRIMARY KEY (restaurant_id)
);

CREATE TABLE request_restaurant(
	restaurant_id int NOT NULL, 
	request_id int NOT NULL, 
	votes int DEFAULT '0',
	CONSTRAINT FK_request_id FOREIGN KEY (request_id) REFERENCES request (request_id),
	CONSTRAINT FK_restaurant_id FOREIGN KEY (restaurant_id) REFERENCES restaurant (restaurant_id)
);



CREATE TABLE request_user(
	request_id int NOT NULL,
	user_id int NOT NULL,
	CONSTRAINT FK_request_id FOREIGN KEY (request_id) REFERENCES request (request_id),
	CONSTRAINT FK_user_id FOREIGN KEY (user_id) REFERENCES users (user_id)
);

INSERT INTO users (username,password_hash,role) VALUES ('user','$2a$08$UkVvwpULis18S19S5pZFn.YHPZt3oaqHZnDwqbCW9pft6uFtkXKDC','ROLE_USER');
INSERT INTO users (username,password_hash,role) VALUES ('admin','$2a$08$UkVvwpULis18S19S5pZFn.YHPZt3oaqHZnDwqbCW9pft6uFtkXKDC','ROLE_ADMIN');

INSERT INTO restaurant(restaurant_name, zip_code, hours, type, address, phone_number)
VALUES ('McDonalds' , '66502', 
	'Friday	5AM–1AM \ Saturday 5AM–1AM \ Sunday 5AM–12AM \ Monday 5AM–12AM \ Tuesday 5AM–12AM \ Wednesday 5AM–12AM \ Thursday 5AM–12AM'
	, 'fast food, burgers', '1011 Westloop Pl, Manhattan, KS 66502', '(785) 539-1672' );

INSERT INTO restaurant(restaurant_name, zip_code, hours, type, address, phone_number, thumbnail_url)
VALUES ('Tasty China House','66502',
		'Friday 11AM–11PM \ Saturday 11AM–11PM \ Sunday 11AM–10:30PM \ Monday 4–10:30PM \ Tuesday 11AM–10:30PM \ Wednesday 11AM–10:30PM \ Thursday 11AM–10:30PM',
		'Chinese','1120 Moro St C, Manhattan, KS 66502', '(785) 320-7768', 
		'http://file1.restaurant888.com/518067574/201201061732329.jpg' );
		
INSERT INTO restaurant(restaurant_name, zip_code, hours, type, address, phone_number)
VALUES ('Juan''s Flaming Fajitas', '89147', 
	   'Friday 11AM–10PM \ Saturday 11AM–10PM \ Sunday 11AM–9PM \ Monday Closed \ Tuesday 11AM–9PM \ Wednesday 11AM–9PM \ Thursday 11AM–9PM',
	   'Mexican','9640 W Tropicana Ave, Las Vegas, NV 89147', '(702) 823-1400' );

INSERT INTO restaurant(restaurant_name, zip_code, hours, type, address, thumbnail_url)
VALUES('Oyster Bar', '89148','Open 24 hours','seafood','2411 W Sahara Ave, Las Vegas, NV 89102',
	  'https://www.palacestation.com/wp-content/uploads/2020/02/PS-Oyster-Bar.jpg');

COMMIT TRANSACTION;
