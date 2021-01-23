import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import './vendor';
import { SimpleApp2SharedModule } from 'app/shared/shared.module';
import { SimpleApp2CoreModule } from 'app/core/core.module';
import { SimpleApp2AppRoutingModule } from './app-routing.module';
import { SimpleApp2HomeModule } from './home/home.module';
import { SimpleApp2EntityModule } from './entities/entity.module';
// jhipster-needle-angular-add-module-import JHipster will add new module here
import { MainComponent } from './layouts/main/main.component';
import { NavbarComponent } from './layouts/navbar/navbar.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { PageRibbonComponent } from './layouts/profiles/page-ribbon.component';
import { ErrorComponent } from './layouts/error/error.component';

@NgModule({
  imports: [
    BrowserModule,
    SimpleApp2SharedModule,
    SimpleApp2CoreModule,
    SimpleApp2HomeModule,
    // jhipster-needle-angular-add-module JHipster will add new module here
    SimpleApp2EntityModule,
    SimpleApp2AppRoutingModule,
  ],
  declarations: [MainComponent, NavbarComponent, ErrorComponent, PageRibbonComponent, FooterComponent],
  bootstrap: [MainComponent],
})
export class SimpleApp2AppModule {}
