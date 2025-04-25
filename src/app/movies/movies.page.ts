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

  constructor(
    private movieService: MovieService,
    private favouritesService: FavouritesService
  ) {}

  ngOnInit(): void {
    this.loadMovies();
    this.favourites$ = this.favouritesService.getFavourites();
  }

  loadMovies(): void {
    this.movieService.getPopularMovies(this.currentPage).subscribe(
      (data: any) => {
        this.popularMovies = data.results;
        this.totalPages = data.total_pages;
      },
      (error) => {
        console.error('Error fetching movies', error);
      }
    );
  }

  loadNextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.loadMovies();
    }
  }

  toggleFavorite(item: any) {
    if (this.favouritesService.isFavourite(item)) {
      this.favouritesService.removeFavourite(item);
    } else {
      this.favouritesService.addFavourite(item);
    }
  }

  isFavorite(item: any): boolean {
    return this.favouritesService.isFavourite(item);
  }
}
