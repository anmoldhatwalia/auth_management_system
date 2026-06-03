import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  constructor(private http :HttpClient){}

  login(data:any){
   return  this.http.post('http://localhost:3000/api/auth/login',data);
  }

  register(data:any){
    return this.http.post('http://localhost:3000/api/auth/register',data)
  }
   getUsers() {
    return this.http.get(
      'https://jsonplaceholder.typicode.com/users'
    );
  }
}
