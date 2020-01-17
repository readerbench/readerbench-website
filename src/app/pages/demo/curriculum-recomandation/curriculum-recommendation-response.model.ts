import { CurriculumRecommendationModel } from './curriculum-recommendation.model';

export class CurriculumRecommendationResponseModel {
    constructor(
        public data: CurriculumRecommendationModel[],
        public success: boolean,
        public erroMsg: string
    ) { }
}
