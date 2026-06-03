import { Component, inject } from '@angular/core';

import { FormsModule } from '@angular/forms';

import { ActivatedRoute, Router } from '@angular/router';

import { Auth } from '../../services/auth';

import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-reset-password',
  imports: [FormsModule],
  templateUrl: './reset-password.html',
  styleUrl: './reset-password.css',
})
export class ResetPassword {

  password = '';

  confirmPassword = '';

  token = '';
  private router = inject(Router);

  private route = inject(
    ActivatedRoute
  );
  private auth = inject(Auth);

  private toastr = inject(
    ToastrService
  );

  ngOnInit() {

    this.token =
      this.route.snapshot.paramMap.get('token') || '';

    console.log('Reset Password Loaded');

    console.log('TOKEN =>', this.token);

  }
  resetPassword() {

    if (this.password !== this.confirmPassword) {

      this.toastr.error(
        'Passwords do not match'
      );

      return;
    }

    this.auth.resetPassword({

      token: this.token,

      password: this.password

    }).subscribe({
      next: () => {

        this.toastr.success(
          'Password Updated Successfully'
        );

        setTimeout(() => {

          this.router.navigate(['/login']);

        }, 1500);

      },

      error: (err) => {

        console.log(err);

        this.toastr.error(
          err.error.message
        );

      }

    });

  }


}
