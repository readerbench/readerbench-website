import { Component, OnInit, Input } from '@angular/core';
import {GraphMeasureDO} from '../../services/data-objects/measure/GraphMeasureDO';

@Component({
    selector: 'graph-measures',
    templateUrl: '/app/src/components/reader-bench/modules/lak/components/measure-table/template/graph-measures.html'
})
export class GraphMeasuresComponent implements OnInit {
    @Input() measureList: GraphMeasureDO[] = [];
    @Input() showNoReferences: boolean = false;

    constructor() { }

    ngOnInit() { }
}