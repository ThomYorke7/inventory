const router = require('express').Router();
let Boardgame = require('../models/boardgame');

// GET ROUTE
router.get('/', async (req, res) => {
  try {
    const boardgames = await Boardgame.find();
    res.json(boardgames);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST ROUTE
router.post('/add', async (req, res) => {
  const boardgame = new Boardgame({
    name: req.body.name,
    description: req.body.description,
    author: req.body.author,
    publisher: req.body.publisher,
    duration: Number(req.body.duration),
    minPlayers: Number(req.body.minPlayers),
    maxPlayers: Number(req.body.maxPlayers),
    price: Number(req.body.price),
    quantity: Number(req.body.quantity),
  });

  try {
    const newBoardgame = await boardgame.save();
    res.status(201).json(newBoardgame);
    console.log('Game Added');
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// FindById Middleware
async function getBoardgame(req, res, next) {
  let boardgame;
  try {
    boardgame = await Boardgame.findById(req.params.id);
    if (boardgame === null) {
      return res.status(404).json({ message: 'Cannot find boardgame' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.boardgame = boardgame;
  next();
}

// GET BY ID ROUTE
router.get('/:id', getBoardgame, (req, res) => {
  res.json(res.boardgame);
});

// DELETE ROUTE
router.delete('/:id', getBoardgame, async (req, res) => {
  try {
    await res.boardgame.remove();
    res.json({ message: 'Boardgame deleted.' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// UPDATE ROUTE
router.patch('/:id', getBoardgame, async (req, res) => {
  if (req.body.name != null) {
    res.boardgame.name = req.body.name;
  }
  if (req.body.description != null) {
    res.boardgame.description = req.body.description;
  }
  if (req.body.author != null) {
    res.boardgame.author = req.body.author;
  }
  if (req.body.publisher != null) {
    res.boardgame.publisher = req.body.publisher;
  }
  if (req.body.duration != null) {
    res.boardgame.duration = req.body.duration;
  }
  if (req.body.minPlayers != null) {
    res.boardgame.minPlayers = req.body.minPlayers;
  }
  if (req.body.maxPlayers != null) {
    res.boardgame.maxPlayers = req.body.maxPlayers;
  }
  if (req.body.price != null) {
    res.boardgame.price = req.body.price;
  }
  if (req.body.quantity != null) {
    res.boardgame.quantity = req.body.quantity;
  }

  try {
    const updatedBoardgame = await res.boardgame.save();
    res.json({ updatedBoardgame });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
