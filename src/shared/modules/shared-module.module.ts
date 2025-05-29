import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCheckboxModule } from '@angular/material/checkbox';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import {MatDialogModule} from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatInputModule,
    MatButtonModule,
    RouterLink,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatIconModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
    MatPaginator,
    MatPaginatorModule,
    MatTableModule,
    MatDialogModule,
    FormsModule

  ],
  exports:[
    MatInputModule,
    MatButtonModule,
    RouterLink,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatIconModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
    MatPaginator,
    MatPaginatorModule,
    MatTableModule,
    MatDialogModule,
    FormsModule,
    CommonModule
  ]
})
export class SharedModuleModule { }
