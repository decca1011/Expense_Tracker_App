const jwt = require('jsonwebtoken');
const dotenv = require('dotenv'); // Import the dotenv library
dotenv.config(); // Load environment variables from .env file
const JWT_SECRET = process.env.JWT_SECRET; //
const bcyrpt = require('bcrypt')
const User = require('../models/userData');
const sequelize = require('../util/database'); 

function generatTokaen(id, name, email) {
  console.log(email);
  return jwt.sign({ userId: id, name: name, email: email }, JWT_SECRET);
}

exports.add_User = async (req, res, next) => {
  // Start a transaction
  const t = await sequelize.transaction();

  try {
    // Get the user data from the request body
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    const mobile = req.body.mobile;
    const saltRounds = 10;

    // Hash the password
    const hash = await bcyrpt.hash(password, saltRounds);

    // Create the user in the database
    const user = await User.create(
      {
        username,
        email,
        password: hash,
        mobile,
        isUserPremeuim: false,
        total: 0,
      },
      { transaction: t }
    );

    // Generate a token for the user
    const token = generatTokaen(user.id, user.username, user.email);

    // Commit the transaction
    await t.commit();

    // Send the response
    res.status(201).json({
      success: true,
      message: 'User is registered successfully',
      token,
    });
  } catch (err) {
    // Roll back the transaction if there is an error
    await t.rollback();

    // Log the error
    console.error('Error adding user:', err);

    // Send an error response
    res.status(500).json({ error: 'Failed to add user' });
  }
};

      
exports.get_User = async (req, res) => {   
 const {  email, password} = req.body;
 console.log(password)
 
  try {
    const user = await User.findOne({where: {email: email} })
       // Find a user with the provided email and password
       if(user)
       {
          const passwordMatch = await bcyrpt.compare(password , user.password);
 console.log(password, passwordMatch)
          if(passwordMatch){
 
      
      const token = generatTokaen(user.id,user.username, user.email)
 
           res.status(200).json({ 
             success: true, message: 
             'User login sucessful' , token: token});
             
 
          }
    
 
         else {
          console.log("user not authorized)",)
          res.status(401).json({ success: false, message: 'User not authorized)' });
         }
        }
      else {
        console.log("user not found)",user)
        res.status(401).json({ success: false, message: 'User not found)' });
      }
    
    }
    catch (err) {
      console.error(err);
      res.status(500).json({ success: false, message: 'Server error' });
    }
};
