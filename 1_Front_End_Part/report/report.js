 
async function ShowReport(event) {
  event.preventDefault();

  // Get the selected start and end dates
  const startDate = new Date(document.getElementById('start_date').value);
  const endDate = new Date(document.getElementById('end_date').value);

  // Get the error message element
  const dateError = document.getElementById('date_error');

  // Validate the dates.
  if (startDate == 'Invalid Date' || endDate == 'Invalid Date') {
    dateError.textContent = 'Please select a start and end date.';
    return; // Stop further processing
  }

  if (!startDate || !endDate) {
    dateError.textContent = 'Please select a start and end date.';
    return; // Stop further processing
  }

  // Check if the end date is greater than or equal to the start date
  if (startDate > endDate) {
    dateError.textContent = 'End date must be greater than or equal to start date.';
    return; // Stop further processing
  }

  // Clear any previous error message
  dateError.textContent = '';
myObj = {
  startDate:startDate,
  endDate: endDate
}
 document.getElementById('allReport').style.display = 'block';
 document.getElementById('download').style.display = 'block';

   
  const token = localStorage.getItem('token');
 

  if (!token) {
    // Handle the case where the token is missing or not authenticated
    console.error('User is not authenticated.');
    return;
  }

  if (token) {
    // If the token exists in localStorage, include it in the request headers
    const AuthorizationHeader = `MyAuthHeader ${token}`;
    storeDatesInLocalStorage(startDate, endDate)
    // Send a POST request to add the expense
    try {
      await axios.post('http://localhost:3000/get/report', myObj, {
        headers: { Authorization: AuthorizationHeader },
      }).then ((response) => {
        console.log("Response", response.data );
        const expenseData = response.data.expenseData;
        const ispremium = response.data.ispremium;
        console.log(expenseData);
        console.log(ispremium);
        get_Report_Table(expenseData, ispremium);
       
      })
      document.getElementById('allReport').style.display = 'block';
      document.getElementById('download').style.display = 'block';
      // Handle success
 
    } catch (err) {
      console.log(err)
    }
  }
}

async function get_Report_Table (response, ispremium) {
   try {
     const Report_Data = response; // Assuming the response contains an array of user objects
     console.log(Report_Data)
     localStorage.setItem('expenseData', JSON.stringify(Report_Data));  // Store the fetched data in local storage
   console.log(ispremium)
     var w = document.getElementById('report');
     w.innerHTML = ''; // Clear the list before populating
     Report_Data.forEach((report_data) => {
       const x = create_Report_Table(report_data);
       w.appendChild(x);
   })
 } catch (error) {
     console.log(error);
   }
 }
 

 function  create_Report_Table (response) {
    const description = response.des ;
   const category =  response.category;
   const income =  response.Income;
   const expense =  response.Amount;

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

   return tr
 
 
 }  

 async function download(event) {
  event.preventDefault();
  const token = localStorage.getItem('token'); // Retrieve the token from localStorage
  if (token) {
    // If the token exists in localStorage, include it in the request headers Set the custom authorization header
  const customAuthorizationHeader = `MyAuthHeader ${token}`
    console.log(token)
    axios
      .get('http://localhost:3000/get/expense/download', {
        headers: { Authorization: customAuthorizationHeader} // Include the token in the headers
      })
      .then((response) => {
      
          if(response.status ===200){
            var a = document.createElement('a');
            a.href = response.data.fileURL;
            a.download = 'myexpenses.csv'
            a.click()
            createListofDownload(a.href)
          }
      
          else {
            throw new Error(response.data.message)
          }
     
      })
      .catch((err) => console.log(`sssss` ,err));
  } else {
        // Handle the case where the token is not found in localStorage
    console.log('Token not found in localStorage');
  }
 
 }


window.addEventListener('DOMContentLoaded', () => {
const token = localStorage.getItem('token'); 
if (token) {
 const customAuthorizationHeader = `MyAuthHeader ${token}`
 axios.get('http://localhost:3000/get/expense/downloadlink', {headers: { Authorization: customAuthorizationHeader} })
.then((response ) => {
console.log(response.data.Link_Data)
showResponse(response)
})
.catch((err) => console.log(err));
} else {
// Handle the case where the token is not found in localStorage
console.log('Token not found in localStorage');
}
});


function showResponse(response) {
  const responseData = response.data.Link_Data;

  const myList = document.getElementById('myList'); // Get the ordered list element by its ID

  for (const link of responseData) {
    const x = document.createElement('LI'); // Create a new list item element
    const a = document.createElement('A'); // Create a new anchor element

    a.href = link.downloadLink;
    a.textContent = link.downloadLink;
    a.target = '_blank'; // Open the link in a new tab

    x.appendChild(a); // Append the anchor element to the list item element
    myList.appendChild(x); // Append the list item element to the ordered list element
  }
}