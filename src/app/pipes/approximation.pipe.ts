import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'approx'
})
export class ApproximationPipe implements PipeTransform {
    transform(value: number): any {
        if (!value) {
            return value;
        }
        return value.toFixed(2);
    }
}
