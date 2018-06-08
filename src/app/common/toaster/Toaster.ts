import {Injectable, ComponentRef, ViewContainerRef} from '@angular/core';
import {IToaster} from './IToaster';

@Injectable()
export class Toaster implements IToaster {

    constructor() {
    }

    public error(message: string, title?: string) {
        alert(message);
    }
    public success(message: string, title?: string) {
        alert(message);
    }
    public info(message: string, title?: string) {
        alert(message);
    }
}