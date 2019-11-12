DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;
USE bamazon;

CREATE TABLE products (
   item_id INT (10) NOT NULL,
   product_name VARCHAR (100) NOT NULL,
   department_name VARCHAR (100) NOT NULL,
   price DECIMAL (10, 2) NOT NULL,
   stock_quantity INT (100) NOT NULL,
PRIMARY KEY  (item_id)
);

SELECT * FROM products;

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (101, "Shoes", "Soccer", 99.99, 100),
(201, "Shirts", "Baseball", 79.99, 90),
(301, "Pants", "Basketball", 59.99, 80),
(401, "Hats", "Tennis", 39.99, 120),
(501, "Gloves", "Hockey", 19.99, 100),
(601, "Bats", "Baseball", 19.99, 60),
(701, "Helmet", "Hockey", 69.99, 10),
(801, "Sweater", "Tennis", 49.99, 120),
(901, "Boots", "Hicking", 99.99, 100)


