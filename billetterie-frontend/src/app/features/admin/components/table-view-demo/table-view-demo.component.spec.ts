import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableViewDemoComponent } from './table-view-demo.component';

describe('TableViewDemoComponent', () => {
  let component: TableViewDemoComponent;
  let fixture: ComponentFixture<TableViewDemoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TableViewDemoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableViewDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
