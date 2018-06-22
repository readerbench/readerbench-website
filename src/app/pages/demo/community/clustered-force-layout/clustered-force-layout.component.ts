import { Component, OnInit, Input } from '@angular/core';
import * as d3 from "d3";

@Component({
  selector: 'app-clustered-force-layout',
  templateUrl: './clustered-force-layout.component.html',
  styleUrls: ['./clustered-force-layout.component.css']
})

export class ClusteredForceLayoutComponent implements OnInit {
	@Input() communityData: any[] = [];

  constructor() { }

  ngOnInit() {/*
  	var colNames = "text,size,group\n" + this.mockData;
  	var data = d3.csv.parse(colNames);
	  data.forEach(function(d) {
	    d.size = +d.size;
	  });*/
  	this.generateLayout(this.communityData.sort((a, b) => a.group - b.group));
	  //console.log(this.communityData);
  }

  private generateLayout(data) {
		var width = 960,
		    height = 500,
		    padding = 1.5, // separation between same-color nodes
		    clusterPadding = 6, // separation between different-color nodes
		    maxRadius = 12;

		var color = d3.scale.ordinal()
		      .range(["#1E90FF", "#228B22", "#FF8C00"]);

		//unique cluster/group id's
		var cs = [];
		data.forEach(function(d){
      if(!cs.find(g => g == d.group)) {
          cs.push(d.group);
      }
		});

		var n = data.length, // total number of nodes
		    m = cs.length; // number of distinct clusters

		//create clusters and nodes
		var clusters = new Array(m);
		var cluster_count = [1, 2, 3].map(c => data.filter(d => d.group == c).length);
		var nodes = [];
		var group_counter = 0;
		var prev_group = 0;
		for (var i = 0; i<n; i++, group_counter++){
		    let d = create_nodes(data,i,group_counter);
		    nodes.push(d);
		    if (d.cluster !== prev_group) {
		        group_counter = 0;
		        prev_group = d.cluster;
		    }
		}

		var force = d3.layout.force()
		    .nodes(nodes)
		    .size([width, height])
		    .gravity(.02)
		    .charge(0)
		    .on("tick", tick)
		    .start();

		var svg = d3.select("#clustered_layout").append("svg")
		    .attr("width", width)
		    .attr("height", height);


		var node = svg.selectAll("circle")
		    .data(nodes)
		    .enter().append("g").call(force.drag);


		node.append("circle")
		    .style("fill", function (d) {
		    return color(d.cluster);
		    })
		    .attr("r", function(d){return d.radius})
		    

		node.append("text")
		      .attr("dy", ".3em")
		      .style("text-anchor", "middle")
		      .text(function(d) { return d.text.substring(0, d.radius / 3); });

		function create_nodes(data, node_counter, group_counter) {
		  var i = cs.indexOf(data[node_counter].group),
		      r = data[node_counter].size,
		      d = {
		        cluster: i,
		        upper_cluster: i - 1 > 0 ? i - 1 : 0,
		        radius: data[node_counter].size * 0.1,
		        text: data[node_counter].text,
		        x: Math.cos(group_counter / cluster_count[i] * 2 * Math.PI) * (i + 1) * 100 + width / 2 + Math.random(),
		        y: Math.sin(group_counter / cluster_count[i] * 2 * Math.PI) * (i + 1) * 100 + height / 2 + Math.random()
		      };
		  if (!clusters[i] || (r > clusters[i].radius)) clusters[i] = d;
		  return d;
		};

		function tick(e) {
		    node.each(upper_cluster(10 * e.alpha * e.alpha))
		        .each(collide(.5))
		    .attr("transform", function (d) {
		        var k = "translate(" + d.x + "," + d.y + ")";
		        return k;
		    })

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

		// Move d to be adjacent to the closest node from the immediate upper cluster in order of importance.
		function upper_cluster(alpha) {
		    return function (d) {
		        if (d.upper_cluster !== d.cluster) {
		            let upper_nodes = nodes.filter(n => n.cluster === d.upper_cluster);
		            let euclidDistance = (n, d) => Math.sqrt((n.x - d.x) * (n.x - d.x) + (n.y - d.y) * (n.y - d.y));
		            let upper_node = upper_nodes[upper_nodes.length - 1];
		            for (let node in upper_nodes) {
		                if (euclidDistance(upper_nodes[node], d) < euclidDistance(upper_node, d)) {
		                    upper_node = upper_nodes[node];
		                }
		            }

		            let x = d.x - upper_node.x,
		                y = d.y - upper_node.y,
		                l = Math.sqrt(x * x + y * y),
		                r = d.radius + upper_node.radius;
		            if (l != r) {
		                l = (l - r) / l * alpha;
		                d.x -= x *= l;
		                d.y -= y *= l;
		                upper_node.x += x;
		                upper_node.y += y;
		            }
		           // }
		        } else {
		            let cluster = clusters[d.cluster];
		            if (cluster === d) return;
		            let x = d.x - cluster.x,
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
		        }
		    };
		}
		// Resolves collisions between d and all other circles.
		function collide(alpha) {
		    var quadtree = d3.geom.quadtree(nodes);
		    return function (d) {
		        var r = d.radius + maxRadius + Math.max(padding, clusterPadding),
		            nx1 = d.x - r,
		            nx2 = d.x + r,
		            ny1 = d.y - r,
		            ny2 = d.y + r;
		        quadtree.visit(function (quad, x1, y1, x2, y2) {
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
	}

	private mockData = "p1,20,1\np2,19,1\np3,17,1\np4,13,2\np5,12,2\np6,12,2\np7,11,2\np8,11,2\np9,11,2\np10,10,2\np11,10,2\np12,10,2\np13,10,2\np14,6,3\np15,6,3\np16,6,3\np17,5,3\np18,5,3\np19,5,3\np20,5,3\np21,4,3\np22,4,3\np23,4,3\n";
}
