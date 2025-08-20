import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { IBasket } from '../interfaces';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class Basket {
  constructor(private http: HttpClient) {}

  quantity = signal<number>(0);

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

          this.quantity.set(accessoriesCount + azotCount);
        })
      );
  }
}
