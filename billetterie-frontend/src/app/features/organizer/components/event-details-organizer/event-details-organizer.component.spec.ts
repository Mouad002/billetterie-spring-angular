import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventDetailsOrganizerComponent } from './event-details-organizer.component';

describe('EventDetailsOrganizerComponent', () => {
  let component: EventDetailsOrganizerComponent;
  let fixture: ComponentFixture<EventDetailsOrganizerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EventDetailsOrganizerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EventDetailsOrganizerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
