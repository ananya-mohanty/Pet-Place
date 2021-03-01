const config = require('config');
const jwt = require('jsonwebtoken');

//middleware function
function auth(req, res, next) {
    const token = req.header('x-auth-token');

    //check for token
    if(!token) {
        //unauthorized
        res.status(401).json({msg: 'No token, authorization denied'});
    }

    try {
        //verify token
        const decoded = jwt.verify(token, config.get('jwtSecret'));

        //add user from payload
        req.user = decoded;
        next();

    } catch(e) {
        res.status(400).json({msg: 'Token not valid'});
    }
    
}

module.exports = auth;