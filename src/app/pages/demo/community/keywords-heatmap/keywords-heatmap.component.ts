import { Component, OnInit, Input } from '@angular/core';
import { ApiRequestService } from '../../api-request.service';
import * as d3 from 'd3';

@Component({
  selector: 'app-community-keywords-heatmap',
  templateUrl: './keywords-heatmap.component.html',
  styleUrls: ['./keywords-heatmap.component.css'],
  providers: [ApiRequestService]
})
export class CommunityKeywordsHeatmapComponent implements OnInit {

  @Input() communityName: string;

  constructor(private apiRequestService: ApiRequestService) { }

  ngOnInit() {
  	this.apiRequestService.setApiService('communityKeywords');
    var data = {
      name: this.communityName
    };

    this.apiRequestService.process(data).subscribe((keywords: any) => {
      console.log(keywords);
	  	// this.buildHeatmap(keywords.data[0].data);
	  	this.buildHeatmap(keywords.data[0].data);
	  });
  }

  private buildHeatmap(data: {[s: string]: number[];}) {
		var keywords = Object.keys(data),
				nWeeks = Object.values(data)[0].length,
        weeks = Array.from(Array(nWeeks).keys()),
        margin = {
        	top: keywords.reduce((prev, curr) => prev.length > curr.length ? prev : curr, '').length * 10,
        	right: 0,
        	bottom: 100,
        	left: 100
        },
        height = 700 - margin.top - margin.bottom,
        gridSize = Math.floor(height / (1.5 * weeks.length)) > 50 ? 50 : Math.floor(height / (1.5 * weeks.length)),
        width = (keywords.length + 7) * gridSize - margin.left - margin.right,
        legendElementWidth = gridSize*2,
        buckets = 9,
        colors = ['#ffffd9','#edf8b1','#c7e9b4','#7fcdbb','#41b6c4','#1d91c0','#225ea8','#253494','#081d58'];

    var expandedData = [];
    var keyword_idx = 1;
    for (let keyword in data) {
    	for (let week = 0; week < data[keyword].length; week++) {
  			expandedData.push({
  				keyword: keyword_idx,
  				week: week + 1,
  				value: data[keyword][week]
  			});
    	}
    	keyword_idx++;
    }

    var svg = d3.select('#chart').append('svg')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
        .append('g')
        .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

    var weekLabels = svg.selectAll('.weekLabel')
        .data(weeks)
        .enter().append('text')
          .text(function (d) { return d; })
          .attr('x', 0)
          .attr('y', function (d, i) { return i * gridSize; })
          .style('text-anchor', 'end')
          .attr('transform', 'translate(-6,' + gridSize / 1.5 + ')')
          .attr('class', function (d, i) { return ((i >= 0 && i <= 4) ? 'weekLabel mono axis axis-workweek' : 'weekLabel mono axis'); });

    var keywordLabels = svg.selectAll('.keywordLabel')
        .data(keywords)
        .enter().append('text')
          .text(function(d) { return d; })
          .attr('x', 0.2 * gridSize)
          .attr('y', function(d, i) { return i * gridSize + gridSize / 2; })
          .style('text-anchor', 'start')
          .attr('transform', ' rotate(270)')
          .attr('class', function(d, i) { return ((i >= 7 && i <= 16) ? 'keywordLabel mono axis axis-worktime' : 'keywordLabel mono axis'); });

    var colorScale = d3.scaleQuantile()
          .domain([0, buckets - 1, d3.max(expandedData, function (d) { return d.value; })]);
          // .range(colors);

    var cards = svg.selectAll('.week')
        .data(expandedData, function(d: any) {return d.week+':'+d.keyword;});

    cards.append('title');

    cards.enter().append('rect')
        .attr('x', function(d) { return (d.keyword - 1) * gridSize; })
        .attr('y', function(d) { return (d.week - 1) * gridSize; })
        .attr('rx', 4)
        .attr('ry', 4)
        .attr('class', 'week bordered')
        .attr('width', gridSize)
        .attr('height', gridSize)
        .style('fill', colors[0]);

    cards.transition().duration(1000)
        .style('fill', function(d: any) { return colorScale(d.value); });

    cards.select('title').text(function(d) { return d.value; });

    cards.exit().remove();

    const legend = svg.selectAll('.legend')
        .data([0].concat(colorScale.quantiles()), function(d: any) { return d; });

    legend.enter().append('g')
        .attr('class', 'legend');

    legend.append('rect')
      .attr('x', function(d, i) { return legendElementWidth * i; })
      .attr('y', height)
      .attr('width', legendElementWidth)
      .attr('height', gridSize / 2)
      .style('fill', function(d, i) { return colors[i]; });

    legend.append('text')
      .attr('class', 'mono')
      .text(function(d) { return '≥ ' + Math.round(d); })
      .attr('x', function(d, i) { return legendElementWidth * i; })
      .attr('y', height + gridSize);

    legend.exit().remove();
  }
}
