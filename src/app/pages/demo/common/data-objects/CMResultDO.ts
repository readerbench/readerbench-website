import { BaseDO } from "../base-objects/BaseDO";
import { WordActivationDO } from "./WordActivationDO";
import { CMSentenceDO } from "./CMSentenceDO";
import { CMWordDO } from "./CMWordDO";


export class CMResultDO extends BaseDO {
    sentenceList: CMSentenceDO[];
    wordList: CMWordDO[];

    protected getPrimitivePropertyKeys(): string[] {
        return [];
    }

    public buildFromObject(object: Object) {
        super.buildFromObject(object);

        this.sentenceList = [];
        this.forEachElementOf(this.getObjectPropertyEnsureUndefined(object, "sentenceList"), (phraseObj: Object) => {
            var sentence = new CMSentenceDO();
            sentence.buildFromObject(phraseObj);
            this.sentenceList.push(sentence);
        });

        this.wordList = [];
        this.forEachElementOf(this.getObjectPropertyEnsureUndefined(object, "wordList"), (wordObj: Object) => {
            var word = new CMWordDO();
            word.buildFromObject(wordObj);
            this.wordList.push(word);
        });
    }

    public getMaxActivationScore(): number {
        var max = 0.0;
        this.wordList.forEach(w => {
            w.activationList.forEach(a => {
                max = Math.max(a.score, max);
            });
        });
        return max;
    }

}