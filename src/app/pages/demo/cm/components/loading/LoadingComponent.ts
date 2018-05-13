import {Component, Input, Output, EventEmitter} from '@angular/core';

@Component({
	selector: 'loading-component',
    template: `
    <div class="col-xs-12 col-md-12">
		<span class="horizontal-align-center" *ngIf="isLoading">
			<div>
				<img src="../../../../assets/img/loading.gif" alt="Loading..." />
			</div>
        </span>
    </div>
	`
})

export class LoadingComponent {
	@Input() isLoading: boolean;

	constructor() {
		this.isLoading = false;
	}
}