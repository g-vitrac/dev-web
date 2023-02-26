import {Component, Injectable, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Recipe, RecipeService} from "../recipe.service";
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Component({
  selector: 'app-browse-recipes',
  templateUrl: './browse-recipes.component.html',
  styleUrls: ['./browse-recipes.component.scss']
})

export class BrowseRecipesComponent implements OnInit {
  public recipes: Recipe[] = [];

  constructor(private recipeService : RecipeService) {}

  getRecipes() : void {
    this.recipeService.getRecipes()
      .subscribe(recipes => this.recipes = recipes);
  }

  ngOnInit() : void {
    this.getRecipes();
  }

}
