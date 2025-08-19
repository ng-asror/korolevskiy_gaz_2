import { AsyncPipe, CommonModule, NgForOf, NgIf } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  inject,
  OnInit,
  resource,
  ViewChild,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Basket, Telegram } from '../../../../core';
import { firstValueFrom } from 'rxjs';
import { IBasket } from '../../../../core/interfaces';

@Component({
  selector: 'app-products',
  imports: [CommonModule, FormsModule],
  templateUrl: './products.html',
  styleUrl: './products.scss',
})
export class Products implements OnInit, AfterViewInit {
  private telegram = inject(Telegram);
  private basketService = inject(Basket);

  orderDataIds = {
    azot: [] as string[],
    aksessuari: [] as string[],
  };

  basket = resource({
    loader: async () => {
      const tg_id = await this.telegram.getUserLocalId();
      return firstValueFrom(this.basketService.getBasket(tg_id));
    },
  });

  @ViewChild('allChecked') selectorAllCheked!: ElementRef;
  allChecked: boolean = false;
  selectedItems: string[] = [];

  isChecked(value: string): boolean {
    return this.selectedItems.includes(value);
  }
  toggleItem(value: string, category: 'azot' | 'aksessuari', event: Event) {
    const isChecked = (event.target as HTMLInputElement).checked;

    if (isChecked) {
      this.selectedItems.push(value);
      this.orderDataIds[category].push(value);
    } else {
      this.selectedItems = this.selectedItems.filter((v) => v !== value);
      this.orderDataIds[category] = this.orderDataIds[category].filter(
        (v) => v !== value
      );
    }
  }

  ngOnInit(): void {}

  toggleAllChecked() {
    if (this.allChecked) {
      this.orderDataIds = {
        azot: this.basket
          .value()!
          .data.azots.map((item) => item.product_id.toString()),
        aksessuari: this.basket
          .value()!
          .data.accessories.map((item) => item.product_id.toString()),
      };
      this.selectedItems = [
        ...this.orderDataIds.azot,
        ...this.orderDataIds.aksessuari,
      ];
    } else {
      this.orderDataIds = {
        azot: [],
        aksessuari: [],
      };
      this.selectedItems = [];
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
