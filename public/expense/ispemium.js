// Check if the dashboard data is already in localStorage
const dashboardData = JSON.parse(localStorage.getItem('dashboardData'));

// Function to populate the dashboard data
function getDashBoard(data) {
  const featureList = document.getElementById('feature');
  featureList.innerHTML = '';

  data.forEach((item) => {
    const listItem = document.createElement('li');
    listItem.textContent = `${item.username} - ${item.total_cost}`;
    featureList.appendChild(listItem);
  });

  // Show the dashboard title
  const dashboardTitle = document.getElementById('dashboard_list');
  dashboardTitle.style.display = 'block';
}

if (dashboardData) {
  // If data is available in localStorage, populate the dashboard
  getDashBoard(dashboardData);
}



document.getElementById('razor').onclick = async function (e) {
   e.preventDefault();
 
   const token = localStorage.getItem('token');
   const customAuthorizationHeader = `MyAuthHeader ${token}`;
 
   const response = await axios.get('http:// 44.198.130.123:3000/purchase/premium', {
     headers: { "Authorization": customAuthorizationHeader }
   });
 
   var options = {
     "key": response.data.key_id,
     "order_id": response.data.order_id,
     "handler": async function (response) {
      console.log(response)
       
       await axios.post('http:// 44.198.130.123:3000/purchase/updatetranscationstatus', {
         order_id: options.order_id, // Use the correct order_id here
         paymentId: response.razorpay_payment_id, status: 'SUCESS'
       }, {
         headers: { "Authorization": customAuthorizationHeader }
       });
       alert('Payment Done');
       window.location.reload();
     }
   }
 
   const rzp1 = new Razorpay(options);
   rzp1.open();
 
   rzp1.on('payment.failed', async function (response) {
     //const { order_id, paymentId } = response;
 
     await axios.post('http:// 44.198.130.123:3000/purchase/updatetranscationstatus', {
       order_id: options.order_id, // Use the correct order_id here
       paymentId: response.razorpay_payment_id,
       status: 'FAILED'
     }, {
       headers: { "Authorization": customAuthorizationHeader }
     });
 
     console.log(response, "Payment failed or was canceled.");
     alert('Payment failed or was canceled. Please try again.');
   });
 }
 
 document.getElementById('dashboard').onclick = async function (e){
  e.preventDefault();
 
 
  const token = localStorage.getItem('token');
  const customAuthorizationHeader = `MyAuthHeader ${token}`;

  const response = await axios.get('http:// 44.198.130.123:3000/getYour/dashboard/', {
    headers: { "Authorization": customAuthorizationHeader }
  })
    // Store the dashboard data in localStorage
    localStorage.setItem('dashboardData', JSON.stringify(response.data));
  console.log(response.data)
getDashBoard(response.data)
  
 }

 




//  # SEQUELIZE
// DATABASE_TABLE = 'ExpenseTracker'
// DATABASE_PASSWORD = 'Sodexo11'
// DATABASE_USER_NAME = 'deepak'
// DATABASE_HOST = 'database-1.cn4nk0djzprl.us-east-1.rds.amazonaws.com'

// #JWT TOKEN RELATED
// JWT_SECRET= 'efwefefefefefe'

// # PAYMENT
// RAZORPAY_KEY_ID ='rzp_test_69EQJHNRZkWzsf'
// RAZORPAY_KEY_SECRET='j1znpzY0eP0dnngnhcsWDoHZ'

// #SEND EMAIL FOR FORGET PASSWORD
// SENGRID_API_KEY = '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'

//  #AMAZON CREDENTIALS FOR DOWNLOAD
// BUCKET_NAME = 'expencetrackingappforyou'
// IAM_USER_KEY = 'AKIAYJ2WARCN4BMPALYB'
// IAM_USER_SECRET = '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'
