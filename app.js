const prompt = require('prompt-sync')();
const dotenv = require('dotenv');

dotenv.config();

const mongoose = require('mongoose');
const customer = require('./models/customer');

const connect = async () => {
    // Connect to MongoDB using the MONGODB_URI specified in our .env file.
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');
    
    // Call the runQueries function, which will eventually hold functions to work
    // with data in our db.
    await runQueries()
  
    // Disconnect our app from MongoDB after our queries run.
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  
    // Close our app, bringing us back to the command line.
    process.exit();
};

const runQueries = async () => {

    console.log(`Hello friend, what trouble are you looking to get into today?`);
    let action = parseInt(prompt('1-Create, 2-View, 3-Update, 4-Delete, 5-Quit'));

    while (action !== 5) {

        switch(action) {
            case 1:
                await createCustomer();
                break;
            case 2:
                await viewCustomers();
                break;
            case 3:
                await updateCustomer();
                break;
            case 4:
                await deleteCustomer();
                break;
            default:
                console.log(`That wasn't a valid option. Please try again.`);
                action = parseInt(prompt('1-Create, 2-View, 3-Update, 4-Delete, 5-Quit'));
        }
        if (action !==5) {
            console.log(`Would you want to do another action?`);
            action = parseInt(prompt('1-Create, 2-View, 3-Update, 4-Delete, 5-Quit'));
            console.log(action);
        }
    }
}

/* Code to run */
connect();

/* ------------------  Query Functions ------------------ */
const createCustomer = async() => {
    
    const newName = prompt('Type the customer name: ');
    const newAge = parseInt(prompt('Type the customer age: '));

    const newCust = {
      name: newName,
      age: newAge
    };
 
    await customer.create(newCust);
    console.log("New customer:", newCust);
};
  
const viewCustomers = async() => {
    
    const customers = await customer.find({});
    console.log("Customers:", customers);
};

const updateCustomer = async() => {
    
    const customers = await customer.find({});
    console.log("Customers:", customers);

    const custId = prompt('Type the ID of the customer you want to update.');
    const custNewName = prompt('Type the new name of selected customer:');
    const custNewAge = parseInt(prompt('Type new age of selected customer:'));
    
    const custToUpdate = await customer.findById(custId);
 
    custToUpdate.name = custNewName;
    custToUpdate.age = custNewAge; 
    await custToUpdate.save();

    const updatedCust = await customer.findById(custId);
    console.log("Updated customer:", updatedCust);

};

const deleteCustomer = async() => {
    
    const custToDelete = prompt('Type the ID of the customer you want to update.');
    const removedCust= await customer.findByIdAndDelete(custToDelete);
    console.log("Deleted customer:", removedCust);
};
