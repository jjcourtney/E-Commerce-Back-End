const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all catergories
  try {
    const categoryData = await Category.findAll({
      include: [{
        model: Product
      }]
    });

    res.status(200).json(categoryData);
  } catch (err) {

    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  try {
    const categoryData = await Category.findByPk(req.params.id, {
      include: [{
        model: Product
      }]
    });

    if (!categoryData) {

      res.status(404).json({
        message: 'No matching category found'
      });
      return;
    }

    res.status(200).json(categoryData);

  }
  catch (err) {

    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  // create a new category
  try {
    const categoryData = await Category.create(req.body);

    res.status(200).json(categoryData);
  }
  catch (err) {

    res.status(400).json(err);
  }
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
});



router.delete('/:id', (req, res) => {
  // delete one category by its `id` value
  Product.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((deletedCategory) => {

      res.json(deletedCategory);
    })
    .catch((err) => res.json(err));
});

module.exports = router;
