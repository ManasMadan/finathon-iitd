import express from "express";
import connection from "../../sql.js";
import { sendErrorResponse } from "../../utils.js";

// TODO
const multiplier = 2;

const router = express.Router();

router.post("/get-food-list", (req, res) => {
  const { category } = req.body;
  connection.query(
    "SELECT * FROM food WHERE category = ?;",
    [category],
    function (err, result, fields) {
      if (err)
        return res
          .status(400)
          .json({ error: true, message: "Something Went Wrong" });

      res.json({ error: false, message: "Success", data: result });
    }
  );
});

router.post("/buy-food", (req, res) => {
  const { price, xp, user_id } = req.body;

  connection.query(
    "UPDATE xp SET xp = xp + ? WHERE user_id = ?;",
    [xp * multiplier, user_id],
    sendErrorResponse
  );
  connection.query(
    "UPDATE wallet SET coins = coins - ? WHERE user_id = ?;",
    [price, user_id],
    sendErrorResponse
  );
  return res.status(200).json({ error: false, message: "Added XP Success" });
});

export default router;
