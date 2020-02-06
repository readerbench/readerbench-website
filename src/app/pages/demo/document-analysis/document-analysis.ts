import * as _ from 'underscore';
import { Component, OnInit } from '@angular/core';
import { ApiRequestService } from '../api-request.service';
import * as d3 from 'd3';
import { HierarchyNode } from 'd3';
import { Options } from 'ng5-slider';

interface Language {
  id: string;
  description: string;
}

@Component({
  selector: 'document-analysis',
  styleUrls: ['./document-analysis.scss'],
  templateUrl: './document-analysis.html',
  providers: [ApiRequestService]
})
export class DocumentAnalysisComponent implements OnInit{


  private sliderValueArgument: number = 0.2;
  private sliderValueContent: number = 0.1;
  private sliderValueTopic: number = 0.2;
  private sliderValueSemantic: number = 0.8;
  options: Options = { floor: 0, ceil: 1, step: 0.1, showTicks: true };
  private text: string;
  private languages = [{id: 'en', description: 'English'}]
  private selectedLanguage: Language;
  private textInput: string;
  // private treeData: [];
  // private argumentOverlapConnections: [];
  // private contentOverlapConnections: [];
  // private topicOverlapConnections: [];
  // private semanticLsaConnections: [];
  
  constructor(private apiRequestService: ApiRequestService) { }

  ngOnInit() {
    this.selectedLanguage = this.languages[0];
  }

  private showGraph() {
    this.getProcessedData(this.textInput, this.selectedLanguage.id);
  
  }

  private getProcessedData(text, language) {
    var _this = this;
    this.apiRequestService.setApiService('cna-graph');
      const process = this.apiRequestService.process({
          text: text,
          lang: language,
          models:  [{"model": "word2vec", "corpus": "coca"}, {"model": "lsa", "corpus": "coca"}]
      });
      process.subscribe(response => {
          var treeData = response.data;
          var argumentOverlapConnections = [];
          var contentOverlapConnections = [];
          var topicOverlapConnections = [];
          var semanticLsaConnections = [];

          Object.keys(response.edges).forEach(key => {
            let value = response.edges[key];
            if (key === 'LEXICAL_OVERLAP: ARGUMENT_OVERLAP') {
              argumentOverlapConnections = value;
            } else if (key === 'LEXICAL_OVERLAP: CONTENT_OVERLAP') {
              contentOverlapConnections = value;  
            } else if (key === 'LEXICAL_OVERLAP: TOPIC_OVERLAP') {
              topicOverlapConnections = value;
            } else if (key === 'SEMANTIC: LSA(coca)') {
              semanticLsaConnections = value;
            }
          });

          console.log(treeData);
          console.log(argumentOverlapConnections);
          console.log(contentOverlapConnections);
          console.log(topicOverlapConnections);
          console.log(semanticLsaConnections);
          this.displayDiagram(treeData, argumentOverlapConnections,contentOverlapConnections,  topicOverlapConnections, semanticLsaConnections,
            this.sliderValueArgument, this.sliderValueContent, this.sliderValueTopic, this.sliderValueSemantic );
          // return response.data;
      });
    return null;
  }

