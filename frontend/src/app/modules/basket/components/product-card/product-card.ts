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
import { Accessor, Basket, Telegram } from '../../../../core';
import { Azot } from '../../../../core';
import { firstValueFrom } from 'rxjs';
@Component({
  selector: 'app-product-card',
  imports: [NgIf, NgClass],
  templateUrl: './product-card.html',
  styleUrl: './product-card.scss',
})
export class ProductCard implements OnInit {
  private accessorService = inject(Accessor);
  private azotService = inject(Azot);
  private telegram = inject(Telegram);

  private tg_id = signal<string>('');

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

  async ngOnInit(): Promise<void> {
    this.tg_id.set(await this.telegram.getUserLocalId());
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
      await firstValueFrom(this.accessorService.minus(this.tg_id(), id));
    else if (this.getProduct().productType === 'azot') {
      const azot = this.getProduct().product as IBasketAzot;
      firstValueFrom(
        this.azotService.minus(this.tg_id(), id, azot.price_type_id)
      );
    }
  }
  protected async plus(id: number): Promise<void> {
    this.productState.update((val) => {
      if (!val) return val;
      return {
        ...val,
        quantity: val.quantity + 1,
      };
    });
    if (this.getProduct().productType === 'accessor')
      await firstValueFrom(this.accessorService.kupit(this.tg_id(), id));
    else if (this.getProduct().productType === 'azot') {
      const azot = this.getProduct().product as IBasketAzot;
      firstValueFrom(
        this.azotService.kupit(this.tg_id(), id, azot.price_type_id)
      );
    }
  }
}
