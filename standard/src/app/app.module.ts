import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthGuard } from './core/auth.guard';

import { HomeComponent } from './home/home.component';
import { PostsComponent } from './posts/posts.component';
import { FooterComponent } from './shared/footer/footer.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { ContactComponent } from './core/contact/contact.component';
import { NewsletterComponent } from './core/newsletter/newsletter.component';
import { CategoriesComponent } from './core/categories/categories.component';
import { RecentpostsComponent } from './core/recentposts/recentposts.component';
import { SocialbuttonsComponent } from './core/socialbuttons/socialbuttons.component';
import { SettingsComponent } from './settings/settings.component';
import { NavMenuComponent } from './core/nav-menu/nav-menu.component';
import { NavMenuItemComponent } from './core/nav-menu-item/nav-menu-item.component';
import { SearchComponent } from './search/search.component';
import { NavMenuMobileComponent } from './core/nav-menu-mobile/nav-menu-mobile.component';
import { NavMenuItemMobileComponent } from './core/nav-menu-item-mobile/nav-menu-item-mobile.component';
import { EmitService } from './service/EmitService';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PostsComponent,
    FooterComponent,
		NotfoundComponent,
		ContactComponent,
		NewsletterComponent,
		CategoriesComponent,
		RecentpostsComponent,
		SearchComponent,
		SocialbuttonsComponent,
		SettingsComponent,
    NavMenuComponent,
    NavMenuItemComponent,
    NavMenuMobileComponent,
    NavMenuItemMobileComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [AuthGuard,EmitService],
  bootstrap: [AppComponent]
})
export class AppModule { }