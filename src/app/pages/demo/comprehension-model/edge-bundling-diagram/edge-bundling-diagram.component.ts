import { Component, OnInit, Input } from '@angular/core';
import * as vega from 'vega';
import { EdgeBundlingService } from '../service/edge-bundling.service';
import { EBResult } from '../service/models/eb-result.model';


@Component({
    // tslint:disable-next-line:component-selector
    selector: 'edge-bundling-diagram',
    styleUrls: ['./edge-bundling-diagram.component.css'],
    templateUrl: './edge-bundling-diagram.component.html'
})

export class EdgeBundlingDiagramComponent implements OnInit {
    @Input() index: any;

    constructor(private edgeBundlingService: EdgeBundlingService) { }

    ngOnInit() {
        this.displayDiagram();
    }

    private displayDiagram() {
        let view;

        let data: EBResult = this.edgeBundlingService.getParsedData(this.index);

        let spec: vega.Spec = {
            "$schema": "https://vega.github.io/schema/vega/v3.json",
            "padding": 7,
            // "width": 1100,
            // "height": 1200,
            "autosize": "pad",
            "signals": [
                {
                    "name": "tension",
                    "value": 0.85,
                    "bind": { "input": "range", "min": 0, "max": 1, "step": 0.01 }
                },
                {
                    "name": "radius",
                    "value": 120,
                    "bind": { "input": "range", "min": 20, "max": 600 }
                },
                {
                    "name": "extent",
                    "value": 360,
                    "bind": { "input": "range", "min": 0, "max": 360, "step": 1 }
                },
                {
                    "name": "rotate",
                    "value": 0,
                    "bind": { "input": "range", "min": 0, "max": 360, "step": 1 }
                },
                {
                    "name": "textSize",
                    "value": 15,
                    "bind": { "input": "range", "min": 2, "max": 20, "step": 1 }
                },
                {
                    "name": "textOffset",
                    "value": 4,
                    "bind": { "input": "range", "min": 0, "max": 10, "step": 1 }
                },
                {
                    "name": "layout",
                    "value": "tidy",
                    "bind": { "input": "radio", "options": ["tidy", "cluster"] }
                },
                { "name": "colorIn", "value": "#2171b5" },
                { "name": "colorOut", "value": "#2171b5" },
                { "name": "originX", "update": "width / 2" },
                { "name": "originY", "update": "height / 2" },
                {
                    "name": "active",
                    "value": null,
                    "on": [
                        { "events": "text:mouseover", "update": "datum.id" },
                        { "events": "mouseover[!event.item]", "update": "null" }
                    ]
                }
            ],
            "data": [
                {
                    "name": "tree",
                    "values": data.words,
                    "transform": [
                        { "type": "stratify", "key": "id", "parentKey": "parent" },
                        {
                            "type": "tree",
                            "method": { "signal": "layout" },
                            "size": [1, 3],
                            "as": ["alpha", "beta", "depth", "children"]
                        },
                        {
                            "type": "formula",
                            "expr": "(rotate + extent * datum.alpha + 270) % 360",
                            "as": "angle"
                        },
                        {
                            "type": "formula",
                            "expr": "inrange(datum.angle, [90, 270])",
                            "as": "leftside"
                        },
                        {
                            "type": "formula",
                            "expr": "originX + radius * datum.beta * cos(PI * datum.angle / 180)",
                            "as": "x"
                        },
                        {
                            "type": "formula",
                            "expr": "originY + radius * datum.beta * sin(PI * datum.angle / 180)",
                            "as": "y"
                        }
                    ]
                },
                {
                    "name": "leaves",
                    "source": "tree",
                    "transform": [{ "type": "filter", "expr": "!datum.children" }]
                },
                {
                    "name": "dependencies",
                    "values": data.edges,
                    "transform": [
                        {
                            "type": "formula",
                            "expr": "treePath('tree', datum.source, datum.target)",
                            "as": "treepath",
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
                    "from": { "data": "leaves" },
                    "encode": {
                        "enter": { "text": { "field": "name" }, "baseline": { "value": "middle" } },
                        "update": {
                            "x": { "field": "x" },
                            "y": { "field": "y" },
                            "dx": { "signal": "textOffset * (datum.leftside ? -1 : 1)" },
                            "angle": {
                                "signal": "datum.leftside ? datum.angle - 180 : datum.angle"
                            },
                            "align": { "signal": "datum.leftside ? 'right' : 'left'" },
                            "fontSize": { "signal": "textSize" },
                            "fontWeight": [
                                { "test": "indata('selected', 'source', datum.id)", "value": "bold" },
                                { "test": "indata('selected', 'target', datum.id)", "value": "bold" },
                                { "value": null }
                            ],
                            "fill": [
                                { "test": "datum.id === active", "value": "black" },
                                { "test": "datum.active === false", "value": "#b3b3b3" },
                                { "test": "datum.type === 0", "value": "white" },
                                { "test": "datum.type === 1", "value": "#286b61" },
                                { "test": "datum.type === 2", "value": "#b54224" },
                                {
                                    "test": "indata('selected', 'source', datum.id)",
                                    "signal": "colorIn"
                                },
                                {
                                    "test": "indata('selected', 'target', datum.id)",
                                    "signal": "colorOut"
                                },
                                { "value": "black" },
                            ]
                        }
                    }
                },
                {
                    "type": "group",
                    "from": {
                        "facet": { "name": "path", "data": "dependencies", "field": "treepath" }
                    },
                    "marks": [
                        {
                            "type": "line",
                            "interactive": false,
                            "from": { "data": "path" },
                            "encode": {
                                "enter": {
                                    "interpolate": { "value": "bundle" },
                                    "strokeWidth": { "value": 2 }
                                },
                                "update": {
                                    "stroke": [
                                        { "test": "parent.source === active", "signal": "colorOut" },
                                        { "test": "parent.target === active", "signal": "colorIn" },
                                        { "value": "steelblue" }
                                    ],
                                    "strokeOpacity": [
                                        {
                                            "test": "parent.source === active || parent.target === active",
                                            "value": 1
                                        },
                                        { "value": 0.2 }
                                    ],
                                    "tension": { "signal": "tension" },
                                    "x": { "field": "x" },
                                    "y": { "field": "y" }
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
                    "range": [{ "signal": "colorIn" }, { "signal": "colorOut" }]
                }
            ],
            // "legends": [
            //     {
            //         "stroke": "color",
            //         "orient": "bottom-right",
            //         "title": "Dependencies",
            //         "encode": { "symbols": { "enter": { "shape": { "value": "M-0.5,0H1" } } } }
            //     }
            // ]
        };

        view = new vega.View(vega.parse(spec))
            .renderer('canvas')  // set renderer (canvas or svg)
            .initialize('#vega-diagram') // initialize view within parent DOM container
            .hover()             // enable hover encode set processing
            .run();

    }
}
