import { Component, OnInit, AfterViewInit, Input } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'chord-component',
  templateUrl: './chord-diagram.html',
  styleUrls: ['./chord-diagram.css']
})
export class ChordComponent implements AfterViewInit {

  private matrix = [
    [0, 0, 1, 0, 0, 0, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0],
    [1, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 2, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 2, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [0, 0, 0, 2, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
    [1, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 2, 0],
    [0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
    [0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
    [1, 0, 2, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
    [0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 1],
    [0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0]
  ];

  private cities = [
    { name: 'assign', color: '#9ACD32' },
    { name: 'number', color: '#EE82EE' },
    { name: 'grade', color: '#377DB8' },
    { name: 'proof', color: '#FF6347' },
    { name: 'web', color: '#D8BFD8' },
    { name: 'prove', color: '#D2B48C' },
    { name: 'request', color: '#4682B4' },
    { name: 'assume', color: '#00FF7F' },
    { name: 'exam', color: '#FFFAFA' },
    { name: 'count', color: '#708090' },
    { name: 'extension', color: '#708090' },
    { name: 'homework', color: '#6A5ACD' },
    { name: 'fix', color: '#87CEEB' },
    { name: 'function', color: '#A0522D' },
    { name: 'statement', color: '#FFF5EE' },
    { name: 'suppose', color: '#2E8B57' },
    { name: 'link', color: '#FA8072' }
  ];

  @Input() data: Array<any> = [];
  // @Input() week: number;

  constructor() {
    this.candlestick();
  }

  ngAfterViewInit() {
  }

  private candlestick() {
    const parseDate = d3.time.format('%Y-%m-%d').parse;
    let TPeriod = '3M';
    const TDays = { '1M': 21, '3M': 63, '6M': 126, '1Y': 252, '2Y': 504, '4Y': 1008 };
    const TIntervals = { '1M': 'day', '3M': 'day', '6M': 'day', '1Y': 'week', '2Y': 'week', '4Y': 'month' };
    const TFormat = { 'day': '%d %b \'%y', 'week': '%d %b \'%y', 'month': '%b \'%y' };
    let genRaw, genData;

    (function () {
      d3.csv('stockdata.csv', genType, function (data) {
        genRaw = data;
        mainjs();
      });
    }());

    function toSlice(data) { return data.slice(-TDays[TPeriod]); }

    function mainjs() {
      const toPress = function () {
        genData = (TIntervals[TPeriod] !== 'day') ?
          dataCompress(toSlice(genRaw), TIntervals[TPeriod]) : toSlice(genRaw);
      };
      toPress(); displayAll();
      d3.select('#oneM').on('click', function () { TPeriod = '1M'; toPress(); displayAll(); });
      d3.select('#threeM').on('click', function () { TPeriod = '3M'; toPress(); displayAll(); });
      d3.select('#sixM').on('click', function () { TPeriod = '6M'; toPress(); displayAll(); });
      d3.select('#oneY').on('click', function () { TPeriod = '1Y'; toPress(); displayAll(); });
      d3.select('#twoY').on('click', function () { TPeriod = '2Y'; toPress(); displayAll(); });
      d3.select('#fourY').on('click', function () { TPeriod = '4Y'; toPress(); displayAll(); });
    }

    function displayAll() {
      changeClass();
      displayCS();
      displayGen(genData.length - 1);
    }

    function changeClass() {
      if (TPeriod === '1M') {
        d3.select('#oneM').classed('active', true);
        d3.select('#threeM').classed('active', false);
        d3.select('#sixM').classed('active', false);
        d3.select('#oneY').classed('active', false);
        d3.select('#twoY').classed('active', false);
        d3.select('#fourY').classed('active', false);
      } else if (TPeriod === '6M') {
        d3.select('#oneM').classed('active', false);
        d3.select('#threeM').classed('active', false);
        d3.select('#sixM').classed('active', true);
        d3.select('#oneY').classed('active', false);
        d3.select('#twoY').classed('active', false);
        d3.select('#fourY').classed('active', false);
      } else if (TPeriod === '1Y') {
        d3.select('#oneM').classed('active', false);
        d3.select('#threeM').classed('active', false);
        d3.select('#sixM').classed('active', false);
        d3.select('#oneY').classed('active', true);
        d3.select('#twoY').classed('active', false);
        d3.select('#fourY').classed('active', false);
      } else if (TPeriod == '2Y') {
        d3.select('#oneM').classed('active', false);
        d3.select('#threeM').classed('active', false);
        d3.select('#sixM').classed('active', false);
        d3.select('#oneY').classed('active', false);
        d3.select('#twoY').classed('active', true);
        d3.select('#fourY').classed('active', false);
      } else if (TPeriod === '4Y') {
        d3.select('#oneM').classed('active', false);
        d3.select('#threeM').classed('active', false);
        d3.select('#sixM').classed('active', false);
        d3.select('#oneY').classed('active', false);
        d3.select('#twoY').classed('active', false);
        d3.select('#fourY').classed('active', true);
      } else {
        d3.select('#oneM').classed('active', false);
        d3.select('#threeM').classed('active', true);
        d3.select('#sixM').classed('active', false);
        d3.select('#oneY').classed('active', false);
        d3.select('#twoY').classed('active', false);
        d3.select('#fourY').classed('active', false);
      }
    }

    function displayCS() {
      let chart = cschart().Bheight(460);
      d3.select('#chart1').call(chart);
      chart = barchart().mname('volume').margin(320).MValue('TURNOVER');
      d3.select('#chart1').datum(genData).call(chart);
      chart = barchart().mname('sigma').margin(400).MValue('VOLATILITY');
      d3.select('#chart1').datum(genData).call(chart);
      hoverAll();
    }

    function hoverAll() {
      d3.select('#chart1').select('.bands').selectAll('rect')
        .on('mouseover', function (d, i) {
          d3.select(this).classed('hoved', true);
          d3.select('.stick' + i).classed('hoved', true);
          d3.select('.candle' + i).classed('hoved', true);
          d3.select('.volume' + i).classed('hoved', true);
          d3.select('.sigma' + i).classed('hoved', true);
          displayGen(i);
        })
        .on('mouseout', function (d, i) {
          d3.select(this).classed('hoved', false);
          d3.select('.stick' + i).classed('hoved', false);
          d3.select('.candle' + i).classed('hoved', false);
          d3.select('.volume' + i).classed('hoved', false);
          d3.select('.sigma' + i).classed('hoved', false);
          displayGen(genData.length - 1);
        });
    }

    function displayGen(mark) {
      var header = csheader();
      d3.select('#infobar').datum(genData.slice(mark)[0]).call(header);
    }




    function barchart() {

      var margin = { top: 300, right: 30, bottom: 10, left: 5 },
        width = 620, height = 60, mname = 'mbar1';

      var MValue = 'TURNOVER';

      function barrender(selection) {
        selection.each(function (data) {

          const x = d3.scale.ordinal()
            .rangeBands([0, width]);

          const y = d3.scale.linear()
            .rangeRound([height, 0]);

          const xAxis = d3.svg.axis()
            .scale(x)
            .tickFormat(d3.time.format('%Y-%m-%d'));

          const yAxis = d3.svg.axis()
            .scale(y)
            .ticks(Math.floor(height / 50));

          const svg = d3.select(this).select('svg')
            .append('g')
            .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

          x.domain(data.map(function (d) { return d.TIMESTAMP; }));
          y.domain([0, d3.max(data, function (d) { return d[MValue]; })]).nice();

          const xtickdelta = Math.ceil(60 / (width / data.length));
          xAxis.tickValues(x.domain().filter(function (d, i) { return !((i + Math.floor(xtickdelta / 2)) % xtickdelta); }));

          svg.append('g')
            .attr('class', 'axis yaxis')
            .attr('transform', 'translate(' + width + ',0)')
            .call(yAxis.orient('right').tickFormat('').tickSize(0));

          //      svg.append("g")
          //          .attr("class", "axis yaxis")
          //          .attr("transform", "translate(0,0)")
          //          .call(yAxis.orient("left"));

          const barwidth = x.rangeBand();
          const fillwidth = (Math.floor(barwidth * 0.9) / 2) * 2 + 1;
          const bardelta = Math.round((barwidth - fillwidth) / 2);

          var mbar = svg.selectAll('.' + mname + 'bar')
            .data([data])
            .enter().append('g')
            .attr('class', mname + 'bar');

          mbar.selectAll('rect')
            .data(function (d) { return d; })
            .enter().append('rect')
            .attr('class', mname + 'fill')
            .attr('x', function (d: any) { return x(d.TIMESTAMP) + bardelta; })
            .attr('y', function (d) { return y(d[MValue]); })
            .attr('class', function (d, i) { return mname + i; })
            .attr('height', function (d) { return y(0) - y(d[MValue]); })
            .attr('width', fillwidth);
        });
      } // barrender
      barrender.mname = function (value) {
        if (!arguments.length) return mname;
        mname = value;
        return barrender;
      };

      barrender.margin = function (value) {
        if (!arguments.length) return margin.top;
        margin.top = value;
        return barrender;
      };

      barrender.MValue = function (value) {
        if (!arguments.length) return MValue;
        MValue = value;
        return barrender;
      };



      return barrender;
    }

    function cschart() {

      var margin = { top: 0, right: 30, bottom: 40, left: 5 },
        width = 620, height = 300, Bheight = 460;

      function csrender(selection) {
        selection.each(function () {

          var interval = TIntervals[TPeriod];

          var minimal = d3.min(genData, function (d: any) { return d.LOW; });
          var maximal = d3.max(genData, function (d: any) { return d.HIGH; });

          var extRight = width + margin.right
          var x = d3.scale.ordinal()
            .rangeBands([0, width]);

          var y = d3.scale.linear()
            .rangeRound([height, 0]);

          var xAxis = d3.svg.axis()
            .scale(x)
            .tickFormat(d3.time.format(TFormat[interval]));

          var yAxis = d3.svg.axis()
            .scale(y)
            .ticks(Math.floor(height / 50));

          x.domain(genData.map(function (d) { return d.TIMESTAMP; }));
          y.domain([minimal, maximal]).nice();

          var xtickdelta = Math.ceil(60 / (width / genData.length))
          xAxis.tickValues(x.domain().filter(function (d, i) { return !((i + Math.floor(xtickdelta / 2)) % xtickdelta); }));

          var barwidth = x.rangeBand();
          var candlewidth = Math.floor(d3.min([barwidth * 0.8, 13]) / 2) * 2 + 1;
          var delta = Math.round((barwidth - candlewidth) / 2);

          d3.select(this).select('svg').remove();
          var svg = d3.select(this).append('svg')
            .attr('width', width + margin.left + margin.right)
            .attr('height', Bheight + margin.top + margin.bottom)
            .append('g')
            .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

          svg.append('g')
            .attr('class', 'axis xaxis')
            .attr('transform', 'translate(0,' + height + ')')
            .call(xAxis.orient('bottom').outerTickSize(0));

          svg.append('g')
            .attr('class', 'axis yaxis')
            .attr('transform', 'translate(' + width + ',0)')
            .call(yAxis.orient('right').tickSize(0));

          svg.append('g')
            .attr('class', 'axis grid')
            .attr('transform', 'translate(' + width + ',0)')
            .call(yAxis.orient('left').tickFormat('').tickSize(width).outerTickSize(0));

          var bands = svg.selectAll('.bands')
            .data([genData])
            .enter().append('g')
            .attr('class', 'bands');

          bands.selectAll('rect')
            .data(function (d) { return d; })
            .enter().append('rect')
            .attr('x', function (d: any) { return x(d.TIMESTAMP) + Math.floor(barwidth / 2); })
            .attr('y', 0)
            .attr('height', Bheight)
            .attr('width', 1)
            .attr('class', function (d, i) { return 'band' + i; })
            .style('stroke-width', Math.floor(barwidth));

          var stick = svg.selectAll('.sticks')
            .data([genData])
            .enter().append('g')
            .attr('class', 'sticks');

          stick.selectAll('rect')
            .data(function (d) { return d; })
            .enter().append('rect')
            .attr('x', function (d: any) { return x(d.TIMESTAMP) + Math.floor(barwidth / 2); })
            .attr('y', function (d: any) { return y(d.HIGH); })
            .attr('class', function (d, i) { return 'stick' + i; })
            .attr('height', function (d: any) { return y(d.LOW) - y(d.HIGH); })
            .attr('width', 1)
            .classed('rise', function (d: any) { return (d.CLOSE > d.OPEN); })
            .classed('fall', function (d: any) { return (d.OPEN > d.CLOSE); });

          var candle = svg.selectAll('.candles')
            .data([genData])
            .enter().append('g')
            .attr('class', 'candles');

          candle.selectAll('rect')
            .data(function (d) { return d; })
            .enter().append('rect')
            .attr('x', function (d: any) { return x(d.TIMESTAMP) + delta; })
            .attr('y', function (d: any) { return y(d3.max([d.OPEN, d.CLOSE])); })
            .attr('class', function (d, i) { return 'candle' + i; })
            .attr('height', function (d: any) { return y(d3.min([d.OPEN, d.CLOSE])) - y(d3.max([d.OPEN, d.CLOSE])); })
            .attr('width', candlewidth)
            .classed('rise', function (d: any) { return (d.CLOSE > d.OPEN); })
            .classed('fall', function (d: any) { return (d.OPEN > d.CLOSE); });

        });
      } // csrender

      csrender.Bheight = function (value) {
        if (!arguments.length) return Bheight;
        Bheight = value;
        return csrender;
      };

      return csrender;
    } // cschart

    function genType(d) {
      d.TIMESTAMP = parseDate(d.TIMESTAMP);
      d.LOW = +d.LOW;
      d.HIGH = +d.HIGH;
      d.OPEN = +d.OPEN;
      d.CLOSE = +d.CLOSE;
      d.TURNOVER = +d.TURNOVER;
      d.VOLATILITY = +d.VOLATILITY;
      return d;
    }

    function timeCompare(date, interval) {
      if (interval == 'week') { var durfn = d3.time.monday(date); }
      else if (interval == 'month') { var durfn = d3.time.month(date); }
      else { var durfn = d3.time.day(date); }
      return durfn;
    }

    function dataCompress(data, interval) {
      var compressedData = d3.nest()
        .key(function (d: any) { return timeCompare(d.TIMESTAMP, interval); })
        .rollup(function (v) {
          return {
            TIMESTAMP: timeCompare(d3.values(v).pop().TIMESTAMP, interval),
            OPEN: d3.values(v).shift().OPEN,
            LOW: d3.min(v, function (d: any) { return d.LOW; }),
            HIGH: d3.max(v, function (d: any) { return d.HIGH; }),
            CLOSE: d3.values(v).pop().CLOSE,
            TURNOVER: d3.mean(v, function (d: any) { return d.TURNOVER; }),
            VOLATILITY: d3.mean(v, function (d: any) { return d.VOLATILITY; })
          };
        })
        .entries(data).map(function (d) { return d.values; });

      return compressedData;
    }



    function csheader() {

      function cshrender(selection) {
        selection.each(function (data) {

          var interval = TIntervals[TPeriod];
          var format = (interval == 'month') ? d3.time.format('%b %Y') : d3.time.format('%b %d %Y');
          var dateprefix = (interval == 'month') ? 'Month of ' : (interval == 'week') ? 'Week of ' : '';
          d3.select('#infodate').text(dateprefix + format(data.TIMESTAMP));
          d3.select('#infoopen').text('O ' + data.OPEN);
          d3.select('#infohigh').text('H ' + data.HIGH);
          d3.select('#infolow').text('L ' + data.LOW);
          d3.select('#infoclose').text('C ' + data.CLOSE);

        });
      } // cshrender

      return cshrender;
    } // csheader
  }
















  private trendChart() {

    function addAxesAndLegend(svg, xAxis, yAxis, margin, chartWidth, chartHeight) {
      var legendWidth = 200,
        legendHeight = 100;



      // clipping to make sure nothing appears behind legend
      svg.append('clipPath')
        .attr('id', 'axes-clip')
        .append('polygon')
        .attr('points', (-margin.left) + ',' + (-margin.top) + ' ' +
          (chartWidth - legendWidth - 1) + ',' + (-margin.top) + ' ' +
          (chartWidth - legendWidth - 1) + ',' + legendHeight + ' ' +
          (chartWidth + margin.right) + ',' + legendHeight + ' ' +
          (chartWidth + margin.right) + ',' + (chartHeight + margin.bottom) + ' ' +
          (-margin.left) + ',' + (chartHeight + margin.bottom));

      var axes = svg.append('g')
        .attr('clip-path', 'url(#axes-clip)');

      axes.append('g')
        .attr('class', 'x axis')
        .attr('transform', 'translate(0,' + chartHeight + ')')
        .call(xAxis);

      axes.append('g')
        .attr('class', 'y axis')
        .call(yAxis)
        .append('text')
        .attr('transform', 'rotate(-90)')
        .attr('y', 6)
        .attr('dy', '.71em')
        .style('text-anchor', 'end')
        .text('Participation score');

      var legend = svg.append('g')
        .attr('class', 'legend')
        .attr('transform', 'translate(' + (chartWidth - legendWidth) + ', 0)');

      legend.append('rect')
        .attr('class', 'legend-bg')
        .attr('width', legendWidth)
        .attr('height', legendHeight);

      legend.append('rect')
        .attr('class', 'outer')
        .attr('width', 75)
        .attr('height', 20)
        .attr('x', 10)
        .attr('y', 10);

      legend.append('text')
        .attr('x', 115)
        .attr('y', 25)
        .text('5% - 95%');

      legend.append('rect')
        .attr('class', 'inner')
        .attr('width', 75)
        .attr('height', 20)
        .attr('x', 10)
        .attr('y', 40);

      legend.append('text')
        .attr('x', 115)
        .attr('y', 55)
        .text('25% - 75%');

      legend.append('path')
        .attr('class', 'median-line')
        .attr('d', 'M10,80L85,80');

      legend.append('text')
        .attr('x', 115)
        .attr('y', 85)
        .text('Median');
    }

    function drawPaths(svg, data, x, y) {
      var upperOuterArea = d3.svg.area()
        .interpolate('basis')
        .x(function (d: any) { return x(d.date) || 1; })
        .y0(function (d: any) { return y(d.pct95); })
        .y1(function (d: any) { return y(d.pct75); });

      var upperInnerArea = d3.svg.area()
        .interpolate('basis')
        .x(function (d: any) { return x(d.date) || 1; })
        .y0(function (d: any) { return y(d.pct75); })
        .y1(function (d: any) { return y(d.pct50); });

      var medianLine = d3.svg.line()
        .interpolate('basis')
        .x(function (d: any) { return x(d.date); })
        .y(function (d: any) { return y(d.pct50); });

      var lowerInnerArea = d3.svg.area()
        .interpolate('basis')
        .x(function (d: any) { return x(d.date) || 1; })
        .y0(function (d: any) { return y(d.pct50); })
        .y1(function (d: any) { return y(d.pct25); });

      var lowerOuterArea = d3.svg.area()
        .interpolate('basis')
        .x(function (d: any) { return x(d.date) || 1; })
        .y0(function (d: any) { return y(d.pct25); })
        .y1(function (d: any) { return y(d.pct05); });

      svg.datum(data);

      svg.append('path')
        .attr('class', 'area upper outer')
        .attr('d', upperOuterArea)
        .attr('clip-path', 'url(#rect-clip)');

      svg.append('path')
        .attr('class', 'area lower outer')
        .attr('d', lowerOuterArea)
        .attr('clip-path', 'url(#rect-clip)');

      svg.append('path')
        .attr('class', 'area upper inner')
        .attr('d', upperInnerArea)
        .attr('clip-path', 'url(#rect-clip)');

      svg.append('path')
        .attr('class', 'area lower inner')
        .attr('d', lowerInnerArea)
        .attr('clip-path', 'url(#rect-clip)');

      svg.append('path')
        .attr('class', 'median-line')
        .attr('d', medianLine)
        .attr('clip-path', 'url(#rect-clip)');
    }

    function addMarker(marker, svg, chartHeight, x) {
      var radius = 32,
        xPos = x(marker.date) - radius - 3,
        yPosStart = chartHeight - radius - 3,
        yPosEnd = (marker.type === 'Client' ? 80 : 160) + radius - 3;

      var markerG = svg.append('g')
        .attr('class', 'marker ' + marker.type.toLowerCase())
        .attr('transform', 'translate(' + xPos + ', ' + yPosStart + ')')
        .attr('opacity', 0);

      markerG.transition()
        .duration(1000)
        .attr('transform', 'translate(' + xPos + ', ' + yPosEnd + ')')
        .attr('opacity', 1);

      markerG.append('path')
        .attr('d', 'M' + radius + ',' + (chartHeight - yPosStart) + 'L' + radius + ',' + (chartHeight - yPosStart))
        .transition()
        .duration(1000)
        .attr('d', 'M' + radius + ',' + (chartHeight - yPosEnd) + 'L' + radius + ',' + (radius * 2));

      markerG.append('circle')
        .attr('class', 'marker-bg')
        .attr('cx', radius)
        .attr('cy', radius)
        .attr('r', radius);

      markerG.append('text')
        .attr('x', radius)
        .attr('y', radius * 0.9)
        .text(marker.type);

      markerG.append('text')
        .attr('x', radius)
        .attr('y', radius * 1.5)
        .text(marker.version);
    }

    function startTransitions(svg, chartWidth, chartHeight, rectClip, markers, x) {
      rectClip.transition()
        .duration(1000 * markers.length)
        .attr('width', chartWidth);

      // markers.forEach(function (marker, i) {
      //   setTimeout(function () {
      //     addMarker(marker, svg, chartHeight, x);
      //   }, 1000 + 500*i);
      // });
    }

    function makeChart(data, markers) {
      var svgWidth = 1200,
        svgHeight = 600,
        margin = { top: 20, right: 20, bottom: 40, left: 40 },
        chartWidth = svgWidth - margin.left - margin.right,
        chartHeight = svgHeight - margin.top - margin.bottom;

      var x = d3.time.scale().range([0, chartWidth])
        .domain(d3.extent(data, function (d: any) { return d.date; })),
        y = d3.scale.linear().range([chartHeight, 0])
          .domain([0, d3.max(data, function (d: any) { return d.pct95; })]);

      var xAxis = d3.svg.axis().scale(x).orient('bottom')
        .innerTickSize(-chartHeight).outerTickSize(0).tickPadding(10),
        yAxis = d3.svg.axis().scale(y).orient('left')
          .innerTickSize(-chartWidth).outerTickSize(0).tickPadding(10);

      //console.log(d3.select("#Community"));
      var svg = d3.select('body').append('svg')
        .attr('width', svgWidth)
        .attr('height', svgHeight)
        .append('g')
        .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');
      console.log(svg);

      // clipping to start chart hidden and slide it in later
      var rectClip = svg.append('clipPath')
        .attr('id', 'rect-clip')
        .append('rect')
        .attr('width', 0)
        .attr('height', chartHeight);

      addAxesAndLegend(svg, xAxis, yAxis, margin, chartWidth, chartHeight);
      drawPaths(svg, data, x, y);
      startTransitions(svg, chartWidth, chartHeight, rectClip, markers, x);
    }

    var parseDate = d3.time.format('%Y-%m-%d').parse;
    //d3.json('data.json', function (error, rawData) {
    // if (error) {
    //   console.error(error);
    //   return;
    // }

    var data = this.rawData.map(function (d) {
      console.log('parse date: ' + parseDate(d.date));
      return {
        date: parseDate(d.date),
        pct05: d.pct05,
        pct25: d.pct25,
        pct50: d.pct50,
        pct75: d.pct75,
        pct95: d.pct95
      };
    });

    //d3.json('markers.json', function (error, markerData) {
    // if (error) {
    //   console.error(error);
    //   return;
    // }

    var markers = this.markerData.map(function (marker) {
      return {
        date: parseDate(marker.date),
        type: marker.type,
        version: marker.version
      };
    });

    makeChart(data, markers);
    //});
    //});

  }

  private rawData = [
    { 'date': '2013-08-23', 'pct95': 324.86, 'pct50': 16.19, 'pct75': 42.56, 'pct25': 6.49, 'pct05': 2.67 },
    { 'date': '2013-08-30', 'pct95': 200.55, 'pct50': 11.14, 'pct75': 22.6, 'pct25': 4.65, 'pct05': 2.6 },
    { 'date': '2013-09-06', 'pct95': 126.91, 'pct50': 17.67, 'pct75': 42.88, 'pct25': 10.62, 'pct05': 2.56 },
    { 'date': '2013-09-13', 'pct95': 114.02, 'pct50': 11.75, 'pct75': 29.15, 'pct25': 6.76, 'pct05': 3.3 },
    { 'date': '2013-09-20', 'pct95': 132.35, 'pct50': 18.0, 'pct75': 29.44, 'pct25': 7.6, 'pct05': 2.74 },
    { 'date': '2013-09-27', 'pct95': 170.06, 'pct50': 10.29, 'pct75': 68.63, 'pct25': 4.35, 'pct05': 2.28 },
    { 'date': '2013-10-04', 'pct95': 248.43, 'pct50': 13.66, 'pct75': 25.34, 'pct25': 5.87, 'pct05': 3.03 },
    { 'date': '2013-10-11', 'pct95': 136.34, 'pct50': 13.59, 'pct75': 28.43, 'pct25': 6.06, 'pct05': 2.99 },
    { 'date': '2013-10-18', 'pct95': 345.42, 'pct50': 18.96, 'pct75': 31.9, 'pct25': 5.89, 'pct05': 1.95 },
    { 'date': '2013-10-25', 'pct95': 223.83, 'pct50': 12.37, 'pct75': 24.16, 'pct25': 7.4, 'pct05': 2.33 },
    { 'date': '2013-11-01', 'pct95': 291.6, 'pct50': 14.33, 'pct75': 40.65, 'pct25': 9.31, 'pct05': 3.89 },
    { 'date': '2013-11-08', 'pct95': 119.01, 'pct50': 11.25, 'pct75': 39.3, 'pct25': 6.68, 'pct05': 2.21 },
    { 'date': '2013-11-15', 'pct95': 87.95, 'pct50': 15.98, 'pct75': 43.03, 'pct25': 7.9, 'pct05': 4.08 },
    { 'date': '2013-11-22', 'pct95': 84.36, 'pct50': 16.95, 'pct75': 24.65, 'pct25': 10.88, 'pct05': 3.27 },
    { 'date': '2013-11-29', 'pct95': 65.04, 'pct50': 13.39, 'pct75': 19.95, 'pct25': 7.99, 'pct05': 2.6 },
    { 'date': '2013-12-06', 'pct95': 94.05, 'pct50': 12.51, 'pct75': 28.42, 'pct25': 6.13, 'pct05': 2.75 },
    { 'date': '2013-12-13', 'pct95': 106.07, 'pct50': 18.1, 'pct75': 35.12, 'pct25': 9.09, 'pct05': 4.24 },
    { 'date': '2013-12-20', 'pct95': 41.79, 'pct50': 9.75, 'pct75': 30.48, 'pct25': 3.48, 'pct05': 2.38 }
  ];

  private markerData = [
    {
      'date': '2014-08-06',
      'type': 'Client',
      'version': '2.0'
    },
    {
      'date': '2014-08-20',
      'type': 'Client',
      'version': '2.1'
    },
    {
      'date': '2014-08-27',
      'type': 'Server',
      'version': '3.5'
    },
    {
      'date': '2014-09-03',
      'type': 'Client',
      'version': '2.2'
    }
  ];





















  private generateChord(cities, matrix) {
    var width = 720,
      height = 720,
      outerRadius = Math.min(width, height) / 2,
      innerRadius = outerRadius - 24;

    var formatPercent = d3.format('.1%');

    var arc = d3.svg.arc()
      .innerRadius(innerRadius)
      .outerRadius(outerRadius);

    var layout = d3.layout.chord()
      .padding(.04)
      .sortSubgroups(d3.descending)
      .sortChords(d3.ascending);

    var path = d3.svg.chord()
      .radius(innerRadius);

    var svg = d3.select('body').append('svg')
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('id', 'circle')
      .attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')');

    svg.append('circle')
      .attr('r', outerRadius);

    //d3.csv("teams.csv", function(cities) {
    //d3.json("matrix.json", function(matrix) {
    console.log(cities);
    // Compute the chord layout.
    layout.matrix(matrix);

    // Add a group per neighborhood.
    var group = svg.selectAll('.group')
      .data(layout.groups)
      .enter().append('g')
      .attr('class', 'group')
      .on('mouseover', mouseover);

    // Add a mouseover title.
    group.append('title').text(function (d, i) {
      return cities[i].name + ': ' + formatPercent(d.value) + ' of origins';
    });

    // Add the group arc.
    var groupPath = group.append('path')
      .attr('id', function (d, i) { return 'group' + i; })
      .attr('d', <any>arc)
      .style('fill', function (d, i) { return cities[i].color; });

    // Add a text label.
    var groupText = group.append('text')
      .attr('x', 6)
      .attr('dy', 15);

    groupText.append('textPath')
      .attr('xlink:href', function (d, i) { return '#group' + i; })
      .text(function (d, i) { return cities[i].name; });

    // Remove the labels that don't fit. :(
    // groupText.filter(function(d, i) { return <any>groupPath[0][i] / 2 - 16 < this.getComputedTextLength(); })
    // .remove();

    // Add the chords.
    var chord = svg.selectAll('.chord')
      .data(layout.chords)
      .enter().append('path')
      .attr('class', 'chord')
      .style('fill', function (d) { return cities[d.source.index].color; })
      .attr('d', <any>path);

    // Add an elaborate mouseover title for each chord.
    chord.append('title').text(function (d) {
      return cities[d.source.index].name
        + ' → ' + cities[d.target.index].name
        + ': ' + formatPercent(d.source.value)
        + '\n' + cities[d.target.index].name
        + ' → ' + cities[d.source.index].name
        + ': ' + formatPercent(d.target.value);
    });

    function mouseover(d, i) {
      chord.classed('fade', function (p) {
        return p.source.index != i
          && p.target.index != i;
      });
    }
    //});
    //});
  }



}
