import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RepeaterShifter } from './repeater-shifter';

describe('RepeaterShifter', () => {
  let component: RepeaterShifter;
  let fixture: ComponentFixture<RepeaterShifter>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RepeaterShifter]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RepeaterShifter);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
