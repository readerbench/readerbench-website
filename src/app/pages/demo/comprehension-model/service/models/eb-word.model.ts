export class EBWord {
    id: number;
    name: string;
    parent?: number;
    active?: boolean;
    type?: number; // 0 - level, 1 - text based, 2 - inferred
    bold?: boolean; // true for current sentence, false otherwise
}