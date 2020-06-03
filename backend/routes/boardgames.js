require('dotenv').config();
const router = require('express').Router();
let Boardgame = require('../models/boardgame');

const multer = require('multer');
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 3,
  },
  fileFilter: fileFilter,
});

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
router.post('/add', upload.single('image'), async (req, res) => {
  console.log(req.body);
  const boardgame = new Boardgame({
    name: req.body.name,
    description: req.body.description,
    year: Number(req.body.year),
    image: req.file ? req.file.path : 'uploads/broken.png',
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

router.patch('/:id', upload.single('image'), getBoardgame, async (req, res) => {
  console.log(req.body);
  if (req.body.name != null) {
    res.boardgame.name = req.body.name;
  }
  if (req.body.description != null) {
    res.boardgame.description = req.body.description;
  }
  if (req.body.year !== null) {
    res.boardgame.year = req.body.year;
  }
  if (req.file) {
    res.boardgame.image = req.file.path;
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
