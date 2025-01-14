const { Router } = require("express");
const { body, validationResult } = require("express-validator");
const { Show } = require("../models/index");
const showRouter = Router();

showRouter.get("/", async (req, res) => {
  try {
    const shows = await Show.findAll();
    if (shows.length === 0) {
      res.send("No shows found");
    }
    res.json(shows);
  } catch (err) {
    res.send(err.message);
  }
});

showRouter.get("/:id", async (req, res) => {
  try {
    const show = await Show.findByPk(req.params.id);
    if (!show) {
      throw new Error("Show does not exist");
    }
    res.json(show);
  } catch (err) {
    res.send(err.message);
  }
});

showRouter.get("/genres/:genre", async (req, res) => {
  try {
    const letter = req.params.genre.charAt(0).toUpperCase();
    const genre = letter + req.params.genre.slice(1);

    const genreShows = await Show.findAll({
      where: {
        genre: genre,
      },
    });

    if (genreShows.length === 0) {
      throw new Error("No shows in this genre found");
    }
    res.json(genreShows);
  } catch (err) {
    res.send(err.message);
  }
});

showRouter.delete("/:id", async (req, res) => {
  try {
    const show = await Show.findByPk(req.params.id);
    await show.destroy();
    res.send("show deleted");
  } catch (err) {
    res.json(err.message);
  }
});

// Update rating
showRouter.put(
  "/:id/watched",
  body("rating").not().isEmpty().trim(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.json(errors.array());
    } else {
      try {
        const show = await Show.findByPk(req.params.id);
        await show.update({ rating: req.body.rating });
        res.send("show rating updated");
      } catch (err) {
        res.send(err.message);
      }
    }
  }
);

// Update status
showRouter.put(
  "/:id/updates",
  body("status").not().isEmpty().trim(),
  body("status").isLength({ min: 5, max: 25 }),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.json(errors.array());
    } else {
      try {
        const show = await Show.findByPk(req.params.id);
        await show.update({ status: req.body.status });
        res.send("show status updated");
      } catch (err) {
        res.send(err.message);
      }
    }
  }
);

module.exports = { showRouter };
