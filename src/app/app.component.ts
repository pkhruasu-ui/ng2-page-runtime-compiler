import { Component, ViewChild, ElementRef, ViewContainerRef, ComponentFactory, OnInit, OnDestroy } from '@angular/core';
import { ComponentBuilderService, IHaveComponentData } from './component-builder/component-builder.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy{
	@ViewChild('dataContainer', { read: ViewContainerRef }) dataContainer : ViewContainerRef;
	componentRef:any;
  title = 'app something';

  tmplString:string = "<h1 class='mb8'>Beautiful content. Responsive.</h1><current-date></current-date>";

  constructor(protected typeBuilder: ComponentBuilderService){}

  ngOnInit(){  	
  	this.convertStaticHtmlToComponent(this.tmplString);
  }

  convertStaticHtmlToComponent(tmpl : string){  	
  	this.typeBuilder.createComponentFactory(tmpl).then(
            (data: ComponentFactory<IHaveComponentData>)  => {
                this.dataContainer.clear();                
                this.componentRef = this.dataContainer.createComponent(data);
            });
  }

  ngOnDestroy(){
  	if(!!this.componentRef) this.componentRef.destroy();
  }
}
