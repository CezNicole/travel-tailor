# Project Title
Travel Tailor

## Overview
What is your app? Brief description in a couple of sentences.

A travel planner app for newcomers to Canada that suggests travel itineraries based on the selected province / territory and travel duration.


### Problem
Why is your app needed? Background information around any pain points or other reasons.

I thought of creating this app to welcome newcomers to Canada, as I have been one, and to help people who are struggling with travel planning.


### User Profile
Who will use your app? How will they use it? Any special considerations that your app must take into account.

My target users are all types of travellers: newcomers to Canada, solo travelers and groups, on-the-go adventurers, leisure-seeking vacationers, busy professionals and business travelers - all of whom are eager to discover Canada's hidden gems and renowned attractions.


### Features
List the functionality that your app will include. These can be written as user stories or descriptions with related details. Do not describe _how_ these features are implemented, only _what_ needs to be implemented.

	• Single page application that contains a form that takes user input for the province/territory and a React Calendar component that checks the logic if the selected month falls into the 'summer', 'fall', or 'all time' season.
	• When user submits the form w/ the Canadian province/territory and travel duration using a button:
		○ Travel suggestions with recommended places to visit will be displayed on the same page, just below the form
	

## Implementation
### Tech Stack
List technologies that will be used in your app, including any libraries to save time or provide more functionality. Be sure to research any potential limitations.

	• React
	• JavaScript
	• SCSS
	• Client-side libraries:
		○ React
		○ React-router-dom
		○ Axios
		○ Npm
		○ react-slick slick-carousel
		○ qrcode.react
	• Server-side libraries:
		○ Express
		○ Npm 
	• MySQL
	• Knex
		
	
### APIs
List any external sources of data that will be used in your app.

	• No external APIs for this sprint


### Sitemap
List the pages of your app with brief descriptions. You can show this visually, or write it out.

Home Page
	• Contains form w/ the following elements:
		○ Dropdown field for the selected Canadian province / territory
		○ Calendar component that checks the season based on the selected month, and filters the data based on "Best Time To Visit"
		○ Submit button called "Let's Travel" to trigger data display 
		○ When "Let's Travel" button is clicked, associated tourist attractions will be displayed, based on the selected province / territory
		

### Mockups
Provide visuals of your app's screens. You can use tools like Figma or pictures of hand-drawn sketches.

See mobile-travel-tailor.png, tablet-travel-tailor.png, desktop-travel-tailor.png


### Data
Describe your data and the relationships between them. You can show this visually using diagrams, or write it out. 

See sql-diagram.png


### Endpoints
List endpoints that your server will implement, including HTTP methods, parameters, and example responses.

**GET /api/provinces**
- Get Canadian provinces / territories and their associated image link

Response:
```
[
    {
		"province_territory": "ontario",
		"image_link": "https://dynamic-media-cdn.tripadvisor.com/media/photo-s/02/9b/f5/a4/filename-629-jpg-thumbnail0.jpg?w=400&h=400&s=1"
	},
    ...
]
```

**GET /api/attractions/:province_territory/:season**
- Get tourist attractions based on the selected province / territory and filtered season (based on the calendar month selected)

Response:
```
[
    {
		"id": 1,
		"attraction_name": "Ripley's Aquarium of Canada",
		"attraction_type": "Aquariums",
		"province_territory": "ontario",
		"best_time_to_visit": "summer",
		"visiting_hours": "Sun - Sat 10:00 AM - 8:00 PM",
		"address": "288 Bremner Boulevard, Toronto, Ontario M5V 3L9 Canada",
		"website_link": "http://www.ripleyaquariums.com/canada",
		"image_link": "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/07/f0/d6/1e/ripley-s-aquarium-of.jpg?w=400&h=400&s=1"
	},
    ...
]
```


### Auth
Does your project include any login or user profile functionality? If so, describe how authentication/authorization will be implemented.

No login functionality (add as nice to have)


