import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizerLayoutComponentComponent } from './organizer-layout-component.component';

describe('OrganizerLayoutComponentComponent', () => {
  let component: OrganizerLayoutComponentComponent;
  let fixture: ComponentFixture<OrganizerLayoutComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OrganizerLayoutComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrganizerLayoutComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
