import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LevelEditComponent } from './level-edit/level-edit.component';
import { LevelListComponent } from './level-list/level-list.component';
import { WordEditComponent } from './word-edit/word-edit.component';
import { WordListComponent } from './word-list/word-list.component';

const routes: Routes = [
  // { path: '', component: LevelListComponent },
  { path: 'levels', component: LevelListComponent },
  { path: 'level-add', component: LevelEditComponent },
  { path: 'level-edit/:id', component: LevelEditComponent },
  { path: 'words', component: WordListComponent },
  { path: 'word-add', component: WordEditComponent },
  { path: 'word-edit/:id', component: WordEditComponent },
  // { path: '**', component: PageNotFoundComponent },  // Wildcard route for a 404 page
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
