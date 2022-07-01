const config = require('../config/index');
const jwt = require('jsonwebtoken');
//middleware
function  basicAuth(req, res, next) {
    const authHeader = req.headers.authorization;
   if (authHeader) {
  //verify credentials
      const tokens = authHeader.split (' '); //split with 'space' gives array
      const encodedStr = tokens[1];
      let buff = new Buffer(encodedStr, 'base64');
      let decodedStr = buff.toString('utf-8');
  
      //username:password
      const credentials = decodedStr.split(':'); //split with colean bcoz email & password r separated with :
      const username = credentials[0];
      const password = credentials[1];
  
  
      if(username ==='admin' && password === 'password') {
        next();
      }
      else {
        res.status(401);
        res.send('Unauthorized');
      }
     
     } else {
    res.status(401);
    res.send('Unauthorized');
   }
  };
  //http pipeline
  
  //bodyparser -> morgan -> test -> homeROouter
  
  //public
//   app.use(authenticate);


function generateToken(payload) {
  return jwt.sign( payload,  config.jwtSecret, { expiresIn: '1d'});  //password saved in config file as env variable
  
};

function tokenAuth(req, res, next) { 
  try{
                //middleware
            const authHeader = req.headers.authorization;
            if(!authHeader) {
            res.status(401);
            res.send('Unauthorized');
     } else {
    // Split with 'space' bcoz  Bearer and keyvalue gdhjdj.jjdjj.sjjjj
            const tokens = authHeader.split(' ');  //split with space with Bearer
            const jwtToken = tokens[1];
            const response =  jwt.verify(jwtToken,config.jwtSecret);
           if (response)  { 
            req.role = response.role;   //personas or roles
            next(); 
           }
           else {
          res.status(401);
          res.send('Unauthorized');
        }
    }
 } 
   catch (e) {
    res.status(401);
    res.send('Unauthorized');

  }

};

// api/products/page/1/size/10
//index.js -> auth.js -> products
//delete
//api/products/:id
//index.js -> auth.js(req, res) -> product router (req, res) -> ctrl (req, res)

function authorizeAdmin(req, res, next) {
  if(role === 'Admin') next();
  else{
    res.status(403);
    res.send('Forbidden');
  }
}


module.exports = { basicAuth,
                     generateToken,
                     tokenAuth,
                     authorizeAdmin };