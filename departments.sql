USE bamazon;

CREATE TABLE departments(
department_id INT(10) NOT NULL,
department_name VARCHAR(25) NOT NULL,
over_head_costs DECIMAL(10, 2) NOT NULL,
product_sales INTEGER(10) NOT NULL,
total_profit INTEGER NOT NULL
);