import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogicFlowComponent } from './logic-flow.component';

describe('LogicFlowComponent', () => {
  let component: LogicFlowComponent;
  let fixture: ComponentFixture<LogicFlowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LogicFlowComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LogicFlowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
