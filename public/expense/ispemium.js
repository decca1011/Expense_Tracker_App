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
 
   const response = await axios.get('http://3.87.75.42:3000/purchase/premium', {
     headers: { "Authorization": customAuthorizationHeader }
   });
 
   var options = {
     "key": response.data.key_id,
     "order_id": response.data.order_id,
     "handler": async function (response) {
      console.log(response)
       
       await axios.post('http://3.87.75.42:3000/purchase/updatetranscationstatus', {
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
 
     await axios.post('http://3.87.75.42:3000/purchase/updatetranscationstatus', {
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

  const response = await axios.get('http://3.87.75.42:3000/getYour/dashboard/', {
    headers: { "Authorization": customAuthorizationHeader }
  })
    // Store the dashboard data in localStorage
    localStorage.setItem('dashboardData', JSON.stringify(response.data));
  console.log(response.data)
getDashBoard(response.data)
  
 }

 