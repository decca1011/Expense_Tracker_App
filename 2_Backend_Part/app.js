const path = require('path');
const  fs = require('fs')
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

const sequelize = require('./util/database');

const helmet = require('helmet')

const  compression = require(`compression`)

const morgan = require('morgan');

const router = require('./router/user');
const expenseRoutes = require('./router/expense')
const payRoutes = require('./router/purchase')
const dashboard = require('./router/dashboard')
const resetpassword = require('./router/resetpassword')
const report = require('./router/report')

const User = require('./models/userData');
const expense = require('./models/expense');
const Order = require('./models/orders')
const forget_password = require('./models/forgotpassword')
const DownloadReport = require('./models/download');

const accessLogStream = fs.createWriteStream(path.join(__dirname,'acess.log'),{flag: 'a'})

//app.use(helmet());
app.use(compression());
app.use(morgan('combined', {stream: accessLogStream}) );
 
 
require('dotenv').config();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());


// Define your routes for 'post', 'get', and 'delete' here
app.use('/post', router);

// app.use('/post', (req,res)=>{
//     console.log(req.body)
//     res.send("Post request")
// } )


app.use('/called/password',resetpassword);

app.use('/password',resetpassword)
 // API endpoint to insert a new user
 app.use('/post/expense', expenseRoutes);

 // API endpoint to get all users
 app.use('/get/expense', expenseRoutes);
 
 // API endpoint to perform delete and edit task on user data
 app.use('/user', expenseRoutes);
   
app.use('/purchase', payRoutes);

app.use('/getYour', dashboard);

app.use('/get', report);

//  app.use((req,res) => {
//     console.log(`url` , req.url)
//     res.sendFile(path.join(__dirname, 'public/${req.url}'))
//  })

app.use(function(req, res, next) { 
    res.setHeader( 'Content-Security-Policy', "script-src 'self' https://cdnjs.cloudflare.com" ); 
    next(); 
  })
app.use((req, res) => {
    console.log('url', req.url);
    res.sendFile(path.join(__dirname, 'public', req.url));
});

User.hasMany(expense);
expense.belongsTo(User);

User.hasMany(Order);
Order.belongsTo(User);

User.hasMany(forget_password);
forget_password.belongsTo(User);

User.hasMany(DownloadReport);
 DownloadReport.belongsTo(User);


sequelize.sync()
    .then(() => {
        app.listen( process.env.PORT || 3000, () => {
            console.log('Server is running on port 3000');
        });
    })
    .catch(err => console.log(err));


    