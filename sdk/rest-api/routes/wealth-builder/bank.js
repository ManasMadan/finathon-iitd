import express from "express";
import connection from "../../sql.js";

// TODO
const multiplier = 2;
const router = express.Router();

router.post("/get-status", (req, res) => {
  const { user_id } = req.body;
  connection.query(
    "SELECT * FROM bank WHERE user_id = ? LIMIT 1",
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
router.post("/add-savings", (req, res) => {
  const { user_id, savings } = req.body;
  connection.query(
    "UPDATE bank SET savings = savings + ? WHERE user_id = ?",
    [savings * multiplier, user_id],
    function (err, result, fields) {
      if (err)
        return res
          .status(400)
          .json({ error: true, message: "Something Went Wrong" });

      res.json({ error: false, message: "Success" });
    }
  );
});
router.post("/remove-savings", (req, res) => {
  const { user_id, savings } = req.body;
  connection.query(
    "UPDATE bank SET savings = savings - ? WHERE user_id = ?",
    [savings, user_id],
    function (err, result, fields) {
      if (err)
        return res
          .status(400)
          .json({ error: true, message: "Something Went Wrong" });

      res.json({ error: false, message: "Success" });
    }
  );
});
router.post("/get-loan-bank", (req, res) => {
  const { user_id, amount } = req.body;
  connection.query(
    "UPDATE bank SET loan_bank = loan_bank + ? WHERE user_id = ?",
    [amount, user_id],
    function (err, result, fields) {
      if (err)
        return res
          .status(400)
          .json({ error: true, message: "Something Went Wrong" });

      res.json({ error: false, message: "Success" });
    }
  );
});
router.post("/get-loan-person", (req, res) => {
  const { user_id, amount } = req.body;
  connection.query(
    "UPDATE bank SET loan_person = loan_person + ? WHERE user_id = ?",
    [amount, user_id],
    function (err, result, fields) {
      if (err)
        return res
          .status(400)
          .json({ error: true, message: "Something Went Wrong" });

      res.json({ error: false, message: "Success" });
    }
  );
});
router.post("/repay-loan-bank", (req, res) => {
  const { user_id, amount } = req.body;
  connection.query(
    "UPDATE bank SET loan_bank = loan_bank - ? WHERE user_id = ?",
    [amount, user_id],
    function (err, result, fields) {
      if (err)
        return res
          .status(400)
          .json({ error: true, message: "Something Went Wrong" });

      res.json({ error: false, message: "Success" });
    }
  );
});
router.post("/repay-loan-person", (req, res) => {
  const { user_id, amount } = req.body;
  connection.query(
    "UPDATE bank SET loan_person = loan_person - ? WHERE user_id = ?",
    [amount, user_id],
    function (err, result, fields) {
      if (err)
        return res
          .status(400)
          .json({ error: true, message: "Something Went Wrong" });

      res.json({ error: false, message: "Success" });
    }
  );
});
router.post("/add-fd", (req, res) => {
  const { user_id, amount } = req.body;
  connection.query(
    "UPDATE bank SET fd = fd + ? WHERE user_id = ?",
    [amount, user_id],
    function (err, result, fields) {
      if (err)
        return res
          .status(400)
          .json({ error: true, message: "Something Went Wrong" });

      res.json({ error: false, message: "Success" });
    }
  );
});
router.post("/remove-fd", (req, res) => {
  const { user_id, amount } = req.body;
  connection.query(
    "UPDATE bank SET fd = fd - ? WHERE user_id = ?",
    [amount, user_id],
    function (err, result, fields) {
      if (err)
        return res
          .status(400)
          .json({ error: true, message: "Something Went Wrong" });

      res.json({ error: false, message: "Success" });
    }
  );
});
router.post("/add-mutual", (req, res) => {
  const { user_id, amount } = req.body;
  connection.query(
    "UPDATE bank SET mutual = mutual + ? WHERE user_id = ?",
    [amount, user_id],
    function (err, result, fields) {
      if (err)
        return res
          .status(400)
          .json({ error: true, message: "Something Went Wrong" });

      res.json({ error: false, message: "Success" });
    }
  );
});
router.post("/remove-mutual", (req, res) => {
  const { user_id, amount } = req.body;
  connection.query(
    "UPDATE bank SET mutual = mutual - ? WHERE user_id = ?",
    [amount, user_id],
    function (err, result, fields) {
      if (err)
        return res
          .status(400)
          .json({ error: true, message: "Something Went Wrong" });

      res.json({ error: false, message: "Success" });
    }
  );
});
export default router;
