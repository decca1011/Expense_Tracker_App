function post(event) {
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
        console.log('POST request successful');
        console.log('Response:', result.data);
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
  
  const get = () => {
    axios.get('http://localhost:3000/get/Data')
      .then((response) => {
        console.log('GET request successful');
        console.log('Response:', response.data);

      })
      .catch((err) => {
        console.error('GET request error:', err);
        // Handle errors here
      });
  }
  