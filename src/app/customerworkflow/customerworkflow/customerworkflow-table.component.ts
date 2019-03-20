
import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { MatSort, MatPaginator, MatTableDataSource } from '@angular/material';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomerworkflowService } from './../../../../api/customerworkflow/customerworkflow.service';
import { CustomerworkflowElement } from './../../../../api/customerworkflow/customerworkflow.modal';
import { AccountMngrList } from './../../../../api/customerworkflow/accountmngerSelect.modal';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Location } from '@angular/common';
import { RouterLinkActive } from '@angular/router';
@Component({
  selector: 'cdk-customerworkflow-table',
  templateUrl: './customerworkflow-table.component.html',
  styleUrls: ['./../../adgroups/adgroup/adgroup-table.component.scss'],
  providers: [CustomerworkflowService]
})
export class CustomerworkflowTableComponent implements OnInit {
  searchCustname: string;
  searchAcctMngr: string;
  dataSource: any;
  
  displayedColumns: string[] = ['CustNbr', 'CustomerName', 'EMAILGROUP', 'GROUPMEMBERS', 'ACCTMNGR', 'update'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(private customerflowService: CustomerworkflowService, public dialog: MatDialog) { }
  ngOnInit() {
    this.searchCustname = "";
    this.searchAcctMngr = "";
    this.getCustomerLists();
  }
  editRow(row) {
    console.log("++++++++++" + row)
  }


  getCustomerLists() {
    this.customerflowService.getCustomerflowList(this.searchCustname, this.searchAcctMngr).then(data => {

      this.dataSource = new MatTableDataSource<CustomerworkflowElement>(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

  searchData() {
    this.searchCustname = this.searchCustname == undefined || this.searchCustname == null ? "" : this.searchCustname.trim();
    this.searchAcctMngr = this.searchAcctMngr == undefined || this.searchAcctMngr == null ? "" : this.searchAcctMngr.trim();
    this.getCustomerLists();
  }

  resetData() {
    this.searchCustname = "";
    this.searchAcctMngr = "";
    this.getCustomerLists();
  }


  openDialog(row): void {
    if(row == undefined){
      const dialogRef = this.dialog.open(CustomerworkflowDialog, {
        width: '450px'
      });
      dialogRef.afterClosed().subscribe(result => {
        this.getCustomerLists();
      });
    } else { 
      console.log(JSON.stringify(row))
      const dialogRef = this.dialog.open(CustomerworkflowDialog, {
        width: '450px',
        data : { CustNbr : row.CustNbr, CustomerName : row.CustomerName, EMAILGROUP : row.EMAILGROUP, 
          GROUPMEMBERS : row.GROUPMEMBERS, ACCTMNGR : row.ACCTMNGR}
      });
      dialogRef.afterClosed().subscribe(result => {
        this.getCustomerLists();
      });
    }
  }

}


@Component({
  selector: 'customerworkflow-dialog',
  templateUrl: 'customerworkflow-dialog.html',
  styleUrls: ['./../../adgroups/adgroup/adgroup-table.component.scss'],
  providers: [CustomerworkflowService]
})

export class CustomerworkflowDialog {
  public ownerForm: FormGroup;
  dialogTitle: string;
  saveUpdateFlag: boolean;
  closeFlag: boolean;
  customerworkflowElement: CustomerworkflowElement;
  accountmngrList: AccountMngrList[];
  constructor(
    public dialogRef: MatDialogRef<CustomerworkflowDialog>, @Inject(MAT_DIALOG_DATA) public data: CustomerworkflowElement, private customerflowService: CustomerworkflowService, private location: Location) {

        this.customerflowService.getAccountflowList().then(data => {
          this.accountmngrList = data;
        })
        if(data == null){
          this.dialogTitle = "Insert Data";
          this.saveUpdateFlag = false;
          this.closeFlag = false;
          this.ownerForm = new FormGroup({
            CustNbr: new FormControl('', [Validators.required, Validators.maxLength(100)]),
            CustomerName: new FormControl('', [Validators.required, Validators.maxLength(100)]),
            EMAILGROUP: new FormControl(),
            GROUPMEMBERS: new FormControl(),
            ACCTMNGR: new FormControl('', [Validators.required]),

          });
        } else {
          this.dialogTitle = "Update Data";
          this.saveUpdateFlag = true;
          this.closeFlag = false;
          // this.accountmanagerDialogElement = data;
          this.ownerForm = new FormGroup({
            CustNbr: new FormControl(data.CustNbr),
            CustomerName: new FormControl(data.CustomerName),
            EMAILGROUP: new FormControl(data.EMAILGROUP),
            GROUPMEMBERS: new FormControl(data.GROUPMEMBERS),
            ACCTMNGR: new FormControl(data.ACCTMNGR),
          });
        }
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.ownerForm.controls[controlName].hasError(errorName);
  }

  public onCancel = () => {
    // this.location.back();
  }

  public createOwner = (ownerFormValue) => {
    if (this.ownerForm.valid && this.saveUpdateFlag == false && this.closeFlag == false) {
      this.executeOwnerCreation(ownerFormValue);
    }  else if(this.ownerForm.valid && this.saveUpdateFlag == true && this.closeFlag == false){
      this.executeOwnerUpdate(ownerFormValue);
    }
  }

  private executeOwnerCreation = (insertFormValue) => {
    let EMAILGROUP = insertFormValue.EMAILGROUP == undefined || insertFormValue.EMAILGROUP == null ? "" : insertFormValue.EMAILGROUP;
    let GROUPMEMBERS = insertFormValue.GROUPMEMBERS == undefined || insertFormValue.GROUPMEMBERS == null ? "" : insertFormValue.GROUPMEMBERS;
    let customerwork: CustomerworkflowElement = {
      "CustNbr": insertFormValue.CustNbr,
      "CustomerName": insertFormValue.CustomerName,
      "EMAILGROUP": EMAILGROUP,
      "GROUPMEMBERS": GROUPMEMBERS,
      "ACCTMNGR": insertFormValue.ACCTMNGR,
      "GroupExt": null,
      "Active": null,
      "UserID": null,
      "LastUpdated": null,
    }

    this.customerflowService.insertCustomerflowList(customerwork).then(data => {
      this.dialogRef.close(data);
    }).catch(err => {
      console.log("Error: ", err.Message)
    }
    )
  }

  private executeOwnerUpdate = (updateFormValue) => {
    let EMAILGROUP = updateFormValue.EMAILGROUP == undefined || updateFormValue.EMAILGROUP == null ? "" : updateFormValue.EMAILGROUP;
    let GROUPMEMBERS = updateFormValue.GROUPMEMBERS == undefined || updateFormValue.GROUPMEMBERS == null ? "" : updateFormValue.GROUPMEMBERS;
    let customerwork: CustomerworkflowElement = {
      "CustNbr": updateFormValue.CustNbr,
      "CustomerName": updateFormValue.CustomerName,
      "EMAILGROUP": EMAILGROUP,
      "GROUPMEMBERS": GROUPMEMBERS,
      "ACCTMNGR": updateFormValue.ACCTMNGR,
      "GroupExt": null,
      "Active": null,
      "UserID": null,
      "LastUpdated": null,
    }

    this.customerflowService.updateCustomerflowList(customerwork).then(data => {
      this.dialogRef.close(data);
      // this.location.back();
      // this.accountmngrList  = data;
      // this.dataSource. 
    }).catch(err => {
      console.log("Error: ", err.Message)
    })

 }
  onNoClick(): void {
    this.closeFlag = true;
    this.dialogRef.close();
  }

}
