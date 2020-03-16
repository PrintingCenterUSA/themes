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
    if(!this.activeUrl)
    {
      var locationPath = location.pathname;
      if(locationPath.indexOf("/help") === 0 && locationPath != '/help')
      {
        locationPath = locationPath.substring(5);
      }
      this.activeUrl = locationPath;
    }
    this.navigationSubscription = this.router.events.subscribe((e: any) => {
      // If it is a NavigationEnd event re-initalise the component
      if (e instanceof NavigationEnd) {
        this.activeUrl = e.url;
      }
    });
  }
  get isHome()
  {
    return this.activeUrl.indexOf("page/home") != -1;
  }
  ngOnDestroy() {
    if (this.navigationSubscription) {
      this.navigationSubscription.unsubscribe();
    }
  }
}
