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
  console.log('hello');
};
