export class RbUtils {
    constructor() {
    }
    public isUndefinedOrNull(object: Object, parameterStack?: string): boolean {
        if (_.isUndefined(object) || _.isNull(object)) {
            return true;
        }
        if (!_.isUndefined(parameterStack) && !_.isNull(parameterStack)) {
            var currentObject = object;
            var parameterStackArray: string[] = parameterStack.split(".");
            for (var i = 0; i < parameterStackArray.length; i++) {
                var param = parameterStackArray[i];
                currentObject = currentObject[param];
                if (_.isUndefined(currentObject) || _.isNull(currentObject)) {
                    return true;
                }
            }
        }
        return false;
    }
    public roundNumberToTwoDecimals(inputNumber: number): number {
		if (this.isUndefinedOrNull(inputNumber) || !_.isNumber(inputNumber)) {
			return inputNumber;
		}
		return Math.round(inputNumber * 100) / 100;
	}
    public getObjectValueByPropertyStack(object: Object, parameterStack: string): any {
		if (this.isUndefinedOrNull(object, parameterStack)) {
			return null;
		}
		var currentObject = object;
		var parameterStackArray: string[] = parameterStack.split(".");
		for (var i = 0; i < parameterStackArray.length; i++) {
			var param = parameterStackArray[i];
			currentObject = currentObject[param];
		}
		return currentObject;
	}
}