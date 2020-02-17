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
		var cacheCatalogDataStr = sessionStorage.getItem('nav_catalog_data');
		if(cacheCatalogDataStr)
		{
			debugger;
			this.pageCatalog = JSON.parse(cacheCatalogDataStr); 
				this.refreshPageCatalogSessionData();
		}
		this.blogService.getPageCatalog().subscribe(
			result => {
				var cacheCatalogDataStr = sessionStorage.getItem('nav_catalog_data');
				if(cacheCatalogDataStr == JSON.stringify(result))
				{
					debugger;
					return;
				}
				sessionStorage.setItem('nav_catalog_data',JSON.stringify(result));
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
	  let urlPageId = {};
	  this.processPageData(this.pageCatalog,'page',hasChildPageIdList,urlPageId);
	  sessionStorage.setItem("hasChildPageIdList",JSON.stringify(hasChildPageIdList));
	  sessionStorage.setItem("urlPageId",JSON.stringify(urlPageId));
  }
  processPageData(catalogData:IPageCatalog,pageUrl:string,outHasChildPageIdList:any,outUrlPageId):void
  {
	if(catalogData.page)
	{
		pageUrl += "/"+catalogData.page.slug;
		catalogData.page.url = pageUrl;
		outUrlPageId[pageUrl] = catalogData.page.id;
	}
	  if(catalogData.children.length > 0)
	  {
		if(catalogData.page)
		{
			outHasChildPageIdList.push(catalogData.page.id);
		}		
		catalogData.children.forEach(element => {
			this.processPageData(element,pageUrl,outHasChildPageIdList,outUrlPageId);
		});
	  }
  }

  onSubmit(f: NgForm) {
    if(f.value && f.value.term){
      window.location.href = '?term=' + f.value.term;
    }
  }
}