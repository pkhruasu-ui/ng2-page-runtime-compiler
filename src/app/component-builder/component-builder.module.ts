/**
 * Created by pkhruasuwan on 12/9/16.
 */
// make all parts as one DYNAMIC_DIRECTIVES
// might need forwardRef later

import { NgModule, forwardRef }      from '@angular/core';
import { CommonModule }  from "@angular/common";
import { FormsModule }   from "@angular/forms";
import { RouterModule }                         from '@angular/router';
import { CurrentDateComponent} from '../current-time/current-date.component';

// Whatever component you would use in the dynamic html it should be included here.
export const DYNAMIC_DIRECTIVES = [    
    // forwardRef(() => LoadedImageDirective),
    // forwardRef(() => DefaultImageDirective),  
    // forwardRef(() => PBTooltipDirective)    
    // forwardRef(() => CurrentDateComponent) 
];

@NgModule({
    imports:      [
        CommonModule,
        FormsModule,
        RouterModule        
    ],
    declarations: [
        DYNAMIC_DIRECTIVES
    ],
    exports: [
        DYNAMIC_DIRECTIVES,
        CommonModule,
        FormsModule
    ]
})
export class ComponentBuilderModule {
    // fnc for app module that would return this module    
    static forRoot()
    {
        return {
            ngModule: ComponentBuilderModule,
            providers: [ ], // not used here, but if singleton needed
        };
    }
}
