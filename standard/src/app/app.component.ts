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
				//Redirect to the first page
				if(window.location.pathname.indexOf("page/") == -1)
				{
					if(this.pageCatalog && this.pageCatalog.children.length > 0)
					{
						this.router.navigateByUrl("page/"+this.pageCatalog.children[0].page.slug);
					}				
				}else{

				}				
			}
		);
  }

  onSubmit(f: NgForm) {
    if(f.value && f.value.term){
      window.location.href = '?term=' + f.value.term;
    }
  }
}