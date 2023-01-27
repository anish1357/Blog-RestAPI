const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const authHeader = req.get('Authorization');
    if (!authHeader) {
        return res.status(401).send('Not Authenticated');//If Header does not exist means Not auhenticated
    }
    const token = authHeader.split(' ')[1];
    let decodedToken;
    try {
        decodedToken = jwt.verify(token, process.env.JWT_PRIVATE_KEY);//Getting the decoded data
    } catch (err) {
        console.log(err);
    }
    if (!decodedToken) {
        return res.status(401).send('Not Authenticated');
    }
    req.userId = decodedToken.userId; //attaching userId with req
    //req.username = decodedToken.username;//attaching username with req
    next();
};