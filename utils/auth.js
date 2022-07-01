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
           if (response)    next(); 
            // req.role = response.role;
          
           
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
module.exports = { basicAuth,
                     generateToken,
                     tokenAuth };