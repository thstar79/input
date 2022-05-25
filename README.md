<h1 align="center"> :video_game: Input :video_game: </h1>

<h5 align="center">  By: <a href="https://github.com/Fiasco071">Steve Choi</a>, <a href="https://github.com/thstar79">Taehoon Kim</a>, <a href="https://github.com/Jared-Kunhart">Jared Kunhart</a> - <a href="https://input-app.herokuapp.com/"><i>Live site</i></h5>

### Table of Contents
- [We value your Input](#stories)
- [Comments](#comments)
- [Coins](#coins)
- [Conclusion](#conclusion)


## We value your Input
Input is a site where you share stories, post reviews, and read walkthroughs.

#### Key Features
- Create stories
- Post comments
- Coins
- Reviews

#### Technology used
- JavaScript
- HTML
- CSS
- Postgres
- Node.Js 
   - Express
   - Sequelize
   - Pug
   - bcrypt
  
  
#### How to use our application
 
Below is the step-by-step to install and initiate the program.
   - This will install following dependencies...
            bcrypt
            Cookie-parser / Csurf
            Express
            Morgan
            Pg
            Pug
            Sequelize / Sequelize-cli
            dotenv / per-env
            Nodemon
  
  1. git clone https://github.com/thstar79/input.git
  
  2. Install NPM packages
  
             npm install
  3. Create/Update your .env in root folder (use .envexample for reference)
  
             PORT=
             DB_USERNAME=
             DB_PASSWORD=
             DB_DATABASE=
             DB_HOST=
  
  4. Initialize Sequelize package to create the necessary files to use Sequelize
            
             npx sequelize init
  
  5. Create the user in Postgres and give it the necessary privilege (using credential variables in .env).
  
            CREATE USER <<username>> WITH PASSWORD <<password>> CREATEDB;
  
  6. Create and seed the database and tables
  
             npx dotenv sequelize db:create
             npx dotenv sequelize db:migrate
             npx dotenv sequelize db:seed:all
  
  7. Start the server using below command in your terminal.
  
             npm start
  
  8. Console should pass below message if successful.
  
             [nodemon] 2.0.6
             [nodemon] to restart at any time, enter `rs`
             [nodemon] watching path(s): *.*
             [nodemon] watching extensions: js,mjs,json
             [nodemon] starting `node -r dotenv/config ./bin/www`
             Executing (default): SELECT 1+1 AS result
             Executing (default): CREATE TABLE IF NOT EXISTS "Session" ("sid" VARCHAR(36) , "expires" TIMESTAMP WITH TIME ZONE, "data" TEXT, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL, "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL, PRIMARY KEY ("sid"));
             Database connection success! Sequelize is ready to use...
             Listening on port 8080...
             Executing (default): SELECT i.relname AS name, ix.indisprimary AS primary, ix.indisunique AS unique, ix.indkey AS indkey, array_agg(a.attnum) as column_indexes, array_agg(a.attname) AS column_names, pg_get_indexdef(ix.indexrelid) AS definition FROM pg_class t, pg_class i, pg_index ix, pg_attribute a WHERE t.oid = ix.indrelid AND i.oid = ix.indexrelid AND a.attrelid = t.oid AND t.relkind = 'r' and t.relname = 'Session' GROUP BY i.relname, ix.indexrelid, ix.indisprimary, ix.indisunique, ix.indkey ORDER BY i.relname;

  
## Stories
 This application allows for any client to read the stories posted by registered users. Registered users can also write, edit and delete the story they create. The story can have 3 topic types of Reviews, Stories, Walkthroughs to differentiate each stories in assorted categories. Story will also record the video game of their choosing from our library of video games.

## Comments
Leave comments about your favorite stories, reviews, walkthroughs.
- Dynamically Created Comments
- Read Comments
- Dynamically Update Comments
- Dynamically Delete Comments
=======
    *Login required
    *
- Read Comments
    *Anyone can read
- Update Comments
    *Only the user who wrote comment can update.
- Delete Comments
    *Only the user who wrote comment can update.

## Coins
Coins follows the same system and logic as a like, except you can give as many as you want (up to a maximum of 50). You can't give any coins to yourself in a story or comment though !
   - Add a coin to story
   Give a ton of coins to stories you think deserves them ! 
   Not only does the story keep track of how many coins you give, it keeps track of how many coins each user gives, dynamically updating and fetching the count for each story.
   - Add a coin to comments 
   Not only does the story keep track of how many coins you give, it keeps track of how many coins each user gives, dynamically updating and fetching the count for each comment.

## Conclusion
Input was an amazing collaborative effort to make. Not only did we love the theme, we got along great, put in a ton of work into something we really enjoyed making and it shows ! 
