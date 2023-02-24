const { Router } = require("express");
const { Show } = require("../models/index");
const showRouter = Router();

//TODO: Add handling for empty returns

showRouter.get("/", async (req, res) => {
  try {
    const shows = await Show.findAll();
    res.json(shows);
  } catch (err) {
    res.send(err.message);
  }
});

showRouter.get("/:id", async (req, res) => {
  try {
    const show = await Show.findByPk(req.params.id);
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
    res.json(genreShows);
  } catch (err) {
    res.send(err.message);
  }
});

module.exports = { showRouter };
