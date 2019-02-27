USE bamazon;

ALTER TABLE products 
    ADD product_sales VARCHAR(255);
ALTER TABLE products
    ADD department_id INTEGER(10);


SELECT department_id, department_name, over_head_costs, product_sales
FROM products
JOIN departments
  ON products.department_id = departments.department_id