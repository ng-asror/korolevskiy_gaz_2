import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrductCard } from './prduct-card';

describe('PrductCard', () => {
  let component: PrductCard;
  let fixture: ComponentFixture<PrductCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrductCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrductCard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
