const router = require('koa-router')();

const citySights = require('../controllers/sights/citySights');

router.get('/sight/:key', citySights.totalData);

module.exports = router;
