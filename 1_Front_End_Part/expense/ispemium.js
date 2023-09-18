document.getElementById('razor').onclick = async function (e) {
   e.preventDefault();
 
   const token = localStorage.getItem('token');
   const customAuthorizationHeader = `MyAuthHeader ${token}`;
 
   const response = await axios.get('http://localhost:3000/purchase/premium', {
     headers: { "Authorization": customAuthorizationHeader }
   });
 
   var options = {
     "key": response.data.key_id,
     "order_id": response.data.order_id,
     "handler": async function (response) {
      console.log(response)
       
       await axios.post('http://localhost:3000/purchase/updatetranscationstatus', {
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
 
     await axios.post('http://localhost:3000/purchase/updatetranscationstatus', {
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
 