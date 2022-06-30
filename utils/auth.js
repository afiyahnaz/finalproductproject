const config = require('../config/index');
const jwt = require('jsonwebtoken');
//middleware
function  basicAuth(req, res, next) {
    const authHeader = req.headers.authorization;
   if(authHeader) {
  //verify credentials
      const tokens = authHeader.split (' ');
      const encodedStr = tokens[1];
      let buff = new Buffer(encodedStr, 'base64');
      let decodedStr = buff.toString('utf-8');
  
      const credentials = decodedStr.split(':');
      const username = credentials[0];
      const password = credentials[1];
  
  
      if(username ==='admin' && password === 'password'){
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
  }
  //http pipeline
  
  //bodyparser -> morgan -> test -> homeROouter
  
  //public
//   app.use(authenticate);


function generateToken(payload) {
  return jwt.sign( payload,
     config.jwtSecret, 
     { expiresIn: '1d'});
  
};


module.exports = { basicAuth,
                     generateToken };