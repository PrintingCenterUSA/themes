import { Component, OnInit, Input,EventEmitter, Output } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { ArgumentType } from '@angular/compiler/src/core';

@Component({
  selector: 'nav-menu-item-mobile',
  templateUrl: './nav-menu-item-mobile.component.html',
  styleUrls: ['./nav-menu-item-mobile.component.css']
})
export class NavMenuItemMobileComponent implements OnInit {
  @Input('data') data: any;
  @Input('level') level:number;
  @Output()
  itemSelected: EventEmitter<any> = new EventEmitter();
  hideChildren:boolean;
  navigationSubscription:any;
  activeUrl:string;

  constructor(private router: Router) { 
    
  }

  ngOnInit() {
    this.hideChildren = true;
    if(this.data.page.url == 'page/ordering')
    {
      //debugger;
      console.log('page/ordering ngOnInit');
    }
    if(!this.activeUrl)
    {
      var locationPath = location.pathname;
      if(locationPath.indexOf("/help") === 0 && locationPath != '/help')
      {
        locationPath = locationPath.substring(5);
      }
      this.activeUrl = locationPath;
    }
    this.calculateHideChildreBaseOnUrl();
    this.navigationSubscription = this.router.events.subscribe((e: any) => {
      // If it is a NavigationEnd event re-initalise the component
      if (e instanceof NavigationEnd) {
        this.activeUrl = e.url;
        /*
        setTimeout(() => {
          this.calculateHideChildreBaseOnUrl();
        }, 2000);
        */
       this.calculateHideChildreBaseOnUrl();
       
      }
    });
  }
  ngOnDestroy() {
    if (this.navigationSubscription) {
      this.navigationSubscription.unsubscribe();
    }
  }
  toggle(event:any)
  {
    event.stopPropagation();
    this.hideChildren = !this.hideChildren;
  }
  parentLinkClickHandler(event):void
  {
    event.stopPropagation();
    if(this.hideChildren)
    {
      let postData = this.data.children[0];
      if(this.data.children[0].children.length > 0)
      {
        postData =  this.data.children[0].children[0];
      }
      this.router.navigate([postData.page.url]);
      this.itemSelected.emit(postData);
    }else{
      this.hideChildren = true;
      event.preventDefault();
    }
  }
  itemSelectHandler()
  {
    if(this.data.children.length == 0)
    {
      this.itemSelected.emit(this.data);
    }
  }
  itemSelectedProxyHandler(event:any)
  {
    this.itemSelected.emit(event);
  }
  click(event:any)
  {
    event.stopPropagation();
  }
  calculateHideChildreBaseOnUrl()
  {
    /*
    if(this.currentPage)
    {
      this.hideChildren = false;
      return
    }

    if(this.hideChildren)
    {
      return
    }*/
    //console.log("this.activeUrl:"+this.activeUrl+ " this.data:"+this.data);
    if(this.activeUrl && this.data && this.data.page)
    {
     
      this.hideChildren =  this.activeUrl.indexOf(this.data.page.url) == -1;
      if(!this.hideChildren)
      {
        console.log("this.activeUrl:"+this.activeUrl+" this.data.page.url:"+this.data.page.url)
      }
    }else{
      this.hideChildren = true;
    }
  }

  get currentPage():boolean
  {
    return '/'+this.data.page.url === this.activeUrl
  }
}
