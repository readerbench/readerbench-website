import { BaseDO } from '../../../base-objects/BaseDO';

export class HierarchicalEdgeBundlingDO extends BaseDO {
    name: string;
    size: number;
    imports: string[];

    constructor() {
        super();
        this.name = "";
        this.size = 0;
        this.imports = [];
    }

    protected getPrimitivePropertyKeys(): string[] {
        return [];
    }
    
}