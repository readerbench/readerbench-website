import { Component, OnInit, Input, OnChanges } from '@angular/core';
import * as vega from 'vega';
import { EdgeBundlingService } from '../service/edge-bundling.service';
import { EBResult } from '../service/models/eb-result.model';


@Component({
    // tslint:disable-next-line:component-selector
    selector: 'edge-bundling-diagram',
    templateUrl: './edge-bundling-diagram.component.html'
})

export class EdgeBundlingDiagramComponent implements OnInit, OnChanges {
    @Input() index: number;
    @Input() viewId: number;

    private vegaView: vega.View;

    constructor(private edgeBundlingService: EdgeBundlingService) { }

    ngOnInit() {
        if (this.index > -1) {
            this.displayDiagram();
        }
    }

    ngOnChanges() {
        if (this.index > -1) {
            this.displayDiagram();
        }
    }

    private displayDiagram() {
        const data: EBResult = this.edgeBundlingService.getParsedData(this.index);
        const spec: vega.Spec = {
            '$schema': 'https://vega.github.io/schema/vega/v3.json',
            'padding': 7,
            'width': 700,
            'height': 650,
            'autosize': 'none',
            'signals': [
                {
                    'name': 'tension',
                    'value': 0.60,
                    'bind': { 'input': 'range', 'min': 0, 'max': 1, 'step': 0.01 }
                },
                {
                    'name': 'radius',
                    'value': 95,
                    'bind': { 'input': 'range', 'min': 20, 'max': 120 }
                },
                {
                    'name': 'extent',
                    'value': 360,
                    'bind': { 'input': 'range', 'min': 0, 'max': 360, 'step': 1 }
                },
                {
                    'name': 'rotate',
                    'value': 0,
                    'bind': { 'input': 'range', 'min': 0, 'max': 360, 'step': 1 }
                },
                {
                    'name': 'textSize',
                    'value': 17,
                    'bind': { 'input': 'range', 'min': 2, 'max': 20, 'step': 1 }
                },
                {
                    'name': 'textOffset',
                    'value': 4,
                    'bind': { 'input': 'range', 'min': 0, 'max': 10, 'step': 1 }
                },
                {
                    'name': 'layout',
                    'value': 'tidy',
                    'bind': { 'input': 'radio', 'options': ['tidy', 'cluster'] }
                },
                { 'name': 'colorIn', 'value': '#5f9ed0' },
                { 'name': 'colorOut', 'value': '#f58a8a' },
                { 'name': 'originX', 'update': 'width / 2' },
                { 'name': 'originY', 'update': 'height / 2' },
                {
                    'name': 'active',
                    'value': null,
                    'on': [
                        { 'events': 'text:mouseover', 'update': 'datum.id' },
                        { 'events': 'mouseover[!event.item]', 'update': 'null' }
                    ]
                }
            ],
            'data': [
                {
                    'name': 'tree',
                    'values': data.words,
                    'transform': [
                        { 'type': 'stratify', 'key': 'id', 'parentKey': 'parent' },
                        {
                            'type': 'tree',
                            'method': { 'signal': 'layout' },
                            'size': [1, 3],
                            'as': ['alpha', 'beta', 'depth', 'children']
                        },
                        {
                            'type': 'formula',
                            'expr': '(rotate + extent * datum.alpha + 270) % 360',
                            'as': 'angle'
                        },
                        {
                            'type': 'formula',
                            'expr': 'inrange(datum.angle, [90, 270])',
                            'as': 'leftside'
                        },
                        {
                            'type': 'formula',
                            'expr': 'originX + radius * datum.beta * cos(PI * datum.angle / 180)',
                            'as': 'x'
                        },
                        {
                            'type': 'formula',
                            'expr': 'originY + radius * datum.beta * sin(PI * datum.angle / 180)',
                            'as': 'y'
                        }
                    ]
                },
                {
                    'name': 'leaves',
                    'source': 'tree',
                    'transform': [{ 'type': 'filter', 'expr': '!datum.children' }]
                },
                {
                    'name': 'dependencies',
                    'values': data.edges,
                    'transform': [
                        {
                            'type': 'formula',
                            'expr': 'treePath(\'tree\', datum.source, datum.target)',
                            'as': 'treepath',
                            'initonly': true
                        }
                    ]
                },
                {
                    'name': 'selected',
                    'source': 'dependencies',
                    'transform': [
                        {
                            'type': 'filter',
                            'expr': 'datum.source === active || datum.target === active'
                        }
                    ]
                }
            ],
            'marks': [
                {
                    'type': 'text',
                    'from': { 'data': 'leaves' },
                    'encode': {
                        'enter': { 'text': { 'field': 'name' }, 'baseline': { 'value': 'middle' } },
                        'update': {
                            'x': { 'field': 'x' },
                            'y': { 'field': 'y' },
                            'dx': { 'signal': 'textOffset * (datum.leftside ? -1 : 1)' },
                            'angle': {
                                'signal': 'datum.leftside ? datum.angle - 180 : datum.angle'
                            },
                            'align': { 'signal': 'datum.leftside ? \'right\' : \'left\'' },
                            'fontSize': [
                                { 'signal': 'textSize' },
                            ],
                            'fontWeight': [
                                { 'test': 'indata(\'selected\', \'source\', datum.id)', 'value': 'bold' },
                                { 'test': 'indata(\'selected\', \'target\', datum.id)', 'value': 'bold' },
                                { 'test': 'datum.bold === true', 'value': 'bold' },
                                { 'value': null }
                            ],
                            // "fontStyle": [
                            //     { "test": "datum.bold === true", "value": "italic" },
                            //     { "value": null }
                            // ],
                            'fill': [
                                { 'test': 'datum.id === active && datum.type !== 0', 'value': '6d6d6d' },
                                { 'test': 'datum.active === false', 'value': '#cccccc' },
                                { 'test': 'datum.type === 0', 'value': 'white' },
                                { 'test': 'datum.type === 1 && datum.bold === true', 'value': '#005a9c' },
                                { 'test': 'datum.type === 1', 'value': '#3491d6' },
                                { 'test': 'datum.type === 2 && datum.bold === true', 'value': '#de4a4a' },
                                { 'test': 'datum.type === 2', 'value': '#f58a8a' },
                                {
                                    'test': 'indata(\'selected\', \'source\', datum.id)',
                                    'signal': 'colorIn'
                                },
                                {
                                    'test': 'indata(\'selected\', \'target\', datum.id)',
                                    'signal': 'colorOut'
                                },
                                { 'value': 'black' },
                            ]
                        }
                    }
                },
                {
                    'type': 'group',
                    'from': {
                        'facet': { 'name': 'path', 'data': 'dependencies', 'field': 'treepath' }
                    },
                    'marks': [
                        {
                            'type': 'line',
                            'interactive': false,
                            'from': { 'data': 'path' },
                            'encode': {
                                'enter': {
                                    'interpolate': { 'value': 'bundle' },
                                    'strokeWidth': { 'value': 2 }
                                },
                                'update': {
                                    'stroke': [
                                        {
                                            'test': 'parent.type === 1 && ' +
                                                '(parent.source === active || parent.target === active)', 'signal': 'colorOut'
                                        },
                                        {
                                            'test': 'parent.type ===0 && ' +
                                                '(parent.source === active || parent.target === active)', 'signal': 'colorIn'
                                        },
                                        { 'value': '#8bcbf2' }
                                    ],
                                    'strokeOpacity': [
                                        {
                                            'test': 'parent.source === active || parent.target === active',
                                            'value': 1
                                        },
                                        { 'value': 0.2 }
                                    ],
                                    'tension': { 'signal': 'tension' },
                                    'x': { 'field': 'x' },
                                    'y': { 'field': 'y' }
                                }
                            }
                        }
                    ]
                }
            ],
            'scales': [
                {
                    'name': 'color',
                    'type': 'ordinal',
                    'domain': ['depends on', 'imported by'],
                    'range': [{ 'signal': 'colorIn' }, { 'signal': 'colorOut' }]
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
        setTimeout(() => {
            this.vegaView = new vega.View(vega.parse(spec))
                .renderer('canvas')  // set renderer (canvas or svg)
                .initialize('#vega-diagram' + this.viewId) // initialize view within parent DOM container
                .hover()             // enable hover encode set processing
                .run();
        }, 100);
    }
}
