
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

