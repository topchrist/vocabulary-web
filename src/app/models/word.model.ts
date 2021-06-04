import { DefinitionModel } from "./definition.model";

export class WordModel {
  
  constructor(
              public name:string,
              public nature:string,
              public idLevel?: number,
              public plural?:string,
              public definitions?:DefinitionModel[],
              public id?:number
  ){}

}
