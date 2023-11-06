import express from "express";
import userRouter from "./routes/user.js";
import wealthBuilderRouter from "./routes/wealth-builder/index.js";
import cors from "cors";

const app = express();
const PORT = 3000 || process.env.PORT;
app.use(express.json());
app.use(cors({ origin: "*" }));

app.get("/", (req, res) => {
  res.status(200).send("Working !!!");
});

app.use("/wealth-builder", wealthBuilderRouter);
app.use("/user", userRouter);

app.listen(PORT, (error) => {
  if (!error)
    console.log(
      "Server is Successfully Running, and App is listening on port " + PORT
    );
  else console.log("Error occurred, server can't start", error);
});
