import { Component, OnInit, Input } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'page-catalog',
  templateUrl: './pagecatalog.component.html',
  styleUrls: ['./pagecatalog.component.css']
})
export class PagecatalogComponent implements OnInit {
  @Input('data') items: Array<Object>;
  @Input('key') key: string;
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
  toggle(event:any)
  {
    event.stopPropagation();
    this.hideChildren = !this.hideChildren;
  }
  click(event:any)
  {
    event.stopPropagation();
  }
}
