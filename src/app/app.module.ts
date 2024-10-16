import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { CytoscapeComponent } from './components/cytoscape/cytoscape.component';
import { LogicFlowComponent } from './components/logic-flow/logic-flow.component';

@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    CytoscapeComponent,
    LogicFlowComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
