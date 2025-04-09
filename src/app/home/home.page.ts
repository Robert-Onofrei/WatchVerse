import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MovieService } from '../services/movie.service';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonThumbnail, IonLabel, IonButton, IonSegmentButton, IonSegment } from '@ionic/angular/standalone';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  providers: [MovieService],
  imports: [IonSegment, IonSegmentButton, IonButton, CommonModule, HttpClientModule, IonItem, IonList, IonHeader, IonToolbar, IonTitle, IonContent, IonThumbnail, IonLabel],
})
export class HomePage implements OnInit{
  trendingMovies: any[] = [];
  trendingShows: any[] = [];
  showMovies: boolean = true;
  
  constructor(private movieService: MovieService) {}

  ngOnInit(): void{
    this.movieService.getTrendingMovies().subscribe(
      (data: any) => {
        this.trendingMovies = data.results;
  
        this.trendingMovies.forEach(
          (movie: any) => {
            this.movieService.getMovieDetails(movie.id).subscribe(
              (details: any) => {
              movie.runtime = details.runtime;
            }); 
          });
        });

    this.movieService.getTrendingShows().subscribe(
      (data: any) => {
        this.trendingShows = data.results;

        this.trendingShows.forEach(
          (show: any) => {
            this.movieService.getShowDetails(show.id).subscribe(
              (details: any) => {
                show.number_of_seasons = details.number_of_seasons;
              });
            });
          });
  }

  toggleView(showMovies: boolean) {
    this.showMovies = showMovies;
  }
}