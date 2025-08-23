import { Component, inject, input, OnInit } from '@angular/core';
import { Accessor, Counter, Telegram } from '../../../../../../core';
import { firstValueFrom } from 'rxjs';
import { NgIf } from '@angular/common';
export interface IAccessorOne {
  id: number;
  title: string;
  price: string;
  image: any;
  description: string;
  status: string;
  created_at: string;
  updated_at: string;
  image_url: any;
}
@Component({
  selector: 'app-accessor-card',
  imports: [NgIf],
  templateUrl: './accessor-card.html',
  styleUrl: './accessor-card.scss',
})
export class AccessorCard implements OnInit {
  private accessorService = inject(Accessor);
  protected counterService = inject(Counter);
  private telegram = inject(Telegram);

  tg_id: string = '';
  getAccessor = input.required<IAccessorOne>({
    alias: 'accessor',
  });

  async ngOnInit(): Promise<void> {
    this.tg_id = await this.telegram.getUserLocalId();
  }

  protected async kupit(product_id: number): Promise<void> {
    await firstValueFrom(this.accessorService.kupit(this.tg_id, product_id));
  }

  protected async minus(product_id: number): Promise<void> {
    const tg_id = await this.telegram.getUserLocalId();
    await firstValueFrom(this.accessorService.minus(tg_id, product_id)).then(
      () => {
        this.counterService.isCounted(product_id);
      }
    );
  }
}
