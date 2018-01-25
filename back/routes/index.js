const express = require('express');
const router = express.Router();
const Gifts = require('../controllers/Gifts');

const asyncRoute = fn => (req, res, next) => fn(req)
  .then(answer => res.json(answer))
  .catch(next);

router
  .route('/')
  .get(asyncRoute(Gifts.read))
  .post(asyncRoute(Gifts.create))
  .delete(asyncRoute(Gifts.delete));

router
  .route('/notify')
  .get(asyncRoute(Gifts.notify));

module.exports = router;
