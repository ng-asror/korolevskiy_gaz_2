import { Component, effect, input, output, signal } from '@angular/core';
import { IBasketAzot } from '../../../../core/interfaces';
import { NgIf } from '@angular/common';
@Component({
  selector: 'app-azot',
  imports: [NgIf],
  templateUrl: './azot.html',
  styleUrl: './azot.scss',
})
export class Azot {
  azot = input.required<IBasketAzot>({ alias: 'azot' });
  getSelectItems = input.required<number[]>({ alias: 'selectItems' });
  protected azotState = signal<IBasketAzot | null>(null);

  azotToggle = output<{
    id: number;
    productType: 'azot' | 'aksessuari';
    event: Event;
  }>();

  constructor() {
    effect(() => {
      this.azotState.set(this.azot());
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

  protected minus(): void {
    this.azotState.update((val) => {
      if (!val) return val;
      if (val.quantity <= 1) {
        return null;
      }
      return {
        ...val,
        quantity: val.quantity - 1,
      };
    });
  }
  protected plus(): void {
    this.azotState.update((val) => {
      if (!val) return val;
      return {
        ...val,
        quantity: val.quantity + 1,
      };
    });
  }
}
