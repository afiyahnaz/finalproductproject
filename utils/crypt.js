const bcrypt = require('bcrypt');

const getHash = (password) => {
    return bcrypt.hash(password, 2); //2 is salting rounds
                   
};
     //password is called plaintex 
     //2 is called saltingrounds.....more salting more secure

const comparePasswords = (plainText, hash) => {
    return bcrypt.compare(plainText, hash);
};                 


module.exports = { getHash ,  comparePasswords};