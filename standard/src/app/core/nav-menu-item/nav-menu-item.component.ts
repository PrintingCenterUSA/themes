import { Component, OnInit, Input } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'nav-menu-item',
  templateUrl: './nav-menu-item.component.html',
  styleUrls: ['./nav-menu-item.component.css']
})
export class NavMenuItemComponent implements OnInit {
  @Input('data') data: any;
  @Input('level') level:number;
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
      this.activeUrl = location.pathname;
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
