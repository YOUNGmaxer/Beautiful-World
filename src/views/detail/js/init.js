import echarts from 'echarts/lib/echarts';

function init(className, option = {}) {
  const dom = document.getElementsByClassName(className)[0];
  const chart = echarts.init(dom);
  chart.showLoading();

  const baseOption = {
    textStyle: {
      color: '#fff'
    },
    color: ['#9A7D0A', '#28B463', '#909497', '#A04000']
  };

  chart.setOption(option);
  chart.setOption(baseOption);
  chart.hideLoading();
  window.addEventListener('resize', chart.resize);

  return chart;
}

export default init;
