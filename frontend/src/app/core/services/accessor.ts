import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IAccessor } from '../interfaces';
import { environment } from '../../../environments/environment.development';
import { Telegram } from './telegram';

@Injectable({
  providedIn: 'root',
})
export class Accessor {
  private telegramService = inject(Telegram);
  private endpoind = 'public';

  constructor(private http: HttpClient) {}

  getAccessors(): Observable<IAccessor> {
    return this.http.get<IAccessor>(
      `${environment.url}/${this.endpoind}/accessories`
    );
  }

  kupit(tg_id: string, product_id: string): Observable<any> {
    return this.http.post<any>(
      `${environment.url}/public/cart/add/accessuary`,
      { tg_id, product_id }
    );
  }
}
