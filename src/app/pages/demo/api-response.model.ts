export class ApiResponseModel {
    constructor(
        public data: any,
        public success: boolean,
        public errorMsg: string
    ) { }
}
