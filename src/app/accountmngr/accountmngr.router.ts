import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccountManagerTableComponent } from './accountmngr/accountmngr-table.component';
const materialWidgetRoutes: Routes = [
  	{ path: 'acctmngr', component: AccountManagerTableComponent ,data: { animation: 'responsive' }}
];
@NgModule({
  imports: [
    RouterModule.forChild(materialWidgetRoutes)
  	],
  exports: [
    RouterModule
  ]
})
export class AcctmngrRouterModule {}