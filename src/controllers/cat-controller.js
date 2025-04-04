import { addCat, findCatById, listAllCats, modifyCat, removeCat, findCatsByUserId } from '../models/cat-model.js';

const getCat = async (req, res) => {
  const cats = await listAllCats();
  res.json(cats);
};

const getCatById = async (req, res) => {
  const cat = await findCatById(req.params.id);
  if (cat) {
    res.json(cat);
  } else {
    res.sendStatus(404);
  }
};

const postCat = async (req, res) => {
  console.log('Form data:', req.body);
  console.log('File data:', req.file);
  const result = await addCat(req.body, req.file);
  if (result.cat_id) {
    res.status(201).json({ message: 'New cat added.', result });
  } else {
    res.sendStatus(400);
  }
};

const putCat = async (req, res) => {
  const result = await modifyCat(req.body, req.params.id);
  if (result) {
    res.status(200).json(result);
  } else {
    res.sendStatus(404);
  }
};

const deleteCat = async (req, res) => {
  const result = await removeCat(req.params.id);
  if (result) {
    res.status(200).json(result);
  } else {
    res.sendStatus(404);
  }
};

const getCatsByUserId = async (req, res) => {
  const cats = await findCatsByUserId(req.params.id);
  res.json(cats);
};

export { getCat, getCatById, postCat, putCat, deleteCat, getCatsByUserId };
