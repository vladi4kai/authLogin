import {Component, ViewChild} from '@angular/core';
import { AuthService } from "../service/auth.service";
import {MatDialog} from "@angular/material/dialog";
import {HttpClient} from "@angular/common/http";
import {ToastrService} from "ngx-toastr";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {CreateTrainingModalComponent} from "../create-training-modal/create-training-modal.component";


@Component({
  selector: 'app-training-list',
  templateUrl: './training-list.component.html',
  styleUrls: ['./training-list.component.css']
})
export class TrainingListComponent {
  constructor(private service: AuthService, private dialog: MatDialog,
              private http: HttpClient,
              private toastr: ToastrService,
              ) {
this.Loaduser()
  }
  filterValue: string = '';
  traininglist: any;
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>();
  @ViewChild(MatPaginator) paginator !: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  Loaduser(){
    this.service.GetAllTrainings().subscribe(res =>{
      this.traininglist = res;
      this.dataSource.data = this.traininglist;
      this.dataSource.paginator = this.paginator
      this.dataSource.sort = this.sort
    })
  }
  displayedColumns: any[] = ['name', 'duration', 'maxPeople', 'action'];
  openCreateTrainingModal() {
    const dialogRef = this.dialog.open(CreateTrainingModalComponent, {
      width: '450px',
      enterAnimationDuration: '500ms',
      exitAnimationDuration: '500ms',
    })

    dialogRef.afterClosed().subscribe((result) => {

    })
  }

}
