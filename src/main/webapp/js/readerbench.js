var buildServerPath = function(endpoint, params) {

	var serverUrl = ServerSettings.protocol + ':' + ServerSettings.delim
			+ ServerSettings.delim + ServerSettings.ip + ':'
			+ ServerSettings.port + ServerSettings.delim + endpoint;

    if (Object.keys(params).length > 0) {
        serverUrl += '?';
        Object.keys(params).forEach(function(key, index) {
            serverUrl += key + '=' + params[key] + '&';
        });
    }

	return serverUrl;

}

var d3jsForTopics = function(graph, element, enableFisheye) {

	var width = 690, height = 600;

	var color = d3.scale.category20();

	/*
	 * var force = d3.layout.force() .charge(-120) .linkDistance(30)
	 * .size([width, height]);
	 */

	var force = d3.layout.force().charge(-100).distance(300).size(
			[ width, height ]);

	var svg = d3.select(element).append("svg").attr("width", width).attr(
			"height", height);

	var max = 0;
	graph.nodes.forEach(function(link, index, list) {
		if (link.value > max)
			max = link.value;
	});

	graph.links.forEach(function(link, index, list) {
		if (typeof graph.nodes[link.source] === 'undefined') {
			console.log('undefined source', link);
		}
		if (typeof graph.nodes[link.target] === 'undefined') {
			console.log('undefined target', link);
		}
	});

	force.nodes(graph.nodes).links(graph.links).linkDistance(function(link) {
		return link.score * 25;
	}).start();

	var link = svg.selectAll(".link").data(graph.links).enter().append("line")
			.attr("class", "link").style("stroke-width", function(d) {
				return Math.sqrt(d.value);
			});

	var node = svg.selectAll(".node").data(graph.nodes).enter().append("g")
			.attr("class", "node").call(force.drag);

	node.append("circle").attr("r", function(d) {
		return (d.value / max) * 20;
	}).style("fill", function(d) {
		return color(d.group);
	});

	node.append("text").attr("dx", 12).attr("dy", ".35em").style("fill",
			"#333333").style("stroke", "none").text(function(d) {
		return d.name;
	});

	force.on("tick", function() {
		link.attr("x1", function(d) {
			return d.source.x;
		}).attr("y1", function(d) {
			return d.source.y;
		}).attr("x2", function(d) {
			return d.target.x;
		}).attr("y2", function(d) {
			return d.target.y;
		});

		node.attr("transform", function(d) {
			return "translate(" + d.x + "," + d.y + ")";
		});

	});

	var fisheye = d3.fisheye.circular().radius(200);

	if (enableFisheye == true) {
		svg.on("mousemove", function() {
			fisheye.focus(d3.mouse(this));

			node.each(function(d) {
				d.fisheye = fisheye(d);
			}).attr("cx", function(d) {
				return d.fisheye.x;
			}).attr("cy", function(d) {
				return d.fisheye.y;
			}).attr("r", function(d) {
				return d.fisheye.z * 5;
			});

			node.attr("transform", function(d) {
				return "translate(" + d.fisheye.x + "," + d.fisheye.y + ")";
			});

			link.attr("x1", function(d) {
				return d.source.fisheye.x;
			}).attr("y1", function(d) {
				return d.source.fisheye.y;
			}).attr("x2", function(d) {
				return d.target.fisheye.x;
			}).attr("y2", function(d) {
				return d.target.fisheye.y;
			});
		});
	}
}

