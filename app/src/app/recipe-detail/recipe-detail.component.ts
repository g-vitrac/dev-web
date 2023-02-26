import {Component, Input, OnInit} from '@angular/core';
import {Recipe, RecipeService} from "../recipe.service";
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../user.service";

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.scss']
})
export class RecipeDetailComponent implements OnInit{

  private apiLoaded = false;
  @Input() videoId: string = '';

  @Input() recipe : Recipe = <Recipe>{};

  public id : number | undefined;

  //public recipe: Recipe | undefined;
  public heart: string = "empty_heart";

  constructor(private recipeService : RecipeService, private route : ActivatedRoute, private userService : UserService, private router : Router) {}

  public addFav(userId : number) : void {
    if(this.recipe != null)
      this.userService.addFavs(userId, this.recipe.id)
        .subscribe(
          user => this.heart = "heart"
        );
    else
      throw new Error('the recipe is null and can\'t be added tot favorite');
  }

  public removeFav(userId : number) : void {
    if(this.recipe != null)
      this.userService.removeFavs(userId, this.recipe.id)
        .subscribe(
          user => this.heart = "empty_heart"
        );
    else
      throw new Error('the recipe is null and can\'t be added tot favorite');
  }

  public toggleFav(userId: number) :void {
    if(this.heart === "empty_heart")
      this.addFav(userId);
    else
      this.removeFav(userId);
  }

  getRecipe(id : number) : void {
    this.recipeService.getRecipe(id, 1)
      .subscribe(recipe => {
        this.recipe = recipe;
        this.videoId = recipe.youtubeLink.split('v=')[1];
        if(recipe.users.length > 0)
        {
          this.heart = "heart";
        }
      });
  }


  deleteRecipe(id: number) {
    this.recipeService.deleteRecipe(id)
      .subscribe( () => {
        this.router.navigate(['/browse']);
      })
  }
  ngOnInit() : void{
    console.log(this.recipe);
    if(this.recipe.id == null)
    {
      this.id = parseInt(this.route.snapshot.paramMap.get('id') ?? '');
      this.getRecipe(this.id);
    }
    if(!this.apiLoaded) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      document.body.appendChild(tag);
      this.apiLoaded = true;
    }
  }

  editRecipe(id: number) {
    this.router.navigate(['/edit-recipe', id]);
  }
}
