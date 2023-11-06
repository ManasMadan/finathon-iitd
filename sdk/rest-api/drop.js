// Note this file is only for development purposes and should not be executed in production
import connection from "./sql.js";
connection.query("DROP TABLE users;");
connection.query("DROP TABLE wallet;");
connection.query("DROP TABLE xp;");
connection.query("DROP TABLE house;");
connection.query("DROP TABLE bank;");
connection.query("DROP TABLE vehicles");
connection.query("DROP TABLE assets");
connection.query("DROP TABLE lastLogin");
connection.query("DROP TABLE user_vehicles");
connection.query("DROP TABLE items");

connection.end();
