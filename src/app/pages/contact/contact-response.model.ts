export class ContactResponseModel {
    constructor(
        public data: any,
        public success: boolean,
        public errorMsg: string
    ) { };
}