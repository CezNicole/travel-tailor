<!-- # Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify) -->




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

	• Single page application that contains a form that takes user input for the city/destination and dropdown for the specific travel dates (e.g. 3 days, 7 days, 15 days, 30 days)
	• When user submits the form w/ the Canadian province/territory and travel duration using a button:
		○ Travel suggestions with recommended places to visit will be displayed in the Travel Recommendations page 
	

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
		○ Dropdown field that contains travel date duration  of 3 days, 7 days, 15 days, or 30 days
		○ Submit button called "Let's Travel" to trigger data display 

Travel Recommendations Page
	• When "Let's Travel" button is clicked:
		○ Travel recommendations for must-visit places will be displayed
		

### Mockups
Provide visuals of your app's screens. You can use tools like Figma or pictures of hand-drawn sketches.

See mobile-travel-tailor.png, tablet-travel-tailor.png, desktop-travel-tailor.png


### Data
Describe your data and the relationships between them. You can show this visually using diagrams, or write it out. 

See sql-diagram.png


### Endpoints
List endpoints that your server will implement, including HTTP methods, parameters, and example responses.

**GET /recommended_destinations/:id**
- Get travel recommendations based on the selected province / territory

Response:
```
[
    {
        "id": 1,
        "attraction_name": "Niagara Falls",
        "description": "Niagara Falls, a world-famous natural wonder, straddles the border between Canada and the United States, offering breathtaking views of its massive waterfalls and numerous tourist attractions.",
        "province_id": 7
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
		○ Travel Recommendations Page

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

