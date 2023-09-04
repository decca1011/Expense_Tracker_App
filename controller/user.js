const User = require('../models/userData');

exports.add_User = (req, res, next) => {
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;
  const mobile = req.body.mobile;

  User.create({
    username: username,
    email: email,
    password: password,
    mobile: mobile,
  })
    .then((result) => {
      console.log(req.body, "hiii");
      res.status(201).json(result);
    })
    .catch((err) => {
      
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
    });
};

exports.get_User = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  // Find a user with the provided email and password
  User.findOne({
    where: {
      email: email,
    },
  })
    .then((user) => {
      if(user)
      {
        if (user.password=== password) {
          // User with matching credentials found, you can consider it a successful sign-in
          res.status(200).json({ success: true, message: 'User login sucessful' });
        } else {
          // No user with matching credentials found, sign-in failed
          res.status(401).json({ success: false, message: 'User not authorized)' });
        }
      }
      else {
        res.status(401).json({ success: false, message: 'User not found)' });
      }
    
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ success: false, message: 'Server error' });
    });
};
