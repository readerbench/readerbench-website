import { Component, OnInit, SystemJsNgModuleLoader } from "@angular/core";
import * as d3 from 'd3';
import * as vega from 'vega';
import { RadarChart } from "./radar-chart";

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

    ngOnInit() {

      //this.displayForceDirectedLayoutDiagramVega();
      //this.displayEdgeBundlingDiagramVega(); - doens't work
      //this.radarChartViewD3();

      //this.circularBarplot();

      this.parallelViewD3();
      
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
      d3.json("assets/communities/parallel-view.json").then(function(data: any) {

      // Color scale: give me a specie name, I return a color
      var color = d3.scaleOrdinal()
        .domain(["STUD", "TA", "PROF" ])
        .range([ "#440154ff", "#21908dff", "#fde725ff"])

      // Here I set the list of dimension manually to control the order of axis:
      var dimensions = ["week_1", "week_2", "week_3", "week_4", "week_5", "week_6", "week_7", "week_8", "week_9", "week_10", "week_11", "week_12", "week_13", "week_14"]

      // For each dimension, I build a linear scale. I store all in a y object
      var y = {}
      for (var i in dimensions) {
        var name = dimensions[i]
        y[name] = d3.scaleLinear()
          .domain( [0,100] ) // --> Same axis range for each group
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

    var data = [
      { name: 'STUDENT 1',
        axes: [
          {axis: 'week 1', value: 42},
          {axis: 'week 2', value: 20},
          {axis: 'week 3', value: 60},
          {axis: 'week 4', value: 26},
          {axis: 'week 5', value: 35},
          {axis: 'week 6', value: 20},
          {axis: 'week 7', value: 42},
          {axis: 'week 8', value: 20},
          {axis: 'week 9', value: 60},
          {axis: 'week 10', value: 26},
          {axis: 'week 11', value: 35},
          {axis: 'week 12', value: 20},
          {axis: 'week 13', value: 35},
          {axis: 'week 14', value: 20}
        ]
      },
      { name: 'STUDENT 2',
        axes: [
          {axis: 'week 1', value: 54},
          {axis: 'week 2', value: 23},
          {axis: 'week 3', value: 78},
          {axis: 'week 4', value: 90},
          {axis: 'week 5', value: 23},
          {axis: 'week 6', value: 45},
          {axis: 'week 7', value: 23},
          {axis: 'week 8', value: 23},
          {axis: 'week 9', value: 43},
          {axis: 'week 10', value: 54},
          {axis: 'week 11', value: 76},
          {axis: 'week 12', value: 86},
          {axis: 'week 13', value: 12},
          {axis: 'week 14', value: 12}
        ]
      },
      { name: 'STUDENT 3',
        axes: [
          {axis: 'week 1', value: 12},
          {axis: 'week 2', value: 34},
          {axis: 'week 3', value: 45},
          {axis: 'week 4', value: 64},
          {axis: 'week 5', value: 43},
          {axis: 'week 6', value: 64},
          {axis: 'week 7', value: 56},
          {axis: 'week 8', value: 34},
          {axis: 'week 9', value: 76},
          {axis: 'week 10', value: 23},
          {axis: 'week 11', value: 65},
          {axis: 'week 12', value: 87},
          {axis: 'week 13', value: 12},
          {axis: 'week 14', value: 45}
        ]
      },
      { name: 'STUDENT 4',
        axes: [
          {axis: 'week 1', value: 12},
          {axis: 'week 2', value: 34},
          {axis: 'week 3', value: 4},
          {axis: 'week 4', value: 34},
          {axis: 'week 5', value: 23},
          {axis: 'week 6', value: 43},
          {axis: 'week 7', value: 21},
          {axis: 'week 8', value: 89},
          {axis: 'week 9', value: 78},
          {axis: 'week 10', value: 67},
          {axis: 'week 11', value: 89},
          {axis: 'week 12', value: 67},
          {axis: 'week 13', value: 98},
          {axis: 'week 14', value: 7}
        ]
      },
      { name: 'STUDENT 5',
        axes: [
          {axis: 'week 1', value: 78},
          {axis: 'week 2', value: 97},
          {axis: 'week 3', value: 57},
          {axis: 'week 4', value: 87},
          {axis: 'week 5', value: 46},
          {axis: 'week 6', value: 34},
          {axis: 'week 7', value: 23},
          {axis: 'week 8', value: 45},
          {axis: 'week 9', value: 67},
          {axis: 'week 10', value: 24},
          {axis: 'week 11', value: 57},
          {axis: 'week 12', value: 78},
          {axis: 'week 13', value: 23},
          {axis: 'week 14', value: 67}
        ]
      }
    ];
  
    var radarChartOptions = {
      w: 690,
      h: 350,
      margin: margin,
      maxValue: 60,
      levels: 6,
      roundStrokes: false,
      color: d3.scaleOrdinal(d3.schemeSet3),
      format: '.0f',
      legend: { title: 'Students', translateX: 150, translateY: 40 },
      unit: ' posts'
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

    public drawDirectedGraphD3() {
      var width = 1000;
      var height = 1000;
      var color = d3.scaleOrdinal(d3.schemeSet3); 

      d3.json("assets/communities/" + this.selectedCommunity.name + "__directed_graph_CNA.json").then(function(graph: any) {

        var label = {
            'nodes': [],
            'links': []
        };

        graph.nodes.forEach(function(d, i) {
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


        var svg = d3.select("#viz").attr("width", width).attr("height", height);
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
              function(d: any) { return d.value == 0.0 ? 0 + "px": (Math.log(d.value) + 1) + "px"; }
            );

        var node = container.append("g").attr("class", "nodes")
            .selectAll("g")
            .data(graph.nodes)
            .enter()
            .append("circle")
            .attr("r", 
              function(d: any) { return(Math.log(d.value) + 1)*5; }
              //10
            )
            .attr("fill", function(d: any) { return color(d.group); })

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
            .text(function(d, i) { return i % 2 == 0 ? "" : d.node.id; })
            .style("fill", "#555")
            .style("font-family", "Arial")
            .style("font-size", 24)
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

      }); // d3.json
    }

    public drawEdgeBundlingD3() {
      // var diameter = 960,
      //   radius = diameter / 2,
      //   innerRadius = radius - 120;

      // var cluster = d3.cluster()
      //     .size([360, innerRadius]);

      // const line = d3.radialLine()
      //     .radius(function(d: any) { return d.y; })
      //     .angle(function(d: any) { return d.x / 180 * Math.PI; })
      //     .curve(d3.curveBundle.beta(0.95));

      // var svg = d3.select("#viz-edge-bundling")
      //     .attr("width", diameter)
      //     .attr("height", diameter)
      //     .append("g")
      //     .attr("transform", "translate(" + radius + "," + radius + ")");

      // var link = svg.append("g").selectAll(".link"),
      //     node = svg.append("g").selectAll(".node");

      //     d3.json("assets/communities/blog1__directed_graph_CNA.json").then(function(graph: any) {

      //     var root = d3.hierarchy(packageHierarchy(graph), (d) => d.children);

      //     var links = packageImports(root.descendants());

      //     console.dir(links);

      //     cluster(root);

      //     var nodes = root.descendants();

      //     link = link
      //         .data(links)
      //         .enter().append('path')
      //         .attr('class', 'link')
      //         //.merge(edges)
      //         .attr('d', d => line(d.source.path(d.target)));

      //     node = node
      //         .data(nodes.filter(function(n) { return !n.children; }))
      //         .enter().append("text")
      //         .attr("class", "node")
      //         .attr("dy", ".31em")
      //         .attr("transform", function(d: any) { return "rotate(" + (d.x - 90) + ")translate(" + (d.y + 8) + ",0)" + (d.x < 180 ? "" : "rotate(180)"); })
      //         .style("text-anchor", function(d: any) { return d.x < 180 ? "start" : "end"; })
      //         .text(function(d) { return d.data.key; })
      //         .on("mouseover", mouseovered)
      //         .on("mouseout", mouseouted);
      // });

      // function mouseovered(d) {
      //     node
      //         .each(function(n: any) { n.target = n.source = false; });

      //     link
      //         .classed("link--target", function(l: any) { if (l.target === d) return l.source.source = true; })
      //         .classed("link--source", function(l: any) { if (l.source === d) return l.target.target = true; })
      //         .filter(function(l: any) { return l.target === d || l.source === d; })
      //         //.each(function() { this.parentNode.appendChild(this); });

      //     node
      //         .classed("node--target", function(n: any) { return n.target; })
      //         .classed("node--source", function(n: any) { return n.source; });
      // }

      // function mouseouted(d) {
      //     console.log("moouseout");
      //     link
      //         .classed("link--target", false)
      //         .classed("link--source", false);

      //     node
      //         .classed("node--target", false)
      //         .classed("node--source", false);
      // }

      // d3.select(self.frameElement).style("height", diameter + "px");

      // // Lazily construct the package hierarchy from class names.
      // function packageHierarchy(classes) {
      //     var map = {};

      //     function find(name, data) {
      //         var node = map[name], i;
      //         if (!node) {
      //             node = map[name] = data || {name: name, children: []};
      //             if (name.length) {
      //                 node.parent = data.find(name.substring(0, i = name.lastIndexOf(".")));
      //                 node.parent.children.push(node);
      //                 node.key = name.substring(i + 1);
      //             }
      //         }
      //         return node;
      //     }

      //     classes.forEach(function(d) {
      //         find(d.name, d);
      //     });

      //     return map[""];
      // }

      // // Return a list of imports for the given array of nodes.
      // function packageImports(nodes) {
      //     var map = {},
      //         imports = [];

      //     // Compute a map from name to node.
      //     nodes.forEach(function(d) {
      //         map[d.data.name] = d;
      //     });

      //     // For each import, construct a link from the source to target node.
      //     nodes.forEach(function(d) {
      //         if (d.data.imports) d.data.imports.forEach(function(i) {
      //             imports.push({source: map[d.data.name], target: map[i]});
      //         });
      //     });

      //     return imports;
      // }

      var diameter = 700,
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
      svg.append("circle").attr("cx",200).attr("cy",130).attr("r", 6).style("fill", "rgb(141, 211, 199)")
      svg.append("circle").attr("cx",200).attr("cy",160).attr("r", 6).style("fill", "rgb(190, 186, 218)")
      svg.append("circle").attr("cx",200).attr("cy",190).attr("r", 6).style("fill", "rgb(255, 255, 179)")
      svg.append("text").attr("x", 220).attr("y", 130).text("CENTRAL").style("font-size", "18px").attr("alignment-baseline","middle")
      svg.append("text").attr("x", 220).attr("y", 160).text("ACTIVE").style("font-size", "18px").attr("alignment-baseline","middle")
      svg.append("text").attr("x", 220).attr("y", 190).text("PERIPHERAL").style("font-size", "18px").attr("alignment-baseline","middle")
    }

    public generateViews(){
      // this.cleanData();
      // this.legend();
      //this.drawDirectedGraphD3();
      //this.drawEdgeBundlingD3();
    }

    public cleanData(){
      d3.select("#my_blogs_legend").selectAll("*").remove();
      d3.select("#viz").selectAll("*").remove();
      d3.select("#viz-edge-bundling").selectAll("*").remove();
    }

  }