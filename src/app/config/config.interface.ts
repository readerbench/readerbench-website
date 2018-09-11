export interface Config {
    apiServer: string;
    apiPort: number;
    apiPath: string;
    pathDelimiter: string;

    apiEndpoints: any;
    apiHeaders: any;

    commonEndpoints: any;
}