import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { IAzot, IAzots } from '../interfaces/azot';
import { environment } from '../../../environments/environment.development';
import { Basket } from './basket';
import { calcCont } from '../utils';
import { Telegram } from './telegram';

@Injectable({
  providedIn: 'root',
})
export class Azot {
  private endpoint: string = 'public/azots';
  private basketService = inject(Basket);
  private telegram = inject(Telegram);
  constructor(private http: HttpClient) {}

  readonly liters = new BehaviorSubject<{ id: number; liter: string }[]>([]);
  currentBasket = this.basketService.localBasket.getValue();

  getAzots(): Observable<IAzots> {
    return this.http.get<IAzots>(`${environment.url}/${this.endpoint}`).pipe(
      tap((res) => {
        const arr: { id: number; liter: string }[] = res.data.data.map(
          (item) => ({
            id: item.id,
            liter: item.type,
          })
        );
        this.liters.next(arr);
      })
    );
  }

  getAzotInfo(id: number): Observable<IAzot> {
    return this.http.get<IAzot>(`${environment.url}/${this.endpoint}/${id}`);
  }

  kupit(
    tg_id: string,
    product_id: number,
    price_type_id: number
  ): Observable<any> {
    return this.http
      .post<any>(`${environment.url}/public/cart/add/azot`, {
        tg_id,
        product_id,
        price_type_id,
      })
      .pipe(
        tap((res) => {
          calcCont(res, this.basketService);
          this.telegram.hapticFeedback('light');
        })
      );
  }
  minus(
    tg_id: string,
    product_id: number,
    price_type_id: number
  ): Observable<any> {
    return this.http
      .post<any>(`${environment.url}/public/cart/minus/azot`, {
        tg_id,
        price_type_id,
        product_id,
      })
      .pipe(
        tap((res) => {
          calcCont(res, this.basketService);
          this.telegram.hapticFeedback('light');
        })
      );
  }
}
