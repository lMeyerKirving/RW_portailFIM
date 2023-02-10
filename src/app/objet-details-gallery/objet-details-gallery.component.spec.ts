import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ObjetDetailsGalleryComponent } from './objet-details-gallery.component';

describe('ObjetDetailsGalleryComponent', () => {
  let component: ObjetDetailsGalleryComponent;
  let fixture: ComponentFixture<ObjetDetailsGalleryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ObjetDetailsGalleryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ObjetDetailsGalleryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
