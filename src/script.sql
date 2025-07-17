CREATE DATABASE donut_shop;
USE donut_shop;

-- donut table alias ‘d’
CREATE TABLE donuts (
	donut_id INT AUTO_INCREMENT PRIMARY KEY,
    donut_name VARCHAR(35) NOT NULL,
    price DECIMAL (4, 2) NOT NULL);
    
-- insert to donut table
INSERT INTO donuts (donut_id, donut_name, price)
VALUES 
(1, 'Vanilla', 9),
(2, 'Strawberry', 10),
(3, 'Raspberry', 10);

-- customers table alias ‘c’
    CREATE TABLE customers (
	customer_id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(35) NOT NULL,
    last_name VARCHAR(35),
    email VARCHAR(100) NOT NULL,
    address VARCHAR (150),
    postcode VARCHAR(7) NOT NULL);
    
    -- insert into customers
    CREATE TABLE orders (
	order_id INT AUTO_INCREMENT PRIMARY KEY,
    customer_id INT,
    total_price DECIMAL(6, 2) NOT NULL,
    FOREIGN KEY(customer_id) REFERENCES customers(customer_id));
    
    -- insert into orders
    CREATE TABLE order_items (
	order_items_id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT,
    donut_id INT, 
    quantity INT,
    FOREIGN KEY(order_id) REFERENCES orders(order_id),
	FOREIGN KEY(donut_id) REFERENCES donuts(donut_id));
    
    SELECT * FROM donuts;