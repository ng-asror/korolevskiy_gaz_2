import { CommonModule, NgIf } from '@angular/common';
import {
  AfterViewInit,
  Component,
  effect,
  ElementRef,
  inject,
  OnInit,
  resource,
  signal,
  ViewChild,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Basket, Telegram } from '../../../../core';
import { firstValueFrom } from 'rxjs';
import { IBasket } from '../../../../core/interfaces';
import { Azot, Aksessuar } from '../../components';

@Component({
  selector: 'app-products',
  imports: [CommonModule, FormsModule, Azot, Aksessuar],
  templateUrl: './products.html',
  styleUrl: './products.scss',
})
export class Products implements OnInit, AfterViewInit {
  private telegram = inject(Telegram);
  private basketService = inject(Basket);

  protected localBasket = signal<IBasket | undefined>(undefined);
  protected quantity = this.basketService.quantity();

  constructor() {
    effect(() => {
      const value = this.basket.value()!;
      if (value) {
        this.localBasket.set(value);
      }
    });
  }
  private orderDataIds!: { azot: number[]; aksessuari: number[] };
  basket = resource({
    loader: async () => {
      const tg_id = await this.telegram.getUserLocalId();
      return firstValueFrom(this.basketService.getBasket(tg_id));
    },
  });

  @ViewChild('allChecked') selectorAllCheked!: ElementRef;
  allChecked: boolean = false;
  selectedItems = signal<number[]>([]);

  protected onToggled(event: {
    id: number;
    productType: 'azot' | 'aksessuari';
    event: Event;
  }): void {
    console.log(event);
    const isChecked = (event.event.target as HTMLInputElement).checked;
    if (isChecked) {
      this.selectedItems().push(event.id);
      this.orderDataIds[event.productType].push(event.id);
    } else {
      this.selectedItems.set(
        this.selectedItems().filter((v) => v !== event.id)
      );
      this.orderDataIds[event.productType] = this.orderDataIds[
        event.productType
      ].filter((v) => v !== event.id);
    }
  }

  ngOnInit(): void {}

  toggleAllChecked() {
    if (this.allChecked) {
      this.orderDataIds = {
        azot: this.basket.value()!.data.azots.map((item) => item.product_id),
        aksessuari: this.basket
          .value()!
          .data.accessories.map((item) => item.product_id),
      };
      this.selectedItems.set([
        ...this.orderDataIds.azot,
        ...this.orderDataIds.aksessuari,
      ]);
      console.log(this.selectedItems());
    } else {
      this.orderDataIds = {
        azot: [],
        aksessuari: [],
      };
      this.selectedItems.set([]);
    }
  }

  deleteAll(order_id: string): void {
    // if (
    //   this.order.getValue()!.aksessuari.length ===
    //     this.orderDataIds.aksessuari.length &&
    //   this.order.getValue()!.azot.length === this.orderDataIds.azot.length
    // ) {
    //   this.deleteOrder(order_id).finally(() => {
    //     localStorage.removeItem('order_id');
    //     localStorage.removeItem('checkout');
    //     this.orderService.basketCount.set(0);
    //   });
    // } else if (
    //   this.orderDataIds.aksessuari.length !== 0 ||
    //   this.orderDataIds.azot.length !== 0
    // ) {
    //   this.orderDataIds.aksessuari.forEach(async (item) => {
    //     await firstValueFrom(
    //       this.aksessuarService.deleteAksessuar(order_id, item)
    //     ).then(() => {
    //       this.getOrder(order_id);
    //     });
    //   });
    //   this.orderDataIds.azot.forEach(async (item) => {
    //     await firstValueFrom(this.orderService.deleteAzot(order_id, item)).then(
    //       () => {
    //         this.getOrder(order_id);
    //       }
    //     );
    //   });
    // }
  }

  ngAfterViewInit(): void {
    this.selectorAllCheked?.nativeElement!;
  }
}
