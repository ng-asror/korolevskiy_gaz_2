import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { IBasket, ILocalBasket } from '../interfaces';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class Basket {
  constructor(private http: HttpClient) {}
  localBasket = new BehaviorSubject<ILocalBasket | null>(null);
  localBasket$ = this.localBasket.asObservable();

  getBasket(tg_id: string): Observable<IBasket> {
    return this.http
      .post<IBasket>(`${environment.url}/public/cart`, { tg_id })
      .pipe(
        tap((res) => {
          const accessoriesCount = res.data.accessories.reduce(
            (sum, item) => sum + item.quantity,
            0
          );
          const azotCount = res.data.azots.reduce(
            (sum, item) => sum + item.quantity,
            0
          );
          const currentBasket = this.localBasket.getValue();
          this.localBasket.next({
            azots: res.data.azots,
            accessories: res.data.accessories,
            total_count: accessoriesCount + azotCount,
            total_price: res.data.total_price,
          });
        })
      );
  }
}
