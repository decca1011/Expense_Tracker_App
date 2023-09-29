
 
async function populateTable() {
   try {
     const description = document.getElementById('Des').value;
     const category = document.getElementById('Cat').value;
     const income = document.getElementById('In').value;
     const expense = document.getElementById('Ex').value;
   // Get the user's ID from local storage
   const token = localStorage.getItem('token');

   if (!token) {
     // Handle the case where the token is missing or not authenticated
     console.error('User is not authenticated.');
     return;
   }
 
   if (token) {
     // If the token exists in localStorage, include it in the request headers Set the custom authorization header
   var AuthorizationHeader = `MyAuthHeader ${token}`
     console.log(AuthorizationHeader)
   }
   // Create an object with expense data, including the userId
   const myObj = {
      des: description,
      category: category,
      Income: income,
      Amount: expense,
    };
    
   // Send a POST request to add the expense
   await axios.post('http://localhost:3000/post/expense', myObj,{
     headers: { Authorization: AuthorizationHeader}})
     .then((response) => {
       console.log(response.data);
     // return window.location.reload
       //getOnscreen(response.data);
     }).then(window.location.reload())
     .catch((err) => {
       console.log(err);
     });
   } catch (error) {
     console.error(error);
   }
 }

window.addEventListener('DOMContentLoaded', () => {
   const token = localStorage.getItem('token'); // Retrieve the token from localStorage
   if (token) {
     const customAuthorizationHeader = `MyAuthHeader ${token}`;
     console.log(token);
     axios
       .get('http://localhost:3000/get/expense', {
         headers: { Authorization: customAuthorizationHeader }
       })
       .then((response) => {
         const expenseData = response.data.expenseData;
         const ispremium = response.data.ispremium;
         console.log(expenseData);
         console.log(ispremium);
         get_Report_Table(expenseData, ispremium);
       })
       .catch((err) => console.log(`Error: `, err));
   } else {
     console.log('Token not found in localStorage');
   }
 });
 
async function get_Report_Table (response) {
   try {
     const Report_Data = response; // Assuming the response contains an array of user objects
     console.log(Report_Data)
     localStorage.setItem('expenseData', JSON.stringify(Report_Data));  // Store the fetched data in local storage
   
     var w = document.getElementById('report');
     w.innerHTML = ''; // Clear the list before populating
     expenseList.forEach((Report_Data) => {
       const x = create_Report_Table(Report_Data);
       w.appendChild(x);
   })
 } catch (error) {
     console.error(error);
   }
 }
 

 function  create_Report_Table (response) {

   const description = response.description ;
   const category =  response.category;
   const income =  response.income;
   const expense =  response.expense;

   const tr = document.createElement('tr');
     
   const td0 = tr.appendChild(document.createElement('td'));
   const td1 = tr.appendChild(document.createElement('td'));
   const td2 = tr.appendChild(document.createElement('td'));
   const td3 = tr.appendChild(document.createElement('td'));
   const td4 = tr.appendChild(document.createElement('td'));
    
   td0.innerHTML = "date"
   td1.innerHTML = description;
   td2.innerHTML = category;
   td3.innerHTML = income;
   td4.innerHTML = expense;

   //document.getElementById('report').appendChild(tr);
 }  
