import connection from "./sql.js";
connection.query(
  "CREATE TABLE users ( id VARCHAR(255) PRIMARY KEY NOT NULL, name VARCHAR(255) NOT NULL );"
);
connection.query(
  "CREATE TABLE wallet ( user_id VARCHAR(255) PRIMARY KEY, coins INT CHECK(coins >= 0), cash INT CHECK(cash >= 0));"
);
connection.query(
  "CREATE TABLE xp ( user_id VARCHAR(255) PRIMARY KEY, xp INT CHECK(coins >= 0));"
);
connection.query(
  "CREATE TABLE house ( user_id VARCHAR(255) PRIMARY KEY, house INT );"
);
connection.query(
  "CREATE TABLE bank ( user_id VARCHAR(255) PRIMARY KEY, savings INT CHECK(savings >= 0),loan_bank INT CHECK(loan_bank >= 0),loan_person INT CHECK(loan_person >= 0),fd INT CHECK(fd >= 0),mutual INT CHECK(mutual >= 0));"
);
connection.query(
  "CREATE TABLE user_vehicles ( user_id VARCHAR(255) , vehicleID INT,purchasedOn DATE);"
);
connection.query(
  "CREATE TABLE vehicles ( id INT PRIMARY KEY, price INT,depreciation DECIMAL(2,2));"
);
connection.query(
  "CREATE TABLE assets ( user_id VARCHAR(255), itemID INT,purchasedOn DATE);"
);
connection.query(
  "CREATE TABLE items ( itemID INT PRIMARY KEY,price INT, interest DECIMAL(2,2));"
);
connection.query(
  "CREATE TABLE lastLogin ( user_id VARCHAR(255) PRIMARY KEY, lastLoginDate DATE);"
);
connection.query(
  "CREATE TABLE food (name VARCHAR(255) PRIMARY KEY , price INT, xp INT,category VARCHAR(255));"
);
connection.end();
