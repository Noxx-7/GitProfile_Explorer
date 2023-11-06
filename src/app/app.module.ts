import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MyComponentComponent } from './my-component/my-component.component';

@NgModule({
  bootstrap: [AppComponent],
  declarations: [AppComponent, MyComponentComponent],
  imports: [BrowserModule, FormsModule, HttpClientModule],
})
export class AppModule {}
