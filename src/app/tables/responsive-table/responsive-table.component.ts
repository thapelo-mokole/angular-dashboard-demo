
import { Component, OnInit,  ViewChild, Inject } from '@angular/core';
import { MatSort,MatPaginator,MatTableDataSource } from '@angular/material';
import {StudentService} from './../../../../api/table/table.service';
import {PeriodicElement,ELEMENT_DATA} from './../../../../api/table/table.modal';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'cdk-responsive-table',
  templateUrl: './responsive-table.component.html',
  styleUrls: ['./responsive-table.component.scss'],
  providers: [StudentService]
})
export class ResponsiveTableComponent implements OnInit {
    dataSource : any;
    displayedColumns: string[] = ['position', 'name', 'weight', 'symbol','update'];
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    constructor(private studentService : StudentService,public dialog: MatDialog){}
    ngOnInit() {
      this.getEmployeeLists();
    }
    getEmployeeLists(){
     this.dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
     this.dataSource.paginator = this.paginator;
     this.dataSource.sort = this.sort;
    
  }
  editRow(row){
      console.log("++++++++++" + row)
  }
  deleteRow(id: number){
    if (confirm('Are you sure to delete this record ?') == true) {
        this.studentService.deleteEmployee(id)
        .then(x => {
          this.getEmployeeLists();
        })
      }
  }
  openDialog(row): void {
    console.log(JSON.stringify(row))
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '450px',
      data : {position : row.position, name : row.name , weight: row.weight, symbol: row.symbol}
    });

    dialogRef.afterClosed().subscribe(result => {
      // console.log('The dialog was closed');
      // this.data = result;
    });
  }
    
}


@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'dialog-overview.html',
})
export class DialogOverviewExampleDialog {
  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog> ,  @Inject(MAT_DIALOG_DATA) public data: PeriodicElement) {

    }
  onNoClick(): void {
    this.dialogRef.close();
  }
}







