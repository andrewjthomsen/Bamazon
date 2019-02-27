SELECT products.department_id, department_name, over_head_costs, product_sales, (product_sales + over_head_costs) as total_costs
FROM products
JOIN departments
  ON products.department_id = departments.department_id