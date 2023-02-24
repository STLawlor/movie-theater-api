const { Router } = require("express");
const { User } = require("../models/index");
const userRouter = Router();

//TODO: Add handling for empty returns

userRouter.get("/", async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (err) {
    res.send(err.message);
  }
});

userRouter.get("/:id", async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    res.json(user);
  } catch (err) {
    res.send(err.message);
  }
});

userRouter.get("/:id/shows", async (req, res) => {
  try {
    const user = await User.findAll({
      include: [{ model: Show }],
      where: { id: req.params.id },
    });
    res.json(user);
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

module.exports = { userRouter };
