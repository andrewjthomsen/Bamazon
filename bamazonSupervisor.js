// - createConnection
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
});
// brings back data from mysql- loads database into application.
function inventory() {
    connection.query("SELECT * FROM products ", function (err, response) {
        if (err) throw err;
        console.table(response);
        menuOptions();
    });
}
inventory();
var menuOptions = function () {
    var inquirer = require("inquirer");
    console.log("Greetings Supervisor!");
    inquirer
        .prompt({
            /* Pass your questions in here */
            name: "action",
            message: "What would you like to do?",
            type: "list",
            choices: ["View product sales by department", "Create new department"]
        })
        .then(answers => {
            console.log(answers);
            switch (answers.action) {
                case "View product sales by department":
                    salesByDepartment();
                    break;
                case "Create new department":
                    CreateNewDep();
                    break;
            }
        });
};

// - Function to display "Product Sales by Department" via JOIN
function salesByDepartment() {
    var inquirer = require("inquirer");
    inquirer
        .prompt([{
            /* Pass your questions in here */
            name: "salesByDepartment",
            message: "What is the dpartment id that you'd like to view?",
            type: "input"
        }])
        .then(answers => {
            // Use user feedback for... whatever!!
            var department = answers.salesByDepartment;
            console.log(department);
            // Finds item in inventory
            var viewSales = function () {
                connection.query(
                    " SELECT " +
                    "   d.department_id, " +
                    "   d.department_name, " +
                    "   d.over_head_costs, " +
                    "   SUM(IFNULL(p.product_sales, 0)) as product_sales, " +
                    "   SUM(IFNULL(p.product_sales, 0)) - d.over_head_costs as total_profit " +
                    "FROM products p " +
                    "   RIGHT JOIN departments d ON p.department_id = d.department_id " +
                    "WHERE p.department_id=?" +
                    "GROUP BY " +
                    "   d.department_id, " +
                    "   d.department_name, " +
                    "   d.over_head_costs",
                    [department],
                    function (err, res) {
                        console.table(res);
                        menuOptions();
                    }
                );
            };
            viewSales();
        });
}

function CreateNewDep() {
    var inquirer = require("inquirer");
    inquirer
        .prompt([{
                /* Pass your questions in here */
                name: "createNewDep",
                message: "What is the name of the dpartment you/'d like to create?",
                type: "input"
            },
            {
                name: "cost",
                message: "What is the over-head cost?",
                type: "input"
            },{
                name: "sales",
                message: "What is the ?",
                type: "input"
            },{
                name: "profit",
                message: "What is the ?",
                type: "input"
            }
        ])
        .then(answers => {
            var newDepartment = answers.CreateNewDep;
            var cost = answers.cost;
            console.log(newDepartment);
            // - Function to send an INSERT query to "Create New Department"
            var createNew = function () {
                connection.query(
                    "INSERT INTO departments (department_name, over_head_costs) VALUES(?,?)",
                    [newDepartment, cost],
                    function (err, res) {
                        if (err) throw err;
                        console.log(
                            "Congratulations Supervisor! you have added a NEW DEPARTMENT."
                        );
                    }
                );
                menuOptions();
            };
            createNew();
        });
}