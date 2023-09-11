const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const sequelize = require('./util/database');
const router = require('./router/user');
const expenseRoutes = require('./router/expense')
const User = require('./models/userData');
const expense = require('./models/expense');
require('dotenv').config();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());

// Define your routes for 'post', 'get', and 'delete' here
app.use('/post', router);
 // API endpoint to insert a new user
 app.use('/post/expense', expenseRoutes);

 // API endpoint to get all users
 app.use('/get/expense', expenseRoutes);
 
 // API endpoint to perform delete and edit task on user data
 app.use('/user', expenseRoutes);
   

app.get('/', (req, res,) => {
    res.send('Welcome to the Expense Tracker App');
});

User.hasMany(expense);
expense.belongsTo(User);


sequelize.sync()
    .then(() => {
        app.listen(3000, () => {
            console.log('Server is running on port 3000');
        });
    })
    .catch(err => console.log(err));
