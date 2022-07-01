const config = {
    // dbConStrPro:'mongodb://localhost:27017/items'
  //shaikfathima0015@gmail.com
  //  dbConStrPro:'mongodb+srv://products:Afiyah@cluster0.cvzkpxx.mongodb.net/items'
  dbConStrPro: process.env.dbConStrPro,
  jwtSecret: process.env.jwtSecret //anypassword u set 
};


module.exports = config;



/* wat to do after env variables are set

1.create heroku account
2.heroku app
3. coonect to gitup from heroku
4.then make change in json npm start
5.then use PORT env var in index.js
6. then set db con str en var in heroku*/