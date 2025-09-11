
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const dbPath = path.join(__dirname, 'products.db');
const db = new sqlite3.Database(dbPath);

// Create products table and insert sample data
const setupDb = () => {
  db.serialize(() => {
    db.run('CREATE TABLE IF NOT EXISTS products (id INTEGER PRIMARY KEY, name TEXT, costprice REAL, category TEXT)');
    db.run("DELETE FROM products");
    db.run("INSERT INTO products (id, name, costprice, category) VALUES (1, 'Apple', 0.50, 'Fruit')");
    db.run("INSERT INTO products (id, name, costprice, category) VALUES (2, 'Banana', 0.30, 'Fruit')");
    db.run("INSERT INTO products (id, name, costprice, category) VALUES (3, 'Carrot', 0.20, 'Vegetable')");
    db.run("INSERT INTO products (id, name, costprice, category) VALUES (4, 'Date', 1.00, 'Fruit')");
    db.run("INSERT INTO products (id, name, costprice, category) VALUES (5, 'Eggplant', 0.80, 'Vegetable')");
    db.run("INSERT INTO products (id, name, costprice, category) VALUES (6, 'Fig', 1.20, 'Fruit')");
    db.run("INSERT INTO products (id, name, costprice, category) VALUES (7, 'Grape', 0.90, 'Fruit')");
    db.run("INSERT INTO products (id, name, costprice, category) VALUES (8, 'Honeydew', 2.00, 'Fruit')");
    db.run("INSERT INTO products (id, name, costprice, category) VALUES (9, 'Iceberg Lettuce', 0.60, 'Vegetable')");
    db.run("INSERT INTO products (id, name, costprice, category) VALUES (10, 'Jackfruit', 3.00, 'Fruit')");
    db.run("INSERT INTO products (id, name, costprice, category) VALUES (11, 'Kiwi', 0.70, 'Fruit')");
    db.run("INSERT INTO products (id, name, costprice, category) VALUES (12, 'Lemon', 0.40, 'Fruit')");
    db.run("INSERT INTO products (id, name, costprice, category) VALUES (13, 'Mango', 1.50, 'Fruit')");
    db.run("INSERT INTO products (id, name, costprice, category) VALUES (14, 'Nectarine', 1.10, 'Fruit')");
    db.run("INSERT INTO products (id, name, costprice, category) VALUES (15, 'Orange', 0.60, 'Fruit')");
    db.run("INSERT INTO products (id, name, costprice, category) VALUES (16, 'Papaya', 1.80, 'Fruit')");
    db.run("INSERT INTO products (id, name, costprice, category) VALUES (17, 'Quince', 1.40, 'Fruit')");
    db.run("INSERT INTO products (id, name, costprice, category) VALUES (18, 'Raspberry', 2.50, 'Fruit')");
    db.run("INSERT INTO products (id, name, costprice, category) VALUES (19, 'Strawberry', 2.00, 'Fruit')");
    db.run("INSERT INTO products (id, name, costprice, category) VALUES (20, 'Tomato', 0.50, 'Vegetable')");
    db.run("INSERT INTO products (id, name, costprice, category) VALUES (21, 'Ugli Fruit', 2.20, 'Fruit')");
    db.run("INSERT INTO products (id, name, costprice, category) VALUES (22, 'Vanilla Bean', 5.00, 'Spice')");
    db.run("INSERT INTO products (id, name, costprice, category) VALUES (23, 'Watermelon', 3.50, 'Fruit')");
    db.run("INSERT INTO products (id, name, costprice, category) VALUES (24, 'Xigua', 3.00, 'Fruit')");
    db.run("INSERT INTO products (id, name, costprice, category) VALUES (25, 'Yam', 0.70, 'Vegetable')");
    db.run("INSERT INTO products (id, name, costprice, category) VALUES (26, 'Zucchini', 0.60, 'Vegetable')");
    db.run("INSERT INTO products (id, name, costprice, category) VALUES (27, 'Pineapple', 2.00, 'Fruit')");
    db.run("INSERT INTO products (id, name, costprice, category) VALUES (28, 'Cucumber', 0.40, 'Vegetable')");
    db.run("INSERT INTO products (id, name, costprice, category) VALUES (29, 'Peach', 1.20, 'Fruit')");
    db.run("INSERT INTO products (id, name, costprice, category) VALUES (30, 'Pear', 1.00, 'Fruit')");
    db.run("INSERT INTO products (id, name, costprice, category) VALUES (31, 'Plum', 0.90, 'Fruit')");
    db.run("INSERT INTO products (id, name, costprice, category) VALUES (32, 'Apricot', 1.10, 'Fruit')");
    db.run("INSERT INTO products (id, name, costprice, category) VALUES (33, 'Blackberry', 2.20, 'Fruit')");
    db.run("INSERT INTO products (id, name, costprice, category) VALUES (34, 'Cantaloupe', 2.00, 'Fruit')");
    db.run("INSERT INTO products (id, name, costprice, category) VALUES (35, 'Dragonfruit', 3.00, 'Fruit')");
    db.run("INSERT INTO products (id, name, costprice, category) VALUES (36, 'Elderberry', 2.50, 'Fruit')");
    db.run("INSERT INTO products (id, name, costprice, category) VALUES (37, 'Gooseberry', 2.00, 'Fruit')");
    db.run("INSERT INTO products (id, name, costprice, category) VALUES (38, 'Lychee', 2.00, 'Fruit')");
    db.run("INSERT INTO products (id, name, costprice, category) VALUES (39, 'Mulberry', 2.00, 'Fruit')");
    db.run("INSERT INTO products (id, name, costprice, category) VALUES (40, 'Passionfruit', 2.50, 'Fruit')");
    db.run("INSERT INTO products (id, name, costprice, category) VALUES (41, 'Starfruit', 2.20, 'Fruit')");
  });
};
setupDb();

// This code is for an API server
const express = require("express");
const app = express();

// Enable CORS
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// Serve static files from the public directory
app.use(express.static("public"));

// Vulnerable search endpoint
app.get('/search', (req, res) => {
  let productName = req.query.name;
  // Vulnerable to SQL Injection
  let query = `SELECT * FROM products WHERE name LIKE '%${productName}%'`;
  db.all(query, (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ products: rows });
  });
});

// Start the server
const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`API server listening on port ${port}`);
});

