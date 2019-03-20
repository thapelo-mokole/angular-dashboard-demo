import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdgroupsTableComponent } from './adgroup/adgroup-table.component';
const materialWidgetRoutes: Routes = [
  	{ path: 'adgroups', component: AdgroupsTableComponent ,data: { animation: 'responsive' }}
];
@NgModule({
  imports: [
    RouterModule.forChild(materialWidgetRoutes)
  	],
  exports: [
    RouterModule
  ]
})
export class AdgroupsRouterModule {}