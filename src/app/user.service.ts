// user.service.ts

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

// Define and export the User interface
export interface User {
  id?: number;
  username: string;
  password: string;
  email: string;
  role: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private API = 'http://localhost:8080';

  constructor(private http: HttpClient) { }

  public registerUser(userData: User): Observable<User> {
    return this.http.post<User>(`${this.API}/users`, userData);
  }

  public getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.API}/users`);
  }

  public deleteUser(userId: number): Observable<void> {
    return this.http.delete<void>(`${this.API}/users/${userId}`);
  }

  public updateUser(user: User): Observable<User> {
    if (!user.id) {
      throw new Error('User ID is required for updating');
    }
    return this.http.put<User>(`${this.API}/users/${user.id}`, user);
  }
}
