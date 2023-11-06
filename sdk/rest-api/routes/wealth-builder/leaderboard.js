import express from "express";
import connection from "../../sql.js";

const router = express.Router();
router.post("/get-rank", (req, res) => {
  const { user_id } = req.body;
  connection.query(
    "SELECT user_id, XP, RANK() OVER (ORDER BY XP DESC) AS XP_Rank FROM xp WHERE user_id = ?;",
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

export default router;
