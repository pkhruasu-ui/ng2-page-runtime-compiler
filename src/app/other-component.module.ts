import { NgModule } 		from '@angular/core';
import { CurrentDateComponent } 	from './current-time/current-date.component';

@NgModule({
  declarations: [
    CurrentDateComponent
  ],
  imports: [],
  providers: [
  ],
  exports : [
  	CurrentDateComponent
  ]
})
export class OtherComponentModule { }
