import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LayoutService {
  constructor(private http: HttpClient) {}
  logo = signal<{ img: string; title: string } | null>(null);
}
