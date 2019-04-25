import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NetworthComponent } from './networth.component';

describe('NetworthComponent', () => {
  let component: NetworthComponent;
  let fixture: ComponentFixture<NetworthComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NetworthComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NetworthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
