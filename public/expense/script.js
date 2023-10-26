async function test(event) {
  event.preventDefault();
  // Retrieve data from the form
  const Amount = 0 + document.getElementById("expenseAmount").value;
  const Income = 0 + document.getElementById("incomeAmount").value; 
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
   
  }
  // Create an object with expense data, including the userId
  const myObj = { Amount: Amount ,Income:Income,  des: des , category: category };  
  // Send a POST request to add the expense
  await axios.post('http://34.201.122.170:3000/post/expense', myObj,{
    headers: { Authorization: AuthorizationHeader}})
    .then((response) => {
      console.log(response);
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
   //console.log(expenseList)
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

// window.addEventListener('DOMContentLoaded', () => {
//   const token = localStorage.getItem('token'); // Retrieve the token from localStorage
//   if (token) {
//     // If the token exists in localStorage, include it in the request headers Set the custom authorization header
//   const customAuthorizationHeader = `MyAuthHeader ${token}`
//     console.log(token)
//     axios
//       .get('http://localhost:3000/get/expense', {
//         headers: { Authorization: customAuthorizationHeader} // Include the token in the headers
//       })
//       .then((response ) => {
//         const expenseData = response.data.expenseData
//         const ispremium = response.data.ispremium
//         console.log(expenseData);
//         console.log(ispremium)
//        getOnscreen(expenseData ,ispremium);
//       })
//       .catch((err) => console.log(`sssss` ,err));
//   } else {
//         // Handle the case where the token is not found in localStorage
//     console.log('Token not found in localStorage');
//   }
// });


 async function deleteExpense(expenseId, listItemElement) {
 try {
   console.log('User deleted:',  expenseId);
   await axios.delete(`http://34.201.122.170:3000/user/${expenseId}`);
 
   // Remove the deleted list item from the UI
   listItemElement.remove();
 
   // Fetch and update the user list again
   return window.location.reload()
   //await getOnscreen();
 } catch (error) {
   console.error('Error deleting user:', error, expenseId);
 }
 }
 
 async function editExpense(expense, listItemElement) {
 const updatedAmount = prompt('Enter updated Amount:', expense.Amount);
 const updatedIncome = prompt('Enter updated Amount:', expense.Income);
 const updateddes = prompt('Enter updated description:',expense.des);
 const updatedcategory = prompt('Enter updated category:', expense.category);
 
 if (updatedAmount !== null && updateddes !== null && updatedcategory !== null) {
   const updatedUserData = {
     expenseId: expense.id,
     Amount: updatedAmount,
     Incoe: updatedIncome,
     des: updateddes,
     category: updatedcategory,
   };
 
   try {
     const response = await axios.post('http://34.201.122.170:3000/user/edit', updatedUserData);
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
 const getElement =  'Amount => '+expense.Amount +',   ' + 'Income => '+ expense.Income+',   '+ 'Description => ' + expense.des +  ' ,    ' + '  Category => ' +  expense.category;

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
 
 

 // Define pagination variables
let currentPage = 1; // Current page
let itemsPerPage = localStorage.getItem('selectedPerPage') || 5 ; // Number of items to display per page
 
 // Function to handle the "Choose Expense Rows Per Page" select change event
document.getElementById('perPage').addEventListener('change', (event) => {
  // Get the selected value
  const selectedValue = event.target.value;
 
  // Store the selected value in local storage
  localStorage.setItem('selectedPerPage', selectedValue);
 
  itemsPerPage = parseInt(selectedValue)
  currentPage = 1;
 
 
  fetchDownloadLinks(currentPage,itemsPerPage);

});


// Function to fetch download links based on the page
async function fetchDownloadLinks(page,itemsPerPage) {
  const token = localStorage.getItem('token');
  if (token) {
    const customAuthorizationHeader = `MyAuthHeader ${token}`;
    try {
      const response = await axios.get(`http://34.201.122.170:3000/get/expense?page=${page}&perPage=${itemsPerPage}`, {
        headers: { Authorization: customAuthorizationHeader },
      });
     
    //  console.log(response.data.download)
           const expenseData = response.data.expenseData
              const ispremium = response.data.ispremium
              //console.log(expenseData);
              //console.log(ispremium)
             getOnscreen(expenseData ,ispremium);
    } catch (err) {
      console.log(err);
    }
  } else {
    console.log('Token not found in localStorage');
  }
}

// Event listener for "Next Page" button
document.getElementById('nextPageButton').addEventListener('click', () => {
  currentPage++;
  fetchDownloadLinks(currentPage,itemsPerPage);
});

// Event listener for "Previous Page" button
document.getElementById('prevPageButton').addEventListener('click', () => {
  if (currentPage > 1) {
    currentPage--;
    fetchDownloadLinks(currentPage,itemsPerPage);
  }
});

// Initial fetch on page load
fetchDownloadLinks(currentPage,itemsPerPage);
 