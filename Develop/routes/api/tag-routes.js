const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try{
    const tagData = await Tag.findAll({
      include: [
      {
        model: Product,
        through: {model:ProductTag},
      },
    ],
    });
    res.status(200).json(tagData);
  }catch(err){
    res.status(500).json(err);
  }
});

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try{
    const tagData = await Tag.findByPk(req.params.id,{
      include: [
        {
          model: Product,
          through: {model:ProductTag},
        },
      ],
    });
    if(!tagData){
      res.status(404).json({ message: 'Not a Tag in our system'});
      return;
    }
    res.status(200).json(tagData);
  }catch(err){
    res.status(500).json(err);
  }

});

router.post('/', (req, res) => {
  // create a new tag
  try{
    const tagData = await Tag.create({
      reader_id: req.body.reader_id,
    });
    res.status(200).json(tagData);
  }catch(err){
    res.status(500).json(err);
  }
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  try{
    const tagData = await Tag.findByPk(req.params.id,{
      include: [{model: Category}],
    });
    if(!tagData){
      res.status(404).json({ message: 'Not a category in our system'});
      return;
    }
    //update category
    if(req.body.category_name){
      await tagData.update({ tag_name: req.body.tag_name});
    }
    res.status(200).json(tagData);
  }catch(err){
    res.status(500).json(err);
  }
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  try{
    const tagData = await Tag.destroy({
      where: {
        id: req.params.id,
      },
    });
    if(!tagData){
      res.status(404).json({ message: 'Not an ID in our system'});
      return;
    }
    res.status(200).json(tagData);

  }catch(err){
    res.status(500).json(err);
  }
});

module.exports = router;
