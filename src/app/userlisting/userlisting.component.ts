import {Component, OnInit, ViewChild} from '@angular/core';
import {UsersService} from "../service/users.service";
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
export class UserlistingComponent implements OnInit{
  constructor(private userService: UsersService, private dialog: MatDialog,
              private http: HttpClient,
             private toastr: ToastrService,
              private router: Router) {
  }
  filterValue: string = '';
  userList: any;
  dataSource: MatTableDataSource<any> = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator !: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;

  applyFilter(search: Event) {
    const filterValue = (search.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  loadUsers(){
    this.userService.getAllUsers().subscribe(res =>{
      this.userList = res;
      this.dataSource.data = this.userList;
      this.dataSource.paginator = this.paginator
      this.dataSource.sort = this.sort
    })
  }
  displayedColumns: string[] = ['firstName', 'lastName', 'phone', 'birth', 'action'];
  updateUserForId(id: string){
      this.router.navigate(['/users', id, 'edit']);
  }
  deleteUser(id: string) {
    const dialogRef = this.dialog.open(ConfirmationdialogComponent, {
      width: '50%',
      enterAnimationDuration: '500ms',
      exitAnimationDuration: '500ms',
      data: {  }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.userService.deleteUser(id).subscribe(
          () => {
            this.toastr.success('User deleted successfully', 'Success');
            this.loadUsers();
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
  ngOnInit() {
    this.loadUsers()
  }
}
