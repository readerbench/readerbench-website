import { BaseDO } from '../../../base-objects/BaseDO';

export type TwoModeGraphNodeType =
    "Author"
    | "Article"
    | "UserQuery"
    | "Word"
    | "Inferred"
    | "TextBased"
    | "Inactive"
    | "Center"
    | "Participant"
    | "CENTRAL"
    | "ACTIVE"
    | "PERIPHERAL";

export class TwoModeGraphNodeDO extends BaseDO {
    type: TwoModeGraphNodeType;
    uri: string;
    displayName: string;
    active: boolean;
    group: number;

    protected getPrimitivePropertyKeys(): string[] {
        return ["type", "uri", "displayName", "active", "group"];
    }
}