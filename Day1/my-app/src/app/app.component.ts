import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { NavComponent } from './nav/nav.component';
import { ContentComponent } from './content/content.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    NgModule,
    AppComponent,
    HeaderComponent,
    FooterComponent,
    NavComponent,
    ContentComponent
  ],
  imports: [BrowserModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
export { AppComponent };

