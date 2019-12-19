import { Component, OnInit } from '@angular/core';
import { BlogService, IBlogSettings, IPager, IPageCatalog } from './core/blog.service';
import { environment } from '../environments/environment';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

	constructor(private blogService: BlogService) { }

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
			result => {this.pageCatalog = result; }
		);
  }

  onSubmit(f: NgForm) {
    if(f.value && f.value.term){
      window.location.href = '?term=' + f.value.term;
    }
  }
}