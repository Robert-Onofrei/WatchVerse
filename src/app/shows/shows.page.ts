import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { MovieService } from '../services/movie.service';
import { FavouritesService } from '../services/favourites.service';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonIcon, IonButtons, IonBackButton } from '@ionic/angular/standalone';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-shows',
  templateUrl: './shows.page.html',
  styleUrls: ['./shows.page.scss'],
  providers: [MovieService, FavouritesService],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonIcon, RouterLink, IonButtons, IonBackButton, CommonModule, HttpClientModule],
})
export class ShowsPage implements OnInit {
  popularShows: any[] = [];
  favourites$: any[] = [];
  currentPage: number = 1;
  totalPages: number = 1;

  constructor(private movieService: MovieService, private favouritesService: FavouritesService) {}

  ngOnInit(): void {
  }

  ionViewWillEnter(): void {
    this.currentPage = 1;
    this.popularShows = [];
    this.loadShows();
    this.favourites$ = this.favouritesService.getFavourites();
  }
  

  //Loads the popular shows from the movie service 
  loadShows(): void {
    this.movieService.getPopularShows(this.currentPage).subscribe(
      (data: any) => {
        this.totalPages = data.total_pages;
        const newShows = data.results;
  
        newShows.forEach((show: any) => {
          this.movieService.getShowDetails(show.id).subscribe(
            (details: any) => {
              show.number_of_seasons = details.number_of_seasons;
            }
          );
        });
  
        this.popularShows.push(...newShows);
      },
      (error) => {
        console.error('Error fetching shows:', error);
      }
    );
  }
  
  //Load the next page of shows
  loadNextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.loadShows();
    }
  }

  //Toggle the favourite status of a show
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
