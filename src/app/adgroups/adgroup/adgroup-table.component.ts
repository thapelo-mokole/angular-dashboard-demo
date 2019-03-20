import { Component, OnInit, ViewEncapsulation, Input, Output, EventEmitter, ViewChild, Injectable, Inject, ɵConsole } from '@angular/core';
import { MatSort, MatPaginator, MatTableDataSource } from '@angular/material';
import { AdgroupsService } from './../../../../api/adgroups/adgroup.service';
import { AdgroupsElement } from './../../../../api/adgroups/adgroup.modal';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatSnackBar, MatSnackBarConfig } from '@angular/material';
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { animate, state, style, transition, trigger } from '@angular/animations'; //for nested table
import { AdgroupsDialogElement } from '../../../../api/adgroups/adgroupview.modal';
import { SelectionModel } from '@angular/cdk/collections';
import { AccountmanagerElement } from '../../../../api/accountmngr/accountmanager.modal';


//=================================================================================================
// Parent 
@Component({
  selector: 'cdk-adgroup-table',
  templateUrl: './adgroup-table.component.html',
  styles: [
    `.detail-table {display: flex;flex-direction: column;display: block;margin: 10px;width: 100%;}
      .expand-icon {color: rgba(0,0,0,.44);font-size: 12px; margin-right: 5px; cursor: pointer;}`
  ],

  styleUrls: ['./adgroup-table.component.scss'],
  providers: [AdgroupsService],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0', visibility: 'hidden' })),
      state('expanded', style({ height: '*', visibility: 'visible' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class AdgroupsTableComponent implements OnInit {

  dataSource: any;
  dataSource2: any;
  searchADUser: string;
  searchDisplayName: string;
  searchSKUNAME: string;
  searchEmail: string;
  displayedColumns: string[] = ['details', 'ISACTIVE', 'IMAGE', 'NAME', 'SKUNAME', 'DATE', 'ACTION', 'DOWNLOADFILE'];

  columnsToDisplay = ['select', 'SEQUENCE', 'KEY', 'VALUE', 'ACTION'];

  bulkselectdel: Array<{ name: string }> = [];


  selection = new SelectionModel<AdgroupsElement>(true, []);

  newData: string;
  expandedElement: Array<AdgroupsDialogElement>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  configSuccess: any;
  configError: any;
  constructor(private snackBar: MatSnackBar, private adgroupsService: AdgroupsService, public dialog: MatDialog) {
    this.configSuccess = new MatSnackBarConfig();
    this.configSuccess.panelClass = ['success-snackbar'];
    this.configSuccess.duration = 5000;
    this.configSuccess.horizontalPosition = "center";
    this.configSuccess.verticalPosition = "top";
    this.configError = new MatSnackBarConfig();
    this.configError.panelClass = ['error-snackbar'];
    this.configError.duration = 5000;
    this.configError.horizontalPosition = "center";
    this.configError.verticalPosition = "top";
  }
  ngOnInit() {
    this.searchSKUNAME = "";
    this.getAdgroupLists();
  }

  getAdgroupLists() {
    this.adgroupsService.getAdgroupsList().then(data => {
      this.dataSource = new MatTableDataSource<AdgroupsElement>(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }).catch(err => {
      this.snackBar.open("Error", "Close", this.configError);
    })
  }

  // for check box
  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource2.length;
    return numSelected === numRows;
  }
  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource2.forEach(row => {
        this.selection.select(row);
      });
  }

  private selectRow($event, dataSource2) {
    // console.log($event.checked);
    if ($event.checked) {
      this.bulkselectdel.push({
        name: dataSource2.VALUE
      });
      console.log(this.bulkselectdel);
    }
  }

  isActiveToggle(element, index) {
    this.adgroupsService.updateActiveList(element).then(data => {
      this.dataSource[index] = data;
    }).catch(err => {
      this.snackBar.open("Error", "Close", this.configError);
    })
  }

  ondownload(element, index) {
    //Download File 
    var rNAME = element.F_NAME;
    window.open('http://localhost:2002/uploads/' + rNAME, "_self")
    // window.open('http://localhost:2002/v1/user/name/' + element._id, "_blank")
  }

  OpenWebsite(element, index) {
    var rWebsite = element.PATH;
    window.open(rWebsite, "_new")
  }

  toggleview(row) {
    if (this.expandedElement == row) {
      this.expandedElement = null;
    } else {
      this.expandedElement = row;
      this.selection.clear();
      this.dataSource2 = new MatTableDataSource<AccountmanagerElement>(row.KEYWORD);
    }
  }

  resetData() {
    this.searchSKUNAME = "";
    this.getAdgroupLists();
  }

  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim();
  }

  openDialog(row, id): void {
    if (row == undefined) {
      const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
        width: '50%',
        height: '50%'
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result.status) {
          const dataView = result.data;
          this.dataSource.data.unshift(dataView);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        }
      });
    } else {
      if (id == 2) {
        const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
          width: '50%',
          height: '50%',
          data: { ID: row._id, NAME: row.NAME, SKUNAME: row.SKUNAME, ACTIVE: row.ISACTIVE, IMAGE_URL: row.IMAGE_URL, PATH: row.PATH, ACTIONTYPE: 'Update' }
        });
        dialogRef.afterClosed().subscribe(result => {
          if (result != undefined) {
            this.getAdgroupLists();
          }
        });
      } else if (id == 3) {
        const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
          width: '50%',
          height: '50%',
          data: { ID: row._id, NAME: row.NAME, SKUNAME: row.SKUNAME, ACTIVE: row.ISACTIVE, ACTIONTYPE: 'Delete' }
        });
        dialogRef.afterClosed().subscribe(result => {
          this.getAdgroupLists();
        });
      }
    }
  }

  openchildDialog(row, id, element): void {

    if (id == 0) {
      const dialogRef = this.dialog.open(ChildSetupDialog, {
        width: '450px',
        data: {
          NO: "", KEY: "", VALUE: "", mainId: element, Action: 0
        }
      });
      dialogRef.afterClosed().subscribe(result => {
        debugger
        if (result.status) {
          this.dataSource2 = result.data.KEYWORD;
          // this.dataSource2.paginator = this.paginator;
        }
      });
    }
    else {
      switch (id) {
        case 1: {
          const dialogRef = this.dialog.open(ChildSetupDialog, {
            width: '450px',
            data: {
              _id: row._id, KEY: row.KEY, VALUE: row.VALUE, mainId: element, Action: 1
            }
          });

          dialogRef.afterClosed().subscribe(result => {
            if (result != undefined) {
              const index = this.dataSource2.data.findIndex(i => i._id === row._id);
              if (index > -1) {
                this.dataSource2.data[index] = result.data.KEYWORD[index];
                // this.dataSource2.paginator = this.paginator;
              }
            }
          });
        }
          break;
        case 2: {

          const dialogRef = this.dialog.open(ChildSetupDialog, {
            width: '450px',
            data: {
              _id: row._id, VALUE: row.VALUE, mainId: element, Action: 2
            }
          });
          dialogRef.afterClosed().subscribe(result => {
            if (result != undefined) {
              const index = this.dataSource2.data.findIndex(i => i._id === row._id);
              if (index > -1) {
                this.dataSource2.data.splice(index, 1);
                // this.dataSource2.paginator = this.paginator;
              }
            }
            // this.getAdgroupLists();

          });
        }
          break;
      }
    }
  }
}


