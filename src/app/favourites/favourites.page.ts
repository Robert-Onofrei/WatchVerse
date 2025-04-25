//Imports needed for the FavouritesPage component
import { Component, OnInit } from '@angular/core';
import { FavouritesService } from '../services/favourites.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { IonHeader, IonIcon, IonToolbar, IonContent, IonTitle, IonButtons, IonBackButton } from '@ionic/angular/standalone';

@Component({
  selector: 'app-favourites',
  templateUrl: 'favourites.page.html',
  styleUrls: ['favourites.page.scss'],
  standalone: true,
  imports: [CommonModule, IonHeader, IonIcon, IonToolbar, IonContent, IonTitle, IonButtons, IonBackButton, RouterLink],
})
export class FavouritesPage implements OnInit {
  favourites: any[] = [];  

  constructor(private favouritesService: FavouritesService) {}

  ngOnInit() {
  }

 ionViewWillEnter() {
  this.favourites = [];
  this.favourites = this.favouritesService.getFavourites();
}

  //Function to toggle an item from the favourites list
  toggleFavorite(item: any) {
    if (this.favouritesService.isFavourite(item)) {
      this.favouritesService.removeFavourite(item);
    } else {
      this.favouritesService.addFavourite(item);
    }
  }

  //Function to check if an item is in the favourites list
  isFavorite(item: any): boolean {
    return this.favouritesService.isFavourite(item);
  }
}
