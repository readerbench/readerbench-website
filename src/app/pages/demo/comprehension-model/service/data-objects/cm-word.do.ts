import { BaseDO } from '@reader-bench/common';
import { WordActivation } from './word-activation.do';

export class CMWord extends BaseDO {
  value: string;
  type: string;
  activationList: WordActivation[];

  protected getPrimitivePropertyKeys(): string[] {
    return ['value', 'type'];
  }

  public buildFromObject(object: Object) {
    super.buildFromObject(object);

    this.activationList = [];
    this.forEachElementOf(this.getObjectPropertyEnsureUndefined(object, 'activationList'), (activationObject: Object) => {
      const act = new WordActivation();
      act.buildFromObject(activationObject);
      this.activationList.push(act);
    });
  }

  public isTextBased(): boolean {
    return this.type === 'TextBased';
  }
}
