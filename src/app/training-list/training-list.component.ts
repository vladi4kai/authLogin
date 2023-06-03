import {Component, OnInit, ViewChild} from '@angular/core';
import { MatDialog } from "@angular/material/dialog";
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { CreateTrainingModalComponent } from "../create-training-modal/create-training-modal.component";
import { TrainingsService } from "../service/trainings.service";

@Component({
  selector: 'app-training-list',
  templateUrl: './training-list.component.html',
  styleUrls: ['./training-list.component.css']
})
export class TrainingListComponent implements OnInit{
  filterValue: string = '';
  trainingList: any;
  dataSource: MatTableDataSource<any> = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  displayedColumns: string[] = ['name', 'duration', 'maxPeople', 'action'];

  constructor(
    private trainingService: TrainingsService,
    private dialog: MatDialog,
  ) {
  }
  ngOnInit() {
    this.loadTrainings();
  }

  applyFilter(search: Event) {
    const filterValue = (search.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  loadTrainings() {
    this.trainingService.getAllTrainings().subscribe(res => {
      this.trainingList = res;
      this.dataSource.data = this.trainingList;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  openCreateTrainingModal() {
    const dialogRef = this.dialog.open(CreateTrainingModalComponent, {
      width: '450px',
      enterAnimationDuration: '500ms',
      exitAnimationDuration: '500ms',
    });

    dialogRef.afterClosed().subscribe((result) => {


    });
  }
}
