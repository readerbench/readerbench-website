import { Injectable, Inject } from '@angular/core';
import { RbUtils } from './RbUtils';
export { RbError } from './responses/RbError';
import { IToaster } from './toaster/IToaster';

@Injectable()
export class AppContext {
    public rbUtils: RbUtils;

    constructor(
        @Inject(IToaster) public toaster: IToaster
    ) {
        this.rbUtils = new RbUtils();
    }
}