import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainPageComponent } from "./components/main-page/main-page.component";
import {CytoscapeComponent} from "./components/cytoscape/cytoscape.component";
import {LogicFlowComponent} from "./components/logic-flow/logic-flow.component";

const routes: Routes = [
  {
    path: '',
    component: MainPageComponent,
    title: 'Главная',
  },
  {
    path: 'cytoscape',
    component: CytoscapeComponent,
    title: 'Библиотека cytoscape',
  },
  {
    path: 'logicFlow',
    component: LogicFlowComponent,
    title: 'Библиотека logicFlow',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
