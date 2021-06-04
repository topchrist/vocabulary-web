import { ExampleModel } from "./example.model";

export class DefinitionModel {
  
  constructor( 
    
    public description:string,
    public idWord?:number,
    public id?:number,
    public examples?:ExampleModel[]    
  ){}

}
