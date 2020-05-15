import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TestBus } from '../models/test-bus';

@Injectable({
  providedIn: 'root'
})
export class TestBusServiceService {
  private baseEndpoint = 'http://192.168.200.183:8280/services/pruebaproxi';
  constructor(private http: HttpClient) { }
  public listarId(): Observable<TestBus[]> {
    return this.http.get<TestBus[]>(this.baseEndpoint);
  }
}
