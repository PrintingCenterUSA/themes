import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router, NavigationEnd } from '@angular/router';
import { environment } from '../../environments/environment';

import { BlogService, IBlogSettings, IPostModel } from '../core/blog.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html'
})
export class PostsComponent implements OnInit {
  public blogSettings: IBlogSettings;
  public postModel: IPostModel;
  public postCover: string;
  public avatarImg: string;
  errorMessage = '';
  navigationSubscription:any;
  public searchKeyWords:string;
  constructor(private blogService: BlogService, private activeRouter: ActivatedRoute,private router: Router) { }

  ngOnInit(): void {
    this.blogService.getSettings().subscribe(
      result => { 
        this.blogSettings = result;
      },
      error => this.errorMessage = <any>error
    );

    this.navigationSubscription = this.router.events.subscribe((e: any) => {
      // If it is a NavigationEnd event re-initalise the component
      if (e instanceof NavigationEnd) {
        this.loadPageData();
      }
    });
    this.loadPageData();  
    
  }
  ngOnDestroy() {
    if (this.navigationSubscription) {
      this.navigationSubscription.unsubscribe();
    }
  }
  loadPageData():void
  {
    var slug = this.slug;
      if(slug){
        this.blogService.getPost(slug).subscribe(
          result => { 
            this.postModel = result;
            this.postCover = environment.apiEndpoint + '/' + this.postModel.post.cover;
            this.avatarImg = environment.apiEndpoint + '/' + this.postModel.post.author.avatar;
          },
          error => this.errorMessage = <any>error
        );
      }
  }

  toDate(date): string {
    var monthNames = ["January", "February", "March", "April", "May", "June", 
      "July", "August", "September", "October", "November", "December"];
    var d = new Date(date); 
    return monthNames[d.getMonth()] + ' ' + d.getDate() + ', ' + d.getFullYear();
  }
  onSearchEnter(event:any):void
  {
    var slug = this.slug;
    this.router.navigateByUrl("/search?term="+this.searchKeyWords+"&pageId="+this.postModel.post.id+"&slug="+slug);
  }
  get showSearch():boolean
  {
    let show = false;
    var slug = this.slug;
    if(slug === "home")
    {
      show = true;
    }else{
      if(sessionStorage.getItem("hasChildPageIdList"))
      {
        let hasChildPageIdList:any =  JSON.parse(sessionStorage.getItem("hasChildPageIdList"));
        if(this.postModel && hasChildPageIdList.indexOf(this.postModel.post.id) != -1)
        {
          show = true;
        }
      }    
    }
    return show;
  }
  get slug():string
  {
    var slug0 = this.activeRouter.snapshot.paramMap.get('slug0');
    var slug1 = this.activeRouter.snapshot.paramMap.get('slug1');
    var slug2 = this.activeRouter.snapshot.paramMap.get('slug2');
    var slug3 = this.activeRouter.snapshot.paramMap.get('slug3');
    var slug4 = this.activeRouter.snapshot.paramMap.get('slug4');
    if(!slug1)
    {
      return slug0;
    }
    else if(!slug2)
    {
      return slug1;
    }
    else if(!slug3)
    {
      return slug2;
    }
    else if(!slug4)
    {
      return slug3;
    }
    else
    {
      return slug4;
    }
  }
}