const path = require("path");
require("dotenv").config();
require('express-async-errors');
const mongoose = require("mongoose");
const Session=require('./../Models/courseModel');
const fs = require("fs");

//connection to database
const DB = 'mongodb+srv://itsaini9720:FbjP4fvsPls15psT@cluster0.ac8r5rp.mongodb.net/tutor?retryWrites=true&w=majority&appName=Cluster0';

const connectionParams = {
  useNewUrlParser: true,
};

mongoose
  .connect(DB, connectionParams)
  .then((con) => {
    console.log("Connected to database ");
  })
  .catch((err) => {
    console.error(`Error connecting to the database. \n${err}`);
  });

//reading files
const sessions = JSON.parse(
  fs.readFileSync(`${__dirname}/coursedata.json`, "utf-8")
);

//Import data to database

const importData = async () => {
  try {
    await Session.create(sessions);
    //await Customer.create(customers);

    console.log("Data added successfully! ");
  } catch (err) {
    console.log(err + " ");
  }
  process.exit();
};

const deleteData = async () => {
    try {
      await Session.deleteMany();
      //await Customer.deleteMany();
      //await Review.deleteMany();
      console.log("Data successfully deleted!");
    } catch (err) {
      console.log(err);
    }
    process.exit();
  };

if (process.argv[2] === "--import") {
  importData();
} else if (process.argv[2] === "--delete") {
  deleteData();
} else if (process.argv[2] === "--update") {
  updateData();
}

// use command " node dev-data/import-dev-data.js --update" for update;
