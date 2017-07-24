import Component from '@glimmer/component';
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/bar';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';


export default class BitcoinChart extends Component {

  constructor(options: object) {
    super(options);

    fetch('http://api.coindesk.com/v1/bpi/currentprice.json').then((response) => {
      return response.json();
    })
    .then((json) => { console.log(json); })
  }

  didInsertElement() {
    let myChart = echarts.init(this.element);
    myChart.setOption({
      title: { text: 'ECharts introductory example' },
      tooltip: {},
      xAxis: {
          data: ["shirt","cardign","chiffon shirt","pants","heels","socks"]
      },
      yAxis: {},
      series: [{
          name: 'sales',
          type: 'bar',
          data: [5, 20, 36, 10, 10, 20]
      }]
    });
  }
};
