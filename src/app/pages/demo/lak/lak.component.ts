import { Component, OnInit } from '@angular/core';
import { GraphMeasureService } from './services/GraphMeasureService';
import { GraphMeasureDO } from './services/data-objects/measure/GraphMeasureDO';

enum ArticleAuthorPage {
    Graph,
    Authors,
    Articles,
    Topics,
    TopicEvolution,

}

@Component({
  selector: 'app-lak',
  templateUrl: './lak.component.html',
  styleUrls: ['./lak.component.css']
})

export class LakComponent implements OnInit {
    page: ArticleAuthorPage;

    authorMeasureList: GraphMeasureDO[] = [];
    articleMeasureList: GraphMeasureDO[] = [];

    constructor(private _graphMeasureService: GraphMeasureService) {
        this.page = ArticleAuthorPage.Graph;
    }

    isGraphPage(): boolean {
        return this.page === ArticleAuthorPage.Graph;
    }
    goToGraphPage() {
        this.page = ArticleAuthorPage.Graph;
    }

    isAuthorsPage(): boolean {
        return this.page === ArticleAuthorPage.Authors;
    }
    goToAuthorsPage() {
        this.page = ArticleAuthorPage.Authors;
    }

    isArticlesPage(): boolean {
        return this.page === ArticleAuthorPage.Articles;
    }
    goToArticlesPage() {
        this.page = ArticleAuthorPage.Articles;
    }
    isTopicsPage(): boolean {
        return this.page === ArticleAuthorPage.Topics;
    }
    goToTopicsPage() {
        this.page = ArticleAuthorPage.Topics;
    }
    isTopicEvolutionPage(): boolean {
        return this.page === ArticleAuthorPage.TopicEvolution;
    }
    goToTopicEvolutionPage() {
        this.page = ArticleAuthorPage.TopicEvolution;
    }

    ngOnInit() {
        this._graphMeasureService.getLakMesures().subscribe((measureList: GraphMeasureDO[]) => {
            this.authorMeasureList = _.filter(measureList, (measure) => { return measure.nodeType === "Author" });
            this.articleMeasureList = _.filter(measureList, (measure) => { return measure.nodeType === "Article" });
        }, (err: any) => {
        });
    }
}