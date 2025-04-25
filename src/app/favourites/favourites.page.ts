import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { IonHeader, IonIcon, IonToolbar, IonContent, IonTitle, IonButtons, IonBackButton } from '@ionic/angular/standalone';
import { FavouritesService } from '../services/favourites.service';

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
    this.favourites = this.favouritesService.getFavourites();
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
