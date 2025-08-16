import { NgClass } from '@angular/common';
import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-azot-block',
  imports: [NgClass],
  templateUrl: './azot-block.html',
  styleUrl: './azot-block.scss',
})
export class AzotBlock {
  protected desc = signal<boolean>(false);
}
