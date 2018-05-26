import { BaseDO } from "../../../base-objects/BaseDO";

export class WordDO extends BaseDO {
    value: string;
    type: string;
    scoreList: number[];

    protected getPrimitivePropertyKeys(): string[] {
        return ["value", "type", "scoreList"];
    }

    public isTextBased(): boolean {
        return this.type === 'TextBased';
    }
}