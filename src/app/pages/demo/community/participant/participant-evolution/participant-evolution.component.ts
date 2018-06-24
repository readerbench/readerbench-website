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
  }

  removeParticipant(participant: string) {
  	var index = this.selectedParticipants.findIndex(x => x === participant);
		if (index > -1) {
		  this.selectedParticipants.splice(index, 1);
  		this.makeChart(this.communityData, this.selectedParticipants);
		}
  }

	private addAxesAndLegend(svg, xAxis, yAxis, margin, chartWidth, chartHeight, participants) {
	  var legendWidth  = 200,
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
		    .x(function (d) { return x(d.date) || 1; })
		    .y(function (d) { return y(d.data[keys[idx]]); });
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
	  var svgWidth  = 1260,
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
  {
    "date": "2014-08-01","data": {
    "Ion": 5350,
    "Maria": 6756,
    "Ana": 7819,
    "Cristi": 9284,
    "Andreea": 13835  
  }
  },
  {
    "date": "2014-08-02","data": {
    "Ion": 4439,
    "Maria": 5584,
    "Ana": 6554,
    "Cristi": 8016,
    "Andreea": 12765  
  }
  },
  {
    "date": "2014-08-03","data": {
    "Ion": 4247,
    "Maria": 5419,
    "Ana": 6332,
    "Cristi": 7754,
    "Andreea": 12236  
  }
  },
  {
    "date": "2014-08-04","data": {
    "Ion": 3293,
    "Maria": 4414,
    "Ana": 5191,
    "Cristi": 6491,
    "Andreea": 10325  
  }
  },
  {
    "date": "2014-08-05","data": {
    "Ion": 3942,
    "Maria": 5134,
    "Ana": 6069,
    "Cristi": 7501,
    "Andreea": 11685  
  }
  },
  {
    "date": "2014-08-06","data": {
    "Ion": 2744,
    "Maria": 5508,
    "Ana": 6879,
    "Cristi": 9221,
    "Andreea": 17239  
  }
  },
  {
    "date": "2014-08-07","data": {
    "Ion": 1807,
    "Maria": 3019,
    "Ana": 4119,
    "Cristi": 5656,
    "Andreea": 8851  
  }
  },
  {
    "date": "2014-08-08","data": {
    "Ion": 1855,
    "Maria": 3386,
    "Ana": 4473,
    "Cristi": 5915,
    "Andreea": 10580  
  }
  },
  {
    "date": "2014-08-09","data": {
    "Ion": 1830,
    "Maria": 3202,
    "Ana": 4233,
    "Cristi": 5559,
    "Andreea": 8930  
  }
  },
  {
    "date": "2014-08-10","data": {
    "Ion": 1828,
    "Maria": 3195,
    "Ana": 4304,
    "Cristi": 5482,
    "Andreea": 9189  
  }
  },
  {
    "date": "2014-08-11","data": {
    "Ion": 2246,
    "Maria": 3929,
    "Ana": 5326,
    "Cristi": 7077,
    "Andreea": 11648  
  }
  },
  {
    "date": "2014-08-12","data": {
    "Ion": 2051,
    "Maria": 3662,
    "Ana": 4849,
    "Cristi": 6194,
    "Andreea": 10078  
  }
  },
  {
    "date": "2014-08-13","data": {
    "Ion": 1700,
    "Maria": 3075,
    "Ana": 4068,
    "Cristi": 5259,
    "Andreea": 9789  
  }
  },
  {
    "date": "2014-08-14","data": {
    "Ion": 2161,
    "Maria": 3891,
    "Ana": 5262,
    "Cristi": 6924,
    "Andreea": 11612  
  }
  },
  {
    "date": "2014-08-15","data": {
    "Ion": 1765,
    "Maria": 3190,
    "Ana": 4388,
    "Cristi": 5822,
    "Andreea": 9433  
  }
  },
  {
    "date": "2014-08-16","data": {
    "Ion": 2036,
    "Maria": 3756,
    "Ana": 4775,
    "Cristi": 6158,
    "Andreea": 9999  
  }
  },
  {
    "date": "2014-08-17","data": {
    "Ion": 2079,
    "Maria": 3561,
    "Ana": 4753,
    "Cristi": 6124,
    "Andreea": 9807  
  }
  },
  {
    "date": "2014-08-18","data": {
    "Ion": 2108,
    "Maria": 3576,
    "Ana": 4818,
    "Cristi": 6344,
    "Andreea": 10235  
  }
  },
  {
    "date": "2014-08-19","data": {
    "Ion": 2143,
    "Maria": 3792,
    "Ana": 5073,
    "Cristi": 6772,
    "Andreea": 11338  
  }
  },
  {
    "date": "2014-08-20","data": {
    "Ion": 2086,
    "Maria": 3801,
    "Ana": 5073,
    "Cristi": 6688,
    "Andreea": 12394  
  }
  },
  {
    "date": "2014-08-21","data": {
    "Ion": 1767,
    "Maria": 3253,
    "Ana": 4282,
    "Cristi": 5563,
    "Andreea": 9167  
  }
  },
  {
    "date": "2014-08-22","data": {
    "Ion": 1756,
    "Maria": 3047,
    "Ana": 3950,
    "Cristi": 5006,
    "Andreea": 7948  
  }
  },
  {
    "date": "2014-08-23","data": {
    "Ion": 2123,
    "Maria": 3755,
    "Ana": 5173,
    "Cristi": 7243,
    "Andreea": 12338  
  }
  },
  {
    "date": "2014-08-24","data": {
    "Ion": 1967,
    "Maria": 3404,
    "Ana": 4529,
    "Cristi": 5970,
    "Andreea": 9897  
  }
  },
  {
    "date": "2014-08-25","data": {
    "Ion": 1537,
    "Maria": 2612,
    "Ana": 3394,
    "Cristi": 4279,
    "Andreea": 7104  
  }
  },
  {
    "date": "2014-08-26","data": {
    "Ion": 2182,
    "Maria": 3958,
    "Ana": 5505,
    "Cristi": 7642,
    "Andreea": 12707  
  }
  },
  {
    "date": "2014-08-27","data": {
    "Ion": 1932,
    "Maria": 3366,
    "Ana": 4526,
    "Cristi": 6086,
    "Andreea": 9930  
  }
  },
  {
    "date": "2014-08-28","data": {
    "Ion": 1268,
    "Maria": 2344,
    "Ana": 3256,
    "Cristi": 4215,
    "Andreea": 6673  
  }
  },
  {
    "date": "2014-08-29","data": {
    "Ion": 1225,
    "Maria": 2239,
    "Ana": 3033,
    "Cristi": 4111,
    "Andreea": 7601  
  }
  },
  {
    "date": "2014-08-30","data": {
    "Ion": 1393,
    "Maria": 2432,
    "Ana": 3417,
    "Cristi": 4710,
    "Andreea": 8798  
  }
  },
  {
    "date": "2014-08-31","data": {
    "Ion": 1175,
    "Maria": 2020,
    "Ana": 2768,
    "Cristi": 3889,
    "Andreea": 7744  
  }
  },
  {
    "date": "2014-09-01","data": {
    "Ion": 989,
    "Maria": 1655,
    "Ana": 2218,
    "Cristi": 3167,
    "Andreea": 6018  
  }
  },
  {
    "date": "2014-09-02","data": {
    "Ion": 1249,
    "Maria": 2069,
    "Ana": 2738,
    "Cristi": 3938,
    "Andreea": 7574  
  }
  },
  {
    "date": "2014-09-03","data": {
    "Ion": 936,
    "Maria": 1510,
    "Ana": 1968,
    "Cristi": 2700,
    "Andreea": 5215  
  }
  },
  {
    "date": "2014-09-04","data": {
    "Ion": 1264,
    "Maria": 2039,
    "Ana": 2657,
    "Cristi": 3646,
    "Andreea": 7042  
  }
  },
  {
    "date": "2014-09-05","data": {
    "Ion": 1305,
    "Maria": 2106,
    "Ana": 2745,
    "Cristi": 3766,
    "Andreea": 7273  
  }
  },
  {
    "date": "2014-09-06","data": {
    "Ion": 798,
    "Maria": 1288,
    "Ana": 1678,
    "Cristi": 2303,
    "Andreea": 4448  
  }
  },
  {
    "date": "2014-09-07","data": {
    "Ion": 1314,
    "Maria": 2120,
    "Ana": 2763,
    "Cristi": 3791,
    "Andreea": 7321  
  }
  },
  {
    "date": "2014-09-08","data": {
    "Ion": 1042,
    "Maria": 1681,
    "Ana": 2191,
    "Cristi": 3007,
    "Andreea": 5806
  }
  }
];

}
