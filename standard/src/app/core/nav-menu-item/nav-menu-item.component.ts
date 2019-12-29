import { Component, OnInit, Input } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'nav-menu-item',
  templateUrl: './nav-menu-item.component.html',
  styleUrls: ['./nav-menu-item.component.css']
})
export class NavMenuItemComponent implements OnInit {
  @Input('data') data: Array<Object>;
  @Input('level') level:number;
  hideChildren:boolean;
  navigationSubscription:any;
  activeUrl:string;
  constructor(private router: Router) { 
    this.hideChildren = true;
  }

  ngOnInit() {
    this.navigationSubscription = this.router.events.subscribe((e: any) => {
      // If it is a NavigationEnd event re-initalise the component
      if (e instanceof NavigationEnd) {
        this.activeUrl = e.url;
      }
    });
  }
  ngOnDestroy() {
    if (this.navigationSubscription) {
      this.navigationSubscription.unsubscribe();
    }
  }
  toggle(event:any,pageId:any)
  {
    event.stopPropagation();
    this.hideChildren = !this.hideChildren;
  }
  click(event:any)
  {
    event.stopPropagation();
  }
}
