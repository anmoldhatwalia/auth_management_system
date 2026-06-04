import { Component, inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { Chart } from 'chart.js/auto';
import { Auth } from '../../services/auth';

@Component({
  selector: 'app-analytics',
  standalone: true,
  imports: [],
  templateUrl: './analytics.html',
  styleUrl: './analytics.css'
})
export class Analytics implements OnInit {

  constructor() {
    console.log('Analytics Component Created');
  }
  private cdr = inject(ChangeDetectorRef);

  private auth = inject(Auth);

  totalUsers = 0;

  barChart: any;
  pieChart: any;

  ngOnInit(): void {

    this.loadAnalytics();

  }

  loadAnalytics(): void {

    this.auth.getAnalytics()
      .subscribe({

        next: (res: any) => {

          this.totalUsers = res.totalUsers;

          this.cdr.detectChanges();

          setTimeout(() => {

            this.createBarChart(
              res.monthlyUsers || []
            );

            this.createPieChart(
              res.totalUsers || 0
            );

          }, 100);

        },

        error: (err) => {

          console.error(err);

        }

      });

  }

  createBarChart(monthlyUsers: any[]): void {

    if (this.barChart) {
      this.barChart.destroy();
    }

    const labels = monthlyUsers.map(
      item => `Month ${item._id.month}`
    );

    const values = monthlyUsers.map(
      item => item.count
    );

    this.barChart = new Chart('barChart', {

      type: 'bar',

      data: {

        labels,

        datasets: [

          {
            label: 'Registrations',
            data: values
          }

        ]

      },

      options: {

        responsive: true,

        maintainAspectRatio: false

      }

    });

  }

  createPieChart(totalUsers: number): void {

    if (this.pieChart) {
      this.pieChart.destroy();
    }

    this.pieChart = new Chart('pieChart', {

      type: 'pie',

      data: {

        labels: [
          'Registered Users'
        ],

        datasets: [

          {
            data: [totalUsers]
          }

        ]

      },

      options: {

        responsive: true,

        maintainAspectRatio: false

      }

    });

  }

}