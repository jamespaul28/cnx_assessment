import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GetluckyComponent } from './getlucky/getlucky.component';
import { ConsumeModalComponent } from './getlucky/consume-modal/consume-modal.component';
import { ConfigFortuneModalComponent } from './getlucky/config-fortune-modal/config-fortune-modal.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { I18nModule } from './i18n/i18n.module';

@NgModule({
  declarations: [AppComponent, GetluckyComponent, ConsumeModalComponent, ConfigFortuneModalComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, FormsModule, FontAwesomeModule, I18nModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
