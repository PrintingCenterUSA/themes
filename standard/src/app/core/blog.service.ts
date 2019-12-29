//
// Version 1.0.0
// Version 1.0.1 - added contact and showMessage
// Version 1.0.2 - added categories
// Version 1.0.3 - added recent posts
// Version 1.0.4 - added featured posts
// Version 1.0.5 - added theme data
// Version 1.0.6 - added get user
//
import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
	providedIn: 'root'
})
export class BlogService {
	constructor(private http: HttpClient, private route: ActivatedRoute) { }

	securityObject: AppUserAuth = new AppUserAuth();

	getPosts(): Observable<IPostList> {
		var postsUrl = environment.apiEndpoint + '/api/posts?include=FP&page=1';
		var searchUrl = environment.apiEndpoint + '/api/posts/front-search/';

		var page = this.route.snapshot.queryParamMap.get('page');
		var author = this.route.snapshot.queryParamMap.get('author');
		var category = this.route.snapshot.queryParamMap.get('category');
		var term = this.route.snapshot.queryParamMap.get('term');
		var pageId = this.route.snapshot.queryParamMap.get('pageId');
		var slug = this.route.snapshot.queryParamMap.get('slug');
		if (page) {
			postsUrl = environment.apiEndpoint + '/api/posts?include=FP&page=' + page;
		}

		if (author) {
			postsUrl += '&author=' + author;
		}

		if (category) {
			postsUrl += '&category=' + category;
		}

		//Search in Home page, search all posts
		if(slug === "home")
		{
			return this.http.get<IPostList>(searchUrl + term).pipe(
				tap(data => this.logMessage('Search: ' + JSON.stringify(data))),
				catchError(this.handleError)
			);
		}
		else if (term) {
			return this.http.get<IPostList>(searchUrl + term+"?currentPageId="+pageId).pipe(
				tap(data => this.logMessage('Search: ' + JSON.stringify(data))),
				catchError(this.handleError)
			);
		}
		else {
			return this.http.get<IPostList>(postsUrl).pipe(
				tap(data => this.logMessage('Posts: ' + JSON.stringify(data))),
				catchError(this.handleError)
			);
		}
	}

	getRecent(): Observable<IPostList> {
		var postsUrl = environment.apiEndpoint + '/api/posts?include=FP&page=1';
		return this.http.get<IPostList>(postsUrl).pipe(
			tap(data => this.logMessage('Recent posts: ' + JSON.stringify(data))),
			catchError(this.handleError)
		);
	}

	getFeatured(): Observable<IPostList> {
		var postsUrl = environment.apiEndpoint + '/api/posts?include=F&page=1';
		return this.http.get<IPostList>(postsUrl).pipe(
			tap(data => this.logMessage('Featured posts: ' + JSON.stringify(data))),
			catchError(this.handleError)
		);
	}

	getPopular(): Observable<IPostList> {
		var postsUrl = environment.apiEndpoint + '/api/posts/popular';
		return this.http.get<IPostList>(postsUrl).pipe(
			tap(data => this.logMessage('Popular posts: ' + JSON.stringify(data))),
			catchError(this.handleError)
		);
	}

	getPost(slug: string): Observable<IPostModel> {
		var url = environment.apiEndpoint + '/api/posts/byslug/' + slug;
		return this.http.get<IPostModel>(url).pipe(
			tap(data => this.logMessage('Blog post: ' + JSON.stringify(data))),
			catchError(this.handleError)
		);
	}

	getSettings(): Observable<IBlogSettings> {
		var url = environment.apiEndpoint + '/api/settings';
		return this.http.get<IBlogSettings>(url).pipe(
			tap(data => this.logMessage('Settings: ' + JSON.stringify(data))),
			catchError(this.handleError)
		);
	}
	getPageCatalog(): Observable<IPageCatalog> {
		var url = environment.apiEndpoint + '/api/posts/pageCatalog';
		return this.http.get<IPageCatalog>(url).pipe(
			tap(data => this.logMessage('PageCatalog: ' + JSON.stringify(data))),
			catchError(this.handleError)
		);
	}

	getAuthors(): Observable<IAuthor> {
		var url = environment.apiEndpoint + '/api/authors';
		return this.http.get<IAuthor>(url).pipe(
			tap(data => this.logMessage('Authors: ' + JSON.stringify(data))),
			catchError(this.handleError)
		);
	}

	getCategories(): Observable<ICategoryItem[]> {
		var url = environment.apiEndpoint + '/api/posts/categories';
		return this.http.get<ICategoryItem[]>(url).pipe(
			tap(data => this.logMessage('Categories: ' + JSON.stringify(data))),
			catchError(this.handleError)
		);
	}

	subscribe(txt: string): Observable<void> {
		var url = environment.apiEndpoint + '/api/notifications/subscribe';
		return this.http.put<void>(url, {}, { params: { email: txt } }).pipe(
			catchError(this.handleError)
		);
	}

	contact(contact: IContact): Observable<void> {
		var url = environment.apiEndpoint + '/api/notifications/contact';
		return this.http.post<void>(url, contact).pipe(
			catchError(this.handleError)
		);
	}

	getThemeData(): Observable<any> {
		return this.http.get(environment.themeData);
	}

	getUser(): Observable<AppUserAuth> {
		var url = environment.apiEndpoint + '/api/security/user';
		return this.http.get<AppUserAuth>(url).pipe(
			catchError(this.handleError)
		);
  }

	// simple alert, customize for your needs here
	// for example, display toastr notification etc
	showMessage(msg: string, reload: boolean = false) {
		alert(msg);
		if (reload) {
			setTimeout(function () { location.reload(); }, 2000);
		}
	}

	private logMessage(msg: string) {
		if (!environment.production) {
			console.log(msg);
		}
	}

	private handleError(err: HttpErrorResponse) {
		let errorMessage = '';
		if (err.error instanceof ErrorEvent) {
			errorMessage = `An error occurred: ${err.error.message}`;
		} else {
			errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
		}
		console.error(errorMessage);
		return throwError(errorMessage);
	}
}

export interface IBlogSettings {
	title: string,
	description: string,
	itemsPerPage: number,
	cover: string,
	logo: string,
	theme: string,
	culture: string
}
export interface IPageCatalog {
	page:IBlogPost,
	children:any
}

export interface IBlogPost {
	id: number;
	title: string;
	description: string;
	content: string;
	published: string;
	categories: string;
	slug: string;
	author: IAuthor;
	cover: string;
	url:string;
}

export interface IPager {
	currentPage: number;
	itemsPerPage: number;
	total: number;
	notFound: boolean;
	newer: number;
	showNewer: boolean;
	older: number;
	showOlder: boolean;
	linkToNewer: string;
	linkToOlder: string;
	routeValue: string;
	lastPage: number;
}

export interface IPostList {
	posts: IBlogPost[];
	pager: IPager;
}

export interface IPostModel {
	blog: IBlogSettings;
	post: IBlogPost;
	older: IBlogPost;
	newer: IBlogPost;
}

export interface IAuthor {
	id: number;
	appUserName: string;
	email: string;
	displayName: string;
	bio: string;
	avatar: string;
	isAdmin: boolean;
	created: string;
}

export interface IContact {
	name: string;
	email: string;
	content: string;
}

export interface ICategoryItem {
	category: string;
	PostCount: number;
}

export class AppUser {
	userName: string = "";
	password: string = "";
}

export class AppUserAuth {
	userName: string = "";
	isAuthenticated: boolean = false;
	isAdmin: boolean = false;
}