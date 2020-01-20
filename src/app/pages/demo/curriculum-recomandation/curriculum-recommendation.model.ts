import { CurriculumRecommendationValenceModel } from './curriculum-recommendation-valence.model';

export class CurriculumRecommendationModel {
    constructor(
        public text: string,
        public valences: CurriculumRecommendationValenceModel[],
    ) { }
}
