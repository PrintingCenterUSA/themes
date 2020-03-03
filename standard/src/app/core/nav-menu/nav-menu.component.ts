import { Component, OnInit, Input } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent implements OnInit {
  @Input('data') data: Array<Object>;
  @Input('level') level:number;
  @Input('isRoot') isRoot:boolean;
  navigationSubscription:any;
  activeUrl:string;
  constructor(private router: Router) { 
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
}
