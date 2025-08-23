import { Component, inject, input, resource } from '@angular/core';
import { Accessor, Counter, Telegram } from '../../../../../../core';
import { firstValueFrom } from 'rxjs';
import { AsyncPipe, NgIf } from '@angular/common';
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
export class AccessorCard {
  private accessorService = inject(Accessor);
  protected counterService = inject(Counter);
  private telegram = inject(Telegram);
  getAccessor = input.required<IAccessorOne>({
    alias: 'accessor',
  });
  protected async kupit(product_id: string): Promise<void> {
    const tg_id = await this.telegram.getUserLocalId();
    await firstValueFrom(this.accessorService.kupit(tg_id, product_id));
  }
}
