create database bamazon;

USE bamazon;
CREATE TABLE products(
item_id INTEGER(10) NOT NULL AUTO_INCREMENT,
product_name VARCHAR(30) NOT NULL,
department_name VARCHAR(30) NOT NULL,
price DECIMAL(10,5) NOT NULL,
stock_quantity INTEGER(10) NOT NULL
PRIMARY KEY (item_id) #schutz
);
