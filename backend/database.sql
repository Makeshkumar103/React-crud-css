
CREATE DATABASE IF NOT EXISTS crud;

USE crud;

CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  age INT NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);



INSERT INTO users (name, age, email) VALUES
('Alice', 30, 'alice@example.com'),
('Bob', 25, 'bob@example.com'),
('Charlie', 35, 'charlie@example.com'),
('David', 28, 'david@example.com'),
('Emma', 22, 'emma@example.com'),
('Frank', 40, 'frank@example.com'),
('Grace', 27, 'grace@example.com'),
('Henry', 33, 'henry@example.com'),
('Isha', 24, 'isha@example.com'),
('John', 31, 'john@example.com');


select * from users;



USE crud;
CREATE TABLE product (
id INT AUTO_INCREMENT PRIMARY KEY,
name VARCHAR(30),
price INT,
pro_dec VARCHAR(200)
);

INSERT INTO product VALUES (

);

INSERT INTO product (name, price, pro_dec) VALUES
('Wireless Mouse', 25, 'Ergonomic wireless mouse with USB receiver'),
('Bluetooth Headphones', 80, 'Noise-cancelling over-ear Bluetooth headphones'),
('USB-C Hub', 45, '7-in-1 USB-C hub with HDMI and SD card reader'),
('Mechanical Keyboard', 120, 'RGB backlit mechanical keyboard with Cherry MX switches'),
('Webcam HD', 60, '1080p HD webcam with built-in microphone'),
('Laptop Stand', 35, 'Adjustable aluminum laptop stand for desk'),
('Portable SSD', 100, '1TB external solid-state drive USB 3.0'),
('Desk Lamp', 30, 'LED desk lamp with adjustable brightness levels'),
('Monitor Arm', 70, 'Gas spring single monitor arm VESA compatible'),
('Mouse Pad', 15, 'Large gaming mouse pad with stitched edges');

SELECT * FROM product;
