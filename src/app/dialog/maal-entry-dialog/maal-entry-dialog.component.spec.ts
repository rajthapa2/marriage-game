import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaalEntryDialogComponent } from './maal-entry-dialog.component';

describe('MaalEntryDialogComponent', () => {
  let component: MaalEntryDialogComponent;
  let fixture: ComponentFixture<MaalEntryDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MaalEntryDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MaalEntryDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
