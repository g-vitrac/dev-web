import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient, HttpHeaderResponse, HttpHeaders, HttpParams} from "@angular/common/http";

class User {
}

type Recipe = {
  youtubeLink: string;
  author: string; detail: string; title: string; imgSrc: string , id: number, users: User[]};
@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  private recipeUrl = 'http://localhost:3000/recipe';

  constructor(private http : HttpClient) { }

  getRecipes() : Observable<Recipe[]>{
    return this.http.get<Recipe[]>(this.recipeUrl);
  }

  getRecipe(id : number, userId : number | null = null ) : Observable<Recipe>{
    let addUserId = userId ? '/'+userId : '';
    return this.http.get<Recipe>(`${this.recipeUrl}/${id}${addUserId}`);
  }

  createRecipe(data : {}) {
    return this.http.post<Recipe>(this.recipeUrl, data, {headers: new HttpHeaders().set('Content-Type', 'application/json')});
  }

  deleteRecipe(id: number) {
    return this.http.delete<Recipe>(`${this.recipeUrl}/${id}`);
  }

  updateRecipe(id: number,data: {}) {
    return this.http.put<Recipe>(`${this.recipeUrl}/${id}`, data, {headers: new HttpHeaders().set('Content-Type', 'application/json')});
  }
}

export { Recipe };
