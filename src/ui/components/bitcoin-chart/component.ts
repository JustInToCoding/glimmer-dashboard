import Component, { tracked } from '@glimmer/component';
import Highcharts from 'highcharts';


export default class BitcoinChart extends Component {

  @tracked prices = [];
  highcharts: Highcharts.ChartObject;

  constructor(options: object) {
    super(options);

    this.bitCoinPriceFeed();
  }

  async bitCoinPriceFeed() {

    while(true) {
      let currentPriceResponse = await fetch('https://api.coindesk.com/v1/bpi/currentprice.json');
      let currentPrice = await currentPriceResponse.json();
      let currentPricePoint = [
        new Date(currentPrice.time.updatedISO).getTime(),
        currentPrice.bpi.EUR.rate_float
      ];
      this.prices = [
        ...this.prices,
        currentPricePoint
      ];
      this.highcharts.series[0].addPoint(currentPricePoint);
      await new Promise(resolve => setTimeout(resolve, 59990));
    }
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
