import { Injectable } from '@angular/core';
import { CMResult } from './data-objects/cm-result.do';
import { CMSentence } from './data-objects/cm-sentence.do';
import { EBWord } from './models/eb-word.model';
import { EBEdge } from './models/eb-edge.model';
import { EBResult } from './models/eb-result.model';
import { TwoModeGraphNode } from '../../../../../../node_modules/@reader-bench/common';
import * as cloneDeep from 'lodash/cloneDeep';

@Injectable()
export class EdgeBundlingService {

    constructor() {
    }

    private rootParent: EBWord = {
        id: 1,
        name: 'story',
        type: 0
    };

    private data: CMResult;
    private sentenceList: CMSentence[];
    private sentenceWordList: TwoModeGraphNode[][] = [];
    private finalId = this.rootParent.id + 1;

    public setData(result: CMResult) {
        this.data = result;
        this.sentenceList = cloneDeep(result.sentenceList);
        this.parseSentences();
        this.finalId = this.rootParent.id + 1;
    }

    private initialize() {
        this.finalId = this.rootParent.id + 1;
        //this.sentenceWordList = [];
    }

    public getData() {
        return this.data;
    }

    public getCurrentSentence(index: number) {
        return ' ' + this.sentenceList[index].text;
    }

    public getCurrentPhrase(index: number) {
        let phrase: string = '';
        for (let i = 0; i < index; i++) {
            phrase += this.sentenceList[i].text + ' ';
        };
        return phrase;
    }

    public getParsedData(index: number): EBResult {
        this.initialize();

        var result: EBResult = <EBResult>{ words: [], edges: [] };
        result.words.push(this.rootParent);
        result.words = result.words.concat(this.generateParents(index));

        for (let i = 0; i <= index; i++) {
            this.sentenceWordList[i].forEach(node => {
                let word: EBWord = {
                    id: this.finalId++,
                    name: node.displayName,
                    parent: this.generateParentIdForNode(node, i),
                    active: node.active,
                    type: node.type === "TextBased" ? 1 : 2,
                    bold: i === index ? true : false
                };
                result.words.push(word);
            });
        }

        this.sentenceList[index].graph.edgeList.forEach(graphEdge => {
            let edge: EBEdge = {
                source: result.words.find(x => x.name === graphEdge.sourceUri).id,
                target: result.words.find(x => x.name === graphEdge.targetUri).id
            };
            result.edges.push(edge);
        });

        return result;
    }

    private generateParentIdForNode(node: TwoModeGraphNode, index: number): number {
        return node.type === 'TextBased' ? this.getTextBasedParentId(index) : this.getInferredParentId(index);
    }

    private generateParents(index: number): EBWord[] {
        var result: EBWord[] = [];
        for (let i = 0; i <= index; i++) {
            var sentence: EBWord = {
                id: this.finalId++,
                name: 'textBasedSentence' + i,
                parent: 1,
                type: 0
            };
            var inferred: EBWord = {
                id: this.finalId++,
                name: 'inferredSentence' + i,
                parent: sentence.id,
                type: 0
            };
            result.push(sentence, inferred);
        }
        return result;
    }

    private parseSentences() {
        let count = this.data.sentenceList.length;
        this.sentenceWordList.push(this.data.sentenceList[0].graph.nodeList);
        let previousLength = this.sentenceWordList[0].length;

        for (let i = 1; i < count; i++) {
            let tempArray = cloneDeep(this.data.sentenceList[i].graph.nodeList);
            tempArray.splice(0, previousLength);
            this.sentenceWordList.push(tempArray);
            previousLength = this.sentenceList[i].graph.nodeList.length;
        }
    }

    private getTextBasedParentId(index) {
        return index * 2 + 2;
    }

    private getInferredParentId(index) {
        return index * 2 + 3;
    }
}
