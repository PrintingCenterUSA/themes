import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { PostsComponent } from './posts/posts.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { SettingsComponent } from './settings/settings.component';
import { AuthGuard } from './core/auth.guard';
import { SearchComponent } from './search/search.component';


const routes: Routes = [
	{ path: '', component: HomeComponent },
	{ path: 'search', component: SearchComponent },
	{ path: 'page/:slug0', component: PostsComponent },
	{ path: 'page/:slug0/:slug1', component: PostsComponent },
	{ path: 'page/:slug0/:slug1/:slug2', component: PostsComponent },
	{ path: 'page/:slug0/:slug1/:slug2/:slug3', component: PostsComponent },
	{ path: 'page/:slug0/:slug1/:slug2/:slug3/:slug4', component: PostsComponent },
	{
		path: 'settings',
		component: SettingsComponent,
		canActivate: [AuthGuard],
		data: { claimType: 'isAdmin' }
	},
	{ path: '**', component: NotfoundComponent }
];

@NgModule({
	imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
	exports: [RouterModule]
})
export class AppRoutingModule { }