import { Component, inject } from '@angular/core';
import { Basket } from '../../../../core';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { OformitCard } from '../../components/oformit-card/oformit-card';

@Component({
  selector: 'app-oformit',
  imports: [NgIf, AsyncPipe, OformitCard, NgFor],
  templateUrl: './oformit.html',
  styleUrl: './oformit.scss',
})
export class Oformit {
  private basketService = inject(Basket);
  protected decoration$ = this.basketService.decoration$;
}
