import * as _ from 'underscore';
import { Component } from '@angular/core';
import { CIModelService } from './service/ci-model.service';
import { CMResult } from './service/data-objects/cm-result.do';
import { CIModelTab, CIModelTabType } from './utils/ci-model-tab';
import { Word } from '@reader-bench/common';
import { ApiRequestService } from '../api-request.service';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'comprehension-model',
  templateUrl: './comprehension-model.component.html',
  providers: [ApiRequestService, CIModelService]
})
export class ComprehensionModelComponent {
  private maxSearchTextLength = 1000;
  public isLoading: boolean;

  // tslint:disable-next-line:max-line-length
  private searchText = 'A young knight rode through the forest. The knight was unfamiliar with the country. Suddenly, a dragon appeared. The dragon was kidnapping a beautiful princess. The knight wanted to free the princess. The knight wanted to marry the princess. The knight hurried after the dragon. They fought for life and death. Soon, the knight\'s armor was completely scorched. At last, the knight killed the dragon. The knight freed the princess. The princess was very thankful to the knight. She married the knight.';
  private minActivationThreshold = 0.3;
  private maxSemanticExpand = 5;

  private _cmResult: CMResult;
  private wordList: Word[];
  private tabs: CIModelTab[] = [];
  private selectedTab: CIModelTab;

  constructor(private ciModelService: CIModelService) { }

  private get incorrectSearchText(): boolean {
    return !_.isString(this.searchText) || _.isEmpty(this.searchText) ||
      this.searchText.length > this.maxSearchTextLength;
  }
  private get incorrectMinActivationThreshold(): boolean {
    return !_.isNumber(this.minActivationThreshold) ||
      this.minActivationThreshold < 0 || this.minActivationThreshold > 1;
  }
  private get incorrectMaxSemanticExpand(): boolean {
    return !_.isNumber(this.maxSemanticExpand) || this.maxSemanticExpand < 0;
  }
  private get incorrectForm(): boolean {
    return this.incorrectSearchText || this.incorrectMinActivationThreshold || this.incorrectMaxSemanticExpand;
  }

  public runCiModel() {
    if (this.incorrectForm) {
      alert('Check all the input parameters');
      return;
    }
    if (this.isLoading) { return; }
    this.isLoading = true;
    this.ciModelService.getWords({
      text: this.searchText,
      minActivationThreshold: this.minActivationThreshold,
      maxSemanticExpand: this.maxSemanticExpand
    }).subscribe((result: CMResult) => {
      this.cmResult = result;
      this.buildTabs(result);
      this.isLoading = false;
    }, (err: any) => {
      this.isLoading = false;
    });
  }

  private buildTabs(result: CMResult) {
    const tabs: CIModelTab[] = [];

    result.sentenceList.forEach((sentence, index) => {
      const tab = new CIModelTab('Sentence ' + (index + 1), CIModelTabType.Sentence, sentence);
      tabs.push(tab);
    });

    const tab = new CIModelTab('Activation Map', CIModelTabType.Hitmap);
    tabs.push(tab);

    const scTab = new CIModelTab('Scores Table', CIModelTabType.ScoresTable);
    tabs.push(scTab);

    const lmTab = new CIModelTab('AMoC', CIModelTabType.LandscapeModel);
    tabs.push(lmTab);

    this.tabs = tabs;

    // select the activation map tab by default
    this.selectTab(tabs[tabs.length - 2]);
  }

  private selectTab(tab: CIModelTab) {
    this.selectedTab = null;
    setTimeout(() => {
      this.tabs.forEach(currTab => { currTab.selected = false; })
      tab.selected = true;
      this.selectedTab = tab;
    }, 100);
  }

  public get cmResult(): CMResult {
    return this._cmResult;
  }
  public set cmResult(value: CMResult) {
    if (!value) { return; }
    this._cmResult = value;
    const wordList: Word[] = [];
    this._cmResult.wordList.forEach(w => {
      const word = new Word();
      word.type = w.type;
      word.value = w.value;
      word.scoreList = _.map(w.activationList, a => {
        return a.score;
      });
      wordList.push(word);
    });
    this.wordList = wordList;
  }
}
