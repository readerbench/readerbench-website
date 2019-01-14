import { SentimentAnalysisValenceModel } from './sentiment-analysis-valence.model';

export class SentimentAnalysisModel {
    constructor(
        public text: string,
        public valences: SentimentAnalysisValenceModel[],
    ) { }
}
