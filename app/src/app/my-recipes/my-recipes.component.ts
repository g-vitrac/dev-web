import {Component, OnInit} from '@angular/core';
import {UserService} from "../user.service";
import {ActivatedRoute} from "@angular/router";
import {Recipe} from "../recipe.service";

@Component({
  selector: 'app-my-recipes',
  templateUrl: './my-recipes.component.html',
  styleUrls: ['./my-recipes.component.scss']
})
export class MyRecipesComponent implements OnInit{
  public recipes: Recipe[] | undefined;

  constructor(private userService: UserService,private route: ActivatedRoute) {}

  getFavs(id : number)
  {
    this.userService.getFavs(id)
      .subscribe(recipes => this.recipes = recipes)
  }

  ngOnInit() {
    let id : number = parseInt(this.route.snapshot.paramMap.get('id') ?? '');
    this.getFavs(id);
  }
}
