import express from "express";
import connection from "../../sql.js";
import { sendErrorResponse } from "../../utils.js";

// TODO
const multiplier = 2;

const router = express.Router();

router.get("/get-status", (req, res) => {
  const { user_id } = req.body;
  connection.query(
    "SELECT 1 FROM xp WHERE user_id = ?",
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

router.post("/add-xp", (req, res) => {
  const { user_id, xp } = req.body;

  if (xp === 0 || !xp)
    return res.status(400).json({ error: true, message: "XP Cannot tbe zero" });

  connection.query(
    "UPDATE xp SET xp = xp + ? WHERE user_id = ?;",
    [xp * multiplier, user_id],
    sendErrorResponse
  );
  return res.status(200).json({ error: false, message: "Added XP Success" });
});

export default router;
