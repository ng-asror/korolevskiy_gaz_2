import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { IOrderCreate } from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class Order {
  constructor(private http: HttpClient) {}

  getOrder(tg_id: string): Observable<any> {
    return this.http.post<any>(`${environment.url}/public/orders`, { tg_id });
  }

  createOrder(order: IOrderCreate): Observable<any> {
    return this.http.post<any>(`${environment.url}/public/orders/create`, {
      order,
    });
  }
}
