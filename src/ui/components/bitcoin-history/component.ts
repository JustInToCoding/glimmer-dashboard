import Component, { tracked } from '@glimmer/component';
import Highcharts from 'highcharts';

export default class BitcoinHistory extends Component {
  @tracked prices = [];
  highcharts: Highcharts.ChartObject;

  constructor(options: object) {
    super(options);

    this.getHistoricalPrices();
  }

  async getHistoricalPrices() {
    let historicalPricesResponse = await fetch('https://api.coindesk.com/v1/bpi/historical/close.json?currency=EUR');
    let historicalPrices = await historicalPricesResponse.json();
    let prices = [];
    let bpi = historicalPrices.bpi;
    let bpiKeys = Object.keys(bpi);
    prices = bpiKeys.map(key => {
      return [
        new Date(key).getTime(),
        bpi[key]
      ];
    });
    this.prices = prices;
    this.highcharts.series[0].setData(prices);
  }

  didInsertElement() {
    this.highcharts = Highcharts.chart(this.element, {
    // options - see http://api.highcharts.com/highcharts
      chart: {
        zoomType: 'x',
        style: {
          fontFamily: 'Roboto'
        }
      },
      title:{
          text:''
      },
      xAxis: {
        type: 'datetime'
      },
      yAxis: {
        title: {
          text: 'Exchange rate'
        },
        plotLines: [{
          value: 0,
          width: 1,
          color: '#808080'
        }]
      },
      legend: {
        enabled: false
      },
      plotOptions: {
        area: {
          fillColor: {
            linearGradient: {
              x1: 0,
              y1: 0,
              x2: 0,
              y2: 1
            },
            stops: [
              [0, Highcharts.getOptions().colors[0]],
              [1, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
            ]
          },
          marker: {
            radius: 2
          },
          lineWidth: 1,
          states: {
            hover: {
              lineWidth: 1
            }
          },
          threshold: null
        }
      },

      series: [{
        type: 'area',
        name: 'USD to EUR',
        data: this.prices
      }]
    });
  }
};
