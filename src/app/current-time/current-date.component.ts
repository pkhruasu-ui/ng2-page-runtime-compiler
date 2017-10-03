import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'current-date',
	template: '<div>{{date}}</div>'
})
export class CurrentDateComponent implements OnInit {
	date:any;
	constructor(){}

	ngOnInit(){
		console.log('triggered');
		this.date = new Date();
	}
}