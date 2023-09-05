function test(event) {
   event.preventDefault();
   //retrivewing data
   var uid = document.getElementById("expenseAmount").value;
   var pwd = document.getElementById("descript").value;
   var eml = document.getElementById("Category").value;

 
   alert(uid + pwd + eml);
  
   var myObj = {
   Amount: uid,
     des: pwd,
   category: eml,
   };
   axios.post('http://localhost:3000/post/expense', myObj)
   .then((response) => {
     console.log(response);
     getOnscreen();
   })
   .catch((err) => {
     console.log(err);
   });
 }
  
 async function getOnscreen() {
 try {
   const response = await axios.get('http://localhost:3000/get/expense'); // Fetch data from the server
 
   const expenseList = response.data; // Assuming the response contains an array of user objects
 
   
     // Store the fetched data in local storage
     localStorage.setItem('expenseData', JSON.stringify(expenseList));
 
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
 window.addEventListener('load', () => {
   // const storedData = localStorage.getItem('expenseData');
   // if (storedData) {
   //   const expenseList = JSON.parse(storedData);
   //   const w = document.getElementById('myList');
   //   w.innerHTML = '';
 
   //   expenseList.forEach((expense) => {
   //     const x = createListItemElement(expense);
   //     w.appendChild(x);
   //   });
   // }
   getOnscreen()
 });
 async function deleteExpense(expenseId, listItemElement, userListElement) {
 try {
   console.log('User deleted:',  expenseId);
   await axios.delete(`http://localhost:3000/user/${expenseId}`);
 
   // Remove the deleted list item from the UI
   listItemElement.remove();
 
   // Fetch and update the user list again
   await getOnscreen();
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
 
 