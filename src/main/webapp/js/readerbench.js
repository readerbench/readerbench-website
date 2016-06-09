var buildServerPath = function(endpoint, params) {
	
	var serverUrl = 
		ServerSettings.protocol + ':' + ServerSettings.delim + ServerSettings.delim + 
		ServerSettings.ip + ':' + 
		ServerSettings.port + ServerSettings.delim +
		endpoint + '?';
	
	
	Object.keys(params).forEach(function(key,index) {
	    serverUrl += key + '=' + params[key] + '&';
	});
	
	return serverUrl;
	
}

var d3jsForTopics = function(graph, element, enableFisheye) {
	
	var width = 690,
    height = 600;

	var color = d3.scale.category20();
	
	/*var force = d3.layout.force()
	    .charge(-120)
	    .linkDistance(30)
	    .size([width, height]);*/
	
	var force = d3.layout.force()
	.charge(-100)
    .distance(300)
    .size([width, height]);
	
	var svg = d3.select(element).append("svg")
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
	  
	  if (enableFisheye == true) {
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
}

var d3jsForTopicsForvCop = function(graph, element, enableFisheye) {
	
	var width = 800,
    height = 1000;

	var color = d3.scale.category20();

	var force = d3.layout.force()
	.charge(-100)
    .distance(300)
    .size([width, height]);
	
	var svg = d3.select(element).append("svg")
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
		      // return link.score * 400;
	    	  return 300;
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
	  
	  if (max > 0){
		  node.append("circle")
		      .attr("r", function(d) { return (d.value / max) * 30; })
		      .style("fill", function(d) { return color(d.group); });
	  }else{
		  node.append("circle")
	      .attr("r", function(d) { return 3; })
	      .style("fill", function(d) { return color(d.group); });
	  }
	
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
	  
	  if (enableFisheye == true) {
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
}

// values = node values; element = html element
var d3jsLineGraph = function(values, element, xLabel, yLabel){
	
	var lineFunc = d3.svg.line()
		.x(function(d) {
		  return xRange(d.x);
		})
		.y(function(d) {
		  return yRange(d.y);
		})
		.interpolate('monotone');
	
	var vis = d3.select(element),
	    WIDTH = 1000,
	    HEIGHT = 250,
	    MARGINS = {
	      top: 20,
	      right: 20,
	      bottom: 20,
	      left: 50
	    },
	    xRange = d3.scale.linear().range([MARGINS.left, WIDTH - MARGINS.right]).domain([d3.min(values, function(d) {
	      return d.x;
	    }), d3.max(values, function(d) {
	      return d.x;
	    })]),
	    yRange = d3.scale.linear().range([HEIGHT - MARGINS.top, MARGINS.bottom]).domain([d3.min(values, function(d) {
	      return d.y;
	    }), d3.max(values, function(d) {
	      return d.y;
	    })]),
	    xAxis = d3.svg.axis()
	      .scale(xRange)
	      .tickSize(1)
	      .tickSubdivide(true),
	    yAxis = d3.svg.axis()
	      .scale(yRange)
	      .tickSize(1)
	      .orient('left')
	      .tickSubdivide(true);
	
	vis.append('svg:g')
	  .attr('class', 'x axis')
	  .attr('stroke', '#b8bebf')
	  .attr('transform', 'translate(0,' + (HEIGHT - MARGINS.bottom) + ')')
	  .call(xAxis);
	
	vis.append('svg:g')
	  .attr('class', 'y axis')
	  .attr('stroke', '#b8bebf')
	  .attr('transform', 'translate(' + (MARGINS.left) + ',0)')
	  .call(yAxis);
	
	vis.append('svg:path')
	  .attr('d', lineFunc(values))
	  .attr('stroke', '#43b9c7')
	  .attr('stroke-width', 2)
	  .attr('fill', 'none');
	
	vis.select(".axis")
		.style('font-family', '"Lato", sans-serif')
		.style('font-size', '14px');
	
	vis.append("text")
	    .attr("class", "x label")
	    .attr("text-anchor", "end")
	    .attr("x", WIDTH / 2)
	    .attr("y", HEIGHT + 10)
	    .attr('stroke', '#b8bebf')
	    .text(xLabel);
	
	vis.append("text")
	    .attr("class", "y label")
	    .attr("text-anchor", "end")
	    .attr("y", 10)
	    .attr("dy", ".75em")
	    .attr("transform", "rotate(-90)")
	    .attr('stroke', '#b8bebf')
	    .text(yLabel);
	
}

var d3jsMultipleLinesGraph = function(values, element, xLabel, yLabel){
	
	var lineFunc = d3.svg.line()
	.x(function(d) {
	  return xRange(d.x);
	})
	.y(function(d) {
	  return yRange(d.y);
	})
	.interpolate('monotone');
	
	var vis = d3.select(element),
	    WIDTH = 1000,
	    HEIGHT = 250,
	    MARGINS = {
	        top: 50,
	        right: 20,
	        bottom: 50,
	        left: 50
	    },
	    xRange = d3.scale.linear().range([MARGINS.left, WIDTH - MARGINS.right]).domain([d3.min(values, function(d) {
		      return d.x;
		    }), d3.max(values, function(d) {
		      return d.x;
		    })]),
	    yRange = d3.scale.linear().range([HEIGHT - MARGINS.top, MARGINS.bottom]).domain([d3.min(values, function(d) {
	      return d.y;
	    }), d3.max(values, function(d) {
	      return d.y;
	    })]),
	    xAxis = d3.svg.axis()
	      .scale(xRange)
	      .tickSize(1)
	      .tickSubdivide(true),
	    yAxis = d3.svg.axis()
	      .scale(yRange)
	      .tickSize(1)
	      .orient('left')
	      .tickSubdivide(true);
	
	xScale = d3.scale.linear().range([MARGINS.left, WIDTH - MARGINS.right]).domain([d3.min(values, function(d) {
		    return d.x;
		}), d3.max(values, function(d) {
		    return d.x;
		})]);
	
	yScale = d3.scale.linear().range([HEIGHT - MARGINS.top, MARGINS.bottom]).domain([d3.min(values, function(d) {
	    return d.y;
	}), d3.max(values, function(d) {
	    return d.y;
	})]);
	
	var dataGroup = d3.nest()
	    .key(function(d) {
	        return d.nodeName;
	    })
	    .entries(values);
	
	var lSpace = WIDTH/dataGroup.length;
	
	var color = function(d, j) {
        return "hsl(" + Math.random() * 360 + ",100%,50%)";
    };
    
	dataGroup.forEach(function(d, i) {
		
		var localColor = color(d, i);
        
	    vis.append('svg:path')
	        .attr('d', lineFunc(d.values))
	        .attr('stroke', localColor)
	        .attr('stroke-width', 2)
	        .attr('fill', 'none');
	    
	    vis.append("text")
	    .attr("x", (lSpace / 2) + i * lSpace)
	    .attr("y", HEIGHT)
	    .style("fill", localColor)
	    .text(d.key);
	    
	});
	
	vis.append('svg:g')
	  .attr('class', 'x axis')
	  .attr('stroke', '#b8bebf')
	  .attr('transform', 'translate(0,' + (HEIGHT - MARGINS.bottom) + ')')
	  .call(xAxis);
	
	vis.append('svg:g')
	  .attr('class', 'y axis')
	  .attr('stroke', '#b8bebf')
	  .attr('transform', 'translate(' + (MARGINS.left) + ',0)')
	  .call(yAxis);
	
	vis.select(".axis")
		.style('font-family', '"Lato", sans-serif')
		.style('font-size', '14px');
	
	vis.append("text")
	    .attr("class", "x label")
	    .attr("text-anchor", "end")
	    .attr("x", WIDTH / 2)
	    .attr("y", HEIGHT + 10)
	    .attr('stroke', '#b8bebf')
	    .text(xLabel);
	
	vis.append("text")
	    .attr("class", "y label")
	    .attr("text-anchor", "end")
	    .attr("y", 10)
	    .attr("dy", ".75em")
	    .attr("transform", "rotate(-90)")
	    .attr('stroke', '#b8bebf')
	    .text(yLabel);
	
}

var htmlEncode = function(mystring) {
	return mystring.replace(/&/g, "&amp;").replace(/>/g, "&gt;").replace(/</g, "&lt;").replace(/"/g, "&quot;");
}

var d3jsForTopicsForvCopTimeFrame = function(nodes, links, element, enableFisheye) {
	
	var width = 800,
    height = 1000;

	var color = d3.scale.category20();

	var force = d3.layout.force()
	.charge(-100)
    .distance(300)
    .size([width, height]);
	
	var svg = d3.select(element).append("svg")
	    .attr("width", width)
	    .attr("height", height);
	
	var max = 0;
	nodes.forEach(function(link, index, list) {
		if (link.value > max) max = link.value;
	});
	
	links.forEach(function(link, index, list) {
        if (typeof nodes[link.source] === 'undefined') {
            console.log('undefined source', link);
        }
        if (typeof nodes[link.target] === 'undefined') {
            console.log('undefined target', link);
        }
    });
	
	  force
	      .nodes(nodes)
	      .links(links)
	      .linkDistance(function(link) {
		      // return link.score * 400;
	    	  return 200;
		  })
	      .start();
	  
	  var link = svg.selectAll(".link")
	      .data(links)
	      .enter().append("line")
	      .attr("class", "link")
	      .style("stroke-width", function(d) { return Math.sqrt(d.value); });
	
	  var node = svg.selectAll(".node")
	      .data(nodes)
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
	  	  .text(function(d) {return d.name;});
	
	  force.on("tick", function() {
	    link.attr("x1", function(d) { return d.source.x; })
	        .attr("y1", function(d) { return d.source.y; })
	        .attr("x2", function(d) { return d.target.x; })
	        .attr("y2", function(d) { return d.target.y; });
	
	    node.attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });
	    
	  });
	  
	  var fisheye = d3.fisheye.circular()
	  	.radius(200);
	  
	  if (enableFisheye == true) {
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
}

var d3jsForTopicsForvCoPSubcommunities = function(graph, element, enableFisheye) {
	
	var width = 690,
    height = 600;

	var color = d3.scale.category20();

	var force = d3.layout.force()
	.charge(-100)
    .distance(300)
    .size([width, height]);
	
	var svg = d3.select(element).append("svg")
	    .attr("width", width)
	    .attr("height", height);
	
	var max = 0;
	graph.nodes.forEach(function(link, index, list) {
		if (link.value > max) max = link.value;
	});
	
	graph.links.forEach(function(link, index, list) {
        if (typeof graph.nodes[link.source] === 'undefined') {
        //    console.log('undefined source', link);
        }
        if (typeof graph.nodes[link.target] === 'undefined') {
        //    console.log('undefined target', link);
        }
    });
	
	  force
	      .nodes(graph.nodes)
	      .links(graph.links)
	      .linkDistance(function(link) {
	    	/*  if(link.score > 1){
		       return link.score * 25;
	    	  }else{
	    		  return link.score * 200;
	    	  }*/
	    	  return 160;
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
	  
	  if (max > 0.5){
		  node.append("circle")
		      .attr("r", function(d) { return (d.value / max) * 20; })
		      .style("fill", function(d) { return color(d.group); });
	  }else{
		  node.append("circle")
	      .attr("r", function(d) { return 3; })
	      .style("fill", function(d) { return color(d.group); });
	  }
	
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
	  
	  if (enableFisheye == true) {
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
}


var try1 = function(graph, element){
	var width = 960,
    height = 500;

var force = d3.layout.force()
    .nodes(graph.nodes)
    .links(graph.links)
    .size([width, height])
    .linkDistance(200)
    .charge(-300)
    .on("tick", tick)
    .start();

var svg = d3.select(element).append("svg")
    .attr("width", width)
    .attr("height", height);

// add the links and the arrows
var path = svg.append("svg:g").selectAll("path")
    .data(graph.links)
  .enter().append("svg:path")
//    .attr("class", function(d) { return "link " + d.type; })
    .attr("class", "link")
    .style("stroke-width", "1px");

// define the nodes
var node = svg.selectAll(".node")
    .data(graph.nodes)
  .enter().append("g")
    .attr("class", "node")
    .call(force.drag);

// add the nodes
node.append("circle")
    .attr("r", 5)
    .style("stroke-width", "1px")
    .style("fill", function(d) { return color(d.group); });

// add the text 
node.append("text")
    .attr("x", 12)
    .attr("dy", ".35em")
    .text(function(d) { return d.name; });

		// add the curvy lines
		function tick() {
		    path.attr("d", function(d) {
		        var dx = d.target.x - d.source.x,
		            dy = d.target.y - d.source.y,
		            dr = Math.sqrt(dx * dx + dy * dy);
		        return "M" + 
		            d.source.x + "," + 
		            d.source.y + "A" + 
		            dr + "," + dr + " 0 0,1 " + 
		            d.target.x + "," + 
		            d.target.y;
		    });
		
		    node
		        .attr("transform", function(d) { 
		  	    return "translate(" + d.x + "," + d.y + ")"; });
		}
}