

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpModule } from '@angular/http';
import { CustomerworkflowTableComponent, CustomerworkflowDialog } from './customerworkflow/customerworkflow-table.component';
import { CustomerworkflowRouterModule } from './customerworkflow.router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import {MatSelectModule} from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatStepperModule } from '@angular/material/stepper';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule,MatDialogModule } from '@angular/material';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule,
         MatSortModule,
         MatCheckboxModule,
         MatTooltipModule,
         MatChipsModule,
         MatButtonToggleModule } from '@angular/material';
import * as hljs from 'highlight.js';
import { HighlightJsModule, HIGHLIGHT_JS } from 'angular-highlight-js';
import * as hljsTypescript from 'highlight.js/lib/languages/typescript';

import {CustomerworkflowService} from './../../../api/customerworkflow/customerworkflow.service';
import {WebApi} from './../../../api/api.constant';
export function highlightJsFactory(): any {
  hljs.registerLanguage('typescript', hljsTypescript);
  return hljs;
}
@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    FlexLayoutModule,
    MatButtonModule,
    MatIconModule,
    MatTabsModule,
    MatToolbarModule,
    MatListModule,
    MatStepperModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatExpansionModule,
    MatDatepickerModule,
    MatSelectModule,
    MatNativeDateModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatCheckboxModule,
    MatTooltipModule,
    MatChipsModule,
    MatButtonToggleModule,
    HighlightJsModule.forRoot({
      provide: HIGHLIGHT_JS,
      useFactory: highlightJsFactory
    }),
    CustomerworkflowRouterModule
  ],
  entryComponents: [CustomerworkflowDialog],
  declarations: [
    CustomerworkflowTableComponent,
    CustomerworkflowDialog
],
  exports: [
    MatDialogModule
  ],
  providers: [
    { provide: 'customerworkflowService', useClass: CustomerworkflowService },
    { provide: 'serverApi', useClass: WebApi} 
  ]
})
export class CustomerworkflowModule { }