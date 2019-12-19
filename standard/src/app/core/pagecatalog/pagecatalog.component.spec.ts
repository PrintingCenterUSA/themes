import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PagecatalogComponent } from './pagecatalog.component';

describe('PagecatalogComponent', () => {
  let component: PagecatalogComponent;
  let fixture: ComponentFixture<PagecatalogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PagecatalogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PagecatalogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
