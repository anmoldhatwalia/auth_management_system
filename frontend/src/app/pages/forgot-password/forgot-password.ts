import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Auth } from '../../services/auth';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-forgot-password',
  imports: [FormsModule,RouterLink],
  templateUrl: './forgot-password.html',
  styleUrl: './forgot-password.css',
})
export class ForgotPassword {

  email='';

  private auth=inject(Auth);

  private toastr=inject(ToastrService);

  sendLink(){

    if(!this.email){

      this.toastr.error(
        'Email is required'
      );

      return;
    }

    this.auth.forgotPassword({
      email:this.email
    }).subscribe({

      next:()=>{

        this.toastr.success(
          'Reset link sent'
        );

      },

      error:(err)=>{

        console.log(err);

      }

    });

  }

}