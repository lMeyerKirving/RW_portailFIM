import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ObjetDetailsFilesComponent } from './objet-details-files.component';

describe('ObjetDetailsFilesComponent', () => {
  let component: ObjetDetailsFilesComponent;
  let fixture: ComponentFixture<ObjetDetailsFilesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ObjetDetailsFilesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ObjetDetailsFilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
