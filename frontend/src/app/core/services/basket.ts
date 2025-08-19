import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IBasket } from '../interfaces';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class Basket {
  constructor(private http: HttpClient) {}

  getBasket(tg_id: string): Observable<IBasket> {
    return this.http.post<IBasket>(`${environment.url}/public/cart`, { tg_id });
  }
}
