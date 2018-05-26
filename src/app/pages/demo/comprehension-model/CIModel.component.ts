import { Component, OnInit, Input } from '@angular/core';
import { CMResultDO } from "../common/data-objects/CMResultDO";
import { CIModelTab, CIModelTabType } from "./utils/CIModelTab";
import { AppContext } from "../common/AppContext";
import { WordDO } from "../common/components/word-hitmap/data-objects/WordDO";

import { DefaultInputData } from '../demo.component.data';
import { Language } from '../languages.data';

import { ApiResponseModel } from '../api-response.model';
import { ApiRequestService } from '../api-request.service';

import * as _ from 'underscore';

interface CiModelParams {
    text: string;
    minActivationThreshold: number;
    maxSemanticExpand: number;
}

@Component({
    selector: 'ci-model',
    templateUrl: './CIModel.component.html',
    styleUrls: ['./CIModel.component.css'],
    providers: [ApiRequestService],
})

export class CIModelComponent {
    private maxSearchTextLength = 1000;
    private isLoading: boolean;

    private searchText: string = "A young knight rode through the forest. The knight was unfamiliar with the country. Suddenly, a dragon appeared. The dragon was kidnapping a beautiful princess. The knight wanted to free her. He wanted to marry her. The knight hurried after the dragon. They fought for life and death. Soon, the knight's armor was completely scorched. At last, the knight killed the dragon. He freed the princess. The princess was very thankful to the knight. She married the knight.";
    private minActivationThreshold: number = 0.3;
    private maxSemanticExpand: number = 5;

    private _cmResult: CMResultDO;
    private wordList: WordDO[];
    private tabs: CIModelTab[] = [];
    private selectedTab: CIModelTab;

    constructor(private apiRequestService: ApiRequestService, private appContext: AppContext) {
        this.apiRequestService.setEndpoint('ci-model/analyzer');
    }

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
            this.appContext.toaster.error("Check all the input parameters");
            return;
        }
        if (this.isLoading) { return; }
        this.isLoading = true;

        var process = this.apiRequestService.process({
            text: this.searchText,
            minActivationThreshold: this.minActivationThreshold,
            maxSemanticExpand: this.maxSemanticExpand
        });

        process.subscribe((result: ApiResponseModel) => {
            var cmResult = new CMResultDO();
            cmResult.buildFromObject(result.data);
            this.cmResult = cmResult;

            this.buildTabs(cmResult);
            this.isLoading = false;

        }, (err: any) => {
            this.isLoading = false;
        });
    }

    private buildTabs(result: CMResultDO) {
        let tabs: CIModelTab[] = [];

        result.sentenceList.forEach((sentence, index) => {
            let tab = new CIModelTab("Sentence " + (index + 1), CIModelTabType.Sentence, sentence);
            tabs.push(tab);
        });

        let tab = new CIModelTab("Activation Map", CIModelTabType.Hitmap);
        tabs.push(tab);

        let scTab = new CIModelTab("Scores Table", CIModelTabType.ScoresTable);
        tabs.push(scTab);

        let lmTab = new CIModelTab("Landscape Model", CIModelTabType.LandscapeModel);
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

    public get cmResult(): CMResultDO {
        return this._cmResult;
    }
    public set cmResult(value: CMResultDO) {
        if (!value) { return; }
        this._cmResult = value;
        let wordList: WordDO[] = [];
        this._cmResult.wordList.forEach(w => {
            let word = new WordDO();
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
