import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { Basket, Telegram } from '../core';
import { AsyncPipe, NgIf } from '@angular/common';
import { NumberPipe } from '../pipe';

@Component({
  selector: 'app-layout',
  imports: [
    RouterLink,
    RouterOutlet,
    RouterLinkActive,
    NgIf,
    AsyncPipe,
    NumberPipe,
  ],
  templateUrl: './layout.html',
  styleUrl: './layout.scss',
})
export class Layout {
  private telegram = inject(Telegram);
  private basketService = inject(Basket);
  protected basket = this.basketService.localBasket$;
  protected soft(): void {
    this.telegram.hapticFeedback('light');
  }
}
