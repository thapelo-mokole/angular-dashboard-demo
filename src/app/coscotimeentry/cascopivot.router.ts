import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CascopivotreportTableComponent } from './coscotimeentry/cascopivotreport-table.component';
const materialWidgetRoutes: Routes = [
  	{ path: 'cascopivotreport', component: CascopivotreportTableComponent ,data: { animation: 'responsive' }}
];
@NgModule({
  imports: [
    RouterModule.forChild(materialWidgetRoutes)
  	],
  exports: [
    RouterModule
  ]
})
export class CascopivotreportRouterModule {}