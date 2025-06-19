import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class User {
  private apiUrl = 'https://jsonplaceholder.typicode.com/users'; // Dummy API

  constructor(private http: HttpClient) { }

  saveUser(data: any): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }
}