## Roadmap
Scope your project as a sprint. Break down the tasks that will need to be completed and map out timeframes for implementation. Think about what you can reasonably complete before the due date. The more detail you provide, the easier it will be to build.

Create Client
	• React project with routes and boilerplates for:
		○ Home Page

Create Server
	• Express project w/ routing and appropriate response codes (200, 400)

Create MySQL database
	• See sql-diagram.png
	

## Nice-to-haves
Your project will be marked based on what you committed to in the above document. Under nice-to-haves, you can list any additional features you may complete if you have extra time, or after finishing.

	• Incorporate a Calendar field to display data from Weather API, showing 1-week forecast starting from first day of travel
	• Currency Form will be displayed asking user how much they would like to convert, w/ a dropdown menu for the currencies
		○ Input fields that takes in the amount (numbers datatype) from country of origin currency to travel destination currency
		○ Dropdown for the currency selector
		○ Button called "Exchange Money" to convert from origin currency to travel destination currency
	• Add must-try local food spots w/ the suggested itineraries
	• Login functionality to make it more personalized
	• Add Geolocation to identify tourist attractions near the user's location



## Developer's Installation Guide
Setting up the React Client:
1. Open Git Bash or your preferred terminal.
2. Navigate to the desired directory where you want to create the project:
3. Clone the React application repository: 
	git clone https://github.com/CezNicole/ceznicole-comia-travel-tailor.git
4. Navigate into the newly created React app directory: cd <directory_name>
5. In your code editor's terminal (Git Bash), install the required dependencies:
	npm install
	npm install react-router-dom
	npm install axios cors express
	npm install react-slick slick-carousel --> to display the province/territory and its random images in a carousel
	npm install qrcode.react --> to generate QR code generator based on the attraction's website link

Setting up the Server Side (Node.js, Express):
1. Open Git Bash or your preferred terminal
2. Navigate to the desired directory where you want to create the server-side project
3. Clone the server-side (API) repository:
	git clone https://github.com/CezNicole/travel-tailor-api.git
4. Navigate into the newly created server-side directory: cd <directory>
5. Initialize a new Node.js project: npm init -y
6. Install the required dependencies:
	npm install knex mysql2
	npm install express
	npm install nodemon cors dotenv
	npm install axios
	npx knex init
7. Setup your .env file, using .env.sample as a guide

Setting up the Database:
1. In your code editor's terminal (server-side project), install the required dependencies:
	npm install csvtojson
2. In your code editor's terminal (server-side project), run the following command to create the attractions.json file: 
	node csvToJson.js
3. In your code editor (server-side project), create a new migration file for the attractions table:
	npx knex migrate:make create_attractions_table
4. This will create a new migration file in the migrations/ directory. Open the newly created migration file and setup the exports.up and exports.down objects
5. In your code editor's terminal (server-side project), create a new seed file for the attractions table:
	npx knex seed:make seed_attractions
6. This will create a new seed file in the seeds/ directory. Open the newly created seed file and setup the exports.seed object
7. In your code editor's terminal (server-side project), run the following commands to create the database and seed the data:
	npx knex migrate:latest
	npx knex seed:run
8. Open MySQL Workbench and create a new MySQL database connection.
   In MySQL Workbench, refresh the schemas, and you should see the newly created database.
   Open a new SQL file in MySQL Workbench and run the following command to verify the data:
   	SELECT * FROM attractions;

Link the Server Side with the Client App:
1. In your code editor's terminal (server-side project), install the required dependencies:
	npm install axios
	npm install express cors
2. Setup your .env file, using .env.sample as a guide

Running the Applications (both client-side and server-side):
1. Start the server-side application:
	cd /path/to/travel-tailor-api
	npm start
2. In a separate terminal window, start the client-side (React) application:
	cd /path/to/ceznicole-comia-travel-tailor
	npm start
3. The React application should now be running and communicating with the server-side API.

This step-by-step guide covers the setup of the React client, the server-side application (Node.js, Express), the database setup using the Kaggle dataset, and the linking of the server-side and client-side applications. Additionally, it includes other features, such as carousel and QR code generation.