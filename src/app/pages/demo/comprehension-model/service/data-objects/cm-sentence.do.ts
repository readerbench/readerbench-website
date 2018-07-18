import { BaseDO, TwoModeGraph } from '@reader-bench/common';

export class CMSentence extends BaseDO {
  index: number;
  text: string;
  graph: TwoModeGraph;


  protected getPrimitivePropertyKeys(): string[] {
    return ['index', 'text'];
  }

  public buildFromObject(object: Object) {
    super.buildFromObject(object);

    this.graph = new TwoModeGraph();
    this.graph.buildFromObject(this.getObjectPropertyEnsureUndefined(object, 'graph'));
  }
}
