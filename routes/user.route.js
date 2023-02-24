const { Router } = require("express");
const { User, Show } = require("../models/index");
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

// Create new show for user
userRouter.put("/:id/shows", async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    Show.create({
      title: req.body.title,
      genre: req.body.genre, // check how to enforce enum? validation?
      rating: req.body.rating,
      status: req.body.status,
      userId: user.id
    });
    res.json("show created under user")
  } catch (err) {
    res.send(err.message);
  }
});

module.exports = { userRouter };
