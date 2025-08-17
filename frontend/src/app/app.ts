import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Telegram } from './core';
import { Login } from './core/services/login';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App implements OnInit {
  private telegram = inject(Telegram);
  private loginService = inject(Login);

  protected readonly title = signal('frontend');

  async ngOnInit(): Promise<void> {
    this.telegram.init('#fecc68');
    const isLoggedIn = await this.loginService.isLoggedIn();
    if (!isLoggedIn) {
      await this.auth();
    }
  }

  private async auth(): Promise<void> {
    firstValueFrom(
      this.loginService.login({
        tg_id: String(this.telegram.getTgUser().user.id),
        username: this.telegram.getTgUser().user.username,
      })
    );
  }
}
