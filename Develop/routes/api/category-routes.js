const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try{
    const categoryData = await Category.findAll({
      include: [{model: Product}],
    });
    res.status(200).json(categoryData);
  }catch(err){
    res.status(500).json(err);
  }
});

// get one product
router.get('/:id', async (req, res) => {
  // find a single product by its `id`
  // be sure to include its associated Category and Tag data
  try{
    const categoryData = await Category.findByPk(req.params.id,{
      include: [
        {model: Product},
      ],
    });
    if(!categoryData){
      res.status(404).json({ message: 'Not a Category in our system'});
      return;
    }
    res.status(200).json(categoryData);
  }catch(err){
    res.status(500).json(err);
  }
});


router.post('/', async (req, res) => {
  // create a new category
  try{
    const {category_name} = req.body;
    const categoryData = await Category.create({category_name});
    res.status(200).json(categoryData);
  }catch(err){
    res.status(500).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try{
    const categoryData = await Category.update(req.body,{
      where: {
        id: req.params.id,
      },
      include: [{ model: Product }],
    });
    if(!categoryData){
      res.status(404).json({ message: 'Not a category in our system'});
      return;
    }
    //update category
    res.status(200).json(categoryData);
  }catch(err){
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try{
    const categoryData = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });
    if(!categoryData){
      res.status(404).json({ message: 'Not a category in our system'});
      return;
    }
    res.status(200).json(categoryData);

  }catch(err){
    res.status(500).json(err);
  }
});

module.exports = router;
