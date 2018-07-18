import { Component, OnInit, Input } from '@angular/core';
import { CMResult } from '../service/data-objects/cm-result.do';
import { CMWord } from '../service/data-objects/cm-word.do';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'cm-scores-table',
  templateUrl: './cm-scores-table.component.html'
})

export class CMScoresTableComponent implements OnInit {
  @Input() cmResult: CMResult;

  headerList: string[];
  csvDataStr: string;

  constructor() { }

  ngOnInit() {
    this.buildTableHeaders();
    this.buildCsvData();
  }
  private buildTableHeaders() {
    this.headerList = [];
    if (this.wordList.length === 0) { return; }
    this.headerList.push('Word', 'Type');
    const w = this.wordList[0];
    w.activationList.forEach(a => {
      this.headerList.push('Score', 'Act?');
    });
  }
  private buildCsvData() {
    this.csvDataStr = 'SEP=,\n';
    this.csvDataStr += this.headerList.join(',') + '\n';

    this.wordList.forEach(w => {
      this.csvDataStr += w.value + ',' + w.type;
      w.activationList.forEach(a => {
        this.csvDataStr += ',' + a.score.toFixed(2) + ',' + a.isActive;
      });
      this.csvDataStr += '\n';
    });
  }
  private downloadCsv() {
    const a = document.createElement('a');
    const mimeType = 'application/octet-stream';
    a.href = URL.createObjectURL(new Blob([this.csvDataStr], {
      type: mimeType
    }));
    a.setAttribute('download', 'result.csv');
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  public get wordList(): CMWord[] {
    return this.cmResult.wordList;
  }
}
