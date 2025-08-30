import {
  Component,
  effect,
  inject,
  input,
  OnInit,
  output,
  signal,
} from '@angular/core';
import { IBasketAccessory, IBasketAzot } from '../../../../core/interfaces';
import { NgClass, NgIf } from '@angular/common';
import { Accessor, Telegram } from '../../../../core';
import { Azot } from '../../../../core';
import { firstValueFrom } from 'rxjs';
import { NumberPipe } from '../../../../pipe';
@Component({
  selector: 'app-product-card',
  imports: [NgIf, NgClass, NumberPipe],
  templateUrl: './product-card.html',
  styleUrl: './product-card.scss',
})
export class ProductCard {
  private accessorService = inject(Accessor);
  private azotService = inject(Azot);
  private telegram = inject(Telegram);

  // Inp & Otp
  getProduct = input.required<{
    product: IBasketAzot | IBasketAccessory;
    productType: 'azot' | 'accessor';
  }>({
    alias: 'product',
  });
  getSelectItems = input.required<number[]>({ alias: 'selectItems' });
  protected productState = signal<IBasketAccessory | IBasketAzot | null>(null);

  azotToggle = output<{
    id: number;
    productType: 'azot' | 'aksessuari';
    event: Event;
  }>();

  constructor() {
    effect(() => {
      this.productState.set(this.getProduct().product);
    });
  }

  protected isChecked(product_id: number): boolean {
    return this.getSelectItems().includes(product_id);
  }

  protected toggleItem(
    id: number,
    productType: 'azot' | 'aksessuari',
    event: Event
  ): void {
    const data = { id, productType, event };
    this.azotToggle.emit(data);
  }

  protected async minus(id: number): Promise<void> {
    const tg_id = (await this.telegram.getTgUser()).user.id.toString();
    this.productState.update((val) => {
      if (!val) return val;
      if (val.quantity <= 1) {
        return null;
      }
      return {
        ...val,
        quantity: val.quantity - 1,
      };
    });
    if (this.getProduct().productType === 'accessor')
      await firstValueFrom(this.accessorService.minus(tg_id, id));
    else if (this.getProduct().productType === 'azot') {
      const azot = this.getProduct().product as IBasketAzot;
      firstValueFrom(this.azotService.minus(tg_id, id, azot.price_type_id));
    }
  }
  protected async plus(id: number): Promise<void> {
    const tg_id = (await this.telegram.getTgUser()).user.id.toString();
    this.productState.update((val) => {
      if (!val) return val;
      return {
        ...val,
        quantity: val.quantity + 1,
      };
    });
    if (this.getProduct().productType === 'accessor')
      await firstValueFrom(this.accessorService.kupit(tg_id, id));
    else if (this.getProduct().productType === 'azot') {
      const azot = this.getProduct().product as IBasketAzot;
      firstValueFrom(this.azotService.kupit(tg_id, id, azot.price_type_id));
    }
  }
}
