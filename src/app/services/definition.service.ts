import { Injectable } from '@angular/core';
import { DefinitionModel } from '../models/definition.model';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DefinitionService {

  listDefinition : DefinitionModel[];
  listDefinitionSubject = new Subject<DefinitionModel[]>();

  emitListDefinitionSubject(){
    this.listDefinitionSubject.next(this.listDefinition.slice());
  }
 
  constructor(private httpClient: HttpClient) { }

  getAllDefinitionsByWord() {}

  getAllDefinitions() {
    this.httpClient
      .get<any[]>('http://localhost:3000/api/definitions')
      .subscribe(
        (response) => {
          
          this.listDefinition = response;
          /*
          .map(item => new DefinitionModel(
            item.nature,
            item.description,
            item.plural,
            item.idWord,
            item.id
          ));
          this.emitListDefinitionSubject();
            */
        },
        (error) => {
          console.log('Erreur ! : ' + error);
        }
      );
  }
 
  getDefinitionById(idDefinition : number) {
    return this.httpClient
      .get<any>('http://localhost:3000/api/definitions/'+idDefinition)
  }

  addDefinition(definition : DefinitionModel) {
    return this.httpClient
      .post<any>('http://localhost:3000/api/definitions', definition);
  }

  updateDefinition(definition : DefinitionModel) {
    return this.httpClient
      .put<any>('http://localhost:3000/api/definitions/'+definition.id, definition);    
  }

  deleteDefinition(idDefinition : number) {
    return this.httpClient
      .delete("http://localhost:3000/api/definitions/"+idDefinition);
  }

}
