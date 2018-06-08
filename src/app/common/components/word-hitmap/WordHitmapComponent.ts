import { Component, OnInit, Input } from '@angular/core';
import { WordDO } from "./data-objects/WordDO";

@Component({
    selector: 'word-hitmap',
    template: '<div id="word-hitmap"></div>'
})
export class WordHitmapComponent implements OnInit {
    private didInit: boolean = false;

    @Input() multiplyValueBy100: boolean = true;

    private _labelList: string[];
    public get labelList(): string[] {
        return this._labelList;
    }
    @Input()
    public set labelList(value: string[]) {
        this._labelList = value;
        this.createHitmap();
    }

    private _wordList: WordDO[];
    public get wordList(): WordDO[] {
        return this._wordList;
    }
    @Input()
    public set wordList(wordList: WordDO[]) {
        this._wordList = wordList;
        this.createHitmap();
    }

    constructor() { }

    ngOnInit() {
        this.didInit = true;
        this.createHitmap();
    }

    private createHitmap() {
        if (!this.didInit || !this._wordList) { return; }

        var words = _.map(this._wordList, word => { return word.value; });
        let noSentences = this._wordList.length > 0 ? this._wordList[0].scoreList.length : 0;
        var phrases: number[] = [];
        for (var i = 1; i <= noSentences; i++) {
            phrases.push(i);
        }
        let maxWidth = $("#word-hitmap").width();
        let maxHeight = maxWidth / 2 + 100;

        var margin = { top: 150, right: 0, bottom: 100, left: 30 },
            width = maxWidth - margin.left - margin.right,
            height = maxHeight - margin.top - margin.bottom,
            gridSize = Math.floor(width / (this._wordList.length)),
            legendElementWidth = gridSize * 2;

        // var colors = ["#ffffd9", "#edf8b1", "#c7e9b4", "#7fcdbb", "#41b6c4", "#1d91c0", "#225ea8", "#253494", "#081d58"],
        var colors = ["#bcbdbd", "#b7bec2", "#b2c0c7", "#adc2cc", "#a8c4d1", "#a3c6d6", "#9dc8dc", "#bde4f7", "#acddf4", "#9ad6f2", "#89cff0", "#78c8ee", "#66c1ec", "#55bae9", "#43b3e7", "#32ace5", "#21a5e3", "#1b99d5", "#198dc3", "#1780b2", "#1474a0", "#12678f", "#105b7e", "#0e4e6c", "#0c415b", "#093549", "#072838", "#051c27", "#030f15", "#000304"];
        var inactiveColor = "#bcbdbd";
        var buckets = colors.length;

        var svg = d3.select("#word-hitmap").append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        var phraseLabels = svg.selectAll(".phraseLabel")
            .data(phrases)
            .enter().append("text")
            .text((d) => {
                if (this._labelList) {
                    return this._labelList[d - 1];
                }
                return d;
            })
            .attr("x", 0)
            .attr("y", function (d, i) { return i * gridSize; })
            .style("text-anchor", "end")
            .attr("transform", "translate(-6," + gridSize / 1.5 + ")")
            .attr("class", function (d, i) { return ((i >= 0 && i <= 4) ? "phraseLabel mono axis axis-workweek" : "phraseLabel mono axis"); });

        var wordLabels = svg.selectAll(".wordLabel")
            .data(words)
            .enter().append("text")
            .text(function (d) { return d; })
            .attr("x", function (d, i) { return i * gridSize; })
            .attr("y", 0)
            .style("text-anchor", "middle")
            .attr("transform", "translate(" + gridSize / 2 + ", -60)")
            .attr("class", (d, i) => {
                var classes = "wordLabel mono axis";
                if (i >= 7 && i <= 16) {
                    classes = "wordLabel mono axis axis-worktime";
                }
                let word = this._wordList[i];
                if (word.isTextBased()) {
                    classes += " textBased";
                }
                else {
                    classes += " inferred";
                }
                return classes;
            });

        var data = [];
        this._wordList.forEach((word, wordIndex) => {
            word.scoreList.forEach((score, index) => {
                let value = score;
                if (this.multiplyValueBy100) {
                    value = value * 100;
                }
                data.push({
                    day: index + 1,
                    hour: wordIndex + 1,
                    value: value
                });
            });
        });

        var colorScale = d3.scale.quantile()
            .domain([0, d3.max(data, function (d) { return d.value; })])
            .range(colors);

        var cards = svg.selectAll(".hour")
            .data(data, function (d) { return d.day + ':' + d.hour; });

        cards.append("title");

        cards.enter().append("rect")
            .attr("x", function (d) { return (d.hour - 1) * gridSize; })
            .attr("y", function (d) { return (d.day - 1) * gridSize; })
            .attr("rx", 4)
            .attr("ry", 4)
            .attr("class", "hour bordered")
            .attr("width", gridSize)
            .attr("height", gridSize)
            .style("fill", colors[0]);

        cards.transition().duration(1000)
            .style("fill", <any>function (d) { return colorScale(d.value); });

        cards.select("title").text(function (d) { return d.value; });

        cards.exit().remove();

        var legend = svg.selectAll(".legend")
            .data(<any>[0].concat(colorScale.quantiles()), <any>function (d) { return d; });

        legend.enter().append("g")
            .attr("class", "legend");

        legend.append("rect")
            .attr("x", function (d, i) { return legendElementWidth * i; })
            .attr("y", height)
            .attr("width", legendElementWidth)
            .attr("height", gridSize / 2)
            .style("fill", function (d, i) {
                return colors[i];
            });

        legend.append("text")
            .attr("class", "mono")
            .text((d) => {
                if (this.multiplyValueBy100) {
                    return "≥" + Math.round(<any>d);
                }
                return "≥" + (<number>d).toFixed(2);
            })
            .attr("x", function (d, i) { return legendElementWidth * i; })
            .attr("y", height + gridSize);

        legend.exit().remove();
    }
}