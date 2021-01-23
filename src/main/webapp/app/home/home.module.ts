import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SimpleApp2SharedModule } from 'app/shared/shared.module';
import { HOME_ROUTE } from './home.route';
import { HomeComponent } from './home.component';

@NgModule({
  imports: [SimpleApp2SharedModule, RouterModule.forChild([HOME_ROUTE])],
  declarations: [HomeComponent],
})
export class SimpleApp2HomeModule {}
