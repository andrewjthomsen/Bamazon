const inquirer = require("inquirer");
const mysql = require("mysql");
// connects to mysql
var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Majesty88",
  port: 3306,
  database: "bamazon"
});
// if connection fails, error prompt
connection.connect(function(err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }

  console.log("connected as id " + connection.threadId);
});
// brings back data from mysql- loads database into application.
function inventory() {
  connection.query("SELECT * FROM products", function(err, response) {
    if (err) throw err;
    console.table(response);
    orderProducts();
  });
}
// utilizes inquirer and directs user to input product ID of what they'd like to order.
function orderProducts() {
  var inquirer = require("inquirer");
  inquirer
    .prompt([
      {
        /* Pass your questions in here */
        name: "orderID",
        message: "What is the product ID that you'd like to order?",
        type: "input"
      },
      {
        name: "quantity",
        message: "How many units of that product would you like to purchase?",
        type: "input"
      }
    ])

    .then(answers => {
      // Use user feedback for... whatever!!
      console.log(answers);
      // Finds item in inventory
      var requestedProduct = inventory.find(function(product.item_id) {// possible problem here--- 
        //pluck item out and set it equal to requested product
        // loop throw inventory to achieve this... START HERE
        // console.log(product.item_id);
        // console.log(product);
        // return requestedProduct.item_id === parseInt(answers.orderID);
        return requestedProduct;
      });
      console.log(requestedProduct);
      if (requestedProduct === undefined) {
        console.log(
          "Sorry, that product doesn't exist right now. Please pick another product."
        );
      } else if (
        // checks if there's anough inventory for order
        requestedProduct.stock_quantity > parseInt(answers.quantity)
      ) {
        // if enough is there, you have to update the data base through a sql query
        // requestedProduct.quantity - parseInt(answers.quantity);
        purchaseProduct();
      } else {
        console.log("Sorry, insufficient quantity.");
        orderProducts();
      }
    });
  var purchaseProduct = function(requestedProduct, quantity) {
    connection.query(
      "UPDATE products SET stock_quantity = stock_quantity - ? WHERE item_id =?",
      [quantity, requestedProduct.item_id],
      function(err, response) {
        console.log("Purchase successful");
        displayTable();
      }
    );
  };
}

// displays table for user to view in command line
function displayTable() {
  connection.query("SELECT * FROM products", function(error, results) {
    if (error) throw error;
    // connected!
    inventory = results;
    console.table(results);
    orderProducts();
  });
}
displayTable();
