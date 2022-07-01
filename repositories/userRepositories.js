const User = require('../models/userModel');

const  register = (data) => {
       const user = new User(data);
       return user.save();

};

// username & password 
//fetch db by email
//dbPassword is in hash form
// so convert plain password ==== hashpassword then compare

const getUser = (data) => {
       return User.findOne({ email: data.email}, {});
             
       };        

module.exports = { 
                   register,
                    getUser
                };