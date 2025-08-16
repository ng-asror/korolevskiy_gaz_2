import { NgClass, NgForOf } from '@angular/common';
import { Component, input, signal } from '@angular/core';
import { IAzot } from '../../../../core/interfaces/azot';

@Component({
  selector: 'app-azot-block',
  imports: [NgClass, NgForOf],
  templateUrl: './azot-block.html',
  styleUrl: './azot-block.scss',
})
export class AzotBlock {
  protected desc = signal<boolean>(false);

  azotInfo = input.required<IAzot>({ alias: 'azot' });
}
