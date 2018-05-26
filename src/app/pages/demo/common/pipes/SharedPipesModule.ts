import { NgModule } from '@angular/core';
import { ApproximationPipe } from './ApproximationPipe';

const SharedPipes = [
    ApproximationPipe
];
@NgModule({
    declarations: [SharedPipes],
    exports: [SharedPipes]
})
export class SharedPipesModule { }