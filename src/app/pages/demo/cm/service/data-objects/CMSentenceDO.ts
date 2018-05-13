import { BaseDO } from "../../base-objects/BaseDO";
import { WordActivationDO } from "./WordActivationDO";
import { TwoModeGraphDO } from "../../components/two-mode-graph/data-objects/TwoModeGraphDO";

export class CMSentenceDO extends BaseDO {
    index: number;
    text: string;
    graph: TwoModeGraphDO;


    protected getPrimitivePropertyKeys(): string[] {
        return ["index", "text"];
    }

    public buildFromObject(object: Object) {
        super.buildFromObject(object);

        this.graph = new TwoModeGraphDO();
        this.graph.buildFromObject(this.getObjectPropertyEnsureUndefined(object, "graph"));
    }
}