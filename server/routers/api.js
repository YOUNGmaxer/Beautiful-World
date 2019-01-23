const router = require('koa-router')();

const citySights = require('../controllers/sights/citySights');
const chinaMap = require('../controllers/map/chinaMap');

/**
 * @description: 获取景点数据
 */
// 获取某个城市的景点数据
router.get('/sight/:key', citySights.totalData);

/**
 * @description: 获取地图数据
 */
// 获取中国全地图数据
router.get('/map', chinaMap.getMapData);
// 获取省份地图数据
router.get('/map/prov/:param', chinaMap.findOneByCodeOrName('province_map', 'code'));
router.get('/map/prov/name/:param', chinaMap.findOneByCodeOrName('province_map', 'name'));

/**
 * @description: 获取省城区信息
 */
// 包括所有省份的单独信息
router.get('/code/prov', chinaMap.getProvinceCode);
// 按参数获取某个省份的信息，其中包含城市、区、县
router.get('/code/pc/:param', chinaMap.findOneByCodeOrName('code_pc', 'code'));
router.get('/code/pc/name/:param', chinaMap.findOneByCodeOrName('code_pc', 'name'));
router.get('/code/pca/:param', chinaMap.findOneByCodeOrName('code_pca', 'code'));
router.get('/code/pca/name/:param', chinaMap.findOneByCodeOrName('code_pca', 'name'));
router.get('/code/pcas/:param', chinaMap.findOneByCodeOrName('code_pcas', 'code'));
router.get('/code/pcas/name/:param', chinaMap.findOneByCodeOrName('code_pcas', 'name'));
module.exports = router;
