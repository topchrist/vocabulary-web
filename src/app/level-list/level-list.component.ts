import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { LevelModel } from '../models/level.model';
import { LevelService } from '../services/level.service';

@Component({
  selector: 'app-level-list',
  templateUrl: './level-list.component.html',
  styleUrls: ['./level-list.component.css']
})
export class LevelListComponent implements OnInit, OnDestroy {

  loading = false;
  levels: LevelModel[];
   listLevelSubscription : Subscription;
  
  constructor(private levelService : LevelService) { }
  ngOnInit(): void {
    this.loading = true;
    this. listLevelSubscription = this.levelService.listLevelSubject.subscribe(
      (levels: LevelModel[]) => {
        this.levels = levels
      }
    );
    this.levelService.getAllLevels();
    this.loading = false;
  }

  ngOnDestroy(): void {
    this. listLevelSubscription.unsubscribe();
  }

  deleteLevel(id: number) {
    this.loading = true;
    this.levelService.deleteLevel(id)
    .subscribe( data =>{
      console.log("ok deleting");
      this.levelService.getAllLevels();
    });
    
    this.loading = false;
}


}
