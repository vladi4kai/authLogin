import { Component, ViewChild } from '@angular/core';
import {AuthService} from "../service/auth.service";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MatDialog} from "@angular/material/dialog";
import { HttpClient } from '@angular/common/http';
import {ToastrService} from "ngx-toastr";
import {ConfirmationdialogComponent} from "../confirmationdialog/confirmationdialog.component";
import {Router} from "@angular/router";
import { DatePipe } from '@angular/common';







@Component({
  selector: 'app-userlisting',
  templateUrl: './userlisting.component.html',
  styleUrls: ['./userlisting.component.css'],
  providers: [DatePipe]
})
export class UserlistingComponent {
  constructor(private service: AuthService, private dialog: MatDialog,
              private http: HttpClient,
             private toastr: ToastrService,
              private router: Router) {
  this.Loaduser()
  }
  filterValue: string = '';
  userlist: any;
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>();
  @ViewChild(MatPaginator) paginator !: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  Loaduser(){
    this.service.GetAll().subscribe(res =>{
      this.userlist = res;
      this.dataSource.data = this.userlist;
      this.dataSource.paginator = this.paginator
      this.dataSource.sort = this.sort
    })
  }
  displayedColumns: string[] = ['firstName', 'lastName', 'phone', 'birth', 'action'];
  UpdateUser(code: any){
      this.router.navigate(['/users', code, 'edit']);
  }
  deleteUser(usercode: any) {
    const dialogRef = this.dialog.open(ConfirmationdialogComponent, {
      width: '50%',
      enterAnimationDuration: '500ms',
      exitAnimationDuration: '500ms',
      data: {  }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.service.deleteUser(usercode).subscribe(
          () => {
            this.toastr.success('User deleted successfully', 'Success');
            this.Loaduser();
          },
          error => {
            console.error(error);
            this.toastr.error('Error deleting user', 'Rejected');
          }
        );
      }
    });
  }

  navigateToNewUser() {
    this.router.navigateByUrl('user/new-user');
  }
}
