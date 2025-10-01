import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Numberifier } from './numberifier';

describe('Numberifier', () => {
  let component: Numberifier;
  let fixture: ComponentFixture<Numberifier>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Numberifier]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Numberifier);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
