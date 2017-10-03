/**
 * Created by pkhruasuwan on 12/12/16.
 */
import { Component, ComponentFactory, NgModule, Input, Injectable, Compiler, NO_ERRORS_SCHEMA} from '@angular/core';

import { CommonModule }                         from "@angular/common";
import { FormsModule }                          from '@angular/forms';
import { RouterModule }                         from '@angular/router';
import { ComponentBuilderModule }               from './component-builder.module';
import { OtherComponentModule } from '../other-component.module';

export interface IHaveComponentData {
    entity: any;
}

@Injectable()
export class ComponentBuilderService {

    // wee need Component component builder
    constructor(
        protected compiler: Compiler
    ) {}

    // this object is singleton - so we can use this as a cache
    private _cacheOfFactories: {[templateKey: string]: ComponentFactory<IHaveComponentData>} = {};

    public createComponentFactory(template: string): Promise<ComponentFactory<IHaveComponentData>> {

        let factory = this._cacheOfFactories[template];

        if (factory) {
            console.log("Module and Type are returned from cache")

            return new Promise((resolve) => {
                resolve(factory);
            });
        }

        // unknown template ... let's create a Type for it
        let type   = this.createNewComponent(template);
        let module = this.createComponentModule(type);

        return new Promise((resolve) => {
            this.compiler
                .compileModuleAndAllComponentsAsync(module)
                .then((moduleWithFactories) =>
                {
                    let factory = moduleWithFactories.componentFactories.find(factory => {
                        return factory.componentType == type ;
                    })
                    // factory = _.find(moduleWithFactories.componentFactories, { componentType: type });

                    this._cacheOfFactories[template] = factory;

                    // resolve(factory);
                    resolve(factory);
                });
        });
    }

    protected createNewComponent (tmpl:string) {
        @Component({
            selector: 'Component-component',
            template: tmpl
        })
        class CustomComponentComponent  implements IHaveComponentData {
            @Input()  public entity: any;
        };
        // a component for this particular template
        return CustomComponentComponent;
    }
    protected createComponentModule (componentType: any) {
        @NgModule({
            imports: [
                CommonModule,
                FormsModule,
                ComponentBuilderModule,
                // import the shared module here.
                OtherComponentModule
            ],
            declarations: [
                componentType
            ],
            schemas: [ NO_ERRORS_SCHEMA ]
        })
        class RuntimeComponentModule
        {
        }
        // a module for just this Type
        return RuntimeComponentModule;
    }
}


