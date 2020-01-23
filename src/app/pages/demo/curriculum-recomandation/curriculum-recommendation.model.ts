export class CurriculumRecommendationModel {
    constructor(
        public response: {
            data: {
                lessons: any[];
                prerequisites: any[];
                postrequisites: any[];
                recommended: any[];
                time: number;
                cmePoints: number;

            },
            success: boolean;
            errorMsg: string;
        }
            ) {}
}
