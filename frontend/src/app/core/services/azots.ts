import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Azots {
  private endpoint: string = 'public/azots';
  constructor(private http: HttpClient) {}
}
