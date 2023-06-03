import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ActivatedRoute, Router } from '@angular/router';
import { TrainingsService } from '../service/trainings.service';

@Component({
  selector: 'app-training-group',
  templateUrl: './training-group.component.html',
  styleUrls: ['./training-group.component.css']
})
export class TrainingGroupComponent implements OnInit {
  filterValue = '';
  trainingGroup: any;
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  displayedColumns: string[] = ['name', 'price', 'maxPeople', 'duration', 'trainingId', 'organizationId', 'action'];

  constructor(
    private trainingService: TrainingsService,
    private dialog: MatDialog,
    private http: HttpClient,
    private toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    const groupId = this.route.snapshot.params.id;
    this.loadTrainings();
  }

  applyFilter(search: Event) {
    const filterValue = (search.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  loadTrainings() {
    this.trainingService.getAllTrainingGroups().subscribe((res) => {
      this.trainingGroup = res;
      this.dataSource.data = this.trainingGroup;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  openCreateTrainingGroup() {
    this.router.navigate(['trainings/group/new']);
  }
}
