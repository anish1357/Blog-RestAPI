const jwt = require("jsonwebtoken");


/**
  * Function to check the jwt token exists or not 
  * If jwt is verified it sets current user id to req object 
  * @param  request object  
  * @param  response object  
  */  
module.exports = (req, res, next) => {
  const authHeader = req.get("Authorization");
  //!If Header does not exist means Not Authenticated
  if (!authHeader) {
    return res.status(401).send("Not Authenticated"); 
  }
  const token = authHeader.split(" ")[1];
  let decodedToken;
  try {
    //*Getting the decoded data
    decodedToken = jwt.verify(token, process.env.JWT_PRIVATE_KEY); 
  } catch (err) {
    console.log(err);
  }
  if (!decodedToken) {
    return res.status(401).send("Not Authenticated");
  }
  //*attaching userId with req
  req.userId = decodedToken.userId; 
  next();
};
