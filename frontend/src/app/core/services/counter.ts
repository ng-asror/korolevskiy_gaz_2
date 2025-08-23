import { inject, Injectable, resource } from '@angular/core';
import { Basket } from './basket';
import { firstValueFrom } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class Counter {
  private basketService = inject(Basket);
  basket = resource({
    loader: () => firstValueFrom(this.basketService.localBasket$),
  });
  isCounted(product_id: number): { counted: boolean; quantity: number } {
    let counter = { counted: false, quantity: 0 };
    this.basketService.localBasket$.subscribe({
      next: (basket) => {
        if (basket) {
          const item =
            basket.azots.find((i) => i.product_id === product_id) ||
            basket.accessories.find((i) => i.product_id === product_id);
          if (item) {
            counter = { counted: true, quantity: item.quantity };
          }
        }
      },
    });
    return counter;
  }
}
