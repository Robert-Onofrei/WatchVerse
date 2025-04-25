//Imports needed for the HomePage component
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MovieService } from '../services/movie.service';
import { FavouritesService } from '../services/favourites.service';
import { Router, RouterLink, NavigationStart } from '@angular/router';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonThumbnail, IonLabel, IonButton, IonSegmentButton, IonSegment, IonGrid, IonCol, IonRow, IonCard, IonIcon } from '@ionic/angular/standalone';
import { Browser } from '@capacitor/browser';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  providers: [MovieService, FavouritesService],
  imports: [IonIcon, IonCard, IonRow, IonCol, IonGrid, IonSegment, IonSegmentButton, RouterLink, IonButton, CommonModule, HttpClientModule, IonItem, IonList, IonHeader, IonToolbar, IonTitle, IonContent, IonThumbnail, IonLabel],
})
export class HomePage implements OnInit {
  //Arrays
  trendingMovies: any[] = [];
  trendingShows: any[] = [];
  showMovies: boolean = true;
  activeTab: string = 'popular-movies';
  favourites$: any[] = []; 

  constructor(private movieService: MovieService, private favouritesService: FavouritesService, private storage: Storage, private router: Router) {}

  //Lifecycle 
  ngOnInit() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.loadFavourites();
      }
    });
  }

  ionViewWillEnter(): void {
    this.initStorage().then(() => {
      this.loadFavourites();
      
      //Gets the trending movies and shows from the MovieService
      this.movieService.getTrendingMovies().subscribe((data: any) => {
        this.trendingMovies = data.results;
        this.trendingMovies.forEach((movie: any) => {
          this.movieService.getMovieDetails(movie.id).subscribe(details => {
            movie.runtime = details.runtime;
          });
        });
      });
  
      this.movieService.getTrendingShows().subscribe((data: any) => {
        this.trendingShows = data.results;
        this.trendingShows.forEach((show: any) => {
          this.movieService.getShowDetails(show.id).subscribe(details => {
            show.number_of_seasons = details.number_of_seasons;
          });
        });
      });
  
      this.favourites$ = this.favouritesService.getFavourites();
    });
  }
  
  //Initializes the storage
  async initStorage() {
    await this.storage.create();
  }
  
  //Function to set the active tab
  toggleView(showMovies: boolean) {
    this.showMovies = showMovies;
  }

  //Toggle function to add or remove an item from the favourites list
  toggleFavorite(item: any) {
    if (this.favouritesService.isFavourite(item)) {
      this.favouritesService.removeFavourite(item);
    } else {
      this.favouritesService.addFavourite(item);
    }

    this.favourites$ = this.favouritesService.getFavourites();
    this.saveFavourites();
  }

  //Saves the favourites list to the storage
  async saveFavourites() {
    await this.storage.set('favourites', this.favourites$);
  }

  //Loads the favourites list from the storage
  async loadFavourites() {
    const fav = await this.storage.get('favourites');

    if (fav) {
      this.favourites$ = fav;
    } else {
      this.favourites$ = [];
    }
  }
  
  isFavorite(item: any): boolean {
    return this.favouritesService.isFavourite(item);
  }

  //Open cinema link in the browser
  async openInBrowser() {
    await Browser.open({ url: 'https://www.omniplex.ie/cinema/galway' });
  }
}