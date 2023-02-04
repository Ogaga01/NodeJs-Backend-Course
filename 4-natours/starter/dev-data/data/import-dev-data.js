const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Tour = require('./../../models/tourModel');

dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log('DB connection successful');
  });

// Read JSON file
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/tours.json`, 'utf-8')
);

// Import Data into DB
const importData = async () => {
    try {
        await Tour.create(tours);
        console.log('Data imported successfully');
    }
    catch (err) {
        console.log(err);
    }
    process.exit()
}

// Delete All Data
const deleteData = async () => {
    try {
        await Tour.deleteMany();
        console.log('Data deleted successfully');
    }
    catch (err) {
        console.log(err);
    }
    process.exit()
}

if (process.argv[2] === '--import') {
    importData();
} else if (process.argv[2] === '--delete') {
    deleteData();
}

// Delete Data
// const deleteData = async (id) => {
//     try {
//         await Tour.deleteOne({ _id: id });
//         console.log('Data deleted successfully');
//     }
//     catch (err) {
//         console.log(err);
//     }
// }

console.log(process.argv)
//node dev-data/data/import-dev-data.js