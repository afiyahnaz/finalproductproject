const bcrypt = require('bcrypt');

const getHash = (password) => {
    return bcrypt.hash(password, 2);
                    //password is called plaintext
                    //2 is called saltingrounds.....more salting more secure
};

module.exports = { getHash };