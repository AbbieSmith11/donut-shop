require("dotenv").config();

const express = require("express");
const mysql = require("mysql2");
const app = express();
const PORT = 3000;
app.use(express.json());

const pool = mysql
  .createPool({
    host: process.env.host,
    user: process.env.user,
    password: process.env.password,
    database: "donut_shop",
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
  })
  .promise();

// Variable for database connection
let db;

// Test DB connection
async function connectToDb() {
  try {
    const db = await pool.getConnection();
    console.log("Connected to database");
  } catch (error) {
    console.error("Database connection failed:", error);
    process.exit(1);
  }
}

// GET price and name for each donut
// use rows to destructure the data returned from the query, usually returns rows (data) and feilds (metadata), specify you just want rows

app.get("/", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT donut_name, price FROM donuts");
    res.json(rows);
  } catch (error) {
    console.error("Error getting donut name and price", error);
    res.status(500).json({ error: "Failed to fetch donuts" });
  }
});

// POST quantity of each donut


// POST contact details - when fill out form page

app.post("/user-info", async (req, res) => {
  const { first_name, last_name, email, address, postcode } = req.body;
  try {
     const [result] = await pool.execute(
      "INSERT INTO customers (first_name, last_name, email, address, postcode) VALUES (?,?,?,?,?)",
      [first_name, last_name, email, address, postcode]
    );

    res.status(201).json({ message: `User ${ result.insertId } created successfully` });
  } catch (error) {
    if (!first_name || !last_name || !email || !address || !postcode) {
      return res
        .status(400)
        .json({
          error:
            "first name, last name, email, address and postcode are required",
        });
    }
    console.error("Error inserting user info", error);
    res.statusMessage(500).json({ error: "Database error" });
  }
});

// GET order summary - customer details (all, not id), order details: name donut (from donut ID), quantity, prices and calculate total price
app.get("/summary", async (req, res) => {
  try {
    const [customers] = await pool.query(
      "SELECT first_name, last_name, email, address, postcode FROM customers"
    );
    const [order] = await pool.query(
      "SELECT d.donut_name, o.quantity, d.price, (o.quantity * d.price) AS total_price FROM order_items o JOIN donuts d ON o.donut_id = d.donut_id"
    );
    res.json({
      customers,
      order,
    });
  } catch (error) {
    console.error("Error getting donut name and price", error);
    res.status(500).json({ error: "Failed to fetch donuts" });
  }
});

// DELETE - delete order (if order is cancelled by clicking cancel button)

// Main function
async function main() {
  await connectToDb();

  app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
  });
}

main();
