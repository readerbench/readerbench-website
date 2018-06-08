import {BaseDO} from '../../../../../../common/base-objects/BaseDO';
import {RbUtils} from '../../../../../../common/RbUtils';

"Author"

export type NodeType =
    "Author"
    | "Article";

export class GraphMeasureDO extends BaseDO {
    name: string;
    betwenness: number;
    eccentricity: number;
    closeness: number;
    degree: number;
    uri: string;
    nodeType: NodeType;
    noOfReferences: number;

    protected getPrimitivePropertyKeys(): string[] {
        return ["name", "betwenness", "eccentricity", "closeness", "degree", "uri", "nodeType", "noOfReferences"];
    }

    public buildFromObject(object: Object) {
		super.buildFromObject(object);
        var rbUtils = new RbUtils();
        
        this.betwenness = rbUtils.roundNumberToTwoDecimals(this.betwenness);
        this.eccentricity = rbUtils.roundNumberToTwoDecimals(this.eccentricity);
        this.closeness = rbUtils.roundNumberToTwoDecimals(this.closeness);
    }
}