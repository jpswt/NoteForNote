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

  ```
  MONGO_URL = _Your Mongodb Url_
  PORT= _Your Port_
  
  BUCKERT_URL= _Your Bucket Info_
  PROJECT_ID= _Your Project ID_
  CLIENT_EMAIL= _Your Email_
  FIREBASE_PRIVATE_KEY= _Your Private Key_ 
  *Tip: copy everything over minus quotes. Shoud start with -----BEGIN and end with -----END PRIVATE KEY-----\n
  ```

  2. Create .env file to add server URI and Firebase APiKEY:
  ```
  VITE_NFN_URI= _Your Server Address_
  FB_API_KEY= _YOUR Firebase Api Key_
  ```
  3. Either `npm start` or `yarn start`

  MongoDB Server will run on: `http://localhost:####`

- For Frontend Directory:

  1. Either `npm run dev` or `yarn dev`

  React Application will run on `http://localhost:51##`

## Note For Note Home Page 

This is the homepage for all users to read articles written by other community members.  It also provides the ability to login to their account or sign up to become a member.

<img width="1491" alt="Screenshot 2023-04-03 at 2 04 46 PM" src="https://user-images.githubusercontent.com/94721942/229603033-2c193572-5438-47af-a873-3724759ec560.png">

## Members Home Page

This is the home page for a logged in community member.  It shows all community posts, the user's profile pic and tagline as well as give access to write their own posts.  Users can filter out their own posts by clicking their name under the "About Me" section.

<img width="1487" alt="Screenshot 2023-04-03 at 2 09 01 PM" src="https://user-images.githubusercontent.com/94721942/229603826-73a96de3-9fed-4629-93c1-8ecb8d64ad27.png">

## Compose Page

This is where a user can write and publish a post of their own to the community.  The user has the ability to add an image, use the rich text editor to add the text of their post and can select categories for their post using the checkboxes.

<img width="1480" alt="Screenshot 2023-04-03 at 2 11 04 PM" src="https://user-images.githubusercontent.com/94721942/229604306-c8d6e255-3b26-46cf-98ef-da856c0c76cf.png">

## Single Post - User's Post
This ia a page that display's the entire post.  If the post was created by the current user, the ability to edit the post will be available.  This option is not available on posts that were not created by the user.  A user can either update the post information or delete the post completely.  In addition, you can also share this post with other media site by selecting the respective icons.

<img width="1485" alt="Screenshot 2023-04-03 at 2 12 27 PM" src="https://user-images.githubusercontent.com/94721942/229604650-583b65c3-89a3-4115-9568-b9eef37bb5c9.png">

## Single Post - User Update

A user can update the post title and post body information in the rich text editor provided.  Once all changes are made and submitted the user is redirected back to the original single page post.

<img width="1484" alt="Screenshot 2023-04-03 at 2 13 57 PM" src="https://user-images.githubusercontent.com/94721942/229604994-e30db575-1794-4330-a67c-090de01641d1.png">

## Profile Page

Users can update the their profile picture and bio tagline at anytime.

<img width="1490" alt="Screenshot 2023-04-03 at 2 15 14 PM" src="https://user-images.githubusercontent.com/94721942/229605227-494a54ff-1dd2-441d-b367-4b0154450ed5.png">

## Category Filter

Users can filter out community posts by category types.  This can be achieved by clicking items in the sidebar, by clicking the category chips attached to each post and using the search bar.  This examples has posts filtered out for the category of "Tone".

<img width="1492" alt="Screenshot 2023-04-03 at 2 16 40 PM" src="https://user-images.githubusercontent.com/94721942/229605631-97859764-35fb-46f3-8062-247e2bd8e4ae.png">

## Search Bar

Users can use the enter keywords to search the post title, post body, date posted, username and categories to filter out those posts.  The following example uses the search to find a posts by a specific user named "Amanda"

<img width="1488" alt="Screenshot 2023-04-03 at 2 19 01 PM" src="https://user-images.githubusercontent.com/94721942/229606037-b499946f-33d9-4560-8b75-e66323954545.png">

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
- Multer
- Firebase Storage API
