import { CMSentenceDO } from "../service/data-objects/CMSentenceDO";

export enum CIModelTabType {
    Sentence,
    Hitmap,
    ScoresTable,
    LandscapeModel
}

export class CIModelTab {
    selected: boolean;
    title: string;
    type: CIModelTabType;
    sentence?: CMSentenceDO;

    constructor(title, type: CIModelTabType, sentence?: CMSentenceDO) {
        this.selected = false;
        this.title = title;
        this.type = type;
        this.sentence = sentence;
    }

    public isSentence(): boolean {
        return this.type === CIModelTabType.Sentence;
    }

    public isHitmap(): boolean {
        return this.type === CIModelTabType.Hitmap;
    }

    public isScoresTable(): boolean {
        return this.type === CIModelTabType.ScoresTable;
    }

    public isLandcapeModel(): boolean{
        return this.type === CIModelTabType.LandscapeModel;
    }
}