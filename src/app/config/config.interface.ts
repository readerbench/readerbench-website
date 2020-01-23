export interface Config {
    apiProtocol: string;
    apiServer: string;
    apiPort: number;
    apiPath: string;
    testServerPath: string;

    portDelimiter: string;
    pathDelimiter: string;

    apiEndpoints: any;
    apiHeaders: any;

    commonEndpoints: any;

    mailServer: string;
    mailPort: number;
    mailPath: string;
}
