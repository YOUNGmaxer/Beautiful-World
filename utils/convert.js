/**
 * @description: 将一个对象转化为数组
 * @param {Object} 待转化对象
 * @return: arr 转化后的数组
 */
function convertObj2Array(obj) {
  let arr = [];
  for (let key in obj) {
    if ({}.hasOwnProperty.call(obj, key)) {
      arr.push([key, obj[key]]);
    }
  }
  return arr;
}

export {
  convertObj2Array
};
