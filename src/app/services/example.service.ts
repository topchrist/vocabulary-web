import { Injectable } from '@angular/core';
import { ExampleModel } from '../models/example.model';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExampleService {

  listExample : ExampleModel[];
  listExampleSubject = new Subject<ExampleModel[]>();

  emitListExampleSubject(){
    this.listExampleSubject.next(this.listExample.slice());
  }
  
  constructor(private httpClient: HttpClient) { }

  getAllExamples() {
    this.httpClient
      .get<any[]>('http://localhost:3000/api/examples')
      .subscribe(
        (response) => {
          this.listExample = response.map(item => new ExampleModel(
            item.name,
            item.idLevel,
            item.id
          ));
          this.emitListExampleSubject();
        },
        (error) => {
          console.log('Erreur ! : ' + error);
        }
      );
  }

  getExampleById(idExample : number) {
    return this.httpClient
      .get<any>('http://localhost:3000/api/examples/'+idExample)
  }

  addExample(example : ExampleModel) {
    return this.httpClient
      .post<any>('http://localhost:3000/api/examples', example);
  }

  updateExample(example : ExampleModel) {
    return this.httpClient
      .put<any>('http://localhost:3000/api/examples/'+example.id, example);    
  }

  deleteExample(idExample : number) {
    return this.httpClient
      .delete("http://localhost:3000/api/examples/"+idExample);
  }

}
