const { hash } = require('bcrypt');
const userRepositories = require('../repositories/userRepositories');
const logger = require('../utils/appLogger');
const crypt = require('../utils/crypt');
const auth = require('../utils/auth');

const post = async (req, res) => {

  try{
        logger.info('Saving  data to db');
        const data = req.body;
        data.createdAt = new Date();
        data.password = await crypt.getHash(data.password);  //this line save password in hash
        await  userRepositories.register(data);
        logger.info('Saved data to db');
         res.status(201);
         res.send();
} catch (e) {
    logger.error(e);
    if(e && e.message.indexOf('duplicate key error')> -1) {
      res.status(400);
      res.send('Email already exists');
    } else {
    res.status(500);
    res.send('Internal Server Error');
     }
   }
};

//password123 -> (pwd)  adhjdkjkjkjdjkj -> (pwd) password

// password123 -> hjdsfd,fjd,dfj -> irreversible

//

const login = async (req, res) => {
  const data = req.body;
  const user = await userRepositories.getUser(data);
  console.log('dbuser', user);
  if(!user) {
    res.status(401);
    res.send('Wrong email or password');
  } else {
    //compare user password with already existing password in db
    const response = await crypt.comparePasswords(data.password, user.password);
    if (response) {
      //ok
      res.status(200);
      // res.send('Login sussesfull');
   const token = auth.generateToken({role: user.role, email: user.email});

      res.json({
        firstName: user.firstName,
        lastName : user.lastName,
        email: user.email,
        token : token
      });
    } else {
      res.status(401);
      res.send('Wrong username or password');
    }
  }
};


module.exports = {
                    post ,
                   login
};