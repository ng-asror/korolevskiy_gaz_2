import { AsyncPipe, CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  inject,
  signal,
  ViewChild,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Basket, Telegram } from '../../../../core';
import { ProductCard } from '../../components';
import { NumberPipe } from '../../../../pipe';
import { debounceTime, firstValueFrom, Subject, tap } from 'rxjs';

@Component({
  selector: 'app-products',
  imports: [CommonModule, ProductCard, NumberPipe, FormsModule, AsyncPipe],
  templateUrl: './products.html',
  styleUrl: './products.scss',
})
export class Products implements AfterViewInit {
  private telegram = inject(Telegram);
  private basketService = inject(Basket);
  private inputSubject = new Subject<string>();
  protected localBasket = this.basketService.localBasket$;
  protected promocode$ = this.basketService.promocode$;
  constructor() {
    this.inputSubject
      .pipe(
        debounceTime(3000),
        tap((res) => {
          this.basketService.promoFind(res);
        })
      )
      .subscribe();
  }
  private orderDataIds!: { azot: number[]; aksessuari: number[] };

  protected inputVal: string = '';
  @ViewChild('allChecked') selectorAllCheked!: ElementRef;
  allChecked: boolean = false;
  selectedItems = signal<number[]>([]);

  protected onToggled(event: {
    id: number;
    productType: 'azot' | 'aksessuari';
    event: Event;
  }): void {
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

  toggleAllChecked() {
    if (this.allChecked) {
      this.localBasket.subscribe({
        next: (res) => {
          if (res) {
            this.orderDataIds = {
              azot: res.azots.map((item) => item.product_id),
              aksessuari: res.accessories.map((item) => item.product_id),
            };
          }
        },
      });
      this.selectedItems.set([
        ...this.orderDataIds.azot,
        ...this.orderDataIds.aksessuari,
      ]);
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
  protected promoInp(value: string): void {
    this.inputSubject.next(value);
  }

  ngAfterViewInit(): void {
    this.selectorAllCheked?.nativeElement!;
  }
}
