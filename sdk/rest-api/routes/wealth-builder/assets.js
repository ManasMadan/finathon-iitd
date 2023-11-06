import express from "express";
import connection from "../../sql.js";
import { formatDateToYYYYMMDD, getTodayDateAsYYYYMMDD } from "../../utils.js";
const router = express.Router();

// TODO
const compound = 1,
  multiplier = 1;

router.post("/get-owned-assets-list", (req, res) => {
  const { user_id } = req.body;
  connection.query(
    "SELECT * FROM assets WHERE user_id = ?;",
    [user_id],
    function (err, result, fields) {
      if (err) {
        return res
          .status(400)
          .json({ error: true, message: "Something Went Wrong" });
      }

      res.status(200).json({ error: false, message: "Success", data: result });
    }
  );
});

router.post("/buy-asset", (req, res) => {
  const { user_id, itemID, price } = req.body;
  connection.query(
    "INSERT INTO assets VALUES(?,?,?);",
    [user_id, itemID, getTodayDateAsYYYYMMDD()],
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

router.post("/get-items", (req, res) => {
  connection.query("SELECT * FROM items", function (err, result, fields) {
    if (err)
      return res
        .status(400)
        .json({ error: true, message: "Something Went Wrong" });

    res.status(200).json({ error: false, message: "Success", data: result });
  });
});

router.post("/get-assets-current-worth", (req, res) => {
  const { user_id } = req.body;
  const currDate = getTodayDateAsYYYYMMDD();
  connection.query(
    `SELECT a.user_id, a.itemID,a.purchasedOn, i.interest, a.purchasedOn AS purchase_date,i.price, i.interest * DATEDIFF(?, a.purchasedOn) AS accumulated_interest, (1 + (i.interest * DATEDIFF(?, a.purchasedOn) / ?)) AS price_multiplier, (1 + (i.interest * DATEDIFF(?, a.purchasedOn) / ?)) * i.price AS current_price FROM assets AS a JOIN items AS i ON a.itemID = i.itemID WHERE a.user_id = ?;`,
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

router.post("/get-assets-total-worth", (req, res) => {
  const { user_id } = req.body;
  const currDate = getTodayDateAsYYYYMMDD();
  connection.query(
    `SELECT 
    COUNT(*) AS total_assets_count,
    SUM((1 + (i.interest * DATEDIFF(?, a.purchasedOn) / ?)) * i.price) AS total_current_worth
FROM 
    assets AS a
JOIN 
    items AS i
ON 
    a.itemID = i.itemID
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

router.post("/sell-asset", (req, res) => {
  const { user_id, itemID, purchasedOn } = req.body;
  connection.query(
    `SELECT 
    (1 + (i.interest * DATEDIFF(?, a.purchasedOn) / ?)) * i.price AS current_worth
FROM 
    assets AS a
JOIN 
    items AS i
ON 
    a.itemID = i.itemID
WHERE
    a.user_id = ? AND a.itemID = ? AND a.purchasedOn = ?;
`,
    [
      getTodayDateAsYYYYMMDD(),
      compound,
      user_id,
      itemID,
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
          assets
      WHERE
          user_id = ? AND itemID = ? AND purchasedOn = ? LIMIT 1;
      `,
        [user_id, itemID, formatDateToYYYYMMDD(new Date(purchasedOn))],
        function (err) {
          connection.query(
            "UPDATE wallet SET coins = coins + ? WHERE user_id = ?;",
            [result[0]["current_worth"] * multiplier, user_id],
            function () {
              res.status(200).json({ error: false, message: "Success" });
            }
          );
        }
      );
    }
  );
});

export default router;
