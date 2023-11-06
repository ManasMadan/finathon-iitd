import express from "express";
import connection from "../../sql.js";
import { formatDateToYYYYMMDD, getTodayDateAsYYYYMMDD } from "../../utils.js";
const router = express.Router();

// TODO
const compound = 1,
  multiplier = 1;

router.post("/get-owned-vehicles-list", (req, res) => {
  connection.query(
    "SELECT * FROM user_vehicles;",
    function (err, result, fields) {
      if (err)
        return res
          .status(400)
          .json({ error: true, message: "Something Went Wrong" });

      res.status(200).json({ error: false, message: "Success", data: result });
    }
  );
});

router.post("/buy-vehicle", (req, res) => {
  const { user_id, id, price } = req.body;
  console.log(req.body);
  connection.query(
    "INSERT INTO user_vehicles VALUES(?,?,?);",
    [user_id, id, getTodayDateAsYYYYMMDD()],
    function (err, result, fields) {
      if (err)
        return res
          .status(400)
          .json({ error: true, message: "Something Went Wrong" });

      connection.query(
        "UPDATE wallet SET coins = coins - ? WHERE user_id = ?;",
        [price, user_id]
      );
      res.status(200).json({ error: false, message: "Success" });
    }
  );
});

router.post("/get-vehicles-list", (req, res) => {
  connection.query("SELECT * FROM vehicles", function (err, result, fields) {
    if (err)
      return res
        .status(400)
        .json({ error: true, message: "Something Went Wrong" });

    res.status(200).json({ error: false, message: "Success", data: result });
  });
});

router.post("/get-vehicles-current-worth", (req, res) => {
  const { user_id } = req.body;
  const currDate = getTodayDateAsYYYYMMDD();
  connection.query(
    `SELECT a.user_id, a.vehicleID,a.purchasedOn, i.depreciation, a.purchasedOn AS purchase_date,i.price, i.depreciation * DATEDIFF(?, a.purchasedOn) AS accumulated_depr, (1 - (i.depreciation * DATEDIFF(?, a.purchasedOn) / ?)) AS price_multiplier, (1 - (i.depreciation * DATEDIFF(?, a.purchasedOn) / ?)) * i.price AS current_price FROM user_vehicles AS a JOIN vehicles AS i ON a.vehicleID = i.id WHERE a.user_id = ?;`,
    [currDate, currDate, compound, currDate, compound, user_id],
    function (err, result, fields) {
      if (err)
        return res
          .status(400)
          .json({ error: true, message: "Something Went Wrong" });

      res.status(200).json({ error: false, message: "Success", data: result });
    }
  );
});

router.post("/get-vehicles-total-worth", (req, res) => {
  const { user_id } = req.body;
  const currDate = getTodayDateAsYYYYMMDD();
  connection.query(
    `SELECT 
    COUNT(*) AS total_vehicles_count,
    SUM((1 - (i.depreciation * DATEDIFF(?, a.purchasedOn) / ?)) * i.price) AS total_vehicles_worth
FROM 
    user_vehicles AS a
JOIN 
    vehicles AS i
ON 
    a.vehicleID = i.id
  WHERE
  a.user_id = ?;
`,
    [currDate, compound, user_id],
    function (err, result, fields) {
      if (err)
        return res
          .status(400)
          .json({ error: true, message: "Something Went Wrong" });

      res.status(200).json({ error: false, message: "Success", data: result });
    }
  );
});

router.post("/sell-vehicle", (req, res) => {
  const { user_id, vehicleID, purchasedOn } = req.body;
  connection.query(
    `SELECT 
    (1 - (i.depreciation * DATEDIFF(?, a.purchasedOn) / ?)) * i.price AS current_worth
FROM 
    user_vehicles AS a
JOIN 
    vehicles AS i
ON 
    a.vehicleID = i.id
WHERE
    a.user_id = ? AND a.vehicleID = ? AND a.purchasedOn = ?;
`,
    [
      getTodayDateAsYYYYMMDD(),
      compound,
      user_id,
      vehicleID,
      formatDateToYYYYMMDD(new Date(purchasedOn)),
    ],
    function (err, result, fields) {
      if (result.length === 0) {
        return res.status(200).json({ error: false, message: "No Product" });
      }
      if (err)
        return res
          .status(400)
          .json({ error: true, message: "Something Went Wrong" });
      connection.query(
        `DELETE
      FROM
          user_vehicles
      WHERE
          user_id = ? AND vehicleID = ? AND purchasedOn = ? LIMIT 1;
      `,
        [user_id, vehicleID, formatDateToYYYYMMDD(new Date(purchasedOn))]
      );
      connection.query(
        "UPDATE wallet SET coins = coins + ? WHERE user_id = ?;",
        [result[0]["current_worth"] * multiplier, user_id]
      );
      res.status(200).json({ error: false, message: "Success" });
    }
  );
});

export default router;
