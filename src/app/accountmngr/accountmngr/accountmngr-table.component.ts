
import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { MatSort, MatPaginator, MatTableDataSource } from '@angular/material';
import { AccountmanagerService } from './../../../../api/accountmngr/accountmanager.service';
import { AccountmanagerElement } from './../../../../api/accountmngr/accountmanager.modal';

import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatSnackBar, MatSnackBarConfig } from '@angular/material';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { OpmangerSelect } from '../../../../api/accountmngr/opmngrSelect.modal';
   
@Component({
  selector: 'cdk-accountmngr-table',
  templateUrl: './accountmngr-table.component.html',
  styleUrls: ['./../../adgroups/adgroup/adgroup-table.component.scss'],
  providers: [AccountmanagerService]
})

export class AccountManagerTableComponent implements OnInit {
  dataSource: any;
  displayedColumns: string[] = ['AcctMngr', 'Active', 'AcctMngrInitials', 'CreateDate','UserID','OpManager', 'update'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(private snackBar: MatSnackBar, private accountmanagerService: AccountmanagerService, public dialog: MatDialog) { }
  ngOnInit() {
    this.getAccountmanagerLists();
  }
  getAccountmanagerLists() {
    const configSuccess = new MatSnackBarConfig();
      configSuccess.panelClass = ['success-snackbar'];
      configSuccess.duration=5000;  
      configSuccess.horizontalPosition = "center";
      configSuccess.verticalPosition = "top";
      const configError = new MatSnackBarConfig();
        configError.panelClass = ['error-snackbar'];
        configError.duration=5000;  
        configError.horizontalPosition = "center";
        configError.verticalPosition = "top";
    this.accountmanagerService.getAccountmanagerList().then(data => { 
      this.snackBar.open("Success","Close", configSuccess);
      this.dataSource = new MatTableDataSource<AccountmanagerElement>(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }).catch(err => {
      this.snackBar.open("Error", "Close", configError);
      console.log("Error " + err.Message)
    })
     
    

  }
  editRow(row) {
    console.log("++++++++++" + row)
  }
  // deleteRow(id: number){
  //   if (confirm('Are you sure to delete this record ?') == true) {
  //       this.studentService.deleteEmployee(id)
  //       .then(x => {
  //         this.getEmployeeLists();
  //       })
  //     }
  // }

  openDialog(row): void {
    if(row == undefined){
      console.log(JSON.stringify(row))
      const dialogRef = this.dialog.open(AccountmngrDialog, {
        width: '450px'
      });

      // dialogRef.afterClosed().pipe(
        
      // ).subscribe(result => {
      //   console.log(JSON.stringify(result))
      //   console.log(`Insert result: ${result}`);
      //   this.dataSource.push(JSON.stringify(result));
      // })
  
      dialogRef.afterClosed().subscribe(result => {
        if(result != undefined){
          this.getAccountmanagerLists();
          // this.dataSource.
        }
        console.log(`Insert result: ${result}`);
      });
    } else {
      console.log(JSON.stringify(row))
      const dialogRef = this.dialog.open(AccountmngrDialog, {
        width: '450px',
        data : { AcctMngr : row.AcctMngr, AcctMngrInitials : row.AcctMngrInitials, Active : row.Active, OpManager : row.OpManager}
      });
  
      dialogRef.afterClosed().subscribe(result => {
        if(result != undefined){
          this.getAccountmanagerLists();
          // this.dataSource.
        }
      });
    }
   
  }
  // openDialog(row): void {
  //   console.log(JSON.stringify(row))
  //   const dialogRef = this.dialog.open(AccountmngrDialog, {
  //     width: '450px',
  //     data: { position: row.position, name: row.name, weight: row.weight, symbol: row.symbol }
  //   });

  //   dialogRef.afterClosed().subscribe(result => {

  //   });
  // }

}


@Component({
  selector: 'accountmngr-dialog',
  templateUrl: 'accountmngr-dialog.html',
  styleUrls: ['./../../adgroups/adgroup/adgroup-table.component.scss'],
  providers: [AccountmanagerService]
})
export class AccountmngrDialog {
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
    public dialogRef: MatDialogRef<AccountmngrDialog>, @Inject(MAT_DIALOG_DATA) public data: AccountmanagerElement, private accountmanagerService: AccountmanagerService,private location : Location) {
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
 
  public onCancel = () => {
    // this.location.back();
  }

  public createOwner = (ownerFormValue) => { 
    // console.log(this.ownerForm.get('AcctMngr').value);
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
        // this.location.back();
        // this.accountmngrList  = data;
        this.dialogRef.close(data);
        // this.toastr.success('New Record Added Succcessfully', 'Employee Register');
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
       // this.location.back();
       // this.accountmngrList  = data;
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

  // onCloseNoClick(): void{
  //   this.dialogRef.close();
  // }
}
