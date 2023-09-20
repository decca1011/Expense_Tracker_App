const User = require("../models/userData");

const get_Dashboard = async (req,res) =>{
try{

   const All_user = await User.findAll();
   
   const User_Data = await All_user.map(user => ({
      id: user.id,
      user: user.username,
      total: user.total,
     
      // Add other properties you want to include
    }));
    //console.log(User_Data)
     
    //Sort the array in descending order based on the 'total' property
   const User_Data_Sorting = await User_Data.sort((a, b) => parseInt(b.total) - parseInt(a.total));
    
    // Loop through the sorted array and print the data
    var response = []
     for (const user of User_Data_Sorting) {
     // console.log( user);
     response.push(user)
    }
console.log('userdata======>',response);

return res.status(202).json(response);
} catch (err) {
   console.log(err)
}
}

module.exports = get_Dashboard

 