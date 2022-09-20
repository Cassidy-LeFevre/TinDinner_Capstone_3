BEGIN TRANSACTION;

INSERT INTO restaurant(restaurant_name, zip_code, state_city, hours, type, address, phone_number)
VALUES ('Dirty Fork', '89147', 'NV_Las_Vegas',
	   'Friday 11AM–10PM \ Saturday 11AM–10PM \ Sunday 11AM–9PM \ Monday Closed \ Tuesday 11AM–9PM \ Wednesday 11AM–9PM \ Thursday 11AM–9PM',
	   'Hawaiian','3655 S Durango Dr #29, Las Vegas, NV 89147', '(702) 982-2111');
					
INSERT INTO restaurant(restaurant_name, zip_code, state_city, hours, type, address, phone_number, thumbnail_url)
VALUES ('Pho and Beyond', '89147', 'NV_Las_Vegas',
	   'Open 24 hours',
	   'Vietnamese, Pho','4520 S Hualapai Way #110-111', '(702) 272-1570',
	   'https://pho-beyond.com/wp-content/uploads/2022/06/z3462079765589_a534340635c019bd8dd2d7f0cd313202-1024x768.jpg');

INSERT INTO restaurant(restaurant_name, zip_code, state_city, hours, type, address, phone_number)
VALUES ('Parsley Modern Mediterranean', '89147', 'NV_Las_Vegas',
	   'Friday 11AM–10PM \ Saturday 11AM–10PM \ Sunday 11AM–9PM \ Monday Closed \ Tuesday 11AM–9PM \ Wednesday 11AM–9PM \ Thursday 11AM–9PM',
	   'Meditteranean','9460 W Flamingo Rd Unit 125, Las Vegas, NV 89147', '(702) 799-9595');

INSERT INTO restaurant(restaurant_name, zip_code, state_city, hours, type, address, phone_number)
VALUES ('Aroy Thai Kitchen', '89147', 'NV_Las_Vegas',
	   'Friday 11AM–10PM \ Saturday 11AM–10PM \ Sunday 11AM–9PM \ Monday Closed \ Tuesday 11AM–9PM \ Wednesday 11AM–9PM \ Thursday 11AM–9PM',
	   'Thai','4555 S Fort Apache Rd #112, Las Vegas, NV 89147', '(702) 258-0304');
	   
INSERT INTO restaurant(restaurant_name, zip_code, state_city, hours, type, address, phone_number, thumbnail_url)
VALUES ('Lazy Dog Restaurant & Bar', '89119', 'NV_Las_Vegas',
	   'Friday 11AM–10PM \ Saturday 11AM–10PM \ Sunday 11AM–9PM \ Monday Closed \ Tuesday 11AM–9PM \ Wednesday 11AM–9PM \ Thursday 11AM–9PM',
	   'Comfort','6509 S Las Vegas Blvd, Las Vegas, NV 89119', '(702) 941-1920', 
		'https://media-cdn.tripadvisor.com/media/photo-s/0f/9f/14/5f/arriving-to-the-restaurant.jpg');
	   
	   
INSERT INTO restaurant(restaurant_name, zip_code, state_city, hours, type, address, phone_number)
VALUES ('Blueberry Hill Family Restaurant', '89119', 'NV_Las_Vegas',
	   'Open 24 hours',
	   'Breakfast and Comfort','1505 E Flamingo Rd, Las Vegas, NV 89119', '(702) 696-9666');
	 
	 
INSERT INTO restaurant(restaurant_name, zip_code, state_city, hours, type, address, phone_number)
VALUES ('Cafe Rio Mexican Grill', '89119', 'NV_Las_Vegas',
	   'Open 24 hours',
	   'Mexican','4555 S Fort Apache Rd #112, Las Vegas, NV 89147', '(702) 258-0304');
	   
	   
INSERT INTO restaurant(restaurant_name, zip_code, state_city, hours, type, address, phone_number)
VALUES ('Aloha Kitchen UNLV', '89119', 'NV_Las_Vegas',
	   'Open 24 hours',
	   'Hawaiian','4745 S Maryland Pkwy, Las Vegas, NV 89119', '(702) 895-9444');
	   
INSERT INTO restaurant(restaurant_name, zip_code, state_city, hours, type, address, phone_number)
VALUES ('McDonalds' , '66502', 'KS_Manhattan', 
	'Friday 5AM–1AM \ Saturday 5AM–1AM \ Sunday 5AM–12AM \ Monday 5AM–12AM \ Tuesday 5AM–12AM \ Wednesday 5AM–12AM \ Thursday 5AM–12AM'
	, 'fast food, burgers', '1011 Westloop Pl, Manhattan, KS 66502', '(785) 539-1672' );

INSERT INTO restaurant(restaurant_name, zip_code, state_city, hours, type, address, phone_number, thumbnail_url)
VALUES ('Tasty China House','66502', 'KS_Manhattan',
		'Friday 11AM–11PM \ Saturday 11AM–11PM \ Sunday 11AM–10:30PM \ Monday 4–10:30PM \ Tuesday 11AM–10:30PM \ Wednesday 11AM–10:30PM \ Thursday 11AM–10:30PM',
		'Chinese','1120 Moro St C, Manhattan, KS 66502', '(785) 320-7768', 
		'http://file1.restaurant888.com/518067574/201201061732329.jpg' );
		
INSERT INTO restaurant(restaurant_name, zip_code, state_city, hours, type, address, phone_number)
VALUES ('Juan''s Flaming Fajitas', '89147', 'NV_Las_Vegas',
	   'Friday 11AM–10PM \ Saturday 11AM–10PM \ Sunday 11AM–9PM \ Monday Closed \ Tuesday 11AM–9PM \ Wednesday 11AM–9PM \ Thursday 11AM–9PM',
	   'Mexican','9640 W Tropicana Ave, Las Vegas, NV 89147', '(702) 823-1400' );

INSERT INTO restaurant(restaurant_name, zip_code, state_city, hours, type, address, thumbnail_url)
VALUES('Oyster Bar', '89148','NV_Las_Vegas','Open 24 hours','seafood','2411 W Sahara Ave, Las Vegas, NV 89102',
	  'https://www.palacestation.com/wp-content/uploads/2020/02/PS-Oyster-Bar.jpg');

	   
COMMIT;

