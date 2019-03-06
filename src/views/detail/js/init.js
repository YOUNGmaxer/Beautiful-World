import echarts from 'echarts/lib/echarts';

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
  window.addEventListener('resize', chart.resize);

  return chart;
}

export default init;
