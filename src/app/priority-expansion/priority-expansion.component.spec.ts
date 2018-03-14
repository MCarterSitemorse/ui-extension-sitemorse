import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PriorityExpansionComponent } from './priority-expansion.component';

describe('PriorityExpansionComponent', () => {
  let component: PriorityExpansionComponent;
  let fixture: ComponentFixture<PriorityExpansionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PriorityExpansionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PriorityExpansionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
