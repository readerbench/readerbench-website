import { Component, AfterViewInit, Input } from '@angular/core';
import { ApiRequestService } from '../../../api-request.service';
import * as d3 from "d3";

@Component({
  selector: 'app-participant-evolution',
  templateUrl: 'participant-evolution.component.html',
  styleUrls: ['./participant-evolution.component.css'],
  providers: [ApiRequestService]
})
export class ParticipantEvolutionComponent implements AfterViewInit {

	@Input() communityName: string;
  communityData: any[] = [];
	participants: any[] = [];
  selectedParticipants: any[] = [];
  test: any[] = [];

  constructor(private apiRequestService: ApiRequestService) { }

  ngAfterViewInit() {
    this.apiRequestService.setEndpoint('community/participants');
    var process = this.apiRequestService.process({
        name: this.communityName,
    });
    process.subscribe(participantObjects => {
      var ps = [];
      var dates = [];
      var entirePeriod = participantObjects.data.filter(item => item["week"] == 0).sort((a, b) => b["Contrib"] - a["Contrib"]);
      for (let i in entirePeriod) {
        if (ps.indexOf(entirePeriod[i]["participantName"]) === -1) {
          ps.push(entirePeriod[i]["participantName"]);
        }
      }
      for (let i = 0; i < participantObjects.data.length; i++) {
        var part = participantObjects.data[i];
        if (dates.indexOf(part["startDate"]) === -1) {
          dates.push(part["startDate"]);
        }
      }
      for (var d in dates.sort()) {
        var item = { date: dates[d], data: {} };
        for (var p in ps) {
          item.data[ps[p]] = 0;
        }
        this.communityData.push(item);
      }
      //console.log(dates);
      //console.log(ps);
      for (var i = 0; i < participantObjects.data.length; i++) {
        var part = participantObjects.data[i];
        item = this.communityData.find(item => item.date == part["startDate"]);
        item.data[part["participantName"]] = part["Contrib"];
      }
      this.communityData = this.communityData.slice(1).map(function (d) {
          return {
            //date: d3.time.format('%Y-%m-%d').parse(d.date),
            date: new Date(d.date),
            data: d.data
          };
        });

      //this.participants = Object.keys(this.communityData[0].data);
      this.participants = ps;
      this.makeChart(this.communityData, this.selectedParticipants);
    });
  }

  onSelect(participant) {
  	if (!this.selectedParticipants.find(x => x === participant)) {
      this.selectedParticipants.push(participant);
  		this.makeChart(this.communityData, this.selectedParticipants);
		}
		
    // console.log(this.communityData);
    // this.selectedParticipants = ['density'];
    // this.test = this.mockData.slice(1).map(function (d) {
    //   return {
    //     //date: d3.time.format('%Y-%m-%d').parse(d.date),
    //     date: new Date(d.date),
    //     data: d.data
    //   };
    // });
    // this.makeChart(this.test, this.selectedParticipants);
  }

  removeParticipant(participant: string) {
  	var index = this.selectedParticipants.findIndex(x => x === participant);
		if (index > -1) {
		  this.selectedParticipants.splice(index, 1);
  		this.makeChart(this.communityData, this.selectedParticipants);
		}
  }

	private addAxesAndLegend(svg, xAxis, yAxis, margin, chartWidth, chartHeight, participants) {
	  var legendWidth  = 300,
	      legendHeight = participants.length * 30 + 10;

	  // clipping to make sure nothing appears behind legend
	  svg.append('clipPath')
	    .attr('id', 'axes-clip')
	    .append('polygon')
	      .attr('points', (-margin.left)                 + ',' + (-margin.top)                 + ' ' +
	                      (chartWidth - legendWidth - 1) + ',' + (-margin.top)                 + ' ' +
	                      (chartWidth - legendWidth - 1) + ',' + legendHeight                  + ' ' +
	                      (chartWidth + margin.right)    + ',' + legendHeight                  + ' ' +
	                      (chartWidth + margin.right)    + ',' + (chartHeight + margin.bottom) + ' ' +
	                      (-margin.left)                 + ',' + (chartHeight + margin.bottom));

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
	      .text('No. of contributions');

	  var legend = svg.append('g')
	    .attr('class', 'legend')
	    .attr('transform', 'translate(' + (chartWidth - legendWidth + 300) + ', 0)');

	  legend.append('rect')
	    .attr('class', 'legend-bg')
	    .attr('width',  legendWidth)
	    .attr('height', legendHeight);

    var line_y = 25;
    for (let idx in participants) {
		  legend.append('path')
		    .attr('class', 'line ' + participants[idx])
		    .attr('d', 'M10,' + (line_y - 5) + 'L85,' + (line_y - 5));

		  legend.append('text')
		    .attr('x', 115)
		    .attr('y', line_y)
		    .text(participants[idx]);

	    line_y += 30;
	  }
	}

