function signIn(event) {
  event.preventDefault()
  // Get the values from the form
  const email = document.getElementById("existingEmail").value;
  const password = document.getElementById("existingPassword").value;

  // Create an object with the user's email and password
  const userData = {
    email: email,
    password: password
  };
  localStorage.clear()
  // Make a POST request to your backend for sign-in
  axios.post('http://localhost:3000/post/signin', userData)
    .then((response) => {
      // Check the response from the backend
      if (response.data.success) {
        // Authentication successful, you can redirect or perform other actions
        alert("login- successful")
        console.log('Sign-in successful');
              // Save the token in local storage
    localStorage.setItem('token', response.data.token);
    
      // Access the response message and token
      const responseMessage = response.data.message;
      const token = response.data.token;

      // Use the message and token as needed
      console.log('Message:', responseMessage);
      console.log('Token:', token);

                // Use a relative path to your HTML file
              window.location.href = '../expense/expense.html';
 
      } 
      else 
      {
        // Authentication failed, handle the error here
       
        console.log('Sign-in failed');
      }
    })
    .catch((err) => {
      // Handle other errors here
      alert("login- un-successful")
      console.error('Sign-in error:', err);
    });
}


function signUp(event) {
  // Add your sign-up logic here
    event.preventDefault();
  
    // Get the values from the form
    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const mobile = document.getElementById("mobile").value;
  
    // Create an object with the user data
    const userData = {
      username: username,
      email: email,
      password: password,
      mobile: mobile
    };
  
    // Make a POST request using Axios to send the userData object to your backend
    axios.post('http://localhost:3000/post/Data', userData)
      .then((result) => {
        alert(`User Create Succesfuly ====>    NOW SIGN_IN`)
        console.log('POST request successful');
        console.log('Response:', result.data);
        window.location.reload()
      })
      .catch((err) => {
        // Handle other errors here
        if (err.response && err.response.data) {
          const errorMessage = err.response.data.error;
          if (errorMessage === 'Email already exists') {
            alert('User with this email already exists. Please use a different email.');
          } else if (errorMessage === 'Mobile already exists') {
            alert('User with this mobile number already exists. Please use a different mobile number.');
          }
        } else {
          // Handle other errors here
        }
      });
  }
  
  // const get = () => {
  //   axios.get('http://localhost:3000/get/Data')
  //     .then((response) => {
  //       console.log('GET request successful');
  //       console.log('Response:', response.data);

  //     })
  //     .catch((err) => {
  //       console.error('GET request error:', err);
  //       // Handle errors here
  //     });
  // }
  