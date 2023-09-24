const Sib = require('sib-api-v3-sdk') 
require('dotenv').config();
 

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
      await  tranEmailApi.sendTransacEmail({
         sender,
         to: receivers,
         subject: 'forget fassword',
         textContent: 'hello',
      }).then((result)=>{
         console.log("success", result);
     })
    
     res.status(201).json({
         success: true,
         message: 'Email sent successfully',
         
       });

    }catch (err ) {
     
      console.log("get error ======> ",err)
      res.status(500).json({ error: 'Failed to add user'} );
    }

}
