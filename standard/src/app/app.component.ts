import { Component, OnInit } from '@angular/core';
import { BlogService, IBlogSettings, IPager, IPageCatalog } from './core/blog.service';
import { environment } from '../environments/environment';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

	constructor(private blogService: BlogService,private router: Router) { }

	title = 'standard';
	root: string;
	social: object;
	settings: IBlogSettings;
	pageCatalog:IPageCatalog;
  
  ngOnInit(): void {
		this.root = environment.apiEndpoint;

		this.blogService.getThemeData().subscribe(
			result => { this.social = result.socialButtons; }
		);

		this.blogService.getSettings().subscribe(
			result => { this.settings = result; }
		);
		this.blogService.getPageCatalog().subscribe(
			result => {
				this.pageCatalog = result; 
				this.refreshPageCatalogSessionData();
				//Redirect to the home page				
				if(window.location.pathname.indexOf("page/") == -1 && window.location.pathname.indexOf("search") == -1 )
				{
					this.router.navigateByUrl("page/home");				
				}			
			}
		);
  }
  refreshPageCatalogSessionData():void
  {
	  let hasChildPageIdList = [];
	  this.processPageData(this.pageCatalog,'page',hasChildPageIdList);
	  sessionStorage.setItem("hasChildPageIdList",JSON.stringify(hasChildPageIdList));
  }
  processPageData(catalogData:IPageCatalog,pageUrl:string,outDataList:any):void
  {
	if(catalogData.page)
	{
		pageUrl += "/"+catalogData.page.slug;
		catalogData.page.url = pageUrl;
	}
	  if(catalogData.children.length > 0)
	  {
		if(catalogData.page)
		{
			outDataList.push(catalogData.page.id);
		}		
		catalogData.children.forEach(element => {
			this.processPageData(element,pageUrl,outDataList);
		});
	  }
  }

  onSubmit(f: NgForm) {
    if(f.value && f.value.term){
      window.location.href = '?term=' + f.value.term;
    }
  }
}