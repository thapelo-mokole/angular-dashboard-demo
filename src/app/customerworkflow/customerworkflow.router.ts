import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomerworkflowTableComponent } from './customerworkflow/customerworkflow-table.component';
const materialWidgetRoutes: Routes = [
  	{ path: 'custflow', component: CustomerworkflowTableComponent ,data: { animation: 'responsive' }}
];
@NgModule({
  imports: [
    RouterModule.forChild(materialWidgetRoutes)
  	],
  exports: [
    RouterModule
  ]
})
export class CustomerworkflowRouterModule {}