@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'dialog-overview.html',
  styleUrls: ['./adgroup-table.component.scss'],
  providers: [AdgroupsService]
})
export class DialogOverviewExampleDialog {
  dialogTitle: string;
  saveUpdateFlag: string;
  closeFlag: boolean;
  ownerForm: FormGroup;
  privatekey: string;
  privatesku: string;

  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>, @Inject(MAT_DIALOG_DATA) public data: AdgroupsElement, private adgroupsService: AdgroupsService) {
    if (data == null) {
      this.dialogTitle = "Create";
      this.saveUpdateFlag = "insert";
      this.closeFlag = false;
      this.ownerForm = new FormGroup({
        NAME: new FormControl('', [Validators.required, Validators.maxLength(255)]),
        SKUNAME: new FormControl('', [Validators.required, Validators.maxLength(100)]),
        FILE: new FormControl('', [Validators.required]),
        IMAGE_URL: new FormControl(''),
        PATH: new FormControl('')
      });

    } else {
      if (data.ACTIONTYPE == "Update") {

        this.dialogTitle = "Update";
        this.saveUpdateFlag = "update";
        this.closeFlag = false;
        this.privatekey = data.ID;
        this.ownerForm = new FormGroup({
          NAME: new FormControl(data.NAME),
          SKUNAME: new FormControl(data.SKUNAME),
          FILE: new FormControl(),
          IMAGE_URL: new FormControl(data.IMAGE_URL),
          PATH: new FormControl(data.PATH)
        });
      } else if (data.ACTIONTYPE == "Delete") {
        this.dialogTitle = "Delete";
        this.saveUpdateFlag = "delete";
        this.closeFlag = false;
        this.privatekey = data.ID;
        this.privatesku = data.SKUNAME;
        this.ownerForm = new FormGroup({
          NAME: new FormControl(data.NAME),
          SKUNAME: new FormControl(data.SKUNAME),
          FILE: new FormControl()
        });
      }
    }
  }
  onNoClick(): void {
    this.closeFlag = true;
    this.dialogRef.close();
  }

  hasError(key, value) {
    return this.ownerForm.controls[key].hasError(value);
  }

  public createOwner = (ownerFormValue) => {
    if (this.ownerForm.valid && this.saveUpdateFlag == "insert" && this.closeFlag == false) {
      this.executeOwnerCreation(ownerFormValue);
    } else if (this.ownerForm.valid && this.saveUpdateFlag == "update" && this.closeFlag == false) {
      this.executeOwnerUpdate(this.ownerForm.value);
    }
  }

  private deleteRow = () => {
    var deleteData = {
      ID: this.privatekey
    }
    this.adgroupsService.deletegroupList(deleteData).then(data => {
      this.dialogRef.close(data);
    }).catch(err => {
      console.log("Error " + err)
    })
    this.privatekey = null;
    this.privatesku = null;

  }


  private executeOwnerCreation = (insertFormValue) => {
    let NAME = insertFormValue.NAME == undefined || insertFormValue.NAME == null ? "" : insertFormValue.NAME;
    let SKUNAME = insertFormValue.SKUNAME == undefined || insertFormValue.SKUNAME == null ? "" : insertFormValue.SKUNAME;
    let IMAGE_URL = insertFormValue.IMAGE_URL == undefined || insertFormValue.IMAGE_URL == null ? "" : insertFormValue.IMAGE_URL;
    let PATH = insertFormValue.PATH == undefined || insertFormValue.PATH == null ? "" : insertFormValue.PATH;

    var formdata = new FormData();
    formdata.append('name', NAME);
    formdata.append('skuname', SKUNAME);
    formdata.append('keyfile', this.selectedFile);
    formdata.append('imageurl', IMAGE_URL);
    formdata.append('path', PATH);
    // let addgroup: AdgroupsElement = {
    //   NAME: NAME,
    //   SKUNAME: SKUNAME,
    // }

    this.adgroupsService.insertAccountmanagerList(formdata).then(data => {
      this.dialogRef.close(data);
    }).catch(err => {
      console.log("Error " + err.Message)
    })
  }

  private executeOwnerUpdate = (updateFormValue) => {
    let NAME = updateFormValue.NAME == undefined || updateFormValue.NAME == null ? "" : updateFormValue.NAME;
    let SKUNAME = updateFormValue.SKUNAME == undefined || updateFormValue.SKUNAME == null ? "" : updateFormValue.SKUNAME;
    let IMAGE_URL = updateFormValue.IMAGE_URL == undefined || updateFormValue.IMAGE_URL == null ? "" : updateFormValue.IMAGE_URL;
    let PATH = updateFormValue.PATH == undefined || updateFormValue.PATH == null ? "" : updateFormValue.PATH;
    let updategroup: AdgroupsElement = {
      ID: this.privatekey,
      NAME: NAME,
      SKUNAME: SKUNAME,
      IMAGE_URL: IMAGE_URL,
      PATH: PATH
    }

    this.adgroupsService.updateAccountmanagerList(updategroup).then(data => {
      this.dialogRef.close(data);
    }).catch(err => {
      console.log("Error " + err)
    })
    this.privatekey = null;
  }


  selectedFile: any;
  onFileSelected(event) {
    this.selectedFile = event.target.files[0];
    let fileExtention = event.target.files[0].name;
    console.log(fileExtention);

  }

}


