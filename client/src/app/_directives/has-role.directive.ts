/**
 * File: has-role.directive.ts
 * File Created: 02/05/2018
 * Author: annguyen
 * Description: Structural directive used to display controls according to user role. This directive
 * listen to userChanged event of the authService to display/hide the host element.
 * Reference: https://angular.io/guide/structural-directives#unless
 */

import { Directive, Input, ElementRef, Renderer2, TemplateRef, ViewContainerRef } from '@angular/core';
import { AuthService } from '../_services/auth.service';

@Directive({
    selector: '[appHasRole]'
})
export class HasRoleDirective {
    hasView: boolean = false;
    @Input('appHasRole') role: string;

    constructor(private templateRef: TemplateRef<any>, private viewContainer: ViewContainerRef,
        private authService: AuthService) {        
        this.authService.userChanged.subscribe(user => {
            this.refresh(user);
        });
    }

    ngOnInit() {
        this.refresh(this.authService.currentUser);
    }

    refresh(user) {
        if (user != null && user.role === this.role && !this.hasView) {
            this.viewContainer.createEmbeddedView(this.templateRef);
            this.hasView = true; 
        } else {
            this.viewContainer.clear();
            this.hasView = false;
        }
    }
}
