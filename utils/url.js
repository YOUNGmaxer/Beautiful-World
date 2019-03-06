// TODO: 有没有更好的写法，避免 url 和 path 不是动态的
class UrlParser {
  constructor() {
    this.url = location.href;
    this.path = location.pathname;
  }

  refresh() {
    this.url = location.href;
    this.path = location.pathname;
  }

  /**
   * @description: 提取路径的内容，可以指定某一级路径
   * @param index {Number}
   * @return: {String} 路径的值
   */
  getPath(index = 0) {
    this.refresh();
    if (!index) {
      return this.path;
    }
    const pathArr = this.path.slice(1).split('/');
    return pathArr[index - 1];
  }

  /**
   * @description: 构造 url
   * @return: url
   */
  getUrl(path) {
    this.refresh();
    return `//${location.host}${path}`;
  }
}

export default new UrlParser();
