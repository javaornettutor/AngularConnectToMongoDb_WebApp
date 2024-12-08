import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpParams, HttpErrorResponse } from '@angular/common/http';
import { provideHttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Component } from '@angular/core';
import axios from 'axios';
import { response } from 'express';
import { AppSettings } from '../../AppSettings'

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private baseUrl = AppSettings.NodeMiddleWareURI+ AppSettings.NodeMiddleWarePort;

  constructor(private http: HttpClient) {}

  getItems(): Promise<any> {
    const endPointUrl = this.baseUrl +'/books';
    return axios
      .get(endPointUrl)
      .then((response) => response.data)
      .catch((error) => {
        console.error('error fetch data', error);
        throw error;
      });
  }

  addItem(item: any): Promise<any> {
    const endPointUrl = this.baseUrl + '/addBook';
    return axios
      .post(endPointUrl, item)
      .then((response) => response.data)
      .catch((error) => {
        throw error;
      });
  }
  deleteItem(title: any) : Promise<boolean> {
    const endPointUrl = this.baseUrl + `/deleteBook/${title}`;
    console.log('Requesting delete for title=', title);
    return axios
      .delete(endPointUrl)
      .then((response) => {
        if(response.status===200) {
          return true;
        }
        else{
          console.error("fail to delete");
          return false;  

        }
      })
      .catch((error) => {
        console.error(error);
        throw error;
      });
  }
}
