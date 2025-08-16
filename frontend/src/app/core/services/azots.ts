import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { IAzot, IAzots } from '../interfaces/azot';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class AzotsService {
  private endpoint: string = 'public/azots';
  constructor(private http: HttpClient) {}

  readonly liters = new BehaviorSubject<{ id: number; liter: string }[]>([]);

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
}
