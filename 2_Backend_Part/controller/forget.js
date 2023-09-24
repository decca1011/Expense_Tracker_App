var Brevo = require('@getbrevo/brevo');
require('dotenv').config();
var defaultClient = Brevo.ApiClient.instance;

// Configure API key authorization: api-key
var apiKey = defaultClient.authentications['api-key'];
apiKey.apiKey =  process.env.API_KEY 
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//apiKey.apiKeyPrefix = 'Token';

// Configure API key authorization: partner-key
var partnerKey = defaultClient.authentications['partner-key'];
partnerKey.apiKey = process.env.API_KEY;
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//partnerKey.apiKeyPrefix = 'Token';

var apiInstance = new Brevo.TransactionalEmailsApi();

var sendSmtpEmail = new Brevo.SendSmtpEmail({

   
      "sender": "deepakpatil101197@gmail.com",
      "to": ["errdeepakpatil505@gmail.com"],
      "subject": "My email subject",
      "body": "My email body"

}); // SendSmtpEmail | Values to send a transactional email

apiInstance.sendTransacEmail(sendSmtpEmail).then(function(data) {
  console.log('API called successfully. Returned data: ' + data);
}, function(error) {
  console.error(error);
});





