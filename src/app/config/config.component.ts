import { Component } from '@angular/core';
import { ConfigService } from './config.service';
import { Config } from './config.interface';

@Component({
    // selector: 'app-demo-sentiment-analysis',
    // templateUrl: './sentiment-analysis.component.html',
    // styleUrls: ['./sentiment-analysis.component.css'],
    // providers: [ApiRequestService]
})

export class ConfigComponent {

    private config: Config;
    private error: string;
    private headers: any;

    constructor(private configService: ConfigService) { }

    public getConfig(): Config {
        return this.config;
    }

    public getError(): string {
        return this.error;
    }

    public getHeaders(): any {
        return this.headers;
    }

    public readConfig() {
        this.configService.getConfig()
            .subscribe(
                (data: Config) => this.config = data, // success path
                error => this.error = error // error path
            );
    }

    public readConfigResponse() {
        this.configService.getConfigResponse()
            // resp is of type `HttpResponse<Config>`
            .subscribe(
                resp => {
                    // display its headers
                    const keys = resp.headers.keys();
                    this.headers = keys.map(key =>
                        `${key}: ${resp.headers.get(key)}`);
                    // access the body directly, which is typed as `Config`.
                    this.config = resp.body;
                }, // success path
                error => this.error = error // error path
            );
    }

}