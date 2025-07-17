require('dotenv').config();
const express = require('express');
const mysql = require('mysql2');
const app = express();
const PORT = 3000;
app.use(express.json());

const pool = mysql.createPool({
    host: process.env.host,
    user: process.env.user,
    password: process.env.password,
    database: 'donut_shop',
    waitForConnection: true,
    connectionLimit: 10,
    queueLimit: 0
})

// Variable for database connection
let db;

// Error handling for database connection
async function connectToDb() {
    try {
        db = await mysql.createConnection(pool);
        console.log('Connected to database');
    }
    catch (error) {
        console.error('Database connection failed:', error);
        process.exit(1);
    }
}




// Main function
async function main() {
    await connectToDb();

    app.listen(PORT, () => {
        console.log(`Server is running on ${PORT}`);
    })
}

main();