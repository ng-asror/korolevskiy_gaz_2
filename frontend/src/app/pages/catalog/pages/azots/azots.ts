import { Component } from '@angular/core';
import { AzotBlock } from '../../components';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-azots',
  imports: [AzotBlock, RouterLink],
  templateUrl: './azots.html',
  styleUrl: './azots.scss',
})
export class Azots {}
