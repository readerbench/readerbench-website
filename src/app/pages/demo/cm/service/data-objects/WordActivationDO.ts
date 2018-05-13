import { BaseDO } from "../../base-objects/BaseDO";

export class WordActivationDO extends BaseDO {
    score: number;
    isActive: boolean;

    protected getPrimitivePropertyKeys(): string[] {
        return ["score", "isActive"];
    }
}