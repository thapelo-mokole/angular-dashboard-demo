
import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { MatSort, MatPaginator, MatTableDataSource } from '@angular/material';
import { AccountmanagerService } from './../../../../api/accountmngr/accountmanager.service';
import { AccountmanagerElement } from './../../../../api/accountmngr/accountmanager.modal';

import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { OpmangerSelect } from '../../../../api/accountmngr/opmngrSelect.modal';
@Component({
  selector: 'cdk-cascopivotreport-table',
  templateUrl: './cascopivotreport-table.component.html',
  styleUrls: ['./../../adgroups/adgroup/adgroup-table.component.scss'],
  providers: [AccountmanagerService]
})

export class CascopivotreportTableComponent implements OnInit {
  dataSource: any;
  displayedColumns: string[] = ['ADUserID', 'DistrictID', 'DistrictName', 'SalespersonID', 'update'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(private accountmanagerService: AccountmanagerService, public dialog: MatDialog) { }
  ngOnInit() {
    this.getAccountmanagerLists();
  }
  getAccountmanagerLists() {
    this.accountmanagerService.getAccountmanagerList().then(data => {
      this.dataSource = new MatTableDataSource<AccountmanagerElement>(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })

  }
  editRow(row) {
    console.log("++++++++++" + row)
  }
  

  openDialog(row): void {
    if(row == undefined){
      console.log(JSON.stringify(row))
      const dialogRef = this.dialog.open(CascopivotreportDialog, {
        width: '450px'
      });

      dialogRef.afterClosed().subscribe(result => {
        if(result != undefined){
          this.getAccountmanagerLists();
        }
      });
    } else {
      const dialogRef = this.dialog.open(CascopivotreportDialog, {
        width: '450px',
        data : { AcctMngr : row.AcctMngr, AcctMngrInitials : row.AcctMngrInitials, Active : row.Active, OpManager : row.OpManager}
      });
  
      dialogRef.afterClosed().subscribe(result => {
        if(result != undefined){
          this.getAccountmanagerLists();
        }
      });
    }
   
  }
}

@Component({
  selector: 'cascopivot-dialog',
  templateUrl: 'cascopivotreport-dialog.html',
  styleUrls: ['./../../adgroups/adgroup/adgroup-table.component.scss'],
  providers: [AccountmanagerService]
})
export class CascopivotreportDialog {
  public ownerForm: FormGroup;
  dialogTitle: string;
  saveUpdateFlag: boolean;
  closeFlag: boolean;
  opmngrList: OpmangerSelect[];
  accountmanagerDialogElement:AccountmanagerElement;
  actives = [
    { id : null, value : "Not Set"},
    { id: true, value: "True" },
    { id: false, value: "False" }];
  constructor(
    public dialogRef: MatDialogRef<CascopivotreportDialog>, @Inject(MAT_DIALOG_DATA) public data: AccountmanagerElement, private accountmanagerService: AccountmanagerService,private location : Location) {
      this.accountmanagerService.getOpmnagrselectList().then(data => {
        this.opmngrList = data;
      })
      if(data == null){
        this.dialogTitle = "Account Manager Create";
        this.saveUpdateFlag = false;
        this.closeFlag = false;
        this.ownerForm = new FormGroup({
          AcctMngr: new FormControl('', [Validators.required, Validators.maxLength(100)]),
          AcctMngrInitials: new FormControl('', [ Validators.maxLength(2)]),
          Active: new FormControl(''),
          OPMANAGER: new FormControl('')
        });
      } else {
        this.dialogTitle = "Account Manager Update";
        this.saveUpdateFlag = true;
        this.closeFlag = false;
        this.ownerForm = new FormGroup({
          AcctMngr:new FormControl({value: data.AcctMngr}),
          AcctMngrInitials: new FormControl(data.AcctMngrInitials, [ Validators.maxLength(2)]),
          Active: new FormControl(data.Active),
          OPMANAGER: new FormControl(data.OpManager)
        });

        this.ownerForm.patchValue({AcctMngr : data.AcctMngr, AcctMngrInitials : data.AcctMngrInitials, Active : data.Active, OPMANAGER : data.OpManager})
      }
     
  }
  public hasError = (controlName: string, errorName: string) =>{
    return this.ownerForm.controls[controlName].hasError(errorName);
  }
 
  public onCancel = () => {}

  public createOwner = (ownerFormValue) => {
    if (this.ownerForm.valid && this.saveUpdateFlag == false && this.closeFlag == false) {
      this.executeOwnerCreation(ownerFormValue);
    } else if(this.ownerForm.valid && this.saveUpdateFlag == true && this.closeFlag == false){
      this.executeOwnerUpdate(this.ownerForm.value);
    }
  }
 
  private executeOwnerCreation = (insertFormValue) => {
      let AcctMngrInitials = insertFormValue.AcctMngrInitials == undefined || insertFormValue.AcctMngrInitials == null ? "" : insertFormValue.AcctMngrInitials;
      let customerwork: AccountmanagerElement = {
        AcctMngr: insertFormValue.AcctMngr,
        AcctMngrInitials:  AcctMngrInitials,
        Active: insertFormValue.Active,
        OpManager: insertFormValue.OPMANAGER
      }
      this.accountmanagerService.insertAccountmanagerList(customerwork).then(data => {
        this.dialogRef.close(data);
      }).catch(err => {
        console.log("Error " + err.Message)
      })
  }

  private executeOwnerUpdate = (updateFormValue) => { 
     let AcctMngrInitials = updateFormValue.AcctMngrInitials == undefined || updateFormValue.AcctMngrInitials == null ? "" : updateFormValue.AcctMngrInitials;
     let customerwork: AccountmanagerElement = {
       AcctMngr: updateFormValue.AcctMngr,
       AcctMngrInitials:  AcctMngrInitials,
       Active: updateFormValue.Active,
       OpManager: updateFormValue.OPMANAGER
     } 
     this.accountmanagerService.updateAccountmanagerList(customerwork).then(data => {
       this.dialogRef.close(data);
     }).catch(err => {
       console.log("Error " + err.Message)
     })
  }

  onNoClick(): void {
    console.log("Hello buddy, I'm closed.")
    this.closeFlag = true;
    this.dialogRef.close();
  }

}
