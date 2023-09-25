const uuid = require('uuid');
const bcrypt = require('bcrypt');
const Sib = require('sib-api-v3-sdk') 
const User = require('../models/userData');
const Forgotpassword = require('../models/forgotpassword');

require('dotenv').config();
 
//const id = '96c81373-6d2b-452f-a65d-6ce77e457e39'

const client = Sib.ApiClient.instance;

const apikey = client.authentications['api-key']

apikey.apiKey = process.env.API_KEY
 
exports.forget_password_send_email = async (req,res)=>{
   const to_person = req.body.email

   const tranEmailApi = new Sib.TransactionalEmailsApi()

   const sender = {
      email: 'deepakpatil101197@gmail.com',
   }
   const receivers = [{ 
     email:  to_person,
    }]

    try{

      const { email } =  req.body;
      const user = await User.findOne({where : { email }});
      console.log(user.id)
      if(user){
          const id = uuid.v4();
     
          user.createForgotpassword({ id , active: true })
              .catch(err => {
                  throw new Error(err)}
                 ) }

      await  tranEmailApi.sendTransacEmail({
         sender,
         to: receivers,
         subject: 'forget fassword',
         textContent: 'hello <a href="http://localhost:3000/password/resetpassword/${id}">Reset password</a>',
         htmlContent: `<a href="http://localhost:3000/password/resetpassword/${id}">Reset password</a>`,
      }).then((result)=>{
         console.log("success", result);
     })
    console.log(res)
     res.status(201).json({
         success: true,
         message: 'Email sent successfully',
         
       });

    }catch (err ) {
     
      console.log("get error ======> ",err)
      res.status(500).json({ error: 'Failed to add user'} );
    }

}

 exports.reset_password_by_id = async (req,res) => {
   try {

      const id =  req.params.id;
      console.log(req.params.id)
      
   }
   catch (err) {
         console.log('err')
   }
   
 }