import { Component , inject} from '@angular/core';
import { Auth } from '../../services/auth';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink,RouterLinkActive } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterLink,MatIconModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  private toastr = inject(ToastrService)
  constructor(private auth: Auth,
    private router:Router
  ) { }

  email = '';
  emailTouch = false;
  password = '';
  passwordTouch=false;

  

  login() {
    if (!this.email) {
      this.toastr.error('Email is required', 'Error')
      return;
    }

    if (!this.password) {
      this.toastr.error('Password is required', 'Error')
      return;
    }

    if (this.password.length < 6) {
      this.toastr.error('Password must be at least 6 characters', 'Error')
      return;
    }

    const data = {
      email:this.email,
      password :this.password
    }

    this.auth.login(data).subscribe({
      next: (response: any) => {
        console.log(response);
        localStorage.setItem('token',response.token)
       
        this.router.navigate(['./dashboard'])
         this.toastr.success(
            'Login Successful',
            'Success'
          );

      },
       error: (err) => { if (err.status === 400) {

    this.toastr.warning(
      err.error.message,
      'Warning'
    );

  } else {

    this.toastr.error(
      'Something went wrong',
      'Error'
    );

  }}
    })

  }





}
