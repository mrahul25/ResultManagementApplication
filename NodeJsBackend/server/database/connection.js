const { Sequelize } = require("sequelize");
const mysql = require('mysql2/promise');

//console.log(process.env.DB_NAME);

mysql.createConnection({
  user     : 'root',
  password : 'root'
}).then(() => {
  connection.query('CREATE DATABASE IF NOT EXISTS resultmanagementsystem;').then(() => {
      // Safe to use sequelize now
      
  })
})


const sequelize = new Sequelize(
  'resultmanagementsystem',
  "root",
  "root",
  {
    host: "localhost",
    dialect: "mysql",
  }
);

console.log(sequelize.getDatabaseName());

sequelize.sync();

(async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
})();
module.exports=sequelize;
               
