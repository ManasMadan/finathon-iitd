import express from "express";
import assetsRouter from "./assets.js";
import bankRouter from "./bank.js";
import walletRouter from "./wallet.js";
import xpRouter from "./xp.js";
import vehiclesRouter from "./vehicles.js";
import houseRouter from "./house.js";
import foodRouter from "./food.js";
import leaderboardRouter from "./leaderboard.js";

const router = express.Router();

router.use("/assets", assetsRouter);
router.use("/bank", bankRouter);
router.use("/wallet", walletRouter);
router.use("/xp", xpRouter);
router.use("/vehicles", vehiclesRouter);
router.use("/house", houseRouter);
router.use("/food", foodRouter);
router.use("/leaderboard", leaderboardRouter);

export default router;
