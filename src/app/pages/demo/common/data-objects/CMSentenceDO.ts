import { BaseDO } from "../base-objects/BaseDO";
import { WordActivationDO } from "./WordActivationDO";
import { TwoModeGraph } from "@reader-bench/common";

export class CMSentenceDO extends BaseDO {
    index: number;
    text: string;
    graph: TwoModeGraph;

    protected getPrimitivePropertyKeys(): string[] {
        return ["index", "text"];
    }

    public buildFromObject(object: Object): TwoModeGraph {
        super.buildFromObject(object);

        this.graph = new TwoModeGraph();
        this.graph.buildFromObject(this.getObjectPropertyEnsureUndefined(object, "graph"));

        return this.graph;
    }
}