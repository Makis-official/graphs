import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { CytoscapeComponent } from './components/cytoscape/cytoscape.component';
import { LogicFlowComponent } from './components/logic-flow/logic-flow.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import {NgOptimizedImage} from "@angular/common";

@NgModule({
    declarations: [
        AppComponent,
        MainPageComponent,
        CytoscapeComponent,
        LogicFlowComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        BrowserAnimationsModule,
        FormsModule,
        NgOptimizedImage,
    ],
    providers: [
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
