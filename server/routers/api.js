const router = require('koa-router')();

const citySights = require('Controller/sights/citySights');
const chinaMap = require('Controller/map/chinaMap');

/**
 * @description: 获取景点数据
 */
// 获取某个城市的景点数据
router.get('/sight/:city', citySights.totalData);
// 获取某个省的所有城市的景点数据（需要兼容直辖市）
router.get('/sight/prov/:code', citySights.getProvSights);

/**
 * @description: 获取景点评论
 */
router.get('/sight/comment/:rid', citySights.getSightComments);

/**
 * @description: 获取地图数据
 */
// 获取中国全地图数据
router.get('/map', chinaMap.getMapData);
// 获取省份地图数据
router.get('/map/prov/:param', chinaMap.findOneByCodeOrName('province_map', 'code'));
router.get('/map/prov/name/:param', chinaMap.findOneByCodeOrName('province_map', 'name'));
// 获取城市地图数据
router.get('/map/city/:param', chinaMap.findOneByCodeOrName('city_map', 'code'));
router.get('/map/city/name/:param', chinaMap.findOneByCodeOrName('city_map', 'name'));

/**
 * @description: 获取省城区信息
 */
// 包括所有省份的单独信息
router.get('/code/prov', chinaMap.getProvinceCode);
// 按参数获取某个省份的信息，其中包含城市、区、县。（不传参表示获取所有数据）
router.get('/code/pc/:param?', chinaMap.findOneByCodeOrName('code_pc', 'code'));
router.get('/code/pc/name/:param?', chinaMap.findOneByCodeOrName('code_pc', 'name'));
router.get('/code/pca/:param?', chinaMap.findOneByCodeOrName('code_pca', 'code'));
router.get('/code/pca/name/:param?', chinaMap.findOneByCodeOrName('code_pca', 'name'));
router.get('/code/pcas/:param?', chinaMap.findOneByCodeOrName('code_pcas', 'code'));
router.get('/code/pcas/name/:param?', chinaMap.findOneByCodeOrName('code_pcas', 'name'));
module.exports = router;
