export interface Config {
    apiProtocol: string;
    apiServer: string;
    apiPort: number;
    apiPath: string;

    portDelimiter: string;
    pathDelimiter: string;

    apiEndpoints: any;
    apiHeaders: any;

    commonEndpoints: any;
}
