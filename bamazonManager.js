// Challenge Activity Level ADVANCED
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
connection.connect(function (err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }

  console.log("connected as id " + connection.threadId);
  menuOptions();
});
var menuOptions = function () {
  var inquirer = require("inquirer");
  inquirer
    .prompt({
      /* Pass your questions in here */
      name: "action",
      message: "What would you like to do?",
      type: "list",
      choices: [
        "View product for sale",
        "View low inventory",
        "Add to inventory",
        "Add new product"
      ]
    })
    .then(answers => {
      console.log(answers)
      switch (answers.action) {
        case "View product for sale":
          viewProducts();
          break;
        case "View low inventory":
          viewLowInventory();
          break;
        case "Add to inventory":
          addToInventory();
          break;
        case "Add new product":
          addNewProduct();
          break;
      }

      // if (answers.action === "View product for sale") {
      //   viewProducts();
      // } else if (answers.action === "View low inventory") {
      //   viewLowInventory();
      // } else (answers.action === "Add to inventory") {
      //   addToInventory();
      // } switch

    });
};

function viewProducts() {
  connection.query("SELECT * FROM products", function (err, result) {
    console.table(result);
    menuOptions();
  });
}

function viewLowInventory() {
  connection.query("SELECT * FROM products WHERE stock_quantity < 5 ", function (
    err,
    result
  ) {
    console.table(result);
    menuOptions();
  });
}

function updateProduct(product) {
  connection.query("UPDATE products SET stock_quantity = stock_quantity + ? WHERE item_id = ?",
    [product.quantity, product.id],
    function (err, res) {
      if (err) throw err;
      console.log("Congratulations manager! you have added more of an item to inventory.");
      menuOptions();
    }
  );
}

function insertNewProduct(answers) {
  connection.query("INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES (?, ?, ?, ?)",
    [answers.name, answers.department, answers.price, answers.quantity],
    function (err, res) {
      if (err) throw err;
      console.log("Congratulations manager! you have added a NEW ITEM to inventory.");
      menuOptions();
    }
  );
}

function addToInventory() {
  var inquirer = require("inquirer");
  inquirer
    .prompt([{
      /* Pass your questions in here */
      name: "id",
      message: "What is the product id of the item to be added?",
      type: "input"
    }, {
      name: "quantity",
      message: "What's the quantity of the item you'd like to add to inventory?",
      type: "input"
    }])

    .then(answers => {
      updateProduct(answers);
    });
}

function addNewProduct () {
  var inquirer = require("inquirer");
  inquirer
    .prompt([{
      /* Pass your questions in here */
      name: "name",
      message: "What is the name of the product to be added?",
      type: "input"
    }, {
      name: "department",
      message: "What/'s the name of the department?",
      type: "input"
    }, {
      name: "price",
      message: "What is the price of the item?",
      type: "input"
    }, {
      name: "quantity",
      message: "What/'s the quantity of the item you'd like to add to inventory?",
      type: "input"
    }])

    .then(answers => {
      insertNewProduct(answers);
    });
}
//(node:3000) UnhandledPromiseRejectionWarning: RangeError: Maximum call stack size exceeded