import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketsSelectionComponent } from './tickets-selection.component';

describe('TicketsSelectionComponent', () => {
  let component: TicketsSelectionComponent;
  let fixture: ComponentFixture<TicketsSelectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TicketsSelectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TicketsSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
