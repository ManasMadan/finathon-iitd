import express from "express";
import connection from "../../sql.js";
import { sendErrorResponse } from "../../utils.js";

// TODO
const multiplier = 2;
const router = express.Router();

router.post("/get-status", (req, res) => {
  const { user_id } = req.body;
  connection.query(
    "SELECT * FROM wallet WHERE user_id = ? LIMIT 1;",
    [user_id],
    function (err, result, fields) {
      if (err)
        return res
          .status(400)
          .json({ error: true, message: "Something Went Wrong" });

      res.json({ error: false, message: "Success", data: result });
    }
  );
});

router.post("/add-coins", (req, res) => {
  const { user_id, coins } = req.body;
  if (coins === 0 || !coins)
    return res
      .status(400)
      .json({ error: true, message: "Coins Cannot tbe zero" });

  connection.query(
    "UPDATE wallet SET coins = coins + ? WHERE user_id = ?;",
    [coins * multiplier, user_id],
    sendErrorResponse
  );
  return res.status(200).json({ error: false, message: "Added Coins Success" });
});

router.post("/add-cash", (req, res) => {
  const { user_id, cash } = req.body;
  if (cash === 0 || !cash)
    return res
      .status(400)
      .json({ error: true, message: "Cash Cannot tbe zero" });

  connection.query(
    "UPDATE wallet SET cash = cash + ? WHERE user_id = ?;",
    [cash * multiplier, user_id],
    sendErrorResponse
  );
  return res.status(200).json({ error: false, message: "Added Cash Success" });
});
export default router;
