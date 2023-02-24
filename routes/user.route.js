const { Router } = require("express");
const { body, validationResult } = require("express-validator");
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
userRouter.put(
  "/:id/shows",
  body("genre").custom((value) => {
    const genreCorrect = checkGenre(value);
    if (genreCorrect) {
      return true;
    }
    throw new Error("Genre must be Comedy, Drama, Horror or Sitcom");
  }),
  body("status").not().isEmpty().trim(),
  body("status").isLength({ min: 5, max: 25 }),
  body("rating").not().isEmpty().trim(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.json(errors.array());
    } else {
      try {
        const user = await User.findByPk(req.params.id);
        Show.create({
          title: req.body.title,
          genre: req.body.genre,
          rating: req.body.rating,
          status: req.body.status,
          userId: user.id,
        });
        res.json("show created under user");
      } catch (err) {
        res.send(err.message);
      }
    }
  }
);

function checkGenre(value) {
  const showGenres = ["Comedy", "Drama", "Horror", "Sitcom"];
  let genreFound = false;
  showGenres.forEach((genre) => {
    if (genre === value) {
      genreFound = true;
    }
  });

  return genreFound;
}

module.exports = { userRouter };
