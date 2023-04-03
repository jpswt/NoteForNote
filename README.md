![notefornote](https://user-images.githubusercontent.com/94721942/229598847-556be121-9066-42ef-b129-f11d78092444.jpg)

# Note For Note - A Guitarist's Blog

This application was created with Vite React. 

Note for Note is a MERN stack blog geared towards guitarists and their stories.  Anyone can read blog posts created by other users at anytime without becoming a member.  But to compose your own stories and add to community, a user must sign up for an account.

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

  1. Create .env file to add your MongoDB URL, PORT and Firebase Storage Credentials : 

  ```MONGO_URL = _Your Mongodb Url_
  PORT= _Your Port_
  
  BUCKERT_URL= _Your Bucket Info_
  PROJECT_ID= _Your Project ID_
  CLIENT_EMAIL= _Your Email_
  FIREBASE_PRIVATE_KEY= _Your Private Key_ 
  *Tip: copy everything over minus quotes. Shoud start with -----BEGIN and end with -----END PRIVATE KEY-----\n
```

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

## Compose Page

This is where a user can write and publish a post of their own to the community.  The user has the ability to add an image, use the rich text editor to add the text of their post and can select categories for their post using the checkboxes.

<img width="1488" alt="Screenshot 2023-03-28 at 10 43 53 PM" src="https://user-images.githubusercontent.com/94721942/228421420-70efdc51-d8d9-4c33-9ad2-30071e94e9ae.png">

## Single Post - User's Post
This ia a page that display's the entire post.  If the post was created by the current user, the ability to edit the post will be available.  This option is not available on posts that were not created by the user.  A user can either update the post information or delete the post completely.  In addition, you can also share this post with other media site by selecting the respective icons.

<img width="1488" alt="SPost" src="https://user-images.githubusercontent.com/94721942/228422931-00c0db0a-c58c-4d5d-8931-23fec0307661.png">

## Single Post - User Update

A user can update the post title and post body information in the rich text editor provided.  Once all changes are made and submitted the user is redirected back to the original single page post.

<img width="1484" alt="SinglePostUpdateRTE" src="https://user-images.githubusercontent.com/94721942/228423916-3b206051-8a56-4e7e-b5f2-491550670921.png">

## Profile Page

Users can update the their profile picture and bio tagline at anytime.

<img width="1481" alt="Profile" src="https://user-images.githubusercontent.com/94721942/228424230-e0e5e38a-bf04-43d0-9b22-573bf9cd8daa.png">

## Category Filter

Users can filter out community posts by category types.  This can be achieved by clicking items in the sidebar, by clicking the category chips attached to each post and using the search bar.  This examples has posts filtered out for the category of "Tone".

<img width="1490" alt="Dash_withCategoryFilter" src="https://user-images.githubusercontent.com/94721942/228418394-49bffd7f-a75c-4a6f-8dd5-be0d974c6f07.png">

## Search Bar

Users can use the enter keywords to search the post title, post body, date posted, username and categories to filter out those posts.  The following example uses the search to find a posts by a specific user named "Amanda"

<img width="1484" alt="Dash_withSearch" src="https://user-images.githubusercontent.com/94721942/228419656-e26706f6-b2c9-40b9-b259-1a2bda560e3a.png">


## Technologies Used
Frontend:
- ReactJS
- React Router DOM
- React Quill RTE
- NodeJS
- Tailwind CSS


Backend:
- MongoDB
- Express.JS
- NodeJS
- Multer Image Upload
