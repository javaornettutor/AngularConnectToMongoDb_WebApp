import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpParams ,HttpErrorResponse } from '@angular/common/http';
import { provideHttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Component } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private baseUrl = '';

  constructor(private http: HttpClient) {}

  getItems(): Observable<any> {
    this.baseUrl="http://localhost:3000/books";
    return this.http.get(this.baseUrl);
  }

  addItem(item: any): Observable<any> {
    this.baseUrl="http://localhost:3000/addBook";
    return this.http.post(this.baseUrl, item);
  }
  deleteItem(title:any): Observable<any> {
    this.baseUrl="http://localhost:3000/deleteBook";
    return this.http.delete(`${this.baseUrl}?title=${title}`);
  }
}
