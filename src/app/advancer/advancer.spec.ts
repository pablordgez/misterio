import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Advancer } from './advancer';

describe('Advancer', () => {
  let component: Advancer;
  let fixture: ComponentFixture<Advancer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Advancer]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Advancer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
