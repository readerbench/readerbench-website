import { Component, AfterViewInit, Input, Inject, ElementRef, OnInit } from '@angular/core';
import { HierarchicalEdgeBundlingDO } from '../hierarchical-edge-bundling/data-objects/HierarchicalEdgeBundlingDO';
import * as d3 from "d3";
import * as d3Hierarchy from "d3-hierarchy";
import * as d3Shape from "d3-shape";

@Component({
    selector: 'hierarchical-edge-bundling',
    template: ''
})
export class HierarchicalEdgeBundlingComponent implements AfterViewInit{

    private _data: Array<any> = [];
    private _week: number;
    isLoadingGraph: boolean = false;

    public get data(): any {
        return this._data;
    }
    @Input()
    public set data(data: any) {
        this._data = data;
    }

    public get week(): any {
        return this._week;
    }
    @Input()
    public set week(week: any) {
        this._week = week;
    }

    ngAfterViewInit() {
        // this._appContext.thHttp.post(RbServerApi.CommunityParticipantsEdgeBundling, { communityName: this._community})
        //     .subscribe((participants: any) => {
        //         console.log(participants);
        //         this.buildGraph(participants.data);
               
        //         this.isLoadingGraph = false;
        //     }, (err: RbError) => {
        //         console.log("error");
        //         this._appContext.toaster.error(err.message);
        //         this.isLoadingGraph = false;
        // });

        this.buildGraph(this._data);
    }
    
    // ngAfterViewInit() {
    //    this.buildGraph();
    // }

    private buildGraph(classes) {
        var diameter = 700,
            radius = diameter / 2,
            innerRadius = radius - 120;

        var cluster = d3Hierarchy.cluster()
            .size([360, innerRadius]);

        var line = d3Shape.radialLine()
            .curve(d3Shape.curveBundle.beta(0.85))
            .radius(function(d: any) { return d.y; })
            .angle(function(d: any) { return d.x / 180 * Math.PI; });

        var elementId = "#graph-representation" + this._week;
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
            .attr("class", function(d: any) { 
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
            .attr("transform", function(d: any) { return "rotate(" + (d.x - 90) + ")translate(" + (d.y + 8) + ",0)" + (d.x < 180 ? "" : "rotate(180)"); })
            .attr("text-anchor", function(d: any) { return d.x < 180 ? "start" : "end"; })
            .text(function(d: any) { return d.data.key; })
            .on("mouseover", mouseovered)
            .on("mouseout", mouseouted);
        //});

        function mouseovered(d) {
        node
            .each(function(n) { n.target = n.source = false; });

        link
            .classed("link--target", function(l) { if (l.target === d) return l.source.source = true; })
            .classed("link--source", function(l) { if (l.source === d) return l.target.target = true; })
            .filter(function(l) { return l.target === d || l.source === d; });
            //.raise();

        node
            .classed("node--target", function(n) { return n.target; })
            .classed("node--source", function(n) { return n.source; });
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
                        node.parent = find(name.substring(0, i = name.lastIndexOf("/")), {}, {});                
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

        classes.forEach(function(d) {
            find(d.name, d, d.group);
        });

        return d3Hierarchy.hierarchy(map[""]);
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
                if(map[i] && map[d.data.name]) {
                    imports.push(map[d.data.name].path(map[i]));
                }
                
            });
        });

        return imports;
        }
    }    
   
}


