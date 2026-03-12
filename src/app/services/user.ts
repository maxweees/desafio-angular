import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 
import { Observable } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {

  private api = 'https://jsonplaceholder.typicode.com'

  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.api}/users`)
  }

  getUser(id: number): Observable<User> {
    return this.http.get<User>(`${this.api}/users/${id}`)
  }
  
}
