import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root', 
})

//This service is responsible for fetching movie and show data from the TMDB API
export class MovieService {
  private apiKey = '7e7b7acd4214c869f56d52adf4888f9f';

  constructor(private http: HttpClient) {}

  getTrendingMovies():Observable<any> {
    return this.http.get(`https://api.themoviedb.org/3/trending/movie/week?api_key=${this.apiKey}`);
  }

  getTrendingShows():Observable<any> {
    return this.http.get(`https://api.themoviedb.org/3/trending/tv/week?api_key=${this.apiKey}`);
  }

  getMovieDetails(movieId: number):Observable<any> {
    return this.http.get(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${this.apiKey}`);
  }

  getShowDetails(showId: number):Observable<any>{
    return this.http.get(`https://api.themoviedb.org/3/tv/${showId}?api_key=${this.apiKey}`);
  }

  getPopularMovies(page: number): Observable<any> {
    return this.http.get(`https://api.themoviedb.org/3/movie/popular?api_key=${this.apiKey}&page=${page}`);
  }
  
  getPopularShows(page: number): Observable<any> {
    return this.http.get(`https://api.themoviedb.org/3/tv/popular?api_key=${this.apiKey}&page=${page}`);
  }

}
