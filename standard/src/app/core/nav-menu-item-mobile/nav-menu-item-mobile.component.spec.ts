import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavMenuItemMobileComponent } from './nav-menu-item-mobile.component';

describe('PagecatalogComponent', () => {
  let component: NavMenuItemMobileComponent;
  let fixture: ComponentFixture<NavMenuItemMobileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavMenuItemMobileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavMenuItemMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
