import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {RecipeDetailComponent} from "./recipe-detail/recipe-detail.component";
import {MyRecipesComponent} from "./my-recipes/my-recipes.component";
import {BrowseRecipesComponent} from "./browse-recipes/browse-recipes.component";
import {NewRecipeComponent} from "./new-recipe/new-recipe.component";

const routes: Routes = [
  {
    path: 'recipe-detail/:id',
    component: RecipeDetailComponent
  },
  {
    path: 'my-recipes/:id',
    component: MyRecipesComponent
  },
  {
    path: 'browse',
    component: BrowseRecipesComponent
  },
  {
    path: 'newRecipe',
    component: NewRecipeComponent
  },
  {
    path: 'edit-recipe/:id',
    component: NewRecipeComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule {
}
