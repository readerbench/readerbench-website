import { BaseDO } from '@reader-bench/common';
import { CMSentence } from './cm-sentence.do';
import { CMWord } from './cm-word.do';

export class CMResult extends BaseDO {
  sentenceList: CMSentence[];
  wordList: CMWord[];

  protected getPrimitivePropertyKeys(): string[] {
    return [];
  }

  public buildFromObject(object: Object) {
    super.buildFromObject(object);

    this.sentenceList = [];
    this.forEachElementOf(this.getObjectPropertyEnsureUndefined(object, 'sentenceList'), (phraseObj: Object) => {
      const sentence = new CMSentence();
      sentence.buildFromObject(phraseObj);
      this.sentenceList.push(sentence);
    });

    this.wordList = [];
    this.forEachElementOf(this.getObjectPropertyEnsureUndefined(object, 'wordList'), (wordObj: Object) => {
      const word = new CMWord();
      word.buildFromObject(wordObj);
      this.wordList.push(word);
    });
  }

  public getMaxActivationScore(): number {
    let max = 0.0;
    this.wordList.forEach(w => {
      w.activationList.forEach(a => {
        max = Math.max(a.score, max);
      });
    });
    return max;
  }

}
