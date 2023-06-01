import {Component, OnInit, ViewChild} from '@angular/core';
import { AuthService } from "../service/auth.service";
import {MatDialog} from "@angular/material/dialog";
import {HttpClient} from "@angular/common/http";
import {ToastrService} from "ngx-toastr";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-training-group',
  templateUrl: './training-group.component.html',
  styleUrls: ['./training-group.component.css']
})
export class TrainingGroupComponent implements OnInit{
  constructor(private service: AuthService, private dialog: MatDialog,
              private http: HttpClient,
              private toastr: ToastrService,
              private router: Router,
              private route: ActivatedRoute
  ) {
    this.Loaduser()
  }

  filterValue: string = '';
  traininggroup: any;
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>();
  @ViewChild(MatPaginator) paginator !: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  Loaduser(){
    this.service.GetAllTrainingGroups().subscribe(res =>{
      this.traininggroup = res;
      this.dataSource.data = this.traininggroup;
      this.dataSource.paginator = this.paginator
      this.dataSource.sort = this.sort
    })
  }
  displayedColumns: any[] = ['name', 'price', 'maxPeople','duration', 'trainingId', 'organizationId', 'action'];
  openCreateTrainingGroup() {
    this.router.navigate(['trainings/group/new'])
  }
  ngOnInit() {
    const groupId = this.route.snapshot.params.id;
  }

}

