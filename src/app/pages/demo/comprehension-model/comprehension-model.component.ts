import * as _ from 'underscore';
import { Component } from '@angular/core';
import { CIModelService } from './service/ci-model.service';
import { CMResult } from './service/data-objects/cm-result.do';
import { CIModelTab, CIModelTabType } from './utils/ci-model-tab';
import { Word, TwoModeGraph } from '@reader-bench/common';
import { ApiRequestService } from '../api-request.service';
import { EdgeBundlingService } from './service/edge-bundling.service';

@Component({
    selector: 'app-comprehension-model',
    styleUrls: ['./comprehension-model.component.css'],
    templateUrl: './comprehension-model.component.html',
    providers: [ApiRequestService, CIModelService, EdgeBundlingService]
})
export class ComprehensionModelComponent {
    private maxSearchTextLength = 1000;
    public isLoading: boolean;

    // tslint:disable-next-line:max-line-length
    public searchText = 'A young knight rode through the forest. The knight was unfamiliar with the country. Suddenly, a dragon appeared. The dragon was kidnapping a beautiful princess. The knight wanted to free the princess. The knight wanted to marry the princess. The knight hurried after the dragon. They fought for life and death. Soon, the knight\'s armor was completely scorched. At last, the knight killed the dragon. The knight freed the princess. The princess was very thankful to the knight. She married the knight.';
    public semanticModel = 'tasa';
    public minActivationThreshold = 0.3;
    public maxSemanticExpand = 5;

    private _cmResult: CMResult;
    private wordList: Word[];
    private tabs: CIModelTab[] = [];
    public selectedTab: CIModelTab;
    public selectedTabIndex: number;

    // Amoc Tab props
    public sentenceIndex: number;
    public maxSentenceIndex: number;
    public previousSentence = '';
    public currentSentence = '';
    public currentPhrase = '';
    public previousSentenceGraph: TwoModeGraph;
    public currentSentenceGraph: TwoModeGraph;
    public refresh = true;

    constructor(private ciModelService: CIModelService,
        private edgeBundlingService: EdgeBundlingService) { }

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
            semanticModel: this.semanticModel,
            minActivationThreshold: this.minActivationThreshold,
            maxSemanticExpand: this.maxSemanticExpand
        }).subscribe((result: CMResult) => {
            this.cmResult = result;
            this.buildTabs(result);
            this.edgeBundlingService.setData(result);
            this.sentenceIndex = 1;
            this.maxSentenceIndex = result.sentenceList.length - 1;
            this.isLoading = false;
        }, (err: any) => {
            this.isLoading = false;
        });
    }

    private buildTabs(result: CMResult) {
        const tabs: CIModelTab[] = [];

        // result.sentenceList.forEach((sentence, index) => {
        //     const tab = new CIModelTab('Sentence ' + (index + 1), CIModelTabType.Sentence, sentence);
        //     tabs.push(tab);
        // });
        const amocTab = new CIModelTab('AMoC', CIModelTabType.AMoCModel);
        tabs.push(amocTab);

        const lmTab = new CIModelTab('Landscape View', CIModelTabType.LandscapeModel);
        tabs.push(lmTab);


        const tab = new CIModelTab('Activation Map', CIModelTabType.Hitmap);
        tabs.push(tab);

        const scTab = new CIModelTab('Scores Table', CIModelTabType.ScoresTable);
        tabs.push(scTab);

        this.tabs = tabs;

        // select AMoC tab by default
        this.selectTab(tabs[0]);
    }

    private selectTab(tab: CIModelTab) {
        this.selectedTab = null;
        this.previousSentenceGraph = null;
        this.currentSentenceGraph = null;
        setTimeout(() => {
            this.tabs.forEach(currTab => { currTab.selected = false; });
            tab.selected = true;
            this.selectedTab = tab;
            this.selectedTabIndex = tab.sentence ? tab.sentence.index : 0;
            if (tab.isAMoCModel()) {
                this.sentenceIndex = 1;
                this.getCurrentText(1);
                this.previousSentenceGraph = this.edgeBundlingService.getSentenceGraph(this.sentenceIndex - 1);
                this.currentSentenceGraph = this.edgeBundlingService.getSentenceGraph(this.sentenceIndex);
            }
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

    public increaseIndex() {
        if (this.sentenceIndex + 1 <= this.maxSentenceIndex) {
            this.refresh = false;
            this.previousSentenceGraph = null;
            this.currentSentenceGraph = null;
            this.sentenceIndex++;
            setTimeout(() => {
                this.getCurrentText(this.sentenceIndex);
                this.previousSentenceGraph = this.edgeBundlingService.getSentenceGraph(this.sentenceIndex - 1);
                this.currentSentenceGraph = this.edgeBundlingService.getSentenceGraph(this.sentenceIndex);
                this.refresh = true;
            }, 100);
        }
    }

    public decreaseIndex() {
        if (this.sentenceIndex - 1 > -1) {
            this.refresh = false;
            this.previousSentenceGraph = null;
            this.currentSentenceGraph = null;
            this.sentenceIndex--;
            setTimeout(() => {
                this.getCurrentText(this.sentenceIndex);
                this.previousSentenceGraph = this.edgeBundlingService.getSentenceGraph(this.sentenceIndex - 1);
                this.currentSentenceGraph = this.edgeBundlingService.getSentenceGraph(this.sentenceIndex);
                this.refresh = true;
            }, 100);
        }
    }

    private getCurrentText(index: number) {
        if (index === 0) {
            this.previousSentence = '';
            this.currentPhrase = '';
            this.currentSentence = this.edgeBundlingService.getCurrentSentence(index);
        } else {
            this.previousSentence = this.edgeBundlingService.getCurrentSentence(index - 1);
            this.currentSentence = this.edgeBundlingService.getCurrentSentence(index);
            this.currentPhrase = this.edgeBundlingService.getCurrentPhrase(index - 1);
        }
    }
}
