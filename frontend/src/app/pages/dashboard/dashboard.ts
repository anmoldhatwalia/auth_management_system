import {
  Component,
  OnInit,
  ViewChild,
  inject,
  AfterViewInit
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import {
  MatTableDataSource,
  MatTableModule
} from '@angular/material/table';

import {
  MatPaginator,
  MatPaginatorModule
} from '@angular/material/paginator';

import {
  MatSort,
  MatSortModule
} from '@angular/material/sort';

import { MatInputModule } from '@angular/material/input';

import { Auth } from '../../services/auth';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatInputModule
  ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard implements OnInit, AfterViewInit {

  private auth = inject(Auth);

  constructor(private router: Router) {}

  displayedColumns: string[] = [
    'name',
    'email'
  ];

  dataSource = new MatTableDataSource<any>([]);

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  @ViewChild(MatSort)
  sort!: MatSort;

  ngOnInit() {

    this.auth.getUsers().subscribe({

      next: (users: any) => {

        console.log(users);

        this.dataSource.data = users;

        if (this.paginator) {
          this.dataSource.paginator = this.paginator;
        }

        if (this.sort) {
          this.dataSource.sort = this.sort;
        }
      },

      error: (err) => {
        console.error(err);
      }

    });

  }

  ngAfterViewInit() {

    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

  }

  applyFilter(event: Event) {

    const filterValue =
      (event.target as HTMLInputElement).value;

    this.dataSource.filter =
      filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  logout() {

    localStorage.removeItem('token');

    this.router.navigate(['/login']);
  }
}