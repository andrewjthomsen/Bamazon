# Bamazon

## Overview
This application implements a simple command line based storefront using the npm inquirer package and the MySQL database backend together with the npm mysql package. The application presents three interfaces: customer, manager, and supervisor.

## MySQL Database Setup
In order to run this application, MySQL database must be set up. To set up, visit the MySQL installation page to install the version needed for the operating system being used. Once MySQL is intalled, it will be possible to create the Bamazon database and the products table with the SQL code found in Bamazon.sql. Run this code inside MySQL client like Sequel Pro to populate the database, then be ready to proceed with running the Bamazon customer, manager and supervisor interfaces.

## Installation
To run the various Bamazon interfaces after MySQL has been setup, run the commands below:
```
git clone git@github.com:andrewjthomsen/bamazon.git
cd bamazon
npm install
```

### Customer Interface
The customer interface allows the user to view the current inventory of store items: item IDs, descriptions, department in which the item is located and price. The user is then able to purchase one of the existing items by entering the item ID and the desired quantity. If the selected quantity is currently in stock, the user's order is fulfilled, displaying the total purchase price and updating the store database. If the desired quantity is not available, the user is prompted to modify their order.

To run the customer interface please perform the following steps below:
```
node bamazonCustomer.js
```

### Manager Interace
The manager interface presents a list of four options, as below.
```
? Please select an option: (Use arrow keys)
❯ View Products for Sale 
  View Low Inventory 
  Add to Inventory 
  Add New Product
```
The View Products for Sale option allows the user to view the current inventory of store items: item IDs, descriptions, department in which the item is located, price, and the quantity available in stock.

The View Low Inventory option shows the user the items which currently have fewer than 100 units available.

The Add to Inventory option allows the user to select a given item ID and add additional inventory to the target item.

The Add New Product option allows the user to enter details about a new product which will be entered into the database upon completion of the form.

To run the manager interface please perform the following steps below:
```
node bamazonManager.js
```
### Supervisor Interface
The manager interface presents a list of two options, to view product sales by department, or to create a new department. 
If user selects `view product sales by department`, department sales is listed and total sales is calculated from overhead cost and product sales. 
If user selects `create new department`, a new department can be created and current overhead cost and product sales can be inputted.

To run the supervisor interface perform the following steps below:
```
node bamazonSupervisor.js
```