//=================================================================================================
//for child
@Component({
  selector: 'child-adgroup-up-dialog',
  templateUrl: 'child-adgroup-up-dialog.html',
  styleUrls: ['./adgroup-table.component.scss'],
  providers: [AdgroupsService]
})

export class ChildSetupDialog {

  dialogTitle: string;
  public ownerForm: FormGroup;

  saveUpdateFlag: string;
  closeFlag: boolean;
  configError: any;
  adgroupsDialogElement: AdgroupsDialogElement;

  constructor(
    public dialogRef: MatDialogRef<ChildSetupDialog>, @Inject(MAT_DIALOG_DATA) public data: AdgroupsDialogElement, private snackBar: MatSnackBar, private adgroupsService: AdgroupsService) {

    this.configError = new MatSnackBarConfig();
    this.configError.horizontalPosition = "center";
    this.configError.verticalPosition = "top";
    this.configError.duration = 4000;

    if (data.Action == 0) {

      this.dialogTitle = "AdchildGroup Create";
      this.saveUpdateFlag = "insert";
      this.closeFlag = false;
      this.ownerForm = new FormGroup({
        NO: new FormControl(''),
        KEY: new FormControl(''),
        KeyVALUE: new FormControl(''),
        MAINID: new FormControl(data.mainId)
      });
    }
    else {
      var color: number;
      color = data.Action;
      switch (color) {
        case 1: {
          this.dialogTitle = "AdchildGroup Edit";
          this.saveUpdateFlag = "update";
          this.closeFlag = false;
          this.adgroupsDialogElement = data;
          this.ownerForm = new FormGroup({
            ID: new FormControl(data._id),
            KeyVALUE: new FormControl(data.VALUE),
            MAINID: new FormControl(data.mainId)
          });
        }
          break;
        case 2: {

          this.dialogTitle = "AdchildGroup Delete";
          this.saveUpdateFlag = "delete";
          this.closeFlag = false;
          this.adgroupsDialogElement = data;

          this.ownerForm = new FormGroup({
            ID: new FormControl(data._id),
            KeyVALUE: new FormControl(data.VALUE),
            MAINID: new FormControl(data.mainId)
          });
        }
          break;
      }

    }
  }


