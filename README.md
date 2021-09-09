## Feedback Loop - Backend
Feedback Loop is a full-stack React app for software developers looking to connect with peers, discuss the learning process, and share advice and encouragement.

The Backend of Feedback Loop manages the database of Feedback Loop's users and posts.

### Team
+ [Michael Dunn-O'Connor](https://github.com/dunnoconnor) - Scrum Master
+ [Cole Rener](https://github.com/dishbin)
+ [Nita Lo](https://github.com/nlo88)
+ [Menty Sisay](https://github.com/mentysisay)

### Background
We started this project with the goal of making a full-stack MERN app with a highly relevant use-case. As a team of software developers, it made sense to make a tool to help teams like us collaborate.

We learned a great deal about express router functionality in developing this project. As our project became more complex, we also developed a deeper understanding of mongoose Schema.

### Installation
To run this repository locally:
+ run *npm i*. This will install the relevant node packages listed in the project's dependencies.
+ Seed your local User and Post databases with *node db/post-seeds.js* and *node db/user-seeds.js*
+ Host the project locally using *nodemon index.js*

### Technologies Used
+ [node.js](https://nodejs.org/en/)
+ [express js](https://expressjs.com/)
+ [nodemon](https://nodemon.io/)
+ [mongoose](https://mongoosejs.com/docs/)
+ [MongoDB](https://www.mongodb.com/)

### Features List
+ Moongoose schema for creating new posts
+ Moongoose schema for creating new users
+ CRUD functionality for posts
    + Users only able to edit or delete their own posts
+ CRUD functionality for users
    + Password protected user login
    + Requires unique usernames
+ Filter for posts matching search term by:
    + Username
    + Title
    + Tags
    + Body
