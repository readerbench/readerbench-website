import { Injectable } from '@angular/core';
import { CMResult } from './data-objects/cm-result.do';
import { CMSentence } from './data-objects/cm-sentence.do';
import { EBWord } from './models/eb-word.model';
import { EBEdge } from './models/eb-edge.model';
import { EBResult } from './models/eb-result.model';
import { TwoModeGraphNode, TwoModeGraph } from '../../../../../../node_modules/@reader-bench/common';
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
        // this.sentenceWordList = [];
    }

    public getData() {
        return this.data;
    }

    public getSentenceGraph(index: number): TwoModeGraph {
        if (index > -1) {
            return this.data.sentenceList[index].graph;
        } else {
            return null;
        }
    }

    public getCurrentSentence(index: number): string {
        return ' ' + this.sentenceList[index].text;
    }

    public getCurrentPhrase(index: number): string {
        let phrase = '';
        for (let i = 0; i < index; i++) {
            phrase += this.sentenceList[i].text + ' ';
        }
        return phrase;
    }

    public getParsedData(index: number): EBResult {
        this.initialize();

        const result: EBResult = <EBResult>{ words: [], edges: [] };
        result.words.push(this.rootParent);
        result.words = result.words.concat(this.generateParents(index));

        for (let i = 0; i <= index; i++) {
            this.sentenceWordList[i].forEach(node => {
                const word: EBWord = {
                    id: this.finalId++,
                    name: node.displayName,
                    parent: this.generateParentIdForNode(node, i),
                    active: node.active,
                    type: node.type === 'TextBased' ? 1 : 2,
                    bold: i === index ? true : false
                };
                result.words.push(word);
            });
        }

        this.sentenceList[index].graph.edgeList.forEach(graphEdge => {
            const source = result.words.find(x => x.name === graphEdge.sourceUri);
            const target = result.words.find(x => x.name === graphEdge.targetUri);
            if (source && target) {
                const edge: EBEdge = {
                    source: source.id,
                    target: target.id,
                    type: graphEdge.edgeType === 'SemanticDistance' ? 1 : 0
                };
                result.edges.push(edge);
            }
        });

        return result;
    }

    private generateParentIdForNode(node: TwoModeGraphNode, index: number): number {
        return node.type === 'TextBased' ? this.getTextBasedParentId(index) : this.getInferredParentId(index);
    }

    private generateParents(index: number): EBWord[] {
        const result: EBWord[] = [];
        for (let i = 0; i <= index; i++) {
            const sentence: EBWord = {
                id: this.finalId++,
                name: 'textBasedSentence' + i,
                parent: 1,
                type: 0
            };
            const inferred: EBWord = {
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
        const count = this.data.sentenceList.length;
        this.sentenceWordList.push(this.data.sentenceList[0].graph.nodeList);
        let previousLength = this.sentenceWordList[0].length;

        for (let i = 1; i < count; i++) {
            const tempArray = cloneDeep(this.data.sentenceList[i].graph.nodeList);
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