var d3jsForTopicsForvCop = function(graph, element, enableFisheye) {

	var width = 800, height = 1000;

	var color = d3.scale.category20();

	var force = d3.layout.force().charge(-100).distance(300).size(
			[ width, height ]);

	var svg = d3.select(element).append("svg").attr("width", width).attr(
			"height", height);

	var max = 0;
	graph.nodes.forEach(function(link, index, list) {
		if (link.value > max)
			max = link.value;
	});

	graph.links.forEach(function(link, index, list) {
		if (typeof graph.nodes[link.source] === 'undefined') {
			console.log('undefined source', link);
		}
		if (typeof graph.nodes[link.target] === 'undefined') {
			console.log('undefined target', link);
		}
	});

	force.nodes(graph.nodes).links(graph.links).linkDistance(function(link) {
		// return link.score * 400;
		return 300;
	}).start();

	var link = svg.selectAll(".link").data(graph.links).enter().append("line")
			.attr("class", "link").style("stroke-width", function(d) {
				return Math.sqrt(d.value);
			});

	var node = svg.selectAll(".node").data(graph.nodes).enter().append("g")
			.attr("class", "node").call(force.drag);

	if (max > 0) {
		node.append("circle").attr("r", function(d) {
			return (d.value / max) * 30;
		}).style("fill", function(d) {
			return color(d.group);
		});
	} else {
		node.append("circle").attr("r", function(d) {
			return 3;
		}).style("fill", function(d) {
			return color(d.group);
		});
	}

	node.append("text").attr("dx", 12).attr("dy", ".35em").style("fill",
			"#333333").style("stroke", "none").text(function(d) {
		return d.name;
	});

	force.on("tick", function() {
		link.attr("x1", function(d) {
			return d.source.x;
		}).attr("y1", function(d) {
			return d.source.y;
		}).attr("x2", function(d) {
			return d.target.x;
		}).attr("y2", function(d) {
			return d.target.y;
		});

		node.attr("transform", function(d) {
			return "translate(" + d.x + "," + d.y + ")";
		});

	});

	var fisheye = d3.fisheye.circular().radius(200);

	if (enableFisheye == true) {
		svg.on("mousemove", function() {
			fisheye.focus(d3.mouse(this));

			node.each(function(d) {
				d.fisheye = fisheye(d);
			}).attr("cx", function(d) {
				return d.fisheye.x;
			}).attr("cy", function(d) {
				return d.fisheye.y;
			}).attr("r", function(d) {
				return d.fisheye.z * 5;
			});

			node.attr("transform", function(d) {
				return "translate(" + d.fisheye.x + "," + d.fisheye.y + ")";
			});

			link.attr("x1", function(d) {
				return d.source.fisheye.x;
			}).attr("y1", function(d) {
				return d.source.fisheye.y;
			}).attr("x2", function(d) {
				return d.target.fisheye.x;
			}).attr("y2", function(d) {
				return d.target.fisheye.y;
			});
		});
	}
}

// values = node values; element = html element
var d3jsLineGraph = function(values, element, xLabel, yLabel) {

	var lineFunc = d3.svg.line().x(function(d) {
		return xRange(d.x);
	}).y(function(d) {
		return yRange(d.y);
	}).interpolate('monotone');

	var vis = d3.select(element), WIDTH = 1000, HEIGHT = 250, MARGINS = {
		top : 20,
		right : 20,
		bottom : 20,
		left : 50
	}, xRange = d3.scale.linear()
			.range([ MARGINS.left, WIDTH - MARGINS.right ]).domain(
					[ d3.min(values, function(d) {
						return d.x;
					}), d3.max(values, function(d) {
						return d.x;
					}) ]), yRange = d3.scale.linear().range(
			[ HEIGHT - MARGINS.top, MARGINS.bottom ]).domain(
			[ d3.min(values, function(d) {
				return d.y;
			}), d3.max(values, function(d) {
				return d.y;
			}) ]), xAxis = d3.svg.axis().scale(xRange).tickSize(1)
			.tickSubdivide(true), yAxis = d3.svg.axis().scale(yRange).tickSize(
			1).orient('left').tickSubdivide(true);

	vis.append('svg:g').attr('class', 'x axis').attr('stroke', '#b8bebf').attr(
			'transform', 'translate(0,' + (HEIGHT - MARGINS.bottom) + ')')
			.call(xAxis);

	vis.append('svg:g').attr('class', 'y axis').attr('stroke', '#b8bebf').attr(
			'transform', 'translate(' + (MARGINS.left) + ',0)').call(yAxis);

	vis.append('svg:path').attr('d', lineFunc(values))
			.attr('stroke', '#43b9c7').attr('stroke-width', 2).attr('fill',
					'none');

	vis.select(".axis").style('font-family', '"Lato", sans-serif').style(
			'font-size', '14px');

	vis.append("text").attr("class", "x label").attr("text-anchor", "end")
			.attr("x", WIDTH / 2).attr("y", HEIGHT + 10).attr('stroke',
					'#b8bebf').text(xLabel);

	vis.append("text").attr("class", "y label").attr("text-anchor", "end")
			.attr("y", 10).attr("dy", ".75em").attr("transform", "rotate(-90)")
			.attr('stroke', '#b8bebf').text(yLabel);
}

