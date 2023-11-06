import express from "express";
import connection from "../../sql.js";

const router = express.Router();
router.post("/get-status", (req, res) => {
  const { user_id } = req.body;
  connection.query(
    "SELECT * FROM house WHERE user_id = ? LIMIT 1",
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
router.post("/upgrade-house-level", (req, res) => {
  const { user_id } = req.body;
  connection.query(
    "UPDATE house SET house = house + 1 WHERE user_id = ?",
    [user_id],
    function (err, result, fields) {
      if (err)
        return res
          .status(400)
          .json({ error: true, message: "Something Went Wrong" });
      connection.query(
        "UPDATE wallet SET coins = coins - ? WHERE user_id = ?;",
        [500, user_id],
        function () {
          return res.json({ error: false, message: "Success" });
        }
      );
    }
  );
});
export default router;
