import { Component, OnInit } from '@angular/core';
import { AppContext, RbServerApi } from "../../../../../common/AppContext";
import { WordDO } from "../../../../../common/components/word-hitmap/data-objects/WordDO";

@Component({
    selector: 'lak-topic-evolution',
    templateUrl: '/app/src/components/reader-bench/modules/lak/components/topic-evolution/template/lak-topic-evolution.html'
})
export class LakTopicEvolutionComponent implements OnInit {
    private isLoading: boolean;

    wordList: WordDO[];
    yearList: string[];

    constructor(private appContext: AppContext) { }

    ngOnInit() {
        this.isLoading = true;
        this.appContext.thHttp.get(RbServerApi.LakTopicEvolution).subscribe((result: { wordList: Object[], yearList: number[] }) => {
            let convertedWordList: WordDO[] = [];
            result.wordList.forEach(wordObject => {
                let word = new WordDO();
                word.buildFromObject(wordObject);
                convertedWordList.push(word);
            });
            this.wordList = convertedWordList;
            this.yearList = _.map(result.yearList, y => { return y + '' });
            this.isLoading = false;
        });
    }
}