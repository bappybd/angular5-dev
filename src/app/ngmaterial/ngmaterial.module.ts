import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {  MatButtonModule } from '@angular/material';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';


@NgModule({
  imports: [MatButtonModule, MatToolbarModule, MatCardModule, MatMenuModule, MatIconModule, MatTableModule, MatFormFieldModule, MatInputModule, MatPaginatorModule],
  exports: [MatButtonModule, MatToolbarModule, MatCardModule, MatMenuModule, MatIconModule, MatTableModule, MatFormFieldModule, MatInputModule, MatPaginatorModule]
})
export class MaterialAppModule { }
