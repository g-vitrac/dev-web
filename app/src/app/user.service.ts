import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Recipe} from "./recipe.service";

type User = {id: number, name: string, imgSrc: string, recipes: Recipe[]}
@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userUrl = 'http://localhost:3000/user';

  constructor(private http : HttpClient) { }

  getUsers() : Observable<User[]>{
    return this.http.get<User[]>(this.userUrl);
  }

  getUser(id : number) : Observable<User>{
    return this.http.get<User>(`${this.userUrl}/${id}`);
  }

  getFavs(id: number) : Observable<Recipe[]>{
    return this.http.get<Recipe[]>(`${this.userUrl}/favs/${id}`);
  }

  addFavs(userId: number, recipeId: any) : Observable<User>{
    return this.http.put<User>(`${this.userUrl}/${userId}/addFavs/${recipeId}`,{});
  }

  removeFavs(userId: number, recipeId: any) : Observable<User>{
    return this.http.put<User>(`${this.userUrl}/${userId}/removeFavs/${recipeId}`,{});
  }

}
