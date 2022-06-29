const config = {
    // dbConStr:'mongodb://localhost:27017/latestfolder'
 
//    dbConStr:'mongodb+srv://sumaiah:Afiyah@cluster0.bggkkmm.mongodb.net/?retryWrites=true&w=majority'
    dbConStr: process.env.dbConStr
};


module.exports = config;



/* wat to do after env variables are set

1.create heroku account
2.heroku app
3. coonect to gitup from heroku
4.then make change in json npm start
5.then use PORT env var in index.js
6. then set db con str en var in heroku*/