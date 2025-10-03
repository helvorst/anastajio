import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Contactdialog } from './contactdialog';

describe('Contactdialog', () => {
  let component: Contactdialog;
  let fixture: ComponentFixture<Contactdialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Contactdialog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Contactdialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
