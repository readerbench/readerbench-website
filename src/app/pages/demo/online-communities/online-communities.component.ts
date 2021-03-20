import { Component, OnInit, SystemJsNgModuleLoader } from "@angular/core";
import * as d3 from 'd3';
import * as vega from 'vega';
import { RadarChart } from "./radar-chart";
import { Word } from "@reader-bench/common";

interface BlogCommunity {
  name: string;
}

@Component({
    selector: 'online-communities',
    templateUrl: './online-communities.component.html',
    styleUrls: ['./online-communities.component.css'],
    providers: []
  })
  export class OnlineCommunitiesComponent implements OnInit {



    private vegaView: vega.View;
    private vegaEdgeBundlingView: vega.View;
    selectedCommunity: BlogCommunity;
    communities: BlogCommunity[] = [{name: "blog1"},
    {name: "blog7"},
    {name: "blog25"},
    {name: "blog29"}];
    fileName: String;
    weeks: Number[] = [1,2,3,4,5,6,7,8,9,10,11,12,13,14];
    public wordList: Word[];

    ngOnInit() {

      //this.displayForceDirectedLayoutDiagramVega();
      //this.displayEdgeBundlingDiagramVega(); - doens't work
      //this.radarChartViewD3();

      //this.circularBarplot();

      //this.parallelViewD3();

      //this.generateDirectedGradphForAllWeeks();

     // this.test();

      var _this = this;
      d3.json("assets/communities/pa_2019-2020-keywords.json").then(function(keywords: any) {
            const list: Word[] = [];

            keywords.words.forEach(w => {
                const word = new Word();
                word.value = w.value;
                word.type = 'TextBased';
                word.scoreList = [];
                w.activationList.forEach(element => {
                  word.scoreList.push(element.score);
                });

                list.push(word);
            });
      
            _this.wordList = list;
            console.log(_this.wordList);
      });

      //this.legend();

    }

    private parallelViewD3() {
      // set the dimensions and margins of the graph
      var margin = {top: 30, right: 50, bottom: 10, left: 50},
      width = 800 - margin.left - margin.right,
      height = 400 - margin.top - margin.bottom;

      // append the svg object to the body of the page
      var svg = d3.select("#parallel_view")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");

      // Parse the Data
      d3.json("assets/communities/parallel-view_2018-2019.json").then(function(data: any) {

      // Color scale: give me a specie name, I return a color
      var color = d3.scaleOrdinal()
        .domain(["social_kb", "outdegree", "indegree" ])
        .range([ "blue", "red", "green"])

      // Here I set the list of dimension manually to control the order of axis:
      var dimensions = ["week_1", "week_2", "week_3", "week_4", "week_5", "week_6", "week_7", "week_8", 
      "week_9", "week_10", "week_11", "week_12", "week_13", "week_14"]

      // For each dimension, I build a linear scale. I store all in a y object
      var y = {}
      for (var i in dimensions) {
        var name = dimensions[i]
        y[name] = d3.scaleLinear()
          .domain( [0,60] ) // --> Same axis range for each group
          // --> different axis range for each group --> .domain( [d3.extent(data, function(d) { return +d[name]; })] )
        
          .range([height, 0])
      }

      // Build the X scale -> it find the best position for each Y axis
      var x = d3.scalePoint()
        .range([0, width])
        .domain(dimensions);

      // Highlight the specie that is hovered
      var highlight = function(d){

        var selected_specie = d.group

        // first every group turns grey
        d3.selectAll(".line")
          .transition().duration(200)
          .style("stroke", "lightgrey")
          .style("opacity", "0.2")
        // Second the hovered specie takes its color
        d3.selectAll("." + selected_specie)
          .transition().duration(200)
          .style("stroke", <string>color(selected_specie))
          .style("opacity", "1")
      }

      // Unhighlight
      var doNotHighlight = function(d){
        d3.selectAll(".line")
          .transition().duration(200).delay(1000)
          .style("stroke", function(d: any){ return <string>color(d.group)} )
          .style("opacity", "1")
      }

      // The path function take a row of the csv as input, and return x and y coordinates of the line to draw for this raw.
      function path(d) {
        return d3.line()(dimensions.map(function(p) {
          return [x(p), y[p](d[p])]; 
        }));
      }

      // Draw the lines
      svg
        .selectAll("myPath")
        .data(data)
        .enter()
        .append("path")
          .attr("class", function (d: any) { return "line " + d.group } ) // 2 class for each line: 'line' and the group name
          .attr("d",  path)
          .style("fill", "none" )
          .style("stroke", function(d: any){ return <string>color(d.group)} )
          .style("stroke-width", "2px")
          .style("opacity", 0.5)
          .on("mouseover", highlight)
          .on("mouseleave", doNotHighlight )

      // Draw the axis:
      svg.selectAll("myAxis")
        // For each dimension of the dataset I add a 'g' element:
        .data(dimensions).enter()
        .append("g")
        .attr("class", "axis")
        // I translate this element to its right position on the x axis
        .attr("transform", function(d) { return "translate(" + x(d) + ")"; })
        // And I build the axis with the call function
        .each(function(d) { d3.select(this).call(d3.axisLeft(x).ticks(5).scale(y[d])); })
        // Add axis title
        .append("text")
          .style("text-anchor", "middle")
          .attr("y", -9)
          .text(function(d) { return d; })
          .style("fill", "black")
          .style("font-weight", "bold")

      })
    }

    private circularBarplot() {

      // set the dimensions and margins of the graph
      var margin = {top: 50, right: 0, bottom: 50, left: 50},
      width = 460 - margin.left - margin.right,
      height = 460 - margin.top - margin.bottom,
      innerRadius = 90,
      outerRadius = Math.min(width, height) / 2;   // the outerRadius goes from the middle of the SVG area to the border

      // append the svg object
      var svg = d3.select("#circular-barplot")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + (width / 2 + margin.left) + "," + (height / 2 + margin.top) + ")");

      d3.json("assets/communities/circular-barplot.json").then(function(data: any) {

      // Scales
      var x = d3.scaleBand()
        .range([0, 2 * Math.PI])    // X axis goes from 0 to 2pi = all around the circle. If I stop at 1Pi, it will be around a half circle
        .align(0)                  // This does nothing
        .domain(data.map(function(d) { return d.week; })); // The domain of the X axis is the list of states.
      // var y = d3.scaleOrdinal()
      //   .range([innerRadius, outerRadius])   // Domain will be define later.
      //   .domain(["0", "14000"]); // Domain of Y is from 0 to the max seen in the data

      var yLinear = d3.scaleLinear()
        .range([innerRadius, outerRadius])   // Domain will be define later.
        .domain([0, 14000]); // Domain of Y is from 0 to the max seen in the data
      var y = Object.assign(d => Math.sqrt(yLinear(d)), yLinear);
      

      // Add the bars
      svg.append("g")
      .selectAll("path")
      .data(data)
      .enter()
      .append("path")
        .attr("fill", "#69b3a2")
        .attr("d", d3.arc()     // imagine your doing a part of a donut plot
            .innerRadius(innerRadius)
            .outerRadius(function(d: any) { return (+y(d.value)); })
            .startAngle(function(d: any) { return x(d.week); })
            .endAngle(function(d: any) { return x(d.week) + x.bandwidth(); })
            .padAngle(0.01)
            .padRadius(innerRadius))

      // Add the labels
      svg.append("g")
      .selectAll("g")
      .data(data)
      .enter()
      .append("g")
        .attr("text-anchor", function(d:any) { return (x(d.week) + x.bandwidth() / 2 + Math.PI) % (2 * Math.PI) < Math.PI ? "end" : "start"; })
        .attr("transform", function(d: any) { return "rotate(" + ((x(d.week) + x.bandwidth() / 2) * 180 / Math.PI - 90) + ")"+"translate(" + 
          (+y(d.value)+10) + ",0)"; })
      .append("text")
        .text(function(d: any){return(d.week)})
        .attr("transform", function(d:any) { return (x(d.week) + x.bandwidth() / 2 + Math.PI) % (2 * Math.PI) < Math.PI ? "rotate(180)" : "rotate(0)"; })
        .style("font-size", "11px")
        .attr("alignment-baseline", "middle")

      });
    }

    private radarChartViewD3() {
      //////////////////////////////////////////////////////////////
			//////////////////////// Set-Up //////////////////////////////
			//////////////////////////////////////////////////////////////

			var margin = { top: 50, right: 80, bottom: 50, left: 80 },
      width = Math.min(700, window.innerWidth / 4) - margin.left - margin.right,
      height = Math.min(width, window.innerHeight - margin.top - margin.bottom);

    //////////////////////////////////////////////////////////////
    ////////////////////////// Data //////////////////////////////
    //////////////////////////////////////////////////////////////

    //2018-2019
    var data1= [

      { name: 'STUD31',
        axes: [
          {axis: 'week1', value: 0},
          {axis: 'week2', value: 0},
          {axis: 'week3', value: Math.log2(7.113270799621281)},
          {axis: 'week4', value: Math.log2(7.550873675431539)},
          {axis: 'week5', value: Math.log2(1.308194432524488)},
          {axis: 'week6', value: Math.log2(3.4986221183883)},
          {axis: 'week7', value: 0},
          {axis: 'week8', value: 0},
          {axis: 'week9', value: 0},
          {axis: 'week10', value: 0},
          {axis: 'week11', value: Math.log2(0.6458145860919903)},
          {axis: 'week12', value: Math.log2(22.8278416695908306)},
          {axis: 'week13', value: Math.log2(7.714819825787197)},
          {axis: 'week14', value: 0}
        ]
      },
      { name: 'STUD56',
        axes: [
          {axis: 'week1', value : 0},
          {axis: 'week2', value : 0},
          {axis: 'week3', value : 0},
          {axis: 'week4', value : 0},
          {axis: 'week5', value : 0},
          {axis: 'week6', value : Math.log2(7.849121013544668)},
          {axis: 'week7', value : 0},
          {axis: 'week8', value : Math.log2(0.4550062420973411)},
          {axis: 'week9', value : 0},
          {axis: 'week10', value : 0},
          {axis: 'week11', value : Math.log2(0.24587944142120818)},
          {axis: 'week12', value : Math.log2(3.7491159301564814)},
          {axis: 'week13', value : Math.log2(0.7008856835185493)},
          {axis: 'week14', value : 0}
        ]
      },
      { name: 'STUD84',
        axes: [
          {axis: 'week1', value: 0},
          {axis: 'week2', value: 0},
          {axis: 'week3', value: 0},
          {axis: 'week4', value: 0},
          {axis: 'week5', value: 0},
          {axis: 'week6', value: 0},
          {axis: 'week7', value: Math.log2(2.55470864329524)},
          {axis: 'week8', value: Math.log2(2.9095721502006686)},
          {axis: 'week9', value: 0},
          {axis: 'week10', value: 0},
          {axis: 'week11', value: Math.log2(0.24587944142120818)},
          {axis: 'week12', value: Math.log2(1.6577527160974226)},
          {axis: 'week13', value: Math.log2(5.193471621682791)},
          {axis: 'week14', value: 0}
        ]
      },
      {
        name: "STUD79",
        axes: [
          {axis: 'week1', value: 0},
          {axis: 'week2', value: 0},
          {axis: 'week3', value: 0},
          {axis: 'week4', value: 0},
          {axis: 'week5', value: 0},
          {axis: 'week6', value: 0},
          {axis: 'week7', value: Math.log2(1.4240699559551415)},
          {axis: 'week8', value: 0},
          {axis: 'week9', value: Math.log2(1.6659426769827732)},
          {axis: 'week10', value: Math.log2(0.5149949507462526)},
          {axis: 'week11', value: Math.log2(2.47490818911257)},
          {axis: 'week12', value: Math.log2(5.103293149692368)},
          {axis: 'week13', value: 0},
          {axis: 'week14', value: 0}
        ]
        
      },
      {
        name: "STUD44",
        axes: [
          {axis: 'week1', value: 0},
          {axis: 'week2', value: 0},
          {axis: 'week3', value: 0},
          {axis: 'week4', value: Math.log2(0.6373122389303326)},
          {axis: 'week5', value: 0},
          {axis: 'week6', value: 0},
          {axis: 'week7', value: 0},
          {axis: 'week8', value: 0},
          {axis: 'week9', value: Math.log2(0.8026935091326179)},
          {axis: 'week10', value: 0},
          {axis: 'week11', value: Math.log2(2.80984598524583)},
          {axis: 'week12', value: Math.log2(6.430192963428837)},
          {axis: 'week13', value: 0},
          {axis: 'week14', value: 0}
        ]
        
      }
    ];

    //2019-2020
    var data = [

      { name: 'STUD29',
        axes: [
          {axis: 'week1', value: 0},
          {axis: 'week2', value: 0},
          {axis: 'week3', value: Math.log2(2.431502075277253)},
          {axis: 'week4', value: Math.log2(5.342501657818246)},
          {axis: 'week5', value: Math.log2(2.9606913962240613)},
          {axis: 'week6', value: 0},
          {axis: 'week7', value: 0},
          {axis: 'week8', value: Math.log2(9.767463633349797)},
          {axis: 'week9', value: 0},
          {axis: 'week10', value: Math.log2(1.0209039842686087)},
          {axis: 'week11', value: Math.log2(2.605190676480361)},
          {axis: 'week12', value: Math.log2(2.148861979260961)},
          {axis: 'week13', value: Math.log2(2.075785913472686)},
          {axis: 'week14', value: 0}
        ]
      },
      { name: 'STUD25',
        axes: [
          {axis: 'week1', value: 0},
          {axis: 'week2', value: 0},
          {axis: 'week3', value: Math.log2(4.302671924075632)},
          {axis: 'week4', value: Math.log2(6.762801057365927)},
          {axis: 'week5', value: Math.log2(3.181733258342107)},
          {axis: 'week6', value: Math.log2(2.2786219519508624)},
          {axis: 'week7', value: Math.log2(1.9440398739678624)},
          {axis: 'week8', value: 0},
          {axis: 'week9', value: 0},
          {axis: 'week10', value: 0},
          {axis: 'week11', value: Math.log2(2.7230072545184636)},
          {axis: 'week12', value: 0},
          {axis: 'week13', value: Math.log2(5.639566716525496)},
          {axis: 'week14', value: 0}
        ]
      },
      { name: 'STUD71',
        axes: [
          {axis: 'week1', value: 0},
          {axis: 'week2', value: 0},
          {axis: 'week3', value: 0},
          {axis: 'week4', value: 0},
          {axis: 'week5', value: Math.log2(14.106840499647213)},
          {axis: 'week6', value: 0},
          {axis: 'week7', value: 0},
          {axis: 'week8', value: 0},
          {axis: 'week9', value: 0},
          {axis: 'week10', value: 0},
          {axis: 'week11', value: 0},
          {axis: 'week12', value: 0},
          {axis: 'week13', value: 0},
          {axis: 'week14', value: 0}
        ]
      },
      { name: 'STUD33',
        axes: [
          {axis: 'week1', value: 0},
          {axis: 'week2', value: 0},
          {axis: 'week3', value: Math.log2(1.2027620851463097)},
          {axis: 'week4', value: Math.log2(3.9354685289252673)},
          {axis: 'week5', value: 0},
          {axis: 'week6', value: Math.log2(4.773433195552462)},
          {axis: 'week7', value: Math.log2(2.0306557167710353)},
          {axis: 'week8', value: Math.log2(0.6509959644656119)},
          {axis: 'week9', value: 0},
          {axis: 'week10', value: 0},
          {axis: 'week11', value: 0},
          {axis: 'week12', value: 0},
          {axis: 'week13', value: 0},
          {axis: 'week14', value: 0}
        ]
      },
      { name: 'STUD8',
        axes: [
          {axis: 'week1', value: 0},
          {axis: 'week2', value: Math.log2(1.4849789775530653)},
          {axis: 'week3', value: Math.log2(3.5881070941191178)},
          {axis: 'week4', value: Math.log2(7.150902704174387)},
          {axis: 'week5', value: 0},
          {axis: 'week6', value: 0},
          {axis: 'week7', value: 0},
          {axis: 'week8', value: 0},
          {axis: 'week9', value: 0},
          {axis: 'week10', value: 0},
          {axis: 'week11', value: 0},
          {axis: 'week12', value: 0},
          {axis: 'week13', value: 0},
          {axis: 'week14', value: 0}
        ]
      }
    ];

    var radarChartOptions = {
      w: 690,
      h: 350,
      margin: margin,
      maxValue: 5,
      levels: 3,
      roundStrokes: false,
      color: d3.scaleOrdinal(d3.schemeCategory10),
      format: '.0f',
      legend: { title: 'Students', translateX: 150, translateY: 40 },
      //unit: ' contribution_score'
    };

    // Draw the chart, get a reference the created svg element :
    let svg_radar1 = RadarChart(".radarChart", data, radarChartOptions);

    }

    private displayEdgeBundlingDiagramVega() {
      const spec: vega.Spec = {
        "$schema": "https://vega.github.io/schema/vega/v5.json",
        "description": "A network diagram of software dependencies, with edges grouped via hierarchical edge bundling.",
        "padding": 5,
        "width": 720,
        "height": 720,
        "autosize": "none",

        "signals": [
          {
            "name": "tension", "value": 0.85,
            "bind": {"input": "range", "min": 0, "max": 1, "step": 0.01}
          },
          {
            "name": "radius", "value": 280,
            "bind": {"input": "range", "min": 20, "max": 400}
          },
          {
            "name": "extent", "value": 360,
            "bind": {"input": "range", "min": 0, "max": 360, "step": 1}
          },
          {
            "name": "rotate", "value": 0,
            "bind": {"input": "range", "min": 0, "max": 360, "step": 1}
          },
          {
            "name": "textSize", "value": 8,
            "bind": {"input": "range", "min": 2, "max": 20, "step": 1}
          },
          {
            "name": "textOffset", "value": 2,
            "bind": {"input": "range", "min": 0, "max": 10, "step": 1}
          },
          {
            "name": "layout", "value": "cluster",
            "bind": {"input": "radio", "options": ["tidy", "cluster"]}
          },
          { "name": "colorIn", "value": "firebrick" },
          { "name": "colorOut", "value": "forestgreen" },
          { "name": "originX", "update": "width / 2" },
          { "name": "originY", "update": "height / 2" },
          {
            "name": "active", "value": null,
            "on": [
              { "events": "text:mouseover", "update": "datum.id" },
              { "events": "mouseover[!event.item]", "update": "null" }
            ]
          }
        ],

        "data": [
          {
            "name": "tree",
            "url": "assets/communities/nodes.json",
            "transform": [
              {
                "type": "stratify",
                "key": "id",
                "parentKey": "parent"
              },
              {
                "type": "tree",
                "method": {"signal": "layout"},
                "size": [1, 1],
                "as": ["alpha", "beta", "depth", "children"]
              },
              {
                "type": "formula",
                "expr": "(rotate + extent * datum.alpha + 270) % 360",
                "as":   "angle"
              },
              {
                "type": "formula",
                "expr": "inrange(datum.angle, [90, 270])",
                "as":   "leftside"
              },
              {
                "type": "formula",
                "expr": "originX + radius * datum.beta * cos(PI * datum.angle / 180)",
                "as":   "x"
              },
              {
                "type": "formula",
                "expr": "originY + radius * datum.beta * sin(PI * datum.angle / 180)",
                "as":   "y"
              }
            ]
          },
          {
            "name": "leaves",
            "source": "tree",
            "transform": [
              {
                "type": "filter",
                "expr": "!datum.children"
              }
            ]
          },
          {
            "name": "dependencies",
            "url": "assets/communities/edges.json",
            "transform": [
              {
                "type": "formula",
                "expr": "treePath('tree', datum.source, datum.target)",
                "as":   "treepath",
                "initonly": true
              }
            ]
          },
          {
            "name": "selected",
            "source": "dependencies",
            "transform": [
              {
                "type": "filter",
                "expr": "datum.source === active || datum.target === active"
              }
            ]
          }
        ],

        "marks": [
          {
            "type": "text",
            "from": {"data": "leaves"},
            "encode": {
              "enter": {
                "text": {"field": "name"},
                "baseline": {"value": "middle"}
              },
              "update": {
                "x": {"field": "x"},
                "y": {"field": "y"},
                "dx": {"signal": "textOffset * (datum.leftside ? -1 : 1)"},
                "angle": {"signal": "datum.leftside ? datum.angle - 180 : datum.angle"},
                "align": {"signal": "datum.leftside ? 'right' : 'left'"},
                "fontSize": {"signal": "textSize"},
                "fontWeight": [
                  {"test": "indata('selected', 'source', datum.id)", "value": "bold"},
                  {"test": "indata('selected', 'target', datum.id)", "value": "bold"},
                  {"value": null}
                ],
                "fill": [
                  {"test": "datum.id === active", "value": "black"},
                  {"test": "indata('selected', 'source', datum.id)", "signal": "colorIn"},
                  {"test": "indata('selected', 'target', datum.id)", "signal": "colorOut"},
                  {"value": "black"}
                ]
              }
            }
          },
          {
            "type": "group",
            "from": {
              "facet": {
                "name":  "path",
                "data":  "dependencies",
                "field": "treepath"
              }
            },
            "marks": [
              {
                "type": "line",
                "interactive": false,
                "from": {"data": "path"},
                "encode": {
                  "enter": {
                    "interpolate": {"value": "bundle"},
                    "strokeWidth": {"value": 1.5}
                  },
                  "update": {
                    "stroke": [
                      {"test": "parent.source === active", "signal": "colorOut"},
                      {"test": "parent.target === active", "signal": "colorIn"},
                      {"value": "steelblue"}
                    ],
                    "strokeOpacity": [
                      {"test": "parent.source === active || parent.target === active", "value": 1},
                      {"value": 0.2}
                    ],
                    "tension": {"signal": "tension"},
                    "x": {"field": "x"},
                    "y": {"field": "y"}
                  }
                }
              }
            ]
          }
        ],

        "scales": [
          {
            "name": "color",
            "type": "ordinal",
            "domain": ["depends on", "imported by"],
            "range": [{"signal": "colorIn"}, {"signal": "colorOut"}]
          }
        ],

        "legends": [
          {
            "stroke": "color",
            "orient": "bottom-right",
            "title": "Dependencies",
            "symbolType": "stroke"
          }
        ]
      }

      setTimeout(() => {
        this.vegaView = new vega.View(vega.parse(spec))
            .renderer('canvas')  // set renderer (canvas or svg)
            .initialize('#blogs-hierarchical-edge-bundling-vega') // initialize view within parent DOM container
            .hover()             // enable hover encode set processing
            .run();
      }, 100);
    }

    private displayForceDirectedLayoutDiagramVega() {
        const spec: vega.Spec = {
          "$schema": "https://vega.github.io/schema/vega/v5.json",
          "description": "A node-link diagram with force-directed layout, depicting character co-occurrence in the novel Les Misérables.",
          "width": 800,
          "height": 600,
          "padding": 0,
          "autosize": "none",

          "signals": [
            { "name": "cx", "update": "width / 2" },
            { "name": "cy", "update": "height / 2" },
            { "name": "nodeRadius", "value": 10,
              "bind": {"input": "range", "min": 1, "max": 50, "step": 1} },
            { "name": "nodeCharge", "value": -30,
              "bind": {"input": "range", "min":-100, "max": 10, "step": 1} },
            { "name": "linkDistance", "value": 200,
              "bind": {"input": "range", "min": 100, "max": 400, "step": 1} },
            { "name": "static", "value": false,
              "bind": {"input": "checkbox"} },
            {
              "description": "State variable for active node fix status.",
              "name": "fix", "value": false,
              "on": [
                {
                  "events": "symbol:mouseout[!event.buttons], window:mouseup",
                  "update": "false"
                },
                {
                  "events": "symbol:mouseover",
                  "update": "fix || true"
                },
                {
                  "events": "[symbol:mousedown, window:mouseup] > window:mousemove!",
                  "update": "xy()",
                  "force": true
                }
              ]
            },
            {
              "description": "Graph node most recently interacted with.",
              "name": "node", "value": null,
              "on": [
                {
                  "events": "symbol:mouseover",
                  "update": "fix === true ? item() : node"
                }
              ]
            },
            {
              "description": "Flag to restart Force simulation upon data changes.",
              "name": "restart", "value": false,
              "on": [
                {"events": {"signal": "fix"}, "update": "fix && fix.length"}
              ]
            }
          ],

          "data": [
            {
              "name": "node-data",
              "url": "assets/communities/blog1__directed_graph_CNA.json",
              "format": {"type": "json", "property": "nodes"}
            },
            {
              "name": "link-data",
              "url": "assets/communities/blog1__directed_graph_CNA.json",
              "format": {"type": "json", "property": "links"}
            }
          ],

          "scales": [
            {
              "name": "color",
              "type": "ordinal",
              "domain": {"data": "node-data", "field": "group"},
              "range": {"scheme": "category10"}
            }
          ],

          "marks": [
            {
              "name": "nodes",
              "type": "symbol",
              "zindex": 1,

              "from": {"data": "node-data"},
              "on": [
                {
                  "trigger": "fix",
                  "modify": "node",
                  "values": "fix === true ? {fx: node.x, fy: node.y} : {fx: fix[0], fy: fix[1]}"
                },
                {
                  "trigger": "!fix",
                  "modify": "node", "values": "{fx: null, fy: null}"
                }
              ],

              "encode": {
                "enter": {
                  "fill": {"scale": "color", "field": "group"},
                  "stroke": {"value": "white"}
                },
                "update": {
                  "size": {"signal": "2 * nodeRadius + datum.value"},
                  "cursor": {"value": "pointer"}
                }
              },

              "transform": [
                {
                  "type": "force",
                  "iterations": 300,
                  "restart": {"signal": "restart"},
                  "static": {"signal": "static"},
                  "signal": "force",
                  "forces": [
                    {"force": "center", "x": {"signal": "cx"}, "y": {"signal": "cy"}},
                    {"force": "collide", "radius": {"signal": "nodeRadius"}},
                    {"force": "nbody", "strength": {"signal": "nodeCharge"}},
                    {"force": "link", "links": "link-data", "distance": {"signal": "linkDistance"}}
                  ]
                }
              ]
            },
            {
              "type": "path",
              "from": {"data": "link-data"},
              "interactive": false,
              "encode": {
                "update": {
                  "stroke": {"value": "#ccc"},
                  "strokeWidth": {"value": 0.5}
                }
              },
              "transform": [
                {
                  "filter": "datum.value > 10",
                  "type": "linkpath",
                  "require": {"signal": "force"},
                  "shape": "line",
                  "sourceX": "datum.source.x", "sourceY": "datum.source.y",
                  "targetX": "datum.target.x", "targetY": "datum.target.y"
                }
              ]
            }
          ]
        }

        setTimeout(() => {
            this.vegaView = new vega.View(vega.parse(spec))
                .renderer('canvas')  // set renderer (canvas or svg)
                .initialize('#blogs-force-directed-graph-vega') // initialize view within parent DOM container
                .hover()             // enable hover encode set processing
                .run();
        }, 100);


    }

    public computeGroup(name: String) {
      if (name.startsWith('STUD')) {
        return 3;
      } else if (name.startsWith('TA')) {
        return 2;
      } else {
        return 1; //Lecturer
      }
    }

    public drawDirectedGraphD3(id, graph) {
      var width = 900;
      var height = 900;
      //var color = d3.scaleOrdinal(d3.schemeCategory10);
      var colorGroup = {
        1: 'Tomato', 2: 'MediumSeaGreen', 3: 'DodgerBlue'
      };
      var _this = this;

      //d3.json("assets/communities/" + this.selectedCommunity.name + "__directed_graph_CNA.json").then(function(graph: any) {

      //d3.json("assets/communities/pa_2018-2019_directed_graph_week13.json").then(function(graph: any) {

        var label = {
            'nodes': [],
            'links': []
        };

        graph.nodes.forEach(function(d, i) {
            d.group = _this.computeGroup(d.name);
            label.nodes.push({node: d});
            label.nodes.push({node: d});
            label.links.push({
                source: i * 2,
                target: i * 2 + 1
            });
        });

        var labelLayout = d3.forceSimulation(label.nodes)
            .force("charge", d3.forceManyBody().strength(-50))
            .force("link", d3.forceLink(label.links).distance(0).strength(2));

        var graphLayout = d3.forceSimulation(graph.nodes)
            .force("charge", d3.forceManyBody().strength(-3000))
            .force("center", d3.forceCenter(width / 2, height / 2))
            .force("x", d3.forceX(width / 2).strength(1))
            .force("y", d3.forceY(height / 2).strength(1))
            .force("link", d3.forceLink(graph.links).id(function(d: any) {return d.id; }).distance(400).strength(1))
            .on("tick", ticked);

        var adjlist = [];

        graph.links.forEach(function(d) {
            adjlist[d.source.index + "-" + d.target.index] = true;
            adjlist[d.target.index + "-" + d.source.index] = true;
        });

        function neigh(a, b) {
            return a == b || adjlist[a + "-" + b];
        }


        var svg = d3.select("#" + id).attr("width", width).attr("height", height);
        var container = svg.append("g");

        svg.call(
            d3.zoom()
                .scaleExtent([.1, 4])
                .on("zoom", function() { container.attr("transform", d3.event.transform); })
        );

        var link = container.append("g").attr("class", "links")
            .selectAll("line")
            .data(graph.links)
            .enter()
            .append("line")
            .attr("stroke", "#aaa")
            //.attr("stroke-width", "1px");
            .attr("stroke-width",
              function(d: any) { return d.value == 0.0 ? 0 + "px": (Math.log(d.value) + 1)*3 + "px"; }
            );

        var node = container.append("g").attr("class", "nodes")
            .selectAll("g")
            .data(graph.nodes)
            .enter()
            .append("circle")
            .attr("r",
              function(d: any) { return d.value == 0 ? 5 : (Math.log(d.value) + 1)*5; }
              //10
            )
            .attr("fill", function(d: any) { return colorGroup[d.group]  ; })


        node.on("mouseover", focus).on("mouseout", unfocus);

        node.call(
            d3.drag()
                .on("start", dragstarted)
                .on("drag", dragged)
                .on("end", dragended)
        );

        var labelNode = container.append("g").attr("class", "labelNodes")
            .selectAll("text")
            .data(label.nodes)
            .enter()
            .append("text")
            .text(function(d, i) { return i % 2 == 0 ? "" : d.node.name; })
            .style("fill", "#555")
            .style("font-family", "Arial")
            .style("font-size", 18)
            .style("font-weight", "bold")
            .style("pointer-events", "none"); // to prevent mouseover/drag capture

        node.on("mouseover", focus).on("mouseout", unfocus);

        function ticked() {

            node.call(updateNode);
            link.call(updateLink);

            labelLayout.alphaTarget(0.3).restart();
            labelNode.each(function(d, i) {
                if(i % 2 == 0) {
                    d.x = d.node.x;
                    d.y = d.node.y;
                } else {
                    var b = this.getBBox();

                    var diffX = d.x - d.node.x;
                    var diffY = d.y - d.node.y;

                    var dist = Math.sqrt(diffX * diffX + diffY * diffY);

                    var shiftX = b.width * (diffX - dist) / (dist * 2);
                    shiftX = Math.max(-b.width, Math.min(0, shiftX));
                    var shiftY = 16;
                    this.setAttribute("transform", "translate(" + shiftX + "," + shiftY + ")");
                }
            });
            labelNode.call(updateNode);

        }

        function fixna(x) {
            if (isFinite(x)) return x;
            return 0;
        }

        function focus(d) {
            //var index = d3.select(d3.event.target).datum().index;
            var index = d3.event.target.id;
            node.style("opacity", function(o: any) {
                return neigh(index, o.index) ? 1 : 0.1;
            });
            labelNode.attr("display", function(o) {
              return neigh(index, o.node.index) ? "block": "none";
            });
            link.style("opacity", function(o: any) {
                return o.source.index == index || o.target.index == index ? 1 : 0.1;
            });
        }

        function unfocus() {
          labelNode.attr("display", "block");
          node.style("opacity", 1);
          link.style("opacity", 1);
        }

        function updateLink(link) {
            link.attr("x1", function(d) { return fixna(d.source.x); })
                .attr("y1", function(d) { return fixna(d.source.y); })
                .attr("x2", function(d) { return fixna(d.target.x); })
                .attr("y2", function(d) { return fixna(d.target.y); });
        }

        function updateNode(node) {
            node.attr("transform", function(d) {
                return "translate(" + fixna(d.x) + "," + fixna(d.y) + ")";
            });
        }

        function dragstarted(d) {
            d3.event.sourceEvent.stopPropagation();
            if (!d3.event.active) graphLayout.alphaTarget(0.3).restart();
            d.fx = d.x;
            d.fy = d.y;
        }

        function dragged(d) {
            d.fx = d3.event.x;
            d.fy = d3.event.y;
        }

        function dragended(d) {
            if (!d3.event.active) graphLayout.alphaTarget(0);
            d.fx = null;
            d.fy = null;
        }

      //}); // d3.json
    }

    public drawEdgeBundlingD3() {

      //var color = d3.scaleOrdinal(d3.schemeCategory10);
      var colorGroup = {
        1: 'Tomato', 2: 'MediumSeaGreen', 3: 'DodgerBlue'
      };

      var diameter = 900,
            radius = diameter / 2,
            innerRadius = radius - 120;

        var cluster = d3.cluster()
            .size([360, innerRadius]);

        var line = d3.radialLine()
            .curve(d3.curveBundle.beta(0.85))
            .radius(function(d:any) { return d.y; })
            .angle(function(d:any) { return d.x / 180 * Math.PI; });

        var svg = d3.select("#viz-edge-bundling")
            .attr("width", diameter)
            .attr("height", diameter)
          .append("g")
            .attr("transform", "translate(" + radius + "," + radius + ")");

        var link = svg.append("g").selectAll(".link"),
            node = svg.append("g").selectAll(".node");

            d3.json("assets/communities/" + this.selectedCommunity.name + "_edge_bundling_CNA.json").then(function(classes: any) {

          var root = packageHierarchy(classes)
              .sum(function(d) { return d.size; });

          cluster(root);

          link = link
            .data(packageImports(root.leaves()))
            .enter().append("path")
              .each(function(d) { d.source = d[0], d.target = d[d.length - 1]; })
              .attr("class", "link")
              .attr("d", line);

          node = node
            .data(root.leaves())
            .enter().append("text")
              .attr("class", "node")
              //.style("font-size", "18px")
              .style("fill", function(d: any) { return colorGroup[d.data.group]; })
              .attr("dy", "0.31em")
              .attr("transform", function(d: any) { return "rotate(" + (d.x - 90) + ")translate(" + (d.y + 8) + ",0)" + (d.x < 180 ? "" : "rotate(180)"); })
              .attr("text-anchor", function(d: any) { return d.x < 180 ? "start" : "end"; })
              .text(function(d) { return d.data.key; })
              .on("mouseover", mouseovered)
              .on("mouseout", mouseouted);
        });

        function mouseovered(d) {
            node
                .each(function(n: any) { n.target = n.source = false; });

            link
                .classed("link--target", function(l: any) { if (l.target === d) return l.source.source = true; })
                .classed("link--source", function(l: any) { if (l.source === d) return l.target.target = true; })
                .filter(function(l: any) { return l.target === d || l.source === d; });
                //.each(function() { this.parentNode.appendChild(this); });

            node
                .classed("node--target", function(n: any) { return n.target; })
                .classed("node--source", function(n: any) { return n.source; });
        }

        function mouseouted(d) {
            link
                .classed("link--target", false)
                .classed("link--source", false);

            node
                .classed("node--target", false)
                .classed("node--source", false);
        }

        d3.select(self.frameElement).style("height", diameter + "px");

        // Lazily construct the package hierarchy from class names.
        function packageHierarchy(classes) {
          var map = {};

          function find(name, data) {
            var node = map[name], i;
            if (!node) {
              node = map[name] = data || {name: name, children: []};
              if (name.length) {
                node.parent = find(name.substring(0, i = name.lastIndexOf(".")), null);
                node.parent.children.push(node);
                node.key = name.substring(i + 1);
              }
            }
            return node;
          }

          classes.data.forEach(function(d) {
            find(d.name, d);
          });

          return d3.hierarchy(map[""]);
        }

        // Return a list of imports for the given array of nodes.
        function packageImports(nodes) {
          var map = {},
              imports = [];

          // Compute a map from name to node.
          nodes.forEach(function(d) {
            map[d.data.name] = d;
          });

          // For each import, construct a link from the source to target node.
          nodes.forEach(function(d) {
            if (d.data.imports) d.data.imports.forEach(function(i) {
              imports.push(map[d.data.name].path(map[i]));
            });
          });

          return imports;
        }
    }

    public legend() {
      // select the svg area
      var svg = d3.select("#my_blogs_legend")

      // Handmade legend
      svg.append("circle").attr("cx",200).attr("cy",130).attr("r", 6).style("fill", "Tomato")
      svg.append("circle").attr("cx",200).attr("cy",160).attr("r", 6).style("fill", "MediumSeaGreen")
      svg.append("circle").attr("cx",200).attr("cy",190).attr("r", 6).style("fill", "DodgerBlue")
      svg.append("text").attr("x", 220).attr("y", 130).text("Lecturer").style("font-size", "18px").attr("alignment-baseline","middle")
      svg.append("text").attr("x", 220).attr("y", 160).text("Teaching Assistant").style("font-size", "18px").attr("alignment-baseline","middle")
      svg.append("text").attr("x", 220).attr("y", 190).text("Student").style("font-size", "18px").attr("alignment-baseline","middle")
    }

    public clusteredForceLayout(id, data) {
      var width = 960,
      height = 500,
      padding = 1.5, // separation between same-color nodes
      clusterPadding = 6, // separation between different-color nodes
      maxRadius = 12;
      var _this = this;

      var color = d3.scaleOrdinal()
            .range(["#7A99AC", "#E4002B"]);



      //d3.text("word_groups.csv", function(error, text) {

        data.forEach(function(d) {
          d.value = +d.value;
        });


        //unique cluster/group id's
        var cs = [1,2,3];

        var n = data.length, // total number of nodes
            m = cs.length; // number of distinct clusters

        //create clusters and nodes
        var clusters = new Array(m);
        var nodes = [];
        for (var i = 0; i<n; i++){
            nodes.push(create_nodes(data,i));
        }



        var svg = d3.select("#" + id).append("svg")
            .attr("width", width)
            .attr("height", height);


        var node = svg.selectAll("circle")
            .data(nodes)
            .enter().append("g").call(d3.drag());

        var colorGroup = {
          1: 'green', 2: 'blue', 3: 'orange'
        };
        node.append("circle")
            .attr("fill", function(d: any) { return colorGroup[d.group]  ; })
            .attr("r", function(d){return d.radius})


        node.append("text")
              .attr("dy", ".3em")
              .style("text-anchor", "middle")
              .text(function(d) { return d.text.substring(0, d.radius / 3); });

        var force = d3.forceSimulation(nodes)
        .force("center", d3.forceCenter(width / 2, height / 2))
        .force("x", d3.forceX(width / 2).strength(1))
        .force("y", d3.forceY(height / 2).strength(1))
        //.gravity(.02)
        .force("charge", d3.forceCollide)
        .on("tick", ticked);


        function create_nodes(data,node_counter) {
          var i = _this.computeGroup(data[node_counter].name),
              r = Math.sqrt((i + 1) / m * -Math.log(Math.random())) * maxRadius,
              d = {
                cluster: i,
                radius: data[node_counter].value*1.5,
                text: data[node_counter].name,
                x: Math.cos(i / m * 2 * Math.PI) * 200 + width / 2 + Math.random(),
                y: Math.sin(i / m * 2 * Math.PI) * 200 + height / 2 + Math.random()
              };
          if (!clusters[i] || (r > clusters[i].radius)) clusters[i] = d;
          return d;
        };



        function tick(e) {
            node.each(cluster(10 * e.alpha * e.alpha))
                .each(collide(.5))
            .attr("transform", function (d) {
              console.log(d);
                var k = "translate(" + d.x + "," + d.y + ")";
                return k;
            })

        }

        function ticked() {
          node.call(tick)
        }
        // Move d to be adjacent to the cluster node.
        function cluster(alpha) {
            return function (d) {
                var cluster = clusters[d.cluster];
                if (cluster === d) return;
                var x = d.x - cluster.x,
                    y = d.y - cluster.y,
                    l = Math.sqrt(x * x + y * y),
                    r = d.radius + cluster.radius;
                if (l != r) {
                    l = (l - r) / l * alpha;
                    d.x -= x *= l;
                    d.y -= y *= l;
                    cluster.x += x;
                    cluster.y += y;
                }
            };
        }

        // Resolves collisions between d and all other circles.
        function collide(alpha) {
            var quadtree = d3.quadtree(nodes);
            return function (d) {
                var r = d.radius + maxRadius + Math.max(padding, clusterPadding),
                    nx1 = d.x - r,
                    nx2 = d.x + r,
                    ny1 = d.y - r,
                    ny2 = d.y + r;
                quadtree.visit(function (quad: any, x1, y1, x2, y2) {
                    if (quad.point && (quad.point !== d)) {
                        var x = d.x - quad.point.x,
                            y = d.y - quad.point.y,
                            l = Math.sqrt(x * x + y * y),
                            r = d.radius + quad.point.radius + (d.cluster === quad.point.cluster ? padding : clusterPadding);
                        if (l < r) {
                            l = (l - r) / l * alpha;
                            d.x -= x *= l;
                            d.y -= y *= l;
                            quad.point.x += x;
                            quad.point.y += y;
                        }
                    }
                    return x1 > nx2 || x2 < nx1 || y1 > ny2 || y2 < ny1;
                });
            };
        }
      //});


    }

    public generateViews(){
      // this.cleanData();
      // this.legend();
      //this.drawDirectedGraphD3();
      this.drawEdgeBundlingD3();
    }

    public generateDirectedGradphForAllWeeks() {
      var _this = this;
      // d3.json("assets/communities/pa_2018-2019_graphs.json").then(function(graph: any) {

      //   for (var key in graph) {
      //     _this.drawDirectedGraphD3("blogs-force-directed-graph-lastyear-" + key, graph[key]);
      //   }

      // });

      // d3.json("assets/communities/pa_2019-2020_graphs.json").then(function(graph: any) {

      //   for (var key in graph) {
      //     _this.drawDirectedGraphD3("blogs-force-directed-graph-" + key, graph[key]);
      //   }
      // });


      // d3.json("assets/communities/pa_2018-2019-graph.json").then(function(graph: any) {
      //   _this.drawDirectedGraphD3("blogs-force-directed-graph-lastyear-all", graph);
      // });
      // d3.json("assets/communities/pa_2019-2020-graph.json").then(function(graph: any) {
      //   _this.drawDirectedGraphD3("blogs-force-directed-graph-thisyear-all", graph);
      // });
    }

    test () {
      var _this = this;
      d3.json("assets/communities/blog1__directed_graph_CNA.json").then(function(graph: any) {
        
        var data = [];
        graph.nodes.forEach(node => {
            var element = {name: '', size: 0, group: 0, imports: []};
            element.name = node.name;
            element.size = node.value;
            element.group = _this.computeGroup(node.name);
            element.imports.push(node.name);
            graph.links.forEach(link => {
              if (node.id === link.source) {
                var found = graph.nodes.find(n => n.id === link.target);
                element.imports.push(found.name);
              }

              if (node.id === link.target) {
                var found = graph.nodes.find(n => n.id === link.source);
                element.imports.push(found.name);
              }
            });
            data.push(element);
        });

        console.log(JSON.stringify(data));

      });
    }


    public cleanData(){
      d3.select("#my_blogs_legend").selectAll("*").remove();
      d3.select("#viz").selectAll("*").remove();
      d3.select("#viz-edge-bundling").selectAll("*").remove();
    }

  }
