# MySQL Database Setup

## Steps to Set Up

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Configure .env File**
   Edit the `.env` file with your MySQL credentials:
   ```
   DB_HOST=localhost
   DB_PORT=3306
   DB_USER=root
   DB_PASSWORD=your_password
   DB_NAME=crud_app
   SERVER_PORT=8000
   ```

3. **Create Database and Table**
   ```bash
   # Connect to MySQL
   mysql -u root -p
   
   # Create database
   CREATE DATABASE crud_app;
   USE crud_app;
   ```
   
   Then run the SQL from `database.sql`:
   ```bash
   mysql -u root -p crud_app < database.sql
   ```

4. **Start the Server**
   ```bash
   npm start
   ```
   or with nodemon for development:
   ```bash
   npx nodemon index.js
   ```

## Environment Variables

- `DB_HOST` - MySQL server host (default: localhost)
- `DB_PORT` - MySQL server port (default: 3306)
- `DB_USER` - MySQL username
- `DB_PASSWORD` - MySQL password
- `DB_NAME` - Database name
- `SERVER_PORT` - Express server port (default: 8000)

## API Endpoints

- `GET /users` - Get all users
- `POST /users` - Create new user
- `PATCH /users/:id` - Update user
- `DELETE /users/:id` - Delete user
