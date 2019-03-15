import echarts from 'echarts/lib/echarts';
import _debounce from 'lodash/debounce';

function init(className, option = {}, { legend = false } = {}) {
  const dom = document.getElementsByClassName(className)[0];
  const chart = echarts.init(dom);
  chart.showLoading();

  let baseOption = {
    textStyle: {
      color: '#ccc'
    },
    color: ['#9A7D0A', '#28B463', '#909497', '#A04000', '#AD1457', '#4527A0', '#004D40']
  };

  if (legend) {
    baseOption.legend = {
      inactiveColor: '#666',
      textStyle: {
        color: '#ccc'
      }
    };
  }

  chart.setOption(option);
  chart.setOption(baseOption);
  chart.hideLoading();
  // 这里对改变窗口时的自适应进行了防抖操作，避免触发过于频繁消耗性能
  window.addEventListener('resize', _debounce(chart.resize, 300));

  return chart;
}

export default init;
