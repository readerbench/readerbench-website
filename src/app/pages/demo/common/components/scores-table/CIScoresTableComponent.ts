import { Component, OnInit, Input } from '@angular/core';
import { CMResultDO } from "../../data-objects/CMResultDO";
import { CMWordDO } from "../../data-objects/CMWordDO";

@Component({
    selector: 'ci-scores-table',
    templateUrl: './template/ci-scores-table.html'
})

export class CIScoresTableComponent implements OnInit {
    @Input() cmResult: CMResultDO;

    headerList: string[];
    csvDataStr: string;

    constructor() { }

    ngOnInit() {
        this.buildTableHeaders();
        this.buildCsvData();
    }
    private buildTableHeaders() {
        this.headerList = [];
        if (this.wordList.length == 0) { return; }
        this.headerList.push("Word", "Type");
        let w = this.wordList[0];
        w.activationList.forEach(a => {
            this.headerList.push("Score", "Act?");
        });
    }
    private buildCsvData() {
        this.csvDataStr = "SEP=,\n";
        this.csvDataStr += this.headerList.join(",") + "\n";

        this.wordList.forEach(w => {
            this.csvDataStr += w.value + "," + w.type;
            w.activationList.forEach(a => {
                this.csvDataStr += "," + a.score.toFixed(2) + "," + a.isActive;
            });
            this.csvDataStr += "\n";
        });
    }
    private downloadCsv() {
        let a = document.createElement('a');
        let mimeType = 'application/octet-stream';
        a.href = URL.createObjectURL(new Blob([this.csvDataStr], {
            type: mimeType
        }));
        a.setAttribute('download', "result.csv");
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    }

    public get wordList(): CMWordDO[] {
        return this.cmResult.wordList;
    }
}