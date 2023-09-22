const jwt = require('jsonwebtoken');
const User = require('../models/userData'); // Corrected the path to the model
const JWT_SECRET = process.env.JWT_SECRET; 


const authenticate = async (req, res, next) => {
  try {
    console.log(req.header('Authorization'))
    const customAuthorizationHeader = req.header('Authorization');

    if (!customAuthorizationHeader || !customAuthorizationHeader.startsWith('MyAuthHeader ')) {
      return res.status(401).json({ message: 'Authentication failed: Token not provided' });
    }

    // Extract the token part from the custom header format
    const token = customAuthorizationHeader.split(' ')[1];
console.log(token,"dsdsdsdsdsd")
    // Verify and decode the token as before
     const user = jwt.verify(token, JWT_SECRET); // Replace 'secretkey' with your actual secret key
    // console.log(user.userId);

    // Ensure user is found in the database
    const foundUser = await User.findByPk(user.userId);
   // console.log("foundUser:", foundUser); // Add this line to log the foundUser object

    if (!foundUser) {
      return res.status(401).json({ message: 'Authentication failed: User not found' });
    }

    
   req.user = foundUser;
 console.log("mmmmmmmmmmmm")
  next();
  } catch (error) {
    console.error(error);
    return res.status(401).json({ success: false });
  }
};

module.exports = authenticate;