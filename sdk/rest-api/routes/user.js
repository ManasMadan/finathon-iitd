import express from "express";
import connection from "../sql.js";
import { getTodayDateAsYYYYMMDD } from "../utils.js";

const router = express.Router();

router.post("/create", (req, res) => {
  const { name, id } = req.body;
  connection.query(
    "INSERT INTO users VALUES(?,?);",
    [id, name],
    function (err, result, fields) {
      if (err)
        return res
          .status(400)
          .json({ error: true, message: "Something Went Wrong" });
      connection.query(
        "INSERT INTO bank VALUES(?,0,0,0,0,0);",
        [id],
        function () {
          connection.query("INSERT INTO house VALUES(?,0);", [id], function () {
            connection.query(
              "INSERT INTO vehicles VALUES(?,0);",
              [id],
              function () {
                connection.query(
                  "INSERT INTO wallet VALUES(?,1000,0);",
                  [id],
                  function () {
                    connection.query(
                      "INSERT INTO xp VALUES(?,0);",
                      [id],
                      function () {
                        connection.query("INSERT INTO lastLogin VALUES(?,?)", [
                          id,
                          getTodayDateAsYYYYMMDD(),
                        ]);
                        return res.status(200).json({
                          error: false,
                          message: "User Created Successfully",
                        });
                      }
                    );
                  }
                );
              }
            );
          });
        }
      );
    }
  );
});

router.post("/login", (req, res) => {
  // TODO - THIS WILL CHANGE DEPENDING ON HOUSE LEVEL
  const coins = 500,
    xp = 50,
    savingsInterest = 0.03,
    fdInterest = 0.07,
    loanBankInterest = 0.1,
    loanPersonInterest = 0.2,
    mutualFundsInterest = 0.15;

  const { id } = req.body;
  // console.log(req.body);
  // return;
  connection.query(
    "SELECT IF(EXISTS (SELECT 1 FROM lastLogin WHERE user_id = ? AND lastLoginDate = ?),0,1) AS first_login_today",
    [id, getTodayDateAsYYYYMMDD()],
    function (err, result, fields) {
      if (err)
        return res
          .status(400)
          .json({ error: true, message: "Something Went Wrong" });

      const firstLogin = result[0]["first_login_today"];
      if (firstLogin == 1) {
        connection.query(
          "UPDATE wallet SET coins = coins + ? WHERE user_id = ?",
          [coins, id],
          function () {
            connection.query(
              "UPDATE xp SET xp = xp + ? WHERE user_id = ?",
              [xp, id],
              function () {
                connection.query(
                  "UPDATE lastLogin SET lastLoginDate = ? WHERE user_id = ?;",
                  [getTodayDateAsYYYYMMDD(), id],
                  function () {
                    connection.query(
                      "UPDATE lastLogin SET lastLoginDate = ? WHERE user_id = ?;",
                      [getTodayDateAsYYYYMMDD(), id],
                      function () {
                        connection.query(
                          "UPDATE bank SET savings = savings + savings * ?, loan_bank = loan_bank + loan_bank * ?, loan_person = loan_person + loan_person * ?,fd = fd + fd * ?, mutual = mutual + mutual * ? WHERE user_id = ?;",
                          [
                            savingsInterest,
                            loanBankInterest,
                            loanPersonInterest,
                            fdInterest,
                            mutualFundsInterest,
                            id,
                          ],
                          function () {
                            connection.query(
                              "UPDATE lastLogin SET lastLoginDate = ? WHERE user_id = ?",
                              [getTodayDateAsYYYYMMDD(), id],
                              function () {
                                return res.status(200).json({
                                  error: false,
                                  message: "First Time Login Bonus Given",
                                  firstLogin: true,
                                  xp: xp,
                                  coins: coins,
                                });
                              }
                            );
                          }
                        );
                      }
                    );
                  }
                );
              }
            );
          }
        );
      } else {
        return res.status(200).json({
          error: false,
          message: "Logged In",
          firstLogin: false,
        });
      }
    }
  );
});

router.post("/first-time-login", (req, res) => {
  const { id } = req.body;

  connection.query(
    "SELECT IF(EXISTS (SELECT 1 FROM lastLogin WHERE user_id = ? AND lastLoginDate = ?),0,1) AS first_login_today",
    [id, getTodayDateAsYYYYMMDD()],
    function (err, result, fields) {
      if (err)
        return res
          .status(400)
          .json({ error: true, message: "Something Went Wrong" });

      const firstLogin = result[0]["first_login_today"];
      res.status(200).json({
        error: false,
        message: "Success",
        firstLogin: firstLogin == 1 ? true : false,
      });
    }
  );
});

export default router;