	private drawPaths(svg, data, x, y, keys) {
		var lines = {};
		for (let idx in keys) {
		  lines[keys[idx]] = d3.svg.line()
		    .interpolate('basis')
		    .x(function (d: any) { return x(d.date) || 1; })
		    .y(function (d: any) { return y(d.data[keys[idx]]); });
	  }

	  svg.datum(data);

		for (let idx in keys) {
		  svg.append('path')
		    .attr('class', 'line ' + keys[idx])
		    .attr('d', lines[keys[idx]])
		    .attr('clip-path', 'url(#rect-clip)');
	    let items = document.getElementsByClassName('line ' + keys[idx]) as HTMLCollectionOf<HTMLElement>;
	    let r = Math.floor(Math.random() * (256));
	    let g = Math.floor(Math.random() * (256));
	    let b = Math.floor(Math.random() * (256));
	    [].slice.call(items).map(item => item.setAttribute('stroke', 'rgba('+r+', '+g+', '+b+', 0.8)'));
	  }
	}

	private startTransitions(svg, chartWidth, chartHeight, rectClip, x) {
	  rectClip.transition()
	    .duration(2000)
	    .attr('width', chartWidth);
	}

	private makeChart(data, keys) {
		d3.select("#participant_evolution_graph").remove();
	  var svgWidth  = 1400,
	      svgHeight = 500,
	      margin = { top: 20, right: 20, bottom: 40, left: 40 },
	      chartWidth  = svgWidth  - margin.left - margin.right - 300,
	      chartHeight = svgHeight - margin.top  - margin.bottom;
    //console.log(keys);
    var dataAccesors = keys.map((k:any) => ((d:any) => d[k]));
    //console.log(dataAccesors);
	  var x = d3.time.scale().range([0, chartWidth])
	            .domain(d3.extent(data, (d:any) => d.date)),
	      y = d3.scale.linear().range([chartHeight, 0])
	            .domain([0, d3.max(dataAccesors.map(da => d3.max(data.map((d: any) => d.data), da)))]);

	  var xAxis = d3.svg.axis().scale(x).orient('bottom')
	                .innerTickSize(-chartHeight).outerTickSize(0).tickPadding(10),
	      yAxis = d3.svg.axis().scale(y).orient('left')
	                .innerTickSize(-chartWidth).outerTickSize(0).tickPadding(10);

	  var svg = d3.select('app-participant-evolution').append('svg')
	  	.attr("id","participant_evolution_graph")
	    .attr('width',  svgWidth)
	    .attr('height', svgHeight)
	    .append('g')
	      .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

	  // clipping to start chart hidden and slide it in later
	  var rectClip = svg.append('clipPath')
	    .attr('id', 'rect-clip')
	    .append('rect')
	      .attr('width', 0)
	      .attr('height', chartHeight);

	  this.addAxesAndLegend(svg, xAxis, yAxis, margin, chartWidth, chartHeight, keys);
	  this.drawPaths(svg, data, x, y, keys);
	  this.startTransitions(svg, chartWidth, chartHeight, rectClip, x);
	}

	private mockData = [
  {"date": "2013-08-23","data": {"contributions":68, "density":0.19927536231884058, "participants":24}},
  {"date": "2013-08-30","data": {"contributions":124, "density":0.1191919191919192, "participants":45}},
  {"date": "2013-09-06","data": {"contributions":296, "density":0.08399452804377565, "participants":86}},
  {"date": "2013-09-13","data": {"contributions":219, "density":0.0700152207001522, "participants":73}},
  {"date": "2013-09-20","data": {"contributions":100, "density":0.15698924731182795, "participants":31}},
  {"date":"2013-09-27", "data" : {"contributions":59, "density":0.3137254901960784, "participants":18}},
  {"date":"2013-10-04", "data" : {"contributions":89, "density":0.19692307692307692, "participants":26}},
  {"date":"2013-10-11", "data" : {"contributions":99, "density":0.18783068783068782, "participants":28}},
  {"date":"2013-10-18", "data" : {"contributions":189, "density":0.15615615615615616, "participants":37}},
  {"date":"2013-10-25", "data" : {"contributions":90, "density":0.2134387351778656, "participants":23}},
  {"date":"2013-11-01", "data" : {"contributions":140, "density":0.15384615384615385, "participants":39}},
  {"date":"2013-11-08", "data" : {"contributions":155, "density":0.1072463768115942, "participants":46}},
  {"date":"2013-11-15", "data" : {"contributions":177, "density":0.09154437456324249, "participants":54}},
  {"date":"2013-11-22", "data" : {"contributions":65, "density":0.16307692307692306, "participants":26}},
  {"date":"2013-11-29", "data" : {"contributions":134, "density":0.07609427609427609, "participants":55}},
  {"date":"2013-12-06", "data" : {"contributions":347, "density":0.06913367756741251, "participants":84}},
  {"date":"2013-12-13", "data" : {"contributions":150, "density":0.08695652173913043, "participants":46}},
  {"date":"2013-12-20", "data" : {"contributions":19, "density":0.2564102564102564, "participants":13}}
];

}
