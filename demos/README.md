# SQL Injection Vulnerability Demo App

This is a simple Express app using SQLite to demonstrate a SQL Injection vulnerability in a product search API.

## Features
- Product search endpoint vulnerable to SQL Injection
- SQLite database with 33 sample products

## Installation

1. Open a terminal and navigate to the `api` folder:
   ```powershell
   cd "c:\Users\ravi.cheetirala\OneDrive - Avanade\Work\GHCP ACM\Workshop\Foundations\security-fix-demo\api"
   ```
2. Install dependencies:
   ```powershell
   npm install express sqlite3
   ```

## Running the App

Start the server:
```powershell
node app.js
```

You should see:
```
app listening on port 3000
```

## Accessing the Vulnerable Endpoint

Open your browser or use curl/Postman to access:
```
http://localhost:3000/search?name=Apple
```

### Demonstrating SQL Injection
Try searching with a malicious input:
```
http://localhost:3000/search?name=' OR 1=1 --
```
This will return all products, showing the SQL Injection vulnerability.

## Notes
- For demonstration purposes only. Do not use this code in production.
- To reset the database, restart the app.

