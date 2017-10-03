import { BrowserModule } 	from '@angular/platform-browser';
import { NgModule } 		from '@angular/core';

import { AppComponent } 	from './app.component';
import { ComponentBuilderService } 	from './component-builder/component-builder.service';
import { OtherComponentModule } from './other-component.module';

@NgModule({  
  imports: [
    BrowserModule,
    OtherComponentModule
  ],
  declarations: [
    AppComponent
  ],
  providers: [
	ComponentBuilderService
  ],  
  bootstrap: [AppComponent]
})
export class AppModule { }
