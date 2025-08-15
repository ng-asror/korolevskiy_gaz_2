import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-layout',
  imports: [RouterLink],
  templateUrl: './layout.html',
  styleUrl: './layout.scss',
})
export class Layout {}
