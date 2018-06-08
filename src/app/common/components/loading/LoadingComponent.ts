import {Component, Input, Output, EventEmitter} from '@angular/core';

@Component({
	selector: 'loading-component',
	template: `
		<span class="horizontal-align-center" *ngIf="isLoading">
			<div>
				<img src="img/loading.gif" alt="Loading..." />
			</div>
		</span>
	`
})

export class LoadingComponent {
	@Input() isLoading: boolean;

	constructor() {
		this.isLoading = false;
	}
}