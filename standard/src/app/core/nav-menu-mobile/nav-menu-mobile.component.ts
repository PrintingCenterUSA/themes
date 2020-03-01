import { Component, OnInit, Input,EventEmitter, Output } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'nav-menu-mobile',
  templateUrl: './nav-menu-mobile.component.html',
  styleUrls: ['./nav-menu-mobile.component.css']
})
export class NavMenuMobileComponent implements OnInit {
  @Input('data') data: Array<Object>;
  @Input('level') level:number;
  @Input('isRoot') isRoot:boolean;
  @Output()
  itemSelectedProxy: EventEmitter<any> = new EventEmitter();
  navigationSubscription:any;
  activeUrl:string;
  currentPageName:string;
  open:boolean;

  constructor(private router: Router) { 
  }

  ngOnInit() {
    this.currentPageName = "Help Center: Home";
    this.open = false;
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
  toggle(){
    this.open = !this.open;
  }
  itemSelectedHandler(event:any)
  {
    if(this.isRoot)
    {
      this.open = false;
      this.currentPageName = event.page.navHeader;
      if(this.currentPageName === 'Home')
      {
        this.currentPageName = "Help Center: "+this.currentPageName;
      }
    }else{
      this.itemSelectedProxy.emit(event);
    }
   
  }
  gotoHomeHandler()
  {
    this.currentPageName = "Help Center: Home";
    this.open = false;
  }
}
