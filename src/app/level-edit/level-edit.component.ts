import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LevelModel } from '../models/level.model';
import { LevelService } from '../services/level.service';

@Component({
  selector: 'app-level-edit',
  templateUrl: './level-edit.component.html',
  styleUrls: ['./level-edit.component.css']
})
export class LevelEditComponent implements OnInit {

  isAddMode: boolean;
  loading = false;
  level = new LevelModel(null, null, null);
  
  constructor(private levelService : LevelService, private router: Router, private route: ActivatedRoute) {
    
    this.level.id = this.route.snapshot.params['id'];
    
   }

  ngOnInit(): void {
    this.isAddMode = !this.level.id;

    if (!this.isAddMode) {
      this.loading = true;
      this.levelService.getLevelById(this.level.id)
      .subscribe(
        (response) => {
          this.level = response;
        },
        (error) => {
          console.log('Erreur ! : ' + error);
        }
      );
      this.loading = false;
    }

  }

  onSubmit(form: NgForm) {
    this.level.order = <number> form.value['level_order'];
    this.level.name = (<string> form.value['level_name']).trim();
    this.level.description = form.value['level_description'];
    console.log(this.level);
    this.loading = true;
        if (this.isAddMode) {
            this.createLevel();
        } else {
            this.updateLevel();
        }
  }

  private createLevel() {
    this.levelService.addLevel(this.level).subscribe(data=>{
      console.log(data);
      this.levelService.getAllLevels();
      this.router.navigate(['/levels']);
    }, error => {
      console.log('Error ! : ' + error);
      this.loading = false;
    });
  }

  private updateLevel() {
    this.levelService.updateLevel(this.level).subscribe(data=>{
      console.log(data);
      this.levelService.getAllLevels();
      this.router.navigate(['/levels']);
    }, error => {
      console.log('Error ! : ' + error);
      this.loading = false;
    });  
  }

}
