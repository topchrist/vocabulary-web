import { newArray } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { DefinitionModel } from '../models/definition.model';
import { ExampleModel } from '../models/example.model';
import { LevelModel } from '../models/level.model';
import { WordModel } from '../models/word.model';
import { DefinitionService } from '../services/definition.service';
import { ExampleService } from '../services/example.service';
import { LevelService } from '../services/level.service';
import { WordService } from '../services/word.service';

@Component({
  selector: 'app-word-edit',
  templateUrl: './word-edit.component.html',
  styleUrls: ['./word-edit.component.css']
})
export class WordEditComponent implements OnInit {

  isAddMode: boolean;
  wordForm : FormGroup;
  loading = false;
  levels: LevelModel[];
  idWord: number =  null;
  listLevelevelSubscription : Subscription;
  
  constructor(private formBuilder: FormBuilder, 
              private levelService : LevelService, 
              private wordService : WordService,
              private definitionService : DefinitionService,
              private exampleService : ExampleService,
              private router: Router, 
              private route: ActivatedRoute) { 

    this.idWord = this.route.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.isAddMode = !this.idWord;
    this.loading = true;
    this.listLevelevelSubscription = this.levelService.listLevelSubject.subscribe(
      (levels: LevelModel[]) => {
        this.levels = levels
      }
    );
    this.levelService.getAllLevels();

    this.initForm(new WordModel(null, null, null));
    

    if (!this.isAddMode) {
      this.wordService.getWordById(this.idWord)
      .subscribe(
        (response) => {
          //this.word = response;
          this.loadEditWord(response);
        },
        (error) => {
          console.log('Erreur ! : ' + error);
        }
      );
    }else{
      this.onAddDefinition();
    }
    
    this.loading = false;
    
  }

  loadEditWord(word : any){
    
    this.initForm(word);
    for(let definition of word.Definitions){
      const definitionControl = this.formBuilder.group({
        id : definition.id,
        //plural : definition.plural,
        //nature : [definition.nature, Validators.required],
        description : [definition.description, Validators.required],
        examples: this.formBuilder.array([])
      });
      for(let example of definition.Examples){
        const exampleControl = definitionControl.controls.examples as FormArray;
        exampleControl.push(this.formBuilder.group({
          id : example.id,
          statement : [example.statement, Validators.required]
        }));
      }
      this.definitions.push(definitionControl);
    }    
  }

  initForm(word : WordModel){
    this.wordForm = this.formBuilder.group({
      id : word.id,
      singularName : [word.name, Validators.required],
      plural : word.plural,
      nature : [word.nature, Validators.required],
      idLevel : [word.idLevel, Validators.required],
      definitions : new FormArray([])
    });
  }

  get f() { return this.wordForm.controls; }

  get definitions() { return this.f.definitions as FormArray; }
  onAddDefinition(){ 
    this.definitions.push(this.formBuilder.group({
      //plural : '',
      //nature : ['', Validators.required],
      description : ['', Validators.required],
      examples: this.formBuilder.array([
        this.formBuilder.group({
          statement : ['', Validators.required]
        })
      ])
    }));
  }
  onDeleteDefinition(index: number){
    this.definitions.removeAt(index);
  }

  getExamples(form) {
    //const arrays = <FormArray>this.wordForm.get('definitions') as FormArray;
    return <FormArray>this.wordForm.get(['definitions',form,'examples']);
  }
  onAddExample(i){
    const control = <FormArray>this.wordForm.get(['definitions',i,'examples']);
    control.push(this.formBuilder.group({
      statement : ['', Validators.required]
    }));
  }
  onDeleteExample(i: number, j: number){
    const control = <FormArray>this.wordForm.get(['definitions',i,'examples']);
    control.removeAt(j);
  }
 

  onSubmitForm(){
    const formValue = this.wordForm.value;
    let forSaveWord : WordModel = new WordModel(
      formValue['singularName'], 
      formValue['nature'],
      formValue['idLevel'], 
      formValue['plural'],
      formValue['definitions'] ? formValue['definitions'] : [],
    );   
    //console.log(forSaveWord);
    this.loading = true;
    if (this.isAddMode) {
        this.createWord(forSaveWord);
    } else {
        forSaveWord.id = this.idWord;
        this.updateWord(forSaveWord);
    }                          

  }

  createWord(forSaveWord: WordModel){
    console.log(forSaveWord);
    this.wordService.addWord(forSaveWord).subscribe(wData=>{
      console.log(wData);
      let savedWord : WordModel;
      savedWord = wData;
      savedWord.definitions = [];
      for(var definition of forSaveWord.definitions){
        definition.idWord = savedWord.id;

        this.definitionService.addDefinition(definition).subscribe(dData =>{
          let savedDefinition : DefinitionModel;
          savedDefinition = dData;
          savedDefinition.examples = [];
          for(var example of definition.examples){
            example.idDefinition = savedDefinition.id;
            
            this.exampleService.addExample(example).subscribe(eData =>{
              savedDefinition.examples.push(<ExampleModel>eData);
            }, error => {
              console.log('Error ! : ' + error);
              this.loading = false;
            });
          }

          savedWord.definitions.push(<DefinitionModel>dData);
        }, error => {
          console.log('Error ! : ' + error);
          this.loading = false;
        });
        
      }

      console.log(savedWord);
      //this.wordService.getAllWords();
      this.router.navigate(['/words']);
    }, error => {
      console.log('Error ! : ' + error);
      this.loading = false;
    });
    
  }

  updateWord(forUpdateWord: WordModel){
    console.log(forUpdateWord);
    this.wordService.updateWord(forUpdateWord).subscribe(wData=>{
      //console.log(wData);
      let updatedWord : WordModel;
      updatedWord = wData;

      updatedWord.definitions = [];
      for(var definition of forUpdateWord.definitions){
        this.definitionService.updateDefinition(definition).subscribe(dData =>{
          let updatedDefinition : DefinitionModel;
          console.log(dData);
          updatedDefinition = dData;
          
          updatedDefinition.examples = [];
          for(var example of definition.examples){
            console.log(example);
            this.exampleService.updateExample(example).subscribe(eData =>{
              updatedDefinition.examples.push(<ExampleModel>eData);
            }, error => {
              console.log('Error ! : ' + error);
              this.loading = false;
            });
          }

          updatedWord.definitions.push(updatedDefinition);
        }, error => {
          console.log('Error ! : ' + error);
          this.loading = false;
        });
        
      }

      console.log(updatedWord);
      this.wordService.getAllWords();
      this.router.navigate(['/words']);
    }, error => {
      console.log('Error ! : ' + error);
      this.loading = false;
    });
  }

}