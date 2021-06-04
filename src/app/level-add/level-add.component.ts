import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { LevelModel } from '../models/level.model';
import { LevelService } from '../services/level.service';

@Component({
  selector: 'app-level-add',
  templateUrl: './level-add.component.html',
  styleUrls: ['./level-add.component.css']
})
export class LevelAddComponent implements OnInit {

  level = new LevelModel(null, null, null);
  
  constructor(private levelService : LevelService, private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm) {
    this.level.name = (<string> form.value['level_name']).trim();
    this.level.description = form.value['level_description'];
    console.log(this.level);
    this.levelService.addLevel(this.level).subscribe(data=>{
      console.log(data);
      this.levelService.getAllLevels();
    }, error => {
      console.log('Error ! : ' + error);
    });
    this.router.navigate(['/levels']);
  }

}

