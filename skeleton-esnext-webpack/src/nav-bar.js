import { Router } from 'aurelia-router';
import {bindable, inject} from 'aurelia-framework';

@inject(Router)
export class NavBar {    
    @bindable router = null;
    
    constructor(router) {
        this.router = router;
    }
}