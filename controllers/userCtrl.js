const userRepositories = require('../repositories/userRepositories');
const logger = require('../utils/appLogger');
const crypt = require('../utils/crypt');

const post = async (req, res) => {

  try{
        logger.info('Saving  data to db');
        const data = req.body;
        data.createdAt = new Date();
        data.password = await crypt.getHash(data.password);
        await  userRepositories.register(data);
        logger.info('Saved data to db');
         res.status(201);
         res.send();
} catch (e) {
    logger.error(e);
    if(e && e.message.indexOf('duplicate key error')> -1){
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
module.exports = { post };