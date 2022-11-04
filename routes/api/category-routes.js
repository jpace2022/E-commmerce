const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint
// find all categories
router.get('/', (req, res) => { 
  Category.findAll({
    include: Product,
  })
  .then((categories) => {
    res.json(categories);
  })
  .catch((err) => res.status(500).json(err));
  // be sure to include its associated Products
});
// find one category by its `id` value
router.get('/:id', (req, res) => {
  Category.findOne({
    where: { id: req.params.id },
    include: Product,
  })
  // be sure to include its associated Products
  .catch((err) => res.status(500).json(err));
});

// create a new category
router.post('/', (req, res) => {
  Category.create(req.body)
  .then((category) => res.status(200).json(category))
  .catch((err) => res.status(500).json(err));
});

// update a category by its `id` value
router.put('/:id', (req, res) => {
  Category.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
  .then((category) => res.status(200).json(category))
  .catch((err) => res.status(500).json(err));
});

// delete a category by its `id` value
router.delete('/:id', (req, res) => {
  Category.destroy({
    where: {
      id: req.params.id,
    },
  })
  .then((category) => res.status(200).json(category))
  .catch((err) => res.status(500).json(err))
});

module.exports = router;
