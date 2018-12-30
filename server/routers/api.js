const router = require('koa-router')();

const citySights = require('../controllers/sights/citySights');

router.get('/sight', citySights.totalData);

module.exports = router;
