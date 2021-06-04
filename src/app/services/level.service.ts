import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LevelModel } from '../models/level.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LevelService {

  listLevel : LevelModel[];
  level : LevelModel;

  listLevelSubject = new Subject<LevelModel[]>();
  levelSubject = new Subject<LevelModel>();

  emitListlevelSubject(){
    this.listLevelSubject.next(this.listLevel.slice());
  }
  emitlevelSubject(){
    this.levelSubject.next(this.level);
  }

  constructor(private httpClient: HttpClient) { }

  getAllLevels() {
    this.httpClient
      .get<any[]>('http://localhost:3000/api/levels')
      .subscribe(
        (response) => {
          this.listLevel = response.map(item => new LevelModel(
            item.order,
            item.name,
            item.description,
            item.id
          ));
          this.emitListlevelSubject();
        },
        (error) => {
          console.log('Erreur ! : ' + error);
        }
      );
  }

  getLevelById(idLevel : number) {
    return this.httpClient
      .get<any>('http://localhost:3000/api/levels/'+idLevel)
  }

  addLevel(level : LevelModel) {
    return this.httpClient
      .post('http://localhost:3000/api/levels', level);
  }

  updateLevel(level : LevelModel) {
    return this.httpClient
      .put('http://localhost:3000/api/levels/'+level.id, level);    
  }

  deleteLevel(idLevel : number) {
    return this.httpClient
      .delete("http://localhost:3000/api/levels/"+idLevel);
  }

}
