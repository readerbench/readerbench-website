import { BaseDO } from "../../base-objects/BaseDO";
import { WordActivationDO } from "./WordActivationDO";

export class CMWordDO extends BaseDO {
    value: string;
    type: string;
    activationList: WordActivationDO[];

    protected getPrimitivePropertyKeys(): string[] {
        return ["value", "type"];
    }

    public buildFromObject(object: Object) {
        super.buildFromObject(object);

        this.activationList = [];
        this.forEachElementOf(this.getObjectPropertyEnsureUndefined(object, "activationList"), (activationObject: Object) => {
            var act = new WordActivationDO();
            act.buildFromObject(activationObject);
            this.activationList.push(act);
        });
    }

    public isTextBased(): boolean {
        return this.type === 'TextBased';
    }
}