import { Injectable } from '@angular/core';
import * as d3 from 'd3';
import * as _ from 'underscore';

@Injectable()
export class ReaderBenchService {

  constructor() { }

  public log(...x: any[]) {
    for (let i = 0; i < x.length; i++) {
      console.log(x);
    }
    return x;
  }

  public logError(...x: any[]) {
    for (let i = 0; i < x.length; i++) {
      console.error(x);
    }
    return x;
  }

  public courseDescriptionToggle(element = '.course-description-list'): void {
    const courseDescription = jQuery(element);
    const courseLessons = courseDescription.find('.lesson');
    courseLessons.each(function () {
      const lesson = jQuery(this),
        lessonDescription = lesson.find('> .lesson-description'),
        lessonDescriptionItems = lessonDescription.find('> li');

      lesson.find('> .heading > .lesson-nr').on('click', function () {
        lessonDescription.toggleClass('visible');

        if (lessonDescription.hasClass('visible')) {
          // lessonDescription.velocity('slideDown', { duration: 200 });
          lessonDescription.show();

          lessonDescriptionItems.each(function (i) {
            const obj = jQuery(this);
            setTimeout(function () {
              obj.find('.icon').addClass('visible');
            }, 100 * (i + 1));
          });
        } else {
          // lessonDescription.velocity('slideUp', { duration: 170 });
          lessonDescription.hide();

          lessonDescriptionItems.each(function (i) {
            const obj = jQuery(this);
            obj.find('.icon').removeClass('visible');
          });
        }
      });
    });
  }

  public objectKeys(object) {
    return Object.keys(object);
  }

  public isUndefinedOrNull(object: Object, parameterStack?: string): boolean {
    if (_.isUndefined(object) || _.isNull(object)) {
      return true;
    }
    if (!_.isUndefined(parameterStack) && !_.isNull(parameterStack)) {
      let currentObject = object;
      const parameterStackArray: string[] = parameterStack.split('.');
      for (let i = 0; i < parameterStackArray.length; i++) {
        const param = parameterStackArray[i];
        currentObject = currentObject[param];
        if (_.isUndefined(currentObject) || _.isNull(currentObject)) {
          return true;
        }
      }
    }
    return false;
  }

  public roundNumberToTwoDecimals(inputNumber: number): number {
    if (this.isUndefinedOrNull(inputNumber) || !_.isNumber(inputNumber)) {
      return inputNumber;
    }
    return Math.round(inputNumber * 100) / 100;
  }

  public getObjectValueByPropertyStack(object: Object, parameterStack: string): any {
    if (this.isUndefinedOrNull(object, parameterStack)) {
      return null;
    }
    let currentObject = object;
    const parameterStackArray: string[] = parameterStack.split('.');
    for (let i = 0; i < parameterStackArray.length; i++) {
      const param = parameterStackArray[i];
      currentObject = currentObject[param];
    }
    return currentObject;
  }

  componentToHex(c) {
    const hex = c.toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  }

  rgbToHex(r, g, b) {
    return '#' + this.componentToHex(r) + this.componentToHex(g) + this.componentToHex(b);
  }

