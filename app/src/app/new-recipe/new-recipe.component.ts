import {Component, Input, OnInit} from '@angular/core';
import {Recipe, RecipeService} from "../recipe.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-new-recipe',
  templateUrl: './new-recipe.component.html',
  styleUrls: ['./new-recipe.component.scss']
})
export class NewRecipeComponent implements OnInit{
  author: string = '';
  title: string = '';
  imgSrc: string = '';
  detail: string = '';

  id : number | null = null;
  buttonTitle: string = "Ajouter";
  youtubeLink: string = '';

  save() {
    let data = {
      author: this.author,
      title: this.title,
      imgSrc: this.imgSrc,
      detail: this.detail,
      youtubeLink: this.youtubeLink
    }
    if(this.id == null) {
      this.recipeService.createRecipe(data)
        .subscribe(
      (recipe) => this.router.navigate(['/recipe-detail', recipe.id])
        );
    }else{
      this.recipeService.updateRecipe(this.id, data)
        .subscribe(
          (recipe) => this.router.navigate(['/recipe-detail', recipe.id])
        )
    }
  }
  getRecipe(id : number) : void {
    this.recipeService.getRecipe(id, 1)
      .subscribe(recipe => {
        this.author = recipe.author;
        this.title = recipe.title;
        this.imgSrc = recipe.imgSrc;
        this.detail = recipe.detail;
        this.youtubeLink = recipe.youtubeLink;
      });
  }

  constructor(private recipeService : RecipeService, private router: Router, private route : ActivatedRoute) {}

  ngOnInit() : void{
    if(this.route.snapshot.paramMap.get('id') != null)
    {
      this.id = parseInt(this.route.snapshot.paramMap.get('id') ?? '');
      this.getRecipe(this.id);
      this.buttonTitle = "Enregistrer"
    }
  }
}
