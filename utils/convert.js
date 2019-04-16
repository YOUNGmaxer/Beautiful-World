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

/**
 * @description: 实现一个二维矩阵转置
 * @param {type}
 * @return:
 */
function transArray(arr) {
  let n = arr.length;
  let m = arr[0].length;
  let resArr = [];
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      if (!resArr[j]) {
        resArr[j] = new Array(n);
      }
      resArr[j][i] = arr[i][j];
    }
  }
  return resArr;
}

export {
  convertObj2Array,
  transArray
};
