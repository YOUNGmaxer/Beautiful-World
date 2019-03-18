const router = require('koa-router')();

const citySights = require('Controller/sights/citySights');
const chinaMap = require('Controller/map/chinaMap');

/**
 * @description: 获取景点数据
 */
// 获取某个城市的景点数据
router.get('/sight/city/name/:city', citySights.getCitySightsByName);
// 根据 code 获取某个城市的景点数据
// 由于目前需要通过城市名才能获取到景点的数据，所以需要先将 code 转化为城市名
router.get('/sight/city/:code', citySights.getCitySightsByCode);
// 获取某个省的所有城市的景点数据（需要兼容直辖市）
router.get('/sight/prov/:code', citySights.getProvSights);
// 根据景点id查询景点数据
router.get('/sight/:sid', citySights.getSightBySid);

/**
 * @description: 获取景点评论
 */
router.get('/sight/comment/:rid', citySights.getSightComments);

/**
 * @description: 获取地图数据
 */
// 获取中国全地图数据
router.get('/map', chinaMap.getMapData);
router.get('/map/china', chinaMap.getChinaMap);
// 获取省份地图数据
router.get('/map/prov/:param', chinaMap.findOneByCodeOrName('province_map', 'code'));
router.get('/map/prov/name/:param', chinaMap.findOneByCodeOrName('province_map', 'name'));
// 获取城市地图数据
router.get('/map/city/:param', chinaMap.findOneByCodeOrName('city_map', 'code'));
router.get('/map/city/name/:param', chinaMap.findOneByCodeOrName('city_map', 'name'));
// 根据城市名获取城市code
router.get('/city/name/:param', chinaMap.getCityCodeByName);

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


/**
 * @description: 中文词汇情感分析接口
 * TODO: 还是没有一个比较好的方案来实现
 */

module.exports = router;