  private displayDiagram(treeData, argumentOverlapConnections, contentOverlapConnections,  topicOverlapConnections, semanticLsaConnections,
    sliderValueArgument, sliderValueContent,sliderValueTopic, sliderValueSemantic ) {
    var _this = this;
// Set the dimensions and margins of the diagram
var margin = {top: 20, right: 90, bottom: 30, left: 90},
    width = 1500 - margin.left - margin.right,
    height = 1000 - margin.top - margin.bottom;

// append the svg object to the body of the page
// appends a 'group' element to 'svg'
// moves the 'group' element to the top left margin
var svg = d3.select(".container-documents-analysis").append("svg")
    .attr("width", width + margin.right + margin.left)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate("
          + margin.left + "," + margin.top + ")");

var i = 0,
    duration = 750,
    root;

// declares a tree layout and assigns the size
var treemap = d3.tree().size([height, width]);

// Assigns parent, children, height, depth
root = d3.hierarchy(treeData, function(d: any) { return d.children; });
root.x0 = height / 2;
root.y0 = 0;

// Collapse after the second level
//root.children.forEach(collapse);

update(root, argumentOverlapConnections,contentOverlapConnections,  topicOverlapConnections, semanticLsaConnections, 
  sliderValueArgument, sliderValueContent,sliderValueTopic, sliderValueSemantic );

// Collapse the node and all it's children
// function collapse(d) {
//   if(d.children) {
//     d._children = d.children
//     d._children.forEach(collapse)
//     d.children = null
//   }
// }

function update(source, argumentOverlapConnections,contentOverlapConnections,  topicOverlapConnections, semanticLsaConnections, 
  sliderValueArgument, sliderValueContent,sliderValueTopic, sliderValueSemantic ) {
  // Assigns the x and y position for the nodes
  var treeData = treemap(root);

  // Compute the new tree layout.
  var nodes = treeData.descendants(),
      links = treeData.descendants().slice(1);

  // Normalize for fixed-depth.
  nodes.forEach(function(d){ d.y = d.depth * 180});

  // ****************** Nodes section ***************************

  // Update the nodes...
  var node = svg.selectAll('g.node')
      .data(nodes, function(d: any) {return d.id || (d.id = ++i); });

  // Enter any new modes at the parent's previous position.
  var nodeEnter = node.enter().append('g')
      .attr('class', 'node')
      .attr("transform", function(d) {
        return "translate(" + source.y0 + "," + source.x0 + ")";
    })
    .on('click', click);

// Define the div for the tooltip
var valueNode = d3.select("body").append("div")	
    .attr("class", "tooltipValue")
	.attr("width", 100)
    .attr("height", 50)
    //.style("opacity", 0)
	;
	
	
  // Add Circle for the nodes
  nodeEnter.append('circle')
      .attr('class', 'node')
      .attr('r', 1e-6)
    .attr('id', function(d: any) { return d.data.name; })
      .style("fill", function(d: any) {
          return d._children ? "lightsteelblue" : "#fff";
      })
	  .on('mouseover', function (d: any) {
	  console.log(d);
		  valueNode.transition()		
				.duration(200)		
				.style("opacity", .9);		
		  valueNode.html(d.data.value)	
			.style("left", (d3.event.pageX) - 210 + "px")		
			.style("top", (d3.event.pageY - 28) + "px");	
				
		})
		.on('mouseout', function (d) {
		  valueNode.transition()		
			.duration(500)		
			.style("opacity", 0);	
		});

  // Add labels for the nodes
  nodeEnter.append('text')
      .attr("dy", ".35em")
      .attr("x", function(d: any) {
          return d.children || d._children ? -13 : 13;
      })
      .attr("text-anchor", function(d: any) {
          return d.children || d._children ? "end" : "start";
      })
      .text(function(d: any) { return d.data.name; });

  // UPDATE
  var nodeUpdate = nodeEnter.merge(<any>node);

  // Transition to the proper position for the node
  nodeUpdate.transition()
    .duration(duration)
    .attr("transform", function(d) { 
        return "translate(" + d.y + "," + d.x + ")";
     });

  // Update the node attributes and style
  nodeUpdate.select('circle.node')
    .attr('r', 10)
    .style("fill", function(d: any) {
        return d._children ? "lightsteelblue" : "#fff";
    })
    .attr('cursor', 'pointer');

  // Remove any exiting nodes
  var nodeExit = node.exit().transition()
      .duration(duration)
      .attr("transform", function(d: any) {
          return "translate(" + source.y + "," + source.x + ")";
      })
      .remove();

  // On exit reduce the node circles size to 0
  nodeExit.select('circle')
    .attr('r', 1e-6);

  // On exit reduce the opacity of text labels
  nodeExit.select('text')
    .style('fill-opacity', 1e-6);

  // ****************** links section ***************************

  // Update the links...
  var link = svg.selectAll('path.link')
      .data(links, function(d: any) { return d.id; });

  // Enter any new links at the parent's previous position.
  var linkEnter = link.enter().insert('path', "g")
      .attr("class", "link")
      .attr('d', function(d: any){
        var o = {x: source.x0, y: source.y0}
        return diagonal(o, o)
      });

  // UPDATE
  var linkUpdate = linkEnter.merge(<any>link);

  // Transition back to the parent element position
  linkUpdate.transition()
      .duration(duration)
      .attr('d', function(d){ return diagonal(d, d.parent) });

  // Remove any exiting links
  var linkExit = link.exit().transition()
      .duration(duration)
      .attr('d', function(d) {
        var o = {x: source.x, y: source.y}
        return diagonal(o, o)
      })
      .remove();

  // Store the old positions for transition.
  nodes.forEach(function(d: any){
    d.x0 = d.x;
    d.y0 = d.y;
  });



  var nameToNode = {};
  nodes.forEach(function (n: any) {
   nameToNode[n.data.name] = n;
    
  });

// Define the div for the tooltip
var weightTooltip = d3.select("body").append("div")	
    .attr("class", "tooltip")				
    .style("opacity", 0);
function createEdges(edges, threshold, className) {
	edges.forEach(function (arcLink) {
	
		if(parseFloat(arcLink.weight) > threshold) {
			var path = d3.path();
			var xSource = nameToNode[arcLink.source].y;
			var ySource = nameToNode[arcLink.source].x;
			var xTarget = nameToNode[arcLink.target].y;
			var yTarget = nameToNode[arcLink.target].x;
			path.arc(xSource, (ySource + yTarget)/2, (Math.abs(yTarget - ySource))/2, -0.5 * Math.PI, 0.5 * Math.PI, false);
			var pathString = path.toString();

			svg.append("path")
				.attr("d", pathString)
				.attr('class', className)
				.attr("fill", "none")
				.on('mouseover', function (d) {
				  d3.select(this).attr('class', 'pathMouseover');
				  d3.selectAll('[id=\''+ arcLink.source + '\']').style('fill', 'lightsteelblue');
				  d3.selectAll('[id=\''+ arcLink.target + '\']').style('fill', 'lightsteelblue');
				  weightTooltip.transition()		
						.duration(200)		
						.style("opacity", .9);		
				  weightTooltip.html(arcLink.weight)	
					.style("left", (d3.event.pageX) + "px")		
					.style("top", (d3.event.pageY - 28) + "px");	
						
				})
				.on('mouseout', function (d) {
				  d3.select(this).attr('class', className);
				  d3.selectAll('[id=\''+ arcLink.source + '\']').style('fill', '#fff');
				  d3.selectAll('[id=\''+ arcLink.target + '\']').style('fill', '#fff');
				  weightTooltip.transition()		
					.duration(500)		
					.style("opacity", 0);	
				});
		
		}
	});
}

// Change this as you wish
createEdges(argumentOverlapConnections,_this.sliderValueArgument, 'connection1'); //LEXICAL_OVERLAP: ARGUMENT_OVERLAP
createEdges(contentOverlapConnections,_this.sliderValueContent, 'connection2'); //LEXICAL_OVERLAP: CONTENT_OVERLAP
createEdges(topicOverlapConnections, _this.sliderValueTopic, 'connection3'); //LEXICAL_OVERLAP: TOPIC_OVERLAP
createEdges(semanticLsaConnections, _this.sliderValueSemantic, 'connection4'); //SEMANTIC: WORD2VEC(coca)


  // Creates a curved (diagonal) path from parent to the child nodes
  function diagonal(s, d) {

    var path = `M ${s.y} ${s.x}
            C ${(s.y + d.y) / 2} ${s.x},
              ${(s.y + d.y) / 2} ${d.x},
              ${d.y} ${d.x}`

    return path;
  }

  // Toggle children on click.
  function click(d) {
    if (d.children) {
      d3.selectAll(".connection1").remove();
      d3.selectAll(".connection2").remove();
      d3.selectAll(".connection3").remove();
	    d3.selectAll(".connection4").remove();
      d._children = d.children;
      d.children = null;

    } else {
      d3.selectAll(".connection1").remove();
      d3.selectAll(".connection2").remove();
      d3.selectAll(".connection3").remove();
      d3.selectAll(".connection4").remove();
      d.children = d._children;
      d._children = null;
    }

    update(d, argumentOverlapConnections,contentOverlapConnections,  topicOverlapConnections, semanticLsaConnections, 
      sliderValueArgument, sliderValueContent,sliderValueTopic, sliderValueSemantic);
  }
}
    }
}
