const jwt = require('jsonwebtoken');
require('dotenv').config()

const genJwtToken = (user_id) => {
    const user = {
        user: user_id
    }
    return jwt.sign(user, process.env.jwtprivateKey, {expiresIn: '1hr'});
}

module.exports = genJwtToken;