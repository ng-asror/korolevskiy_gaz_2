import { Component, inject, OnInit } from '@angular/core';
import { Order, Telegram } from '../../core';
import { firstValueFrom } from 'rxjs';
import { OrderCard } from './components';
import { AsyncPipe, NgForOf, NgIf } from '@angular/common';

@Component({
  selector: 'app-orders',
  imports: [OrderCard, NgIf, NgForOf, AsyncPipe],
  templateUrl: './orders.html',
  styleUrl: './orders.scss',
})
export class Orders implements OnInit {
  private telegram = inject(Telegram);
  private ordersService = inject(Order);
  protected orders$ = this.ordersService.orders$;

  async ngOnInit(): Promise<void> {
    const tgUser = await this.telegram.getTgUser();
    await firstValueFrom(
      this.ordersService.myOrders(tgUser.user.id.toString())
    );
  }
}
