import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Character, characterResponse } from '../interfaces/characters';
import { Episode, episodeResponse } from '../interfaces/episodes';
import { LocationResponse, Locations } from '../interfaces/location';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private Apiurl = "https://rickandmortyapi.com/api";

  constructor(private https: HttpClient) { }

  getCharacters(page: number = 1): Observable<characterResponse> {
    return this.https.get<characterResponse>(`${this.Apiurl}/character?page=${page}`);
  }

  getLocation(page: number = 1): Observable<LocationResponse> {
    return this.https.get<LocationResponse>(`${this.Apiurl}/location`);
  }

  getEpisodes(page: number = 1): Observable<episodeResponse> {
    return this.https.get<episodeResponse>(`${this.Apiurl}/episode`);
  }

  getCharacterById(id: number): Observable<Character> {
    return this.https.get<Character>(`${this.Apiurl}/character/${id}`);
  }
  getLocationById(id: number): Observable<Locations> {
    return this.https.get<Locations>(`${this.Apiurl}/location/${id}`);
  }
  getEpisodeById(id: number): Observable<Episode> {
    return this.https.get<Episode>(`${this.Apiurl}/episode/${id}`);
  }



}