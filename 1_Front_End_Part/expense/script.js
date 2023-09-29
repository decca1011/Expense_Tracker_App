async function test(event) {
  event.preventDefault();
  // Retrieve data from the form
  const Amount = document.getElementById("expenseAmount").value;
  const Income = document.getElementById("incomeAmount").value;
  const des = document.getElementById("descript").value;
  const category = document.getElementById("Category").value;

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
  const myObj = { Amount: Amount ,Income:Income,  des: des , category: category };  
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
}

  
 async function getOnscreen(response,ispremium) {
 try {
  const premiumButton = document.getElementById('razor');
  if (ispremium ) {
    // If the user is premium, hide the button
    premiumButton.style.display = 'none';
    document.getElementById('nowP').style.display = 'block';
    document.getElementById('nowP').textContent = 'You are a premium user';
    document.getElementById('dashboard').style.display = 'block';

  } else {
    // If the user is not premium, show the button
    premiumButton.style.display = 'block';
    document.getElementById('nowP').textContent = ''; // Clear the message
    document.getElementById('dashboard').style.display = 'none';
  }
   const expenseList = response; // Assuming the response contains an array of user objects
   console.log(expenseList)
   localStorage.setItem('expenseData', JSON.stringify(expenseList));  // Store the fetched data in local storage
 
   var w = document.getElementById('myList');
   w.innerHTML = ''; // Clear the list before populating
   expenseList.forEach((expense) => {
     const x = createListItemElement(expense);
     w.appendChild(x);
   });
 } catch (error) {
   console.error(error);
 }
 }

window.addEventListener('DOMContentLoaded', () => {
  const token = localStorage.getItem('token'); // Retrieve the token from localStorage
  if (token) {
    // If the token exists in localStorage, include it in the request headers Set the custom authorization header
  const customAuthorizationHeader = `MyAuthHeader ${token}`
    console.log(token)
    axios
      .get('http://localhost:3000/get/expense', {
        headers: { Authorization: customAuthorizationHeader} // Include the token in the headers
      })
      .then((response ) => {
        const expenseData = response.data.expenseData
        const ispremium = response.data.ispremium
        console.log(expenseData);
        console.log(ispremium)
       getOnscreen(expenseData ,ispremium);
      })
      .catch((err) => console.log(`sssss` ,err));
  } else {
        // Handle the case where the token is not found in localStorage
    console.log('Token not found in localStorage');
  }
});


 async function deleteExpense(expenseId, listItemElement, userListElement) {
 try {
   console.log('User deleted:',  expenseId);
   await axios.delete(`http://localhost:3000/user/${expenseId}`);
 
   // Remove the deleted list item from the UI
   listItemElement.remove();
 
   // Fetch and update the user list again
   return window.location.reload()
   //await getOnscreen();
 } catch (error) {
   console.error('Error deleting user:', error, expenseId);
 }
 }
 
 async function editExpense(expense, listItemElement, userListElement) {
 const updatedAmount = prompt('Enter updated Amount:', expense.Amount);
 const updateddes = prompt('Enter updated description:',expense.des);
 const updatedcategory = prompt('Enter updated category:', expense.category);
 
 if (updatedAmount !== null && updateddes !== null && updatedcategory !== null) {
   const updatedUserData = {
     expenseId: expense.id,
     Amount: updatedAmount,
     des: updateddes,
     category: updatedcategory,
   };
 
   try {
     const response = await axios.post('http://localhost:3000/user/edit', updatedUserData);
     console.log('User updated:', response.data);
 
     // Update the user in the UI
     const updatedUser = response.data;
     const updatedElement = createListItemElement(updatedUser);
     listItemElement.replaceWith(updatedElement);
 
   } catch (error) {
     console.error('Error updating user:', error);
   }
 }
 }
 
 
 function createListItemElement(expense) {
 const x = document.createElement('LI');
 const getElement =
   'Amount => ' +
   expense.Amount +
   ',   ' +
   'Description => ' +
   expense.des +
   ' ,    ' +
   '  Category => ' +
   expense.category;
 const t = document.createTextNode(getElement);
 x.appendChild(t);
  
 const deleteButton = document.createElement('input');
 deleteButton.type = 'button';
 deleteButton.value = 'Delete';
 deleteButton.className = 'delete-button';
 deleteButton.onclick = () => {
   // Call a function to delete the user data from the server and then update the UI
   deleteExpense(expense.id, x);
 };
 x.appendChild(deleteButton);
 
 const editButton = document.createElement('input');
 editButton.type = 'button';
 editButton.value = 'Edit';
 editButton.className = 'edit-button';
 editButton.onclick = () => {
   // Call a function to edit the user data and update the UI
   editExpense(expense, x);
 };
 x.appendChild(editButton);
 
 return x;
 }
 
 