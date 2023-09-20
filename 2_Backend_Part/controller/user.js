const jwt = require('jsonwebtoken');
const dotenv = require('dotenv'); // Import the dotenv library
dotenv.config(); // Load environment variables from .env file
const JWT_SECRET = process.env.JWT_SECRET; //
const bcyrpt = require('bcrypt')
const User = require('../models/userData');

 function generatTokaen(id,name, email){
  console.log(email)
  return jwt.sign({userId: id ,name: name, email: email},JWT_SECRET)

 }

exports.add_User = async (req, res, next) => {
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;
  const mobile = req.body.mobile;
  const saltRounds = 10 ;
  const total = 0 ;
 
  try {
   const hash = await  bcyrpt.hash(password, saltRounds)
    
  const user = await User.create({
    username: username,
    email: email,
    password: hash,
    mobile: mobile,
    isUserPremeuim: false,
    total: total
  });
 
  console.log('User registered successfully');
  const token = generatTokaen(user.id, user.username,user.email);
  res.status(201).json({
    success: true,
    message: 'User is registered successfully',
    token: token,
    
  });
    }
    catch(err){
      if (err.name === 'SequelizeUniqueConstraintError') 
      {
        if (err.fields.email) {
                     return res.status(409).json({ error: 'Email already exists' });
        } 
        else if (err.fields.mobile) {
                  return res.status(409).json({ error: 'Mobile already exists' });
        }
      }
     console.error(err);
      res.status(500).json({ error: 'Server error' });
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
