const jwt = require('jsonwebtoken');
const User = require('../models/userData'); // Corrected the path to the model

const authenticate = async (req, res, next) => {
  try {
    const customAuthorizationHeader = req.header('Authorization');

    if (!customAuthorizationHeader || !customAuthorizationHeader.startsWith('MyAuthHeader ')) {
      return res.status(401).json({ message: 'Authentication failed: Token not provided' });
    }

    // Extract the token part from the custom header format
    const token = customAuthorizationHeader.split(' ')[1];
console.log(token)
    // Verify and decode the token as before
     const user = jwt.verify(token, 'secretkey'); // Replace 'secretkey' with your actual secret key
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