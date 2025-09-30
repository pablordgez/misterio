import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Rotator } from './rotator';

describe('Rotator', () => {
  let component: Rotator;
  let fixture: ComponentFixture<Rotator>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Rotator]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Rotator);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
