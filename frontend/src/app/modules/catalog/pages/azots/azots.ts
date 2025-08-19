import { Component, inject, OnInit, output, signal } from '@angular/core';
import { AzotBlock } from '../../components';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AzotsService } from '../../../../core';
import { firstValueFrom } from 'rxjs';
import { AsyncPipe, NgForOf, NgIf } from '@angular/common';
import { IAzot } from '../../../../core/interfaces/azot';

@Component({
	selector: 'app-azots',
	imports: [AzotBlock, RouterLink, NgForOf, AsyncPipe, RouterLinkActive, NgIf],
	templateUrl: './azots.html',
	styleUrl: './azots.scss',
})
export class Azots implements OnInit {
	private azotsService = inject(AzotsService);

	constructor(private router: Router) { }
	protected azotInfo = signal<IAzot | null>(null);
	protected liters$ = this.azotsService.liters.asObservable();

	ngOnInit(): void {
		firstValueFrom(this.azotsService.getAzots()).then((res) => {
			this.router.navigate([], {
				queryParams: { liter: res.data.data[0].id },
			});
			this.selectAzot(res.data.data[0].id);
		});
	}
	protected async selectAzot(id: number): Promise<void> {
		const res = await firstValueFrom(this.azotsService.getAzotInfo(id));
		this.azotInfo.set(res);
	}
}
