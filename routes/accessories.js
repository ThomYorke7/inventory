const router = require('express').Router();
const Accessory = require('../models/accessory');
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
    const accessories = await Accessory.find();
    res.json(accessories);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST ROUTE
router.post('/add', upload.single('image'), async (req, res) => {
  const accessory = new Accessory({
    name: req.body.name,
    category: req.body.category,
    image: req.file ? req.file.path : 'uploads/broken.png',
    price: req.body.price,
    quantity: req.body.quantity,
  });

  try {
    const newAccessory = await accessory.save();
    res.status(201).json(newAccessory);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// FINDBYID MIDDLEWARE
async function getAccessory(req, res, next) {
  let accessory;
  try {
    accessory = await Accessory.findById(req.params.id);
    if (accessory === null) {
      return res.status(400).json({ message: 'Cannot find accessory.' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }

  res.accessory = accessory;
  next();
}

// GET BY ID ROUTE
router.get('/:id', getAccessory, (req, res) => {
  res.json(res.accessory);
});

// DELETE ROUTE
router.delete('/:id', getAccessory, async (req, res) => {
  try {
    await res.accessory.remove();
    res.json({ message: 'Accessory deleted.' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// UPDATE ROUTE
router.patch('/:id', upload.single('image'), getAccessory, async (req, res) => {
  if (req.body.name != null) {
    res.accessory.name = req.body.name;
  }
  if (req.body.category != null) {
    res.accessory.category = req.body.category;
  }
  if (req.file) {
    res.accessory.image = req.file.path;
  }
  if (req.body.price != null) {
    res.accessory.price = req.body.price;
  }
  if (req.body.quantity != null) {
    res.accessory.quantity = req.body.quantity;
  }

  try {
    const updatedAccessory = await res.accessory.save();
    res.json({ updatedAccessory });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
