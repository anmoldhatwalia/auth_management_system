import { Component,inject} from '@angular/core';
import { Auth } from '../../services/auth';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterLink,FormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  private auth = inject(Auth);
  private router =inject(Router);
  private toastr = inject(ToastrService)

  name = '';
  email = '';
  emailTouch=false;
  password = '';
  confirmPassword='';


  register() {
    
     if (!this.name) {
      this.toastr.error('Name is required','Error')
    return;
  }

  if (!this.email) {
    this.toastr.error('Email is required','Error')
    return;
  }

  if (!this.password) {
    this.toastr.error('Password is requried','Error')
    return;
  }

  if (this.password.length < 6) {
    this.toastr.error('Password must be at least 6 characters','Error')
    return;
  }

  if (this.password !== this.confirmPassword) {
    this.toastr.error('Password is not Matched')
    return;
  }

    const data = {
      name: this.name,
      email: this.email,
      password: this.password,
      confirmPassword : this.confirmPassword
    }

    return this.auth.register(data).subscribe({
      next: ()=>{
        this.toastr.success("Account Created Successfully","Success")
        this.router.navigate(['./login']);

      },
      error:(err)=>{
        this.toastr.error('Invaild Input','Error')
  
      }
    })

  }

}