var d3jsMultipleLinesGraph = function(values, element, xLabel, yLabel) {
	F
	var lineFunc = d3.svg.line().x(function(d) {
		return xRange(d.x);
	}).y(function(d) {
		return yRange(d.y);
	}).interpolate('monotone');

	var vis = d3.select(element), WIDTH = 1000, HEIGHT = 250, MARGINS = {
		top : 50,
		right : 20,
		bottom : 50,
		left : 50
	}, xRange = d3.scale.linear()
			.range([ MARGINS.left, WIDTH - MARGINS.right ]).domain(
					[ d3.min(values, function(d) {
						return d.x;
					}), d3.max(values, function(d) {
						return d.x;
					}) ]), yRange = d3.scale.linear().range(
			[ HEIGHT - MARGINS.top, MARGINS.bottom ]).domain(
			[ d3.min(values, function(d) {
				return d.y;
			}), d3.max(values, function(d) {
				return d.y;
			}) ]), xAxis = d3.svg.axis().scale(xRange).tickSize(1)
			.tickSubdivide(true), yAxis = d3.svg.axis().scale(yRange).tickSize(
			1).orient('left').tickSubdivide(true);

	xScale = d3.scale.linear().range([ MARGINS.left, WIDTH - MARGINS.right ])
			.domain([ d3.min(values, function(d) {
				return d.x;
			}), d3.max(values, function(d) {
				return d.x;
			}) ]);

	yScale = d3.scale.linear().range([ HEIGHT - MARGINS.top, MARGINS.bottom ])
			.domain([ d3.min(values, function(d) {
				return d.y;
			}), d3.max(values, function(d) {
				return d.y;
			}) ]);

	var dataGroup = d3.nest().key(function(d) {
		return d.nodeName;
	}).entries(values);

	var lSpace = WIDTH / dataGroup.length;

	var color = function(d, j) {
		return "hsl(" + Math.random() * 360 + ",100%,50%)";
	};

	dataGroup.forEach(function(d, i) {
		var localColor = color(d, i);

		vis.append('svg:path').attr('d', lineFunc(d.values)).attr('stroke',
				localColor).attr('stroke-width', 2).attr('fill', 'none');

		vis.append("text").attr("x", (lSpace / 2) + i * lSpace).attr("y",
				HEIGHT).style("fill", localColor).text(d.key);

	});

	vis.append('svg:g').attr('class', 'x axis').attr('stroke', '#b8bebf').attr(
			'transform', 'translate(0,' + (HEIGHT - MARGINS.bottom) + ')')
			.call(xAxis);

	vis.append('svg:g').attr('class', 'y axis').attr('stroke', '#b8bebf').attr(
			'transform', 'translate(' + (MARGINS.left) + ',0)').call(yAxis);

	vis.select(".axis").style('font-family', '"Lato", sans-serif').style(
			'font-size', '14px');

	vis.append("text").attr("class", "x label").attr("text-anchor", "end")
			.attr("x", WIDTH / 2).attr("y", HEIGHT + 10).attr('stroke',
					'#b8bebf').text(xLabel);

	vis.append("text").attr("class", "y label").attr("text-anchor", "end")
			.attr("y", 10).attr("dy", ".75em").attr("transform", "rotate(-90)")
			.attr('stroke', '#b8bebf').text(yLabel);
}

