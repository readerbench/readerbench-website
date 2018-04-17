import { ReaderbenchService } from "../../readerbench.service";
import * as _ from 'underscore';

var rbUtils: ReaderbenchService = new ReaderbenchService();

export abstract class DemoDO {
    protected abstract getPrimitivePropertyKeys(): string[];

    protected getObjectPropertyEnsureUndefined(object: Object, propertyName: string): Object {
        if (rbUtils.isUndefinedOrNull(object) || rbUtils.isUndefinedOrNull(object[propertyName])) {
            return null;
        }
        return object[propertyName];
    }
    public buildFromObject(object: Object) {
        if (rbUtils.isUndefinedOrNull(object)) {
            return;
        }
        var primitiveProperties: string[] = this.getPrimitivePropertyKeys();
        primitiveProperties.forEach((property: string) => {
            if (object.hasOwnProperty(property)) {
                this[property] = object[property];
            }
        });
    }
    protected forEachElementOf(list: any, iteratee: { (element: Object): void; }) {
        if (!_.isArray(list)) {
            return;
        }
        list.forEach((element: Object) => {
            iteratee(element);
        });
    }
}