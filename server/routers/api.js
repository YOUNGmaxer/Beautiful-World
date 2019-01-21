const router = require('koa-router')();

const citySights = require('../controllers/sights/citySights');
const chinaMap = require('../controllers/map/chinaMap');

router.get('/sight/:key', citySights.totalData);
// 获取地图数据
router.get('/map', chinaMap.getMapData);
router.get('/map/province-code', chinaMap.getProvinceCode);


module.exports = router;
