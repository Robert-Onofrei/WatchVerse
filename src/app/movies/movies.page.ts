import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { MovieService } from '../services/movie.service';
import { FavouritesService } from '../services/favourites.service';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonIcon, IonButtons, IonBackButton } from '@ionic/angular/standalone';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.page.html',
  styleUrls: ['./movies.page.scss'],
  standalone: true,
  providers: [MovieService, FavouritesService],
  imports: [IonButtons, IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonIcon, RouterLink, IonBackButton, CommonModule, HttpClientModule],
})
export class MoviesPage implements OnInit {
  popularMovies: any[] = [];
  favourites$: any[] = [];
  currentPage: number = 1;
  totalPages: number = 1;

  constructor(private movieService: MovieService, private favouritesService: FavouritesService) {}

  ngOnInit(): void {
  }

  ionViewWillEnter(): void {
    this.currentPage = 1;
    this.popularMovies = []; 
    this.loadMovies();
    this.favourites$ = this.favouritesService.getFavourites();
  }
  

  //Loads movies from the API
  loadMovies(): void {
    this.movieService.getPopularMovies(this.currentPage).subscribe(
      (data: any) => {
        this.totalPages = data.total_pages;
        const newMovies = data.results;

        newMovies.forEach((movie: any) => {
          this.movieService.getMovieDetails(movie.id).subscribe(
            (details: any) => {
              movie.runtime = details.runtime;
            }
          );
        });
  
        this.popularMovies.push(...newMovies);
      },
      (error) => {
        console.error('Error fetching movies:', error);
      }
    );
  }
  
  //Loads the next page of movies
  loadNextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.loadMovies();
    }
  }

  //Toggles the favourite status of a movie
  toggleFavorite(item: any) {
    if (this.favouritesService.isFavourite(item)) {
      this.favouritesService.removeFavourite(item);
    } else {
      this.favouritesService.addFavourite(item);
    }
  }

  //Checks if a movie is a favourite
  isFavorite(item: any): boolean {
    return this.favouritesService.isFavourite(item);
  }
}
