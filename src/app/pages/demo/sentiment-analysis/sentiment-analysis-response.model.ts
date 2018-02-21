import { SentimentAnalysisModel } from "./sentiment-analysis.model";

export class SentimentAnalysisResponseModel {
    constructor(
        public data: SentimentAnalysisModel[],
        public success: boolean,
        public erroMsg: string
    ) { };
}