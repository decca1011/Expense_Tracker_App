const bcyrpt = require('bcrypt')

const User = require('../models/userData');

exports.add_User = async (req, res, next) => {
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;
  const mobile = req.body.mobile;
  const saltRounds = 10 ;
 
  try {
   const hash = await  bcyrpt.hash(password, saltRounds)
    
  const user = await User.create({
    username: username,
    email: email,
    password: hash,
    mobile: mobile,
  });
 
  console.log('User registered successfully');
  res.status(201).json(user);
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
      
    

exports.get_User = async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  try {
    const user = await   User.findOne({
      where: {
        email: email,
      },
    })
  
  // Find a user with the provided email and password
      if(user)
      {
         const passwordMatch = await bcyrpt.compare(password , user.password);

         if(passwordMatch){
          res.status(200).json({ success: true, message: 'User login sucessful' });

         }
         else {
          res.status(401).json({ success: false, message: 'User not authorized)' });
         }
        }
      else {
        res.status(401).json({ success: false, message: 'User not found)' });
      }
    
    }
    catch (err) {
      console.error(err);
      res.status(500).json({ success: false, message: 'Server error' });
    }
};
