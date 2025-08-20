import {
  Component,
  effect,
  inject,
  input,
  OnInit,
  output,
  signal,
} from '@angular/core';
import { IBasketAccessory } from '../../../../core/interfaces';
import { NgIf } from '@angular/common';
import { Accessor, Telegram } from '../../../../core';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-aksessuar',
  imports: [NgIf],
  templateUrl: './aksessuar.html',
  styleUrl: './aksessuar.scss',
})
export class Aksessuar implements OnInit {
  private accessorService = inject(Accessor);
  private telegram = inject(Telegram);
  private tg_id: string = '';
  // Inp & Otp
  aksessuar = input.required<IBasketAccessory>({ alias: 'aksessuar' });
  getSelectItems = input.required<number[]>({ alias: 'selectItems' });
  aksessuarIsChecked = output<{ id: number }>();
  aksessuarToggle = output<{
    id: number;
    productType: 'azot' | 'aksessuari';
    event: Event;
  }>();

  protected aksessuarState = signal<IBasketAccessory | null>(null);
  constructor() {
    effect(() => {
      this.aksessuarState.set(this.aksessuar());
    });
  }

  async ngOnInit(): Promise<void> {
    this.tg_id = await this.telegram.getUserLocalId();
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
    this.aksessuarToggle.emit(data);
  }

  protected minus(product_id: number): void {
    this.aksessuarState.update((val) => {
      if (!val) return val;
      if (val.quantity <= 1) {
        return null;
      }
      return {
        ...val,
        quantity: val.quantity - 1,
      };
    });
    firstValueFrom(
      this.accessorService.minus(this.tg_id, this.aksessuarState()!.product_id)
    );
  }
  protected plus(product_id: number): void {
    this.aksessuarState.update((val) => {
      if (!val) return val;
      return {
        ...val,
        quantity: val.quantity + 1,
      };
    });
    firstValueFrom(this.accessorService.kupit(this.tg_id, String(product_id)));
  }
}
