const inquirer = require('inquirer');
const mysql = require('mysql');

var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'Andrew Thomsen',
    password : 'Majesty88',
    port     :  3306,
    database :  'bamazon'
  });
   
  connection.connect(function(err) {
    if (err) {
      console.error('error connecting: ' + err.stack);
      return;
    }
   
    console.log('connected as id ' + connection.threadId);
  });

function displayTable() {
    connection.query('SELECT * FROM products', function (error, results, fields) {
        if (error) throw error;
        // connected!
        console.log(results);
      }); 
}
