import { Component, OnInit, Input } from '@angular/core';
import { DefaultInputData } from '../demo.component.data';
import { ApiRequestService } from '../api-request.service';
import { ReaderBenchService } from '../../../readerbench.service';
import { TwoModeGraphService } from '../../../two-mode-graph.service';
import { DemoCommonFieldsComponent } from '../sections/common-fields/common-fields.component';
import { Language } from '../languages.data';
import { KeywordsHeatmapData } from './keywords-heatmap.data';
import { AppComponent } from '../../../app.component';
import { Word } from '@reader-bench/common';

@Component({
    selector: 'app-keywords-heatmap',
    templateUrl: './keywords-heatmap.component.html',
    styleUrls: ['./keywords-heatmap.component.css'],
    providers: [ApiRequestService, ReaderBenchService, TwoModeGraphService]
})
export class KeywordsHeatmapComponent implements OnInit {

    title: string;
    formData: any;
    @Input() advanced: boolean;
    loading: boolean;
    showResults: boolean;
    languages: any;
    language: any;

    granularities: any;
    response: any;

    private wordList: Word[];
    error: string;

    value: any;

    constructor(private myApp: AppComponent, private readerbenchService: ReaderBenchService,
        private twoModeGraphService: TwoModeGraphService) {
        this.myApp.apiRequestService.setApiService(KeywordsHeatmapData.serviceName);
        this.myApp.apiRequestService.setHeaders(this.myApp.apiRequestService.HEADERS_TYPE_COMMON_REQUEST);
    }

    ngOnInit() {
        this.title = KeywordsHeatmapData.title;
        this.languages = KeywordsHeatmapData.languages;
        this.language = KeywordsHeatmapData.defaultLanguage;
        this.granularities = KeywordsHeatmapData.granularities;

        this.formData = {
            'text': DefaultInputData.text,
            'language': this.language,
            'pos-tagging': DefaultInputData.defaultPosTaggingOption(),
            'dialogism': DefaultInputData.defaultDialogismOption(),
            'bigrams': DefaultInputData.defaultBigrams,
            'granularity': KeywordsHeatmapData.defaultGranularity(),
        };
        this.loadSemanticModels();

        this.loading = false;
        this.showResults = false;
    }

    loadSemanticModels() {
        const languageValue = this.language.value;
        this.formData['lsa'] = DefaultInputData.defaultMetricOptions.lsa[languageValue]();
        this.formData['lda'] = DefaultInputData.defaultMetricOptions.lda[languageValue]();
        this.formData['word2vec'] = DefaultInputData.defaultMetricOptions.word2vec[languageValue]();
    }

    advancedEmitter($event) {
        this.advanced = $event;
    }

    languageEmitter($event) {
        this.language = $event;
        this.loadSemanticModels();
    }

    process() {
        this.loading = true;
        this.showResults = false;

        const data = {
            'text': this.formData['text'],
            'language': this.formData['language'].value,
            'lsa-corpus': this.formData['lsa'].value,
            'lda-corpus': this.formData['lda'].value,
            'word2vec-corpus': this.formData['word2vec'].value,
            'use-pos-tagging': this.formData['pos-tagging'],
            'use-dialogism': this.formData['dialogism'],
            'use-bigrams': this.formData['bigrams'],
            'granularity': this.formData['granularity'].value
        };

        const process = this.myApp.apiRequestService.process(data);
        process.subscribe(response => {
            this.response = response;
            this.loading = false;

            if (response.success !== true) {
                alert('Server error occured!');
                return;
            }

            const wordList: Word[] = [];
            const _this = this;
            Object.keys(this.response.data.heatmap.wordScores).forEach(function (key) {
                const word = new Word();
                word.value = key;
                word.type = 'TextBased';
                word.scoreList = Object.keys(_this.response.data.heatmap.wordScores[key]).
                    map(key1 => _this.response.data.heatmap.wordScores[key][key1]);
                console.log(word, word.scoreList);
                wordList.push(word);
            });
            this.wordList = wordList;

            this.showResults = true;

        });
    }

}
