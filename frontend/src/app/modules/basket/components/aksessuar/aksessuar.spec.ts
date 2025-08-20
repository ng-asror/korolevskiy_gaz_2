import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Aksessuar } from './aksessuar';

describe('Aksessuar', () => {
  let component: Aksessuar;
  let fixture: ComponentFixture<Aksessuar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Aksessuar]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Aksessuar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
