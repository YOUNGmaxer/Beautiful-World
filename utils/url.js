
class UrlParser {
  constructor() {
    this.url = location.href;
    this.path = location.pathname;
  }

  getPath(index = 0) {
    if (!index) {
      return this.path;
    }
    const pathArr = this.path.slice(1).split('/');
    return pathArr[index - 1];
  }
}

export default new UrlParser();
