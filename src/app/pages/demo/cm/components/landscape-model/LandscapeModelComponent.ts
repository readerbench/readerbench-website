import { Component, OnInit, Input } from '@angular/core';
import { WordDO } from "./data-objects/WordDO";
import * as vis from "vis";

@Component({
    selector: 'landscape-model',
    templateUrl: './template/landscape.html',
    styles: [".dropdown-container { margin-left: 45%; padding: 20px; }"]
})
export class LandscapeModelComponent implements OnInit {
    private didInit: boolean = false;

    private styles: string[] = ["surface", "bar", "bar-size", "grid"];
    private selectedStyle = { style: "surface" };

    @Input() multiplyValueBy100: boolean = true;
    @Input() _yLabels: string[] = [];
    @Input() modelData: any = [];

    private _labelList: string[];
    public get labelList(): string[] {
        return this._labelList;
    }

    private _wordList: WordDO[];
    public get wordList(): WordDO[] {
        return this._wordList;
    }

    @Input()
    public set wordList(wordList: WordDO[]) {
        this._wordList = wordList;
        this.createLandscapeData();
        this.createLandscape();
    }

    constructor() { }

    ngOnInit() {
        this.didInit = true;

        this.createLandscape();
    }

    private getWordLabels(y: number) {
        return this._yLabels[y];
    }

    private updateLandscape(args) {
        this.selectedStyle.style = args.target.value;
        this.createLandscape();
    }

    private createLandscapeData() {
        this._wordList.forEach((word: WordDO, index: number) => {
            this._yLabels.push(word.value);
            let i: number;
            for (i = 0; i < word.scoreList.length; i++) {
                let point: any = {};
                point.x = i;
                point.y = index;
                point.z = word.scoreList[i];
                point.style = word.scoreList[i];
                this.modelData.push(point);
            }
        });
    }

    private createLandscape() {
        if (!this.didInit || !this._wordList) { return; }

        let xBarWidth = 0.9;
        let yBarWidth = 0.9;

        // landscape options
        let options = {
            width: '1200px',
            height: '1140px',
            style: this.selectedStyle.style,
            axisColor: '#2c7a83',
            xBarWidth: xBarWidth,
            yBarWidth: xBarWidth,
            yValueLabel: this.getWordLabels.bind(this),
            showPerspective: true,
            showGrid: true,
            gridColor: '#d4d4d6',
            showShadow: false,
            tooltip: true,
            xLabel: 'Sentences',
            yLabel: 'Concepts',
            zLabel: 'Activation',
            xStep: 1,
            zStep: 0.2,
            yStep: 1,
            verticalRatio: 0.20,
            xCenter: '50%',
            yCenter: '38%',
            backgroundColor: {
                fill: '#ffffff',
                stroke: 'lightgray',
                strokeWidth: 1
            },
            cameraPosition: {
                vertical: 1.2,
                horizontal: -0.3,
                distance: 1.4
            }
        };

        // create landscape model
        let container = document.getElementById('landscape');
        let graph = new vis.Graph3d(container, this.modelData, options);

        let camera = graph ? graph.getCameraPosition() : null;

        if (camera) graph.setCameraPosition(camera); // restore camera position

    }
}