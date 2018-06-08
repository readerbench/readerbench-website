import {Injectable, Inject} from '@angular/core';
import {IRbHttp} from './http/IRbHttp';
import {RbUtils} from './RbUtils';
import {RbServerApi} from './http/RbServerApi';
export {RbServerApi} from './http/RbServerApi';
export {RbError} from './responses/RbError';
import {IToaster} from './toaster/IToaster';

@Injectable()
export class AppContext {
    public rbUtils: RbUtils;

    constructor(
        @Inject(IRbHttp) public thHttp: IRbHttp,
        @Inject(IToaster) public toaster: IToaster
    ) {
        this.rbUtils = new RbUtils();
    }
}