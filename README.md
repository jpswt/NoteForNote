# Note For Note - A Guitarist's Blog

This application was created with Vite React. 

Note for Note is a MERN stack blog geared towards guitarists and their stories.  Users can read blog posts created by other users anytime.  Users can sign up and begin adding their stories to the community.

## Requirements

- NodeJS
- Package manager i.e. npm or yarn

## Clone the repository

`$ git clone http://https://github.com/jpswt/NoteForNote.git`

#### For Backend Directory:

`$ cd backend`

#### For Frontend Directory:

`$ cd client`

## Install Dependencies

- Use `$ npm install` or `$ yarn install`

## Running the application

- For Backend Directory:

  1. Create .env file to add your MongoDB URL : <code>MONGO_URL = _Your Mongodb Url_</code>

  2. Either `npm start` or `yarn start`

  MongoDB Server will run on: `http://localhost:8000`

- For Frontend Directory:

  1. Either `npm run dev` or `yarn dev`

  React Application will run on `http://localhost:5174`

## Note For Note Home Page 

This is the homepage for all users to read articles written by other community members.  It also provides the ability to login to their account or sign up to become a member.

<img width="1494" alt="Dash_LoggedOut" src="https://user-images.githubusercontent.com/94721942/228416300-b49d3326-f2ce-45e0-9545-d209db9bf919.png">

## Members Home Page

This is the home page for a logged in community member.  It shows all community posts, the user's profile pic and tagline as well as give access to write their own posts.  Users can filter out their own posts by clicking their name under the "About Me" section.

<img width="1493" alt="Dash_LoggedIn" src="https://user-images.githubusercontent.com/94721942/228418138-6243a7b1-9a5d-400a-8754-1bb7cc5ee45c.png">

## Category Filter

Users can filter out community posts by category types.  This can be achieved by clicking items in the sidebar or by clicking the category chips attached to each post.  This examples has posts filtered out for the category of "Tone".

<img width="1490" alt="Dash_withCategoryFilter" src="https://user-images.githubusercontent.com/94721942/228418394-49bffd7f-a75c-4a6f-8dd5-be0d974c6f07.png">


