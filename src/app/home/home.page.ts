import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MovieService } from '../services/movie.service';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonThumbnail, IonLabel } from '@ionic/angular/standalone';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  providers: [MovieService],
  imports: [CommonModule, HttpClientModule, IonItem, IonList, IonHeader, IonToolbar, IonTitle, IonContent, IonThumbnail, IonLabel],
})
export class HomePage implements OnInit{
  trendingMovies: any[] = [];
  trendingShows: any[] = [];

  constructor(private movieService: MovieService) {}

  ngOnInit(): void{
    this.movieService.getTrendingMovies().subscribe(
      (data: any) => {
        this.trendingMovies = data.results;
      },
    );

    this.movieService.getTrendingShows().subscribe(
      (data: any) => {
        this.trendingShows = data.results;
      },
    );
  }
}