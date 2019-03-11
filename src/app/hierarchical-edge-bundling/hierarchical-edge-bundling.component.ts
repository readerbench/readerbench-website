import { Component, Input, AfterViewInit, ViewEncapsulation } from '@angular/core';
import { HierarchicalEdgeBundlingDO } from './hierarchical-edge-bundling.do';
import * as d3 from "d3";
import * as d3Hierarchy from "d3-hierarchy";
import * as d3Shape from "d3-shape"

@Component({
  selector: 'hierarchical-edge-bundling',
  template: ``,
  styleUrls: ['./hierarchical-edge-bundling.component.css'],
//  encapsulation: ViewEncapsulation.None
})

export class HierarchicalEdgeBundlingComponent implements AfterViewInit{

  @Input() data: Array<any> = [];
  @Input() week: number;
  isLoadingGraph: boolean = false;

  ngAfterViewInit() {
    this.buildGraph(this.data);
  }
  
  private buildGraph(classes) {
    var diameter = 700,
      radius = diameter / 2,
      innerRadius = radius - 120;

    var cluster = d3Hierarchy.cluster()
      .size([360, innerRadius]);

    var line = d3Shape.radialLine()
      .curve(d3Shape.curveBundle.beta(0.85))
      .radius((d: any) => d.y)
      .angle((d: any) => d.x / 180 * Math.PI);

    var elementId = "#graph-representation" + this.week;
    var svg = d3.select(elementId).append("svg")
      .attr("width", diameter)
      .attr("height", diameter)
    .append("g")
      .attr("transform", "translate(" + radius + "," + radius + ")");

    var link = svg.append("g").selectAll(".link"),
      node = svg.append("g").selectAll(".node");

    //d3.json("flare.json", function(error, classes) {
    //if (error) throw error;

    var root = packageHierarchy(classes)
      .sum(d => d.size);

    cluster(root);

    link = link
      .data(packageImports(root.leaves()))
      .enter().append("path")
      .each(d => { d.source = d[0], d.target = d[d.length - 1]; })
      .attr("class", "link")
      .attr("d", line);

    node = node
      .data(root.leaves())
      .enter().append("text")
      .attr("class", (d: any) => { 
        //console.log(d.data.group);
        if (d.data.group === "CENTRAL") {
          return 'node-central';
        } else if (d.data.group === "ACTIVE") {
          return 'node-active';
        } else if (d.data.group === "PERIPHERAL") {
          return 'node-peripheric';
        } else {
          return 'node';
        }
       })
      .attr("dy", "0.31em")
      .attr("transform", (d: any) => "rotate(" + (d.x - 90) + ")translate(" + (d.y + 8) + ",0)" + (d.x < 180 ? "" : "rotate(180)"))
      .attr("text-anchor", (d: any) => d.x < 180 ? "start" : "end")
      .text((d: any) => d.data.key)
      .on("mouseover", mouseovered)
      .on("mouseout", mouseouted);
    //});

    function mouseovered(d) {
	    node
	      .each((n: any) => { n.target = n.source = false; });

	    link
	      .classed("link--target", (l: any) => { if (l.target === d) return l.source.source = true; })
	      .classed("link--source", (l: any) => { if (l.source === d) return l.target.target = true; })
	      .filter((l: any) => (l.target === d || l.source === d));
	      //.raise();

	    node
	      .classed("node--target", (n: any) => n.target)
	      .classed("node--source", (n: any) => n.source);
    }

    function mouseouted(d) {
	    link
	      .classed("link--target", false)
	      .classed("link--source", false);

	    node
	      .classed("node--target", false)
	      .classed("node--source", false);
    }

    // Lazily construct the package hierarchy from class names.
    function packageHierarchy(classes) {
      var map = {};

      function find(name, data, group) {
      var node = map[name], i;
      
      if (!node) {
        node = map[name] = data || {name: name, children: []};
        if (name.length) {
        node.parent = find(name.substring(0, i = name.lastIndexOf("/")), undefined, undefined);        
        node.parent.children.push(node);
        node.key = name.substring(i + 1);
        node.group = group;

        // node.parent = find(name.substring(0, i = name.lastIndexOf(".")));        
        // node.parent.children.push(node);         
        // node.key = name.substring(i + 1);
    	  }
        
      }

      return node;
      }

      classes.forEach(d => find(d.name, d, d.group));

      return d3Hierarchy.hierarchy(map[""]);
    }

    // Return a list of imports for the given array of nodes.
    function packageImports(nodes) {
	    var map = {},
	      imports = [];

	    // Compute a map from name to node.
	    nodes.forEach(d => {map[d.data.name] = d});

	    // For each import, construct a link from the source to target node.
	    nodes.forEach(d => {
	      if (d.data.imports) d.data.imports.forEach(i => {
	        if(map[i] && map[d.data.name]) {
	          imports.push(map[d.data.name].path(map[i]));
	        }
	        
	      });
	    });

	    return imports;
    }
  }  
   
}


