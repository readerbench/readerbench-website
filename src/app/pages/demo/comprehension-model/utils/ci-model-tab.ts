import { CMSentence } from "../service/data-objects/cm-sentence.do";

export enum CIModelTabType {
    Sentence,
    Hitmap,
    ScoresTable,
    LandscapeModel,
    AMoCModel,
}

export class CIModelTab {
    selected: boolean;
    title: string;
    type: CIModelTabType;
    sentence?: CMSentence;

    constructor(title, type: CIModelTabType, sentence?: CMSentence) {
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

    public isLandcapeModel(): boolean {
        return this.type === CIModelTabType.LandscapeModel;
    }

    public isAMoCModel(): boolean {
        return this.type === CIModelTabType.AMoCModel;
    }
}
