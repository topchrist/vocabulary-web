import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LevelListComponent } from './level-list/level-list.component';
import { LevelEditComponent } from './level-edit/level-edit.component';
import { WordEditComponent } from './word-edit/word-edit.component';
import { WordListComponent } from './word-list/word-list.component';
import { HttpClientModule } from '@angular/common/http';
import { LevelAddComponent } from './level-add/level-add.component';

@NgModule({
  declarations: [
    AppComponent,
    LevelListComponent,
    LevelEditComponent,
    WordEditComponent,
    WordListComponent,
    LevelAddComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
