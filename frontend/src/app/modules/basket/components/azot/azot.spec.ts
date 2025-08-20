import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Azot } from './azot';

describe('Azot', () => {
  let component: Azot;
  let fixture: ComponentFixture<Azot>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Azot]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Azot);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
