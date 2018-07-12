# Project Name
Gigx

## Description

The Netflix of concert videos
 
 ## User Stories

List of user stories in order of priority/importance.

 - **404** - As a user I want to see a nice 404 page when I go to a page that doesn’t exist so that I know it was my fault 
 - **500** - As a user I want to see a nice error page when the server messes up so that I know that is not my fault
 - **homepage** - As a user I want to be able to access the homepage so that I can see what the app is about and login and signup
 - **sign up** - As a user I want to sign up on the site so that I can watch all the videos
 - **login** - As a user I want to be able to log in on the site so that I can continue watching videos
 - **logout** - As a user I want to be able to log out from the site so that I can make sure no one will access my account
 - **concerts list** - As a user I want to be able to see all the concert videos available on the site so that I can choose what to watch
 - **concert details** - As a user I want to be able to view detailed information about the concert video so that I can make sure it matches my tastes
 - **concert view** - As a user I want to watch the concert videos so that I can enjoy watching the bands I like playing live
 - **concert add** - As a user I want to add concerts to the database so that other users can enjoy them
 - **profile** - As a user I want a profile that allows me to store my favourite concerts so that I can return to them whenever I want

## Backlog

List of other features outside of the MVPs scope

Search:
- Search concerts by genre, band, title, year etc.

User profile:
- see my profile
- upload my profile picture
- see other users profile
- list of concerts created by the user
- list concerts the user favourited

Admin rights:
- Restrict concert adding to users with specific admin rights

Streaming live video:
- View live concerts that are happening right now

Infinite scrolling:
- Concerts listings continue to load as you scroll down

Recommendation engine:
- Suggest concerts you might like based on your favourites and profile

Spotify:
- Connect with your spotify account to get recommendations based on your favourite bands, genres etc.

Payments:
- Paywall certain sections of the site (eg. live shows)


## ROUTES:
```
GET / 

GET /user/signup
GET /user/login
POST user/signup - POST Body: email, password
POST user/login - POST Body: email, password
POST user/logout - POST Body: nothing
GET /user/profile - View & edit profile
POST /user/profile - POST Body: email, password, avatar
POST /user/remove - Delete account

GET /concerts - Concert listings
GET /concerts/play/:id - id is a listing id


```

## MODELS

Listing
 - title: { type: String, required: true },
 - url: { type: String, required: true },
 - image: { type: String },
 - artist: { type: String, required: true },
 - genres: [{ type: String, enum: ['Classical', 'Blues', 'Rock', 'Pop', 'Hip-hop', 'Reggae', 'Jazz', 'Country', 'World', 'Electronic', 'Metal', 'Indie', 'R&B', 'Latin'] }],
 - year: { type: Number },
 - duration: { type: Number },
 - location: { type: String }


User
 - email: { type: String, required: true, unique: true },
 - password: { type: String, required: true },
 - avatar: { type: String, default: '/images/avatar.svg' }
 




