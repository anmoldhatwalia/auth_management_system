import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  constructor(private http: HttpClient) { }



  login(data: any) {
    return this.http.post('http://localhost:3000/api/auth/login', data);
  }

  register(data: any) {
    return this.http.post('http://localhost:3000/api/auth/register', data)

  }

  getUsers() {
    const token = localStorage.getItem('token')
    return this.http.get(
      'http://localhost:3000/api/auth/users', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
    );
  }

 getAnalytics() {

  return this.http.get<any>(
    'http://localhost:3000/api/auth/analytics'
  );

}

  forgotPassword(data: any) {

    return this.http.post(

      'http://localhost:3000/api/auth/forgotpassword',

      data

    );

  }

  resetPassword(data: any) {

    return this.http.post(
      'http://localhost:3000/api/auth/resetpassword',
      data
    );
  }
}