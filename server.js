const { db } = require("./db");
const { Show, User } = require("./models/index");

const express = require("express");
const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));

/*    USERS   */
app.get("/users", async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users)
  } catch (err) {
    res.send(err.message);
  }
});

app.get("/users/:id", async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    res.json(user)
  } catch (err) {
    res.send(err.message);
  }
});

app.get("/users/:id/shows", async (req, res) => {
  try {
    const user = await User.findAll({
      include: [{ model: Show }],
      where: { id: req.params.id }
    });
    res.json(user)
  } catch (err) {
    res.send(err.message);
  }
});

// app.put("/users/:id/shows", async (req, res) => {
//   try {
//     const user = await User.findAll({
//       include: [{ model: Show }],
//       where: { id: req.params.id }
//     });

//     let userShows = user.shows;
//     // userShows.push(req.body.show);
//     // user.update({ shows: userShows });

//     // const updatedUser = await User.findAll({
//     //   include: [{ model: Show }],
//     //   where: { id: req.params.id }
//     // });

//     res.json(user.shows)
//   } catch (err) {
//     res.send(err.message);
//   }
// });

app.listen(port, () => {
  db.sync();
  console.log(`Listening on port ${port}`);
});