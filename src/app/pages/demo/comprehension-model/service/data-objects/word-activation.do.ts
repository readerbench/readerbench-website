import { BaseDO } from '@reader-bench/common';

export class WordActivation extends BaseDO {
  score: number;
  isActive: boolean;

  protected getPrimitivePropertyKeys(): string[] {
    return ['score', 'isActive'];
  }
}