var htmlEncode = function(mystring) {
	return mystring.replace(/&/g, "&amp;").replace(/>/g, "&gt;").replace(/</g,
			"&lt;").replace(/"/g, "&quot;");
}

var d3jsForTopicsForvCopTimeFrame = function(nodes, links, element,
		enableFisheye) {

	var width = 800, height = 1000;

	var color = d3.scale.category20();

	var force = d3.layout.force().charge(-100).distance(300).size(
			[ width, height ]);

	var svg = d3.select(element).append("svg").attr("width", width).attr(
			"height", height);

	var max = 0;
	nodes.forEach(function(link, index, list) {
		if (link.value > max)
			max = link.value;
	});

	links.forEach(function(link, index, list) {
		if (typeof nodes[link.source] === 'undefined') {
			console.log('undefined source', link);
		}
		if (typeof nodes[link.target] === 'undefined') {
			console.log('undefined target', link);
		}
	});

	force.nodes(nodes).links(links).linkDistance(function(link) {
		// return link.score * 400;
		return 200;
	}).start();

	var link = svg.selectAll(".link").data(links).enter().append("line").attr(
			"class", "link").style("stroke-width", function(d) {
		return Math.sqrt(d.value);
	});

	var node = svg.selectAll(".node").data(nodes).enter().append("g").attr(
			"class", "node").call(force.drag);

	node.append("circle").attr("r", function(d) {
		return (d.value / max) * 20;
	}).style("fill", function(d) {
		return color(d.group);
	});

	node.append("text").attr("dx", 12).attr("dy", ".35em").style("fill",
			"#333333").style("stroke", "none").text(function(d) {
		return d.name;
	});

	force.on("tick", function() {
		link.attr("x1", function(d) {
			return d.source.x;
		}).attr("y1", function(d) {
			return d.source.y;
		}).attr("x2", function(d) {
			return d.target.x;
		}).attr("y2", function(d) {
			return d.target.y;
		});

		node.attr("transform", function(d) {
			return "translate(" + d.x + "," + d.y + ")";
		});

	});

	var fisheye = d3.fisheye.circular().radius(200);

	if (enableFisheye == true) {
		svg.on("mousemove", function() {
			fisheye.focus(d3.mouse(this));

			node.each(function(d) {
				d.fisheye = fisheye(d);
			}).attr("cx", function(d) {
				return d.fisheye.x;
			}).attr("cy", function(d) {
				return d.fisheye.y;
			}).attr("r", function(d) {
				return d.fisheye.z * 5;
			});

			node.attr("transform", function(d) {
				return "translate(" + d.fisheye.x + "," + d.fisheye.y + ")";
			});

			link.attr("x1", function(d) {
				return d.source.fisheye.x;
			}).attr("y1", function(d) {
				return d.source.fisheye.y;
			}).attr("x2", function(d) {
				return d.target.fisheye.x;
			}).attr("y2", function(d) {
				return d.target.fisheye.y;
			});
		});
	}
}

var d3jsForTopicsForvCoPSubcommunities = function(graph, element, enableFisheye) {

	var width = 690, height = 600;

	var color = d3.scale.category20();

	var force = d3.layout.force().charge(-100).distance(300).size(
			[ width, height ]);

	var svg = d3.select(element).append("svg").attr("width", width).attr(
			"height", height);

	var max = 0;
	graph.nodes.forEach(function(link, index, list) {
		if (link.value > max)
			max = link.value;
	});

	graph.links.forEach(function(link, index, list) {
		if (typeof graph.nodes[link.source] === 'undefined') {
			// console.log('undefined source', link);
		}
		if (typeof graph.nodes[link.target] === 'undefined') {
			// console.log('undefined target', link);
		}
	});

	force.nodes(graph.nodes).links(graph.links).linkDistance(function(link) {
		/*
		 * if(link.score > 1){ return link.score * 25; }else{ return link.score *
		 * 200; }
		 */
		return 160;
	}).start();

	var link = svg.selectAll(".link").data(graph.links).enter().append("line")
			.attr("class", "link").style("stroke-width", function(d) {
				return Math.sqrt(d.value);
			});

	var node = svg.selectAll(".node").data(graph.nodes).enter().append("g")
			.attr("class", "node").call(force.drag);

	if (max > 0.5) {
		node.append("circle").attr("r", function(d) {
			return (d.value / max) * 20;
		}).style("fill", function(d) {
			return color(d.group);
		});
	} else {
		node.append("circle").attr("r", function(d) {
			return 3;
		}).style("fill", function(d) {
			return color(d.group);
		});
	}

	node.append("text").attr("dx", 12).attr("dy", ".35em").style("fill",
			"#333333").style("stroke", "none").text(function(d) {
		return d.name;
	});

	force.on("tick", function() {
		link.attr("x1", function(d) {
			return d.source.x;
		}).attr("y1", function(d) {
			return d.source.y;
		}).attr("x2", function(d) {
			return d.target.x;
		}).attr("y2", function(d) {
			return d.target.y;
		});

		node.attr("transform", function(d) {
			return "translate(" + d.x + "," + d.y + ")";
		});
	});

	var fisheye = d3.fisheye.circular().radius(200);

	if (enableFisheye == true) {
		svg.on("mousemove", function() {
			fisheye.focus(d3.mouse(this));

			node.each(function(d) {
				d.fisheye = fisheye(d);
			}).attr("cx", function(d) {
				return d.fisheye.x;
			}).attr("cy", function(d) {
				return d.fisheye.y;
			}).attr("r", function(d) {
				return d.fisheye.z * 5;
			});

			node.attr("transform", function(d) {
				return "translate(" + d.fisheye.x + "," + d.fisheye.y + ")";
			});

			link.attr("x1", function(d) {
				return d.source.fisheye.x;
			}).attr("y1", function(d) {
				return d.source.fisheye.y;
			}).attr("x2", function(d) {
				return d.target.fisheye.x;
			}).attr("y2", function(d) {
				return d.target.fisheye.y;
			});
		});
	}
}

var try1 = function(graph, element) {
	var width = 960, height = 500;

	var force = d3.layout.force().nodes(graph.nodes).links(graph.links).size(
			[ width, height ]).linkDistance(200).charge(-300).on("tick", tick)
			.start();

	var svg = d3.select(element).append("svg").attr("width", width).attr(
			"height", height);

	// add the links and the arrows
	var path = svg.append("svg:g").selectAll("path").data(graph.links).enter()
			.append("svg:path")
			// .attr("class", function(d) { return "link " + d.type; })
			.attr("class", "link").style("stroke-width", "1px");

	// define the nodes
	var node = svg.selectAll(".node").data(graph.nodes).enter().append("g")
			.attr("class", "node").call(force.drag);

	// add the nodes
	node.append("circle").attr("r", 5).style("stroke-width", "1px").style(
			"fill", function(d) {
				return color(d.group);
			});

	// add the text
	node.append("text").attr("x", 12).attr("dy", ".35em").text(function(d) {
		return d.name;
	});

	// add the curvy lines
	function tick() {
		path.attr("d",
				function(d) {
					var dx = d.target.x - d.source.x, dy = d.target.y
							- d.source.y, dr = Math.sqrt(dx * dx + dy * dy);
					return "M" + d.source.x + "," + d.source.y + "A" + dr + ","
							+ dr + " 0 0,1 " + d.target.x + "," + d.target.y;
				});

		node.attr("transform", function(d) {
			return "translate(" + d.x + "," + d.y + ")";
		});
	}
}

var _isNotMobile = (function() {
    var check = false;
    (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4)))check = true})(navigator.userAgent||navigator.vendor||window.opera);
    return !check;
})();