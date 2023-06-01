import {NgModule} from "@angular/core";
import {MatInputModule} from '@angular/material/input'
import { MatSelectModule} from '@angular/material/select'
import {MatCardModule} from '@angular/material/card'
import {MatRadioModule} from '@angular/material/radio'
import {MatCheckboxModule} from '@angular/material/checkbox'
import {MatTableModule} from '@angular/material/table'
import {MatPaginatorModule} from '@angular/material/paginator'
import {MatSortModule} from '@angular/material/sort'
import {MatDialogModule} from '@angular/material/dialog'
import {MatButtonModule} from "@angular/material/button";
import {MatListModule} from '@angular/material/list';
import {MatLineModule} from "@angular/material/core";
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {MatMenuModule} from "@angular/material/menu";


@NgModule({
  exports: [
    MatInputModule,
    MatSelectModule,
    MatCardModule,
    MatRadioModule,
    MatCheckboxModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatDialogModule,
    MatButtonModule,
    MatListModule,
    MatLineModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatMenuModule,
  ]
})
export class MaterialModule {

}
