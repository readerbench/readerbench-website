import { BaseDO } from '../../../base-objects/BaseDO';
import { TwoModeGraphEdgeDO } from './TwoModeGraphEdgeDO';
import { TwoModeGraphNodeDO } from './TwoModeGraphNodeDO';

export class TwoModeGraphDO extends BaseDO {
    edgeList: TwoModeGraphEdgeDO[];
    nodeList: TwoModeGraphNodeDO[];
    centerUri: string;

    constructor() {
        super();
        this.edgeList = [];
        this.nodeList = [];
        this.centerUri = "";
    }

    protected getPrimitivePropertyKeys(): string[] {
        return [];
    }
    public buildFromObject(object: Object) {
        super.buildFromObject(object);

        this.edgeList = [];
        this.forEachElementOf(this.getObjectPropertyEnsureUndefined(object, "edgeList"), (edgeObject: Object) => {
            var edgeDO = new TwoModeGraphEdgeDO();
            edgeDO.buildFromObject(edgeObject);
            this.edgeList.push(edgeDO);
        });

        this.nodeList = [];
        this.forEachElementOf(this.getObjectPropertyEnsureUndefined(object, "nodeList"), (nodeObject: Object) => {
            var nodeDO = new TwoModeGraphNodeDO();
            nodeDO.buildFromObject(nodeObject);
            if (nodeDO.active === false) {
                nodeDO.type = "Inactive";
            }
            this.nodeList.push(nodeDO);
        });
    }

    public getUsedNodeTypes(): string[] {
        let nodeTypes = {};
        this.nodeList.forEach(node => {
            let type = node.uri === this.centerUri ? "Center" : node.type;
            nodeTypes[type] = true;
        });
        return Object.keys(nodeTypes).sort();
    }
}