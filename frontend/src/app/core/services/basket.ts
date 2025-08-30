import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable, of, tap } from 'rxjs';
import {
  IBasket,
  IDecoration,
  ILocalBasket,
  IOrderCreateRes,
  IPromocode,
  IPromoRes,
} from '../interfaces';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class Basket {
  constructor(private http: HttpClient) {}
  localBasket = new BehaviorSubject<ILocalBasket | null>(null);
  private decoration = new BehaviorSubject<IOrderCreateRes | null>(null);
  private promo = new BehaviorSubject<IPromocode | null>(null);

  public localBasket$ = this.localBasket.asObservable();
  public decoration$ = this.decoration.asObservable();
  public promocode$ = this.promo.asObservable();

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

  /**
   *
   * @param promocode
   * @returns
   */
  private promoCheck(promocode: string): Observable<IPromoRes> {
    return this.http
      .post<IPromoRes>(`${environment.url}/public/promocode/check`, {
        promocode,
      })
      .pipe(
        tap((res) => {
          if (res.success) this.promo.next(res.data);
        }),
        catchError((error) => {
          if (error instanceof HttpErrorResponse) {
            if (error.status === 400 || error.status === 404)
              this.promo.next(null);
          }
          return of();
        })
      );
  }

  /**
   *
   * @param promocode
   */
  public promoFind(promocode: string): void {
    this.promoCheck(promocode).subscribe();
  }
  /**
   *
   * @param data
   */
  public decorationNext(data: IOrderCreateRes | null): void {
    this.decoration.next(data);
  }
}
