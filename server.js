const express = require("express");
const { db } = require("./db");
const { userRouter } = require("./routes/user.route");
const { showRouter } = require("./routes/show.route");

const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));

app.use("/users", userRouter);
app.use("/shows", showRouter);

app.listen(port, () => {
  db.sync();
  console.log(`Listening on port ${port}`);
});
