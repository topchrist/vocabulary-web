import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { LevelModel } from '../models/level.model';
import { WordModel } from '../models/word.model';
import { LevelService } from '../services/level.service';
import { WordService } from '../services/word.service';

@Component({
  selector: 'app-word-list',
  templateUrl: './word-list.component.html',
  styleUrls: ['./word-list.component.css']
})

export class WordListComponent implements OnInit {

  loading = false;
  levels: LevelModel[];
  words: WordModel[];
  listLevelSubscription : Subscription;

  constructor(
    private levelService : LevelService, 
    private wordService : WordService,
    ) { }

  ngOnInit(): void {
    this.loading = true;
    this.listLevelSubscription = this.levelService.listLevelSubject.subscribe(
      (levels: LevelModel[]) => {
        this.levels = levels
      }
    );
    this.levelService.getAllLevels();
    this.getAllWord();
    this.loading = false;
  }

  ngOnDestroy(): void {
    this.listLevelSubscription.unsubscribe();
  }

  getAllWord(){
    this.wordService.getAllWords().subscribe(
      (response) => {
        this.words = response;
        console.log(response);
        console.log(this.words);
      },
      (error) => {
        console.log('Erreur ! : ' + error);
      }
    );
  }

  getLevel(idLevel: number){
    for(var level of this.levels){
      if(level.id){
        return level.name;
      }
    }
    return '';
  }

  deleteWord(id: number) {
    this.loading = true;
    this.wordService.deleteWord(id)
    .subscribe(data=>{
      console.log("ok deleting");
      this.getAllWord();
    });
    
    this.loading = false;
  }


}
