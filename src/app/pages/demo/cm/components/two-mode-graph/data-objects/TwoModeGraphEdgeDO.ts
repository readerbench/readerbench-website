import {BaseDO} from '../../../base-objects/BaseDO';

export type TwoModeGraphEdgeType =
    "SemanticDistance"
    | "CoAuthorshipDistance"
    | "CoCitationsDistance"
    | "Word"
    | "ParticipantInteraction";

export class TwoModeGraphEdgeDO extends BaseDO {
    edgeType: TwoModeGraphEdgeType;
    score: number;
    sourceUri: string;
    targetUri: string;

    protected getPrimitivePropertyKeys(): string[] {
        return ["edgeType", "score", "sourceUri", "targetUri"];
    }
}