  public hasError = (controlName: string, errorName: string) => {

    return this.ownerForm.controls[controlName].hasError(errorName);
  }

  public onCancel = () => {
    // this.location.back();
  }

  public createOwner = (ownerFormValue) => {
    if (this.ownerForm.valid && this.saveUpdateFlag == "insert" && this.closeFlag == false) {
      this.executechildOwnerCreation(ownerFormValue);
    } else if (this.ownerForm.valid && this.saveUpdateFlag == "update" && this.closeFlag == false) {
      this.executechildOwnerUpdate(ownerFormValue);
    }
    else if (this.ownerForm.valid && this.saveUpdateFlag == "delete" && this.closeFlag == false) {
      this.executechildOwnerDelete(ownerFormValue);
    }
  }

  private executechildOwnerCreation = (insertFormValue) => {
    debugger
    let MAINID = insertFormValue.MAINID == undefined || insertFormValue.MAINID == null ? "" : insertFormValue.MAINID;
    let KEY = insertFormValue.KEY == undefined || insertFormValue.KEY == null ? "" : insertFormValue.KEY;
    let VALUE = insertFormValue.KeyVALUE == undefined || insertFormValue.KeyVALUE == null ? "" : insertFormValue.KeyVALUE;
    let SEQUENCE = insertFormValue.NO == undefined || insertFormValue.NO == null ? "" : insertFormValue.NO;

    let Stepup: AdgroupsDialogElement = {
      mainId: MAINID,
      VALUE: VALUE,
      NO: SEQUENCE,
      KEY: KEY,
      Action: 0
    } 

    debugger

    this.adgroupsService.insertAdgroupservice(Stepup).then(data => {
      this.dialogRef.close(data);
      this.configError.panelClass = ['success-snackbar'];
      this.snackBar.open("Record Insert Successfully", "", this.configError);
    }).catch(error => {
      this.configError.panelClass = ['error-snackbar'];
      this.snackBar.open(error, "", this.configError);
    });
  }

  private executechildOwnerUpdate = (updateFormValue) => {

    console.log(JSON.stringify(updateFormValue))

    let ID = updateFormValue.ID == undefined || updateFormValue.ID == null ? "" : updateFormValue.ID;
    let VALUE = updateFormValue.KeyVALUE == undefined || updateFormValue.KeyVALUE == null ? "" : updateFormValue.KeyVALUE;
    let ElementId = updateFormValue.mainId == undefined || updateFormValue.mainId == null ? "" : updateFormValue.mainId;
    let Stepup: AdgroupsDialogElement = {
      _id: ID,
      VALUE: VALUE,
      Action: 1,
      mainId: ElementId
    } 

    this.adgroupsService.updateAdgroupservice(Stepup).then(data => {
      this.dialogRef.close(data);
      this.configError.panelClass = ['success-snackbar'];
      this.snackBar.open("Record Update Successfully", "", this.configError);

    }).catch(error => {
      this.configError.panelClass = ['error-snackbar'];
      this.snackBar.open(error, "", this.configError);
    });
  }

  private executechildOwnerDelete(deleteFormValue) {
    let ID = deleteFormValue.ID == undefined || deleteFormValue.ID == null ? "" : deleteFormValue.ID;
    let MAINID = deleteFormValue.MAINID == undefined || deleteFormValue.MAINID == null ? "" : deleteFormValue.MAINID;
    let Stepup: AdgroupsDialogElement = {
      _id: ID,
      mainId: MAINID,
    }
    this.adgroupsService.deleteChildAdgroupservice(Stepup).then(data => {
      this.dialogRef.close(data);
      this.configError.panelClass = ['success-snackbar'];
      this.snackBar.open("Record Delete Successfully", "", this.configError);

    }).catch(error => {
      this.configError.panelClass = ['error-snackbar'];
      this.snackBar.open(error, "", this.configError);
    });

  }

  onNoClick(): void {
    this.closeFlag = true;
    this.dialogRef.close();
  }

}


