const router = require('express').Router();
let Puzzle = require('../models/puzzle');
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
    const puzzles = await Puzzle.find();
    res.json(puzzles);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST ROUTE
router.post('/add', upload.single('image'), async (req, res) => {
  const puzzle = new Puzzle({
    name: req.body.name,
    pieces: req.body.pieces,
    image: req.file ? req.file.path : 'uploads/broken.png',
    price: Number(req.body.price),
    quantity: Number(req.body.quantity),
  });

  try {
    const newPuzzle = await puzzle.save();
    res.status(201).json(newPuzzle);
  } catch (err) {}
});

// FINDBYID MIDDLEWARE
async function getPuzzle(req, res, next) {
  let puzzle;
  try {
    puzzle = await Puzzle.findById(req.params.id);
    if (puzzle === null) {
      return res.status(404).json({ message: 'Cannot find puzzle.' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.puzzle = puzzle;
  next();
}

// GET BY ID ROUTE
router.get('/:id', getPuzzle, (req, res) => {
  res.json(res.puzzle);
});

// DELETE ROUTE
router.delete('/:id', getPuzzle, async (req, res) => {
  try {
    await res.puzzle.remove();
    res.json({ message: 'Puzzle deleted.' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// UPDATE ROUTE
router.patch('/:id', upload.single('image'), getPuzzle, async (req, res) => {
  if (req.body.name != null) {
    res.puzzle.name = req.body.name;
  }
  if (req.body.pieces != null) {
    res.puzzle.pieces = req.body.pieces;
  }
  if (req.file) {
    res.puzzle.image = req.file.path;
  }
  if (req.body.price != null) {
    res.puzzle.price = req.body.price;
  }
  if (req.body.quantity != null) {
    res.puzzle.quantity = req.body.quantity;
  }

  try {
    const updatedPuzzle = await res.puzzle.save();
    res.json({ updatedPuzzle });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
