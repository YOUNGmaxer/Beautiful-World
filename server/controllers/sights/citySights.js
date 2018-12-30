const fs = require('fs');
const path = require('path');

class CitySights {
  async totalData(ctx) {
    const PATH = path.join(__dirname, '../../mock/qunar-hot-sights.json');
    const data = JSON.parse(fs.readFileSync(PATH));
    ctx.body = data;
  }
}

module.exports = new CitySights();
