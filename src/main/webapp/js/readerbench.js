var d3jsForTopics = function(graph) {
	
	var width = 690,
    height = 600;

	var color = d3.scale.category20();
	
	/*var force = d3.layout.force()
	    .charge(-120)
	    .linkDistance(30)
	    .size([width, height]);*/
	
	var force = d3.layout.force()
	.charge(-100)
    .distance(100)
    .size([width, height]);
	
	var svg = d3.select("#conceptMap").append("svg")
	    .attr("width", width)
	    .attr("height", height);
	
	var max = 0;
	graph.nodes.forEach(function(link, index, list) {
		if (link.value > max) max = link.value;
	});
	
	graph.links.forEach(function(link, index, list) {
        if (typeof graph.nodes[link.source] === 'undefined') {
            console.log('undefined source', link);
        }
        if (typeof graph.nodes[link.target] === 'undefined') {
            console.log('undefined target', link);
        }
    });
	
	  force
	      .nodes(graph.nodes)
	      .links(graph.links)
	      .linkDistance(function(link) {
		       return link.score * 25;
		  })
	      .start();
	
	  var link = svg.selectAll(".link")
	      .data(graph.links)
	      .enter().append("line")
	      .attr("class", "link")
	      .style("stroke-width", function(d) { return Math.sqrt(d.value); });
	
	  var node = svg.selectAll(".node")
	      .data(graph.nodes)
	      .enter().append("g")
	      .attr("class", "node")
	      .call(force.drag);
	  
	  node.append("circle")
	      .attr("r", function(d) { return (d.value / max) * 20; })
	      .style("fill", function(d) { return color(d.group); });
	
	  node.append("text")
	  	  .attr("dx", 12)
	  	  .attr("dy", ".35em")
	  	  .style("fill", "#333333")
	  	  .style("stroke", "none")
	  	  .text(function(d) { return d.name; });
	
	  force.on("tick", function() {
	    link.attr("x1", function(d) { return d.source.x; })
	        .attr("y1", function(d) { return d.source.y; })
	        .attr("x2", function(d) { return d.target.x; })
	        .attr("y2", function(d) { return d.target.y; });
	
	    node.attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });
	    
	  });
	  
	  var fisheye = d3.fisheye.circular()
	  	.radius(200);
	  
	  svg.on("mousemove", function() {
		  fisheye.focus(d3.mouse(this));
		  
		  node.each(function(d) { d.fisheye = fisheye(d); })
		      .attr("cx", function(d) { return d.fisheye.x; })
		      .attr("cy", function(d) { return d.fisheye.y; })
		      .attr("r", function(d) { return d.fisheye.z * 5; });
		  
		  node.attr("transform", function(d) {
			  return "translate(" + d.fisheye.x + "," + d.fisheye.y + ")";
		  });
	
		  link.attr("x1", function(d) { return d.source.fisheye.x; })
		      .attr("y1", function(d) { return d.source.fisheye.y; })
		      .attr("x2", function(d) { return d.target.fisheye.x; })
		      .attr("y2", function(d) { return d.target.fisheye.y; });
	  });
}

var htmlEncode = function(mystring) {
	return mystring.replace(/&/g, "&amp;").replace(/>/g, "&gt;").replace(/</g, "&lt;").replace(/"/g, "&quot;");
}