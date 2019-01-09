import { expect } from 'chai';
const actionsInjector = require('inject-loader!./actions');

const actions = actionsInjector({
  
})

const { getCitiesData } = actions;

describe('actions', () => {
  it('getCitiesData', () => {
    const res = getCitiesData();
    expect(res).to.equal(1);
  });
});
