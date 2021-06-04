import { Injectable } from '@angular/core';
import { WordModel } from '../models/word.model';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WordService {
  
  constructor(private httpClient: HttpClient) { }

  getAllWords() {
    return this.httpClient
      .get<any[]>('http://localhost:3000/api/words');
  }
  /*
  getAllWords() {
    this.httpClient
      .get<any[]>('http://localhost:3000/api/words')
      .subscribe(
        (response) => {
          this.listWord = response.map(item => new WordModel(
            item.name,
            item.idLevel,
            item.id
          ));
          this.emitListWordSubject();
        },
        (error) => {
          console.log('Erreur ! : ' + error);
        }
      );
  }
*/
  getWordById(idWord : number) {
    return this.httpClient
      .get<any>('http://localhost:3000/api/word/'+idWord)
  }

  addWord(word : WordModel) {
    return this.httpClient
      .post<any>('http://localhost:3000/api/word/', word);
  }

  updateWord(word : WordModel) {
    return this.httpClient
      .put<any>('http://localhost:3000/api/word/'+word.id, word);    
  }

  deleteWord(idWord : number) {
    return this.httpClient
      .delete("http://localhost:3000/api/word/"+idWord);
  }

}
