class dbConnection {
    //Constructor
    constructor() {
      require("dotenv").config();
    }
    // Getter
    get connectionMongDBConfiguration() {
      return this.mongoDBconnectivity();
    }
    // Method
    mongoDBconnectivity() {
      try {
       
        const uri ="mongodb+srv://root:1qaz2wsx@cluster0.53ntq.mongodb.net/?retryWrites=true&w=majority"
  
        const mongoose = require('mongoose');
        mongoose.Promise = global.Promise;
        mongoose.connect(uri, { useNewUrlParser: true }).then(
          () => { console.log("connection successfully") },
          err => { console.log(err) }
        );
  
  
      } catch (error) {
        throw error;
      }
      return true;
    }
  }
  
  module.exports = dbConnection;