  hexToRgb(hex) {
    // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
    const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, function (m, r, g, b) {
      return r + r + g + g + b + b;
    });

    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  }

  d3jsForTopics(graph, element, enableFisheye) {

    const width = 690, height = 600;

    const color = d3.scale.category20();

    /*
     * var force = d3.layout.force() .charge(-120) .linkDistance(30)
     * .size([width, height]);
     */

    // const force = d3.layout.force().charge(-100).distance(300).size([width, height]);
    const force = d3.layout.force().charge(-100).size([width, height]);

    const svg = d3.select(element).append('svg').attr('width', width).attr(
      'height', height);

    let max = 0;
    graph.nodes.forEach(function (node, index, list) {
      graph.nodes[index].id = index;
      graph.nodes[index].name = node.displayName;
      graph.nodes[index].value = 1;
      graph.nodes[index].group = 1;
      if (graph.nodes[index].value > max) {
        max = graph.nodes[index].value;
      }
    });

    graph.links.forEach(function (link, index, list) {
      // graph.links[index].index = index;
      graph.links[index].weight = 1;
      graph.links[index].source = parseInt(link.sourceUri);
      graph.links[index].target = parseInt(link.targetUri);
      if (typeof graph.nodes[link.sourceUri] === 'undefined') {
        console.log('undefined source', link);
      }
      if (typeof graph.nodes[link.targetUri] === 'undefined') {
        console.log('undefined target', link);
      }
    });

    console.log(graph);

    force.nodes(graph.nodes).links(graph.links).linkDistance(function (link: any) {
      return link.score * 25;
    }).start();

    const link = svg.selectAll('.link').data(graph.links).enter().append('line')
      .attr('class', 'link').style('stroke-width', function (d: any) {
        return Math.sqrt(d.value);
      });

    const node = svg.selectAll('.node').data(graph.nodes).enter().append('g')
      .attr('class', 'node').call(force.drag);

    node.append('circle').attr('r', function (d: any) {
      return (d.value / max) * 20;
    }).style('fill', function (d: any) {
      return color(d.group);
    });

    node.append('text').attr('dx', 12).attr('dy', '.35em').style('fill',
      '#333333').style('stroke', 'none').text(function (d: any) {
        return d.name;
      });

    force.on('tick', function () {
      link.attr('x1', function (d: any) {
        return d.source.x;
      }).attr('y1', function (d: any) {
        return d.source.y;
      }).attr('x2', function (d: any) {
        return d.target.x;
      }).attr('y2', function (d: any) {
        return d.target.y;
      });

      node.attr('transform', function (d: any) {
        return 'translate(' + d.x + ',' + d.y + ')';
      });

    });

    // const fisheye = d3.fisheye.circular().radius(200);

    // if (enableFisheye === true) {
    //   svg.on('mousemove', function () {
    //     fisheye.focus(d3.mouse(this));

    //     node.each(function (d: any) {
    //       d.fisheye = fisheye(d);
    //     }).attr('cx', function (d: any) {
    //       return d.fisheye.x;
    //     }).attr('cy', function (d: any) {
    //       return d.fisheye.y;
    //     }).attr('r', function (d: any) {
    //       return d.fisheye.z * 5;
    //     });

    //     node.attr('transform', function (d: any) {
    //       return 'translate(' + d.fisheye.x + ',' + d.fisheye.y + ')';
    //     });

    //     link.attr('x1', function (d: any) {
    //       return d.source.fisheye.x;
    //     }).attr('y1', function (d: any) {
    //       return d.source.fisheye.y;
    //     }).attr('x2', function (d: any) {
    //       return d.target.fisheye.x;
    //     }).attr('y2', function (d: any) {
    //       return d.target.fisheye.y;
    //     });
    //   });
    // }
  }


  d3jsLineGraph(values, element, xLabel, yLabel) {

    const lineFunc = d3.svg.line().x(function (d: any) {
      return xRange(d.x);
    }).y(function (d: any) {
      return yRange(d.y);
    }).interpolate('monotone');

    const vis = d3.select(element), WIDTH = 1000, HEIGHT = 250, MARGINS = {
      top: 20,
      right: 20,
      bottom: 20,
      left: 50
    }, xRange = d3.scale.linear()
      .range([MARGINS.left, WIDTH - MARGINS.right]).domain(
        [d3.min(values, function (d: any) {
          return d.x;
        }), d3.max(values, function (d: any) {
          return d.x;
        })]), yRange = d3.scale.linear().range(
          [HEIGHT - MARGINS.top, MARGINS.bottom]).domain(
            [d3.min(values, function (d: any) {
              return d.y;
            }), d3.max(values, function (d: any) {
              return d.y;
            })]),
      xAxis = d3.svg.axis().scale(xRange).tickSize(1),//.tickSubdivide(true),
      yAxis = d3.svg.axis().scale(yRange).tickSize(1).orient('left');//.tickSubdivide(true);

    vis.append('svg:g').attr('class', 'x axis').attr('stroke', '#b8bebf').attr(
      'transform', 'translate(0,' + (HEIGHT - MARGINS.bottom) + ')')
      .call(xAxis);

    vis.append('svg:g').attr('class', 'y axis').attr('stroke', '#b8bebf').attr(
      'transform', 'translate(' + (MARGINS.left) + ',0)').call(yAxis);

    vis.append('svg:path').attr('d', lineFunc(values))
      .attr('stroke', '#43b9c7').attr('stroke-width', 2).attr('fill',
        'none');

    vis.select('.axis').style('font-family', '"Lato", sans-serif').style(
      'font-size', '14px');

    vis.append('text').attr('class', 'x label').attr('text-anchor', 'end')
      .attr('x', WIDTH / 2).attr('y', HEIGHT + 10).attr('stroke',
        '#b8bebf').text(xLabel);

    vis.append('text').attr('class', 'y label').attr('text-anchor', 'end')
      .attr('y', 10).attr('dy', '.75em').attr('transform', 'rotate(-90)')
      .attr('stroke', '#b8bebf').text(yLabel);
  }

  d3jsMultipleLinesGraph(values, element, xLabel, yLabel) {

    const lineFunc = d3.svg.line().x(function (d: any) {
      return xRange(d.x);
    }).y(function (d: any) {
      return yRange(d.y);
    }).interpolate('monotone');

    const vis = d3.select(element), WIDTH = 1000, HEIGHT = 250, MARGINS = {
      top: 50,
      right: 20,
      bottom: 50,
      left: 50
    }, xRange = d3.scale.linear()
      .range([MARGINS.left, WIDTH - MARGINS.right]).domain(
        [d3.min(values, function (d: any) {
          return d.x;
        }), d3.max(values, function (d: any) {
          return d.x;
        })]), yRange = d3.scale.linear().range(
          [HEIGHT - MARGINS.top, MARGINS.bottom]).domain(
            [d3.min(values, function (d: any) {
              return d.y;
            }), d3.max(values, function (d: any) {
              return d.y;
            })]),
      xAxis = d3.svg.axis().scale(xRange).tickSize(1),//.tickSubdivide(true),
      yAxis = d3.svg.axis().scale(yRange).tickSize(1).orient('left');//.tickSubdivide(true);

    const xScale = d3.scale.linear().range([MARGINS.left, WIDTH - MARGINS.right])
      .domain([d3.min(values, function (d: any) {
        return d.x;
      }), d3.max(values, function (d: any) {
        return d.x;
      })]);

    const yScale = d3.scale.linear().range([HEIGHT - MARGINS.top, MARGINS.bottom])
      .domain([d3.min(values, function (d: any) {
        return d.y;
      }), d3.max(values, function (d: any) {
        return d.y;
      })]);

    const dataGroup = d3.nest().key(function (d: any) {
      return d.nodeName;
    }).entries(values);

    const lSpace = WIDTH / dataGroup.length;

    const color = function (d, j) {
      return 'hsl(' + Math.random() * 360 + ',100%,50%)';
    };

    dataGroup.forEach(function (d, i) {
      const localColor = color(d, i);

      vis.append('svg:path').attr('d', lineFunc(d.values)).attr('stroke', localColor).attr('stroke-width', 2).attr('fill', 'none');

      vis.append('text').attr('x', (lSpace / 2) + i * lSpace).attr('y', HEIGHT).style('fill', localColor).text(d.key);

    });

    vis.append('svg:g').attr('class', 'x axis').attr('stroke', '#b8bebf').attr(
      'transform', 'translate(0,' + (HEIGHT - MARGINS.bottom) + ')')
      .call(xAxis);

    vis.append('svg:g').attr('class', 'y axis').attr('stroke', '#b8bebf').attr(
      'transform', 'translate(' + (MARGINS.left) + ',0)').call(yAxis);

    vis.select('.axis').style('font-family', '"Lato", sans-serif').style(
      'font-size', '14px');

    vis.append('text').attr('class', 'x label').attr('text-anchor', 'end')
      .attr('x', WIDTH / 2).attr('y', HEIGHT + 10).attr('stroke',
        '#b8bebf').text(xLabel);

    vis.append('text').attr('class', 'y label').attr('text-anchor', 'end')
      .attr('y', 10).attr('dy', '.75em').attr('transform', 'rotate(-90)')
      .attr('stroke', '#b8bebf').text(yLabel);
  }



}
