
# Recipe Recommender

Recipe Recommender is an application that suggests you recipes based on the ingredients which are currently available. One of the most tedious tasks while cooking is figuring out what to cook with the ingredients that you, have rather than how to cook it. Our software aims to ease this dilemma by providing recipes for food items which you can make with the ingredients at your home.


![RECIPE RECOMMENDER](https://user-images.githubusercontent.com/40118578/139968487-1150b64e-d8d3-4f2e-a5d3-9a48d19ff64b.gif)
## Badges

[![Made With](https://img.shields.io/badge/made%20with-javascript-gree)](https://www.javascript.com/) 

[![DOI](https://zenodo.org/badge/703203979.svg)](https://zenodo.org/doi/10.5281/zenodo.10023760)

[![GitHub issues open](https://img.shields.io/github/issues/Yash-Chandrani/Recipe_Recommender)](https://github.com/Yash-Chandrani/Recipe_Recommender/issues?q=is%3Aopen+is%3Aissue)

[![GitHub stars](https://badgen.net/github/stars/Yash-Chandrani/Recipe_Recommender)](https://badgen.net/github/stars/Yash-Chandrani/Recipe_Recommender)

![Github closes issues](https://img.shields.io/github/issues-closed-raw/Yash-Chandrani/Recipe_Recommender)

[![Build Status](https://github.com/Yash-Chandrani/Recipe_Recommender/actions/workflows/coverage.yml/badge.svg)](https://github.com/Yash-Chandrani/Recipe_Recommender/actions/workflows/coverage.yml)

[![codecov](https://codecov.io/gh/thosaniparth/Recipe_Recommender/branch/master/graph/badge.svg?token=M48I2E3PLL)](https://codecov.io/gh/thosaniparth/Recipe_Recommender)

[![Respost - Write comment to new Issue event](https://github.com/Yash-Chandrani/Recipe_Recommender/actions/workflows/Respost.yml/badge.svg)](https://github.com/Yash-Chandrani/Recipe_Recommender/actions/workflows/Respost.yml)

[![Check the source code](https://github.com/Yash-Chandrani/Recipe_Recommender/actions/workflows/codeFormatter.yml/badge.svg)](https://github.com/Yash-Chandrani/Recipe_Recommender/actions/workflows/codeFormatter.yml)

![GitHub contributors](https://img.shields.io/github/contributors/Yash-Chandrani/Recipe_Recommender)

[![Code Formatter and Syntax Check](https://github.com/Yash-Chandrani/Recipe_Recommender/actions/workflows/Code_Formatter_and_Syntax_Check.yml/badge.svg)](https://github.com/Yash-Chandrani/Recipe_Recommender/actions/workflows/Code_Formatter_and_Syntax_Check.yml)

[![Style Checker and Prettify Code](https://github.com/Yash-Chandrani/Recipe_Recommender/actions/workflows/Style_Checker_and_Prettify_Code.yml/badge.svg)](https://github.com/Yash-Chandrani/Recipe_Recommender/actions/workflows/Style_Checker_and_Prettify_Code.yml)

[![Greetings](https://github.com/Shubh-Nisar/Recipe_Recommender/actions/workflows/greetings.yml/badge.svg)](https://github.com/Shubh-Nisar/Recipe_Recommender/actions/workflows/greetings.yml)

![Lines of code](https://img.shields.io/badge/Lines%20of%20Code-123.5k-green)

![GitHub code size in bytes](https://img.shields.io/badge/Code%20Size-27,365KB-brightgreen)

## Demo

Insert gif or link to demo


## Tech Stack

![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![NPM](https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white)
![Chai](https://img.shields.io/badge/chai.js-323330?style=for-the-badge&logo=chai&logoColor=red)
![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)
![HTML](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)



## License

[MIT](https://choosealicense.com/licenses/mit/)


## Documentation

Recipe Recommender is a website that suggests users simple food recipes based on ingredients provided.

- [ ] The interface can take multiple ingredients from user as an input.
- [ ] The interface can also takes the type of cuisine the user wants.
- [ ] For each recipe, we show the key ingredients, instructions and a sample image.
- [ ] Upon user request we also send the list of recipes to the user.


  

## **Installation Instructions for Libraries and MongoDB**

  

1. Install Node.js:

Download and install the latest LTS (Long-Term Support) version of Node.js from the official website: https://node.js.org/en/download/

  

2. Install Git:

Git is a version control system that is used to track changes in code. You can download and install Git from the official website: https://git-scm.com/  

**Installing MongoDB Community Edition**

1. Download the MongoDB Installer:

Download the MongoDB Community Edition installer for your operating system from the official MongoDB website: https://www.mongodb.com/try/download/community

  

2. Install MongoDB:

Follow the installation instructions for your operating system. The installation process will create a default data directory for MongoDB and start the MongoDB server.

3. Create Database with 2 collections: recipe and users

4. Pass the connection string in the .env file in your backend folder when you are running the project locally

## Run Locally

Clone the project

```bash
  git clone https://github.com/Yash-Chandrani/Recipe_Recommender
```
Make sure you have all the required environment variables by going to [Environment Variables section ](https://github.com/Yash-Chandrani/Recipe_Recommender)


Go to the backend directory by

```bash
cd .\Code\backend\
```

Install dependencies

```bash
  npm install
```

Now go to the frontend directory by

```bash
cd .\Code\frontend\
```

Install dependencies

```bash
  npm install --force
```

Start the server by navigating to the backend directory and run the command given below in your terminal

```bash
  npm run server
```

Start the frontend by navigating to the frontend directory and run the command given below in your terminal

```bash
  npm start
```


## Environment Variables

To run this project, you will need to add the following environment variables to your .env file inside your backend folder


`RECIPES_DB_URI` Your Mongo DB URI

`PORT` Port where your backend server is running

`NODE_ENV` Development, Production

`JWT_SECRET` Your JWT secret token for auth


  

## API Reference

  

#### Sign in

| Path           | Method | Body                                                                     |
|----------------|--------|--------------------------------------------------------------------------|
| /api/v4/signIn | POST   | {    "username":"INSERT USERNAME",     "password": "INSERT PASSWORD" } |

#### Sign up

| Path           | Method | Body                                                                     |
|----------------|--------|--------------------------------------------------------------------------|
| /api/v4/signUp | POST   | {    "username":"{INSERT USERNAME}",     "password": "INSERT PASSWORD" } |

#### Sign out

| Path            | Method |
|-----------------|--------|
| /api/v4/signOut | GET    |


#### User Profile
| Path                | Method | Body                                                                   |
|---------------------|--------|------------------------------------------------------------------------|
| /api/v4/userProfile | GET    | {     "username":"INSERT USERNAME",     "password":"INSERT PASSWORD" } |
 
#### Get recipes
| Path            | Method |
|-----------------|--------|
| /api/v4/recipes | GET    | 

#### Get cuisines
| Path                     | Method |
|--------------------------|--------|
| /api/v4/recipes/cuisines | GET    |

#### Add recipes
| Path                       | Method | Body                                                                                                                                                                                                                                                     |
|----------------------------|--------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| /api/v4/recipes/Addrecipes | POST   | {         "recipe_name": "RECIPE_NAME",         "recipe_ingredients": "INGREDIENTS",         "recipe_cuisine": "CUISINE",         "recipe_time": "TIME IN NUMBERS",         "recipe_url" : "RECIPE LINK",         "recipe_instructions":"INSTRUCTIONS" } |

## Features

- User friendly UI
- Play youtube video right in the application
- Search for different kinds of cuisines and preferences
- Responsive UI
- Add recipes to your personal collection
- Get inspired by other users' added recipes


## What's NEW

- Improved UI
- Reformatted and restructured code
- State management
- Fixed Authorization and authentication
- More tests hence increased code coverage
- Added tests for frontend
- Allowing users to have their own personal collection of recipes
- Bug fixes





## Screenshots

State management:<br>
![State Management](https://github.com/Yash-Chandrani/Recipe_Recommender/blob/main/images/State%20management.gif)

Hosting video: <br>

![Hosting video](https://github.com/Yash-Chandrani/Recipe_Recommender/blob/main/images/hosting%20video.mp4)

Confirm Password:<br>
![Confirm Password](https://github.com/Yash-Chandrani/Recipe_Recommender/blob/main/images/confirm%20password.png)

Save to personal collection:<br>
![Save to personal collection](https://github.com/Yash-Chandrani/Recipe_Recommender/blob/main/images/save%20to%20personal%20collection.png)

Saved recipes page:<br>
![Saved recipes page](https://github.com/Yash-Chandrani/Recipe_Recommender/blob/main/images/saved%20recipes%20page.png)




## Running Tests

To run tests, run the following command in the backend and frontend folders of the application

```bash
  npm run test
```

## Deployment

  

We have deployed this application using [Render](https://render.com/). Find the deployment link below:


https://reciepe-recommender-frontend.onrender.com/

P.S: It is possible that the application does not open since we are using the free tier of render and the server may go to sleep due to inactivity.
## Roadmap

### Phase 5
- [x] Restructured the frontend code for improved cleanliness and efficiency.
- [x] Implemented adding recipes personal collection functionality from both all recipes, and through add recipes from scratch.
- [x] Fixed authorization and authentication system with JSON web tokens.
- [x] Added state management
- [x] Added tests for frontend with Jest
- [x] Deployment on render
- [x] Improved UI
- [x] Bug fixes in UI
- [x] Added tests for increased code coverage
- [x] Utilized styled-components for styling the user interface.

## Future scope

- [ ]  Recommend restaurants along with recipes
- [ ]  GPT based recommendations
- [ ]  Making the application Cross platorm with React Native 
## Authors

  

<table>

<tr>

<td align="center"><a href="https://github.com/Yash-Chandrani"><img src="https://avatars.githubusercontent.com/u/60565112?v=4" width="75px;" alt=""/><br /><sub><b>Yash Chandrani</b></sub></a></td>

<td align="center"><a href="https://github.com/Smitp19"><img src="https://avatars.githubusercontent.com/u/143137360?v=4" width="75px;" alt=""/><br /><sub><b>Smit Patel</b></sub></a><br /></td>

<td align="center"><a href="https://github.com/ashaka11"><img src="https://avatars.githubusercontent.com/u/70967870?v=4" width="75px;" alt=""/><br /><sub><b>Ashaka Mehta</b></sub></a><br /></td>

<td  align="center"><a  href="https://github.com/Marmik01"><img  src="https://avatars.githubusercontent.com/u/79332949?v=4"  width="75px;"  alt=""/><br  /><sub><b>Marmik Patel</b></sub></a><br  /></td>

</tr>

</table>

## Support

For support, email ychandr@ncsu.edu


## Contributing

Contributions are always welcome!

See [CONTRIBUTING.md](https://github.com/Yash-Chandrani/Recipe_Recommender/blob/main/CONTRIBUTING.md) for ways to get started.


## Feedback

If you have any feedback, please reach out to us at ychandr@ncsu.edu

## Acknowlegements

We would like to thank Professor Dr. Timothy Menzies for helping us understand the process of building a good Software Engineering project. We would also like to thank the teaching assistants San Gilson, Andre Lustosa, Xueqi (Sherry) Yang, Yasitha Rajapaksha and Rahul Yedida for their support throughout the project. We would also like to extend our gratitude to previous group: (https://github.com/Shubh-Nisar/Recipe_Recommender)

<p align="center">Made with ❤️ on GitHub.</p>
