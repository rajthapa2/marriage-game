import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaalEntryComponent } from './maal-entry.component';

describe('MaalEntryComponent', () => {
  let component: MaalEntryComponent;
  let fixture: ComponentFixture<MaalEntryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MaalEntryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MaalEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
