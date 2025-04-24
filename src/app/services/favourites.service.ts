import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FavouritesService {
  private favourites: any[] = [];

  constructor() {
    this.loadFavourites();
  }

  private loadFavourites(): void {
    const stored = localStorage.getItem('favourites');
    this.favourites = stored ? JSON.parse(stored) : [];
  }

  private saveFavourites(): void {
    localStorage.setItem('favourites', JSON.stringify(this.favourites));
  }

  getFavourites(): any[] {
    return this.favourites; 
  }

  addFavourite(item: any): void {
    if (!item.media_type) {
      item.media_type = item.title ? 'movie' : 'tv';
    }

    const index = this.favourites.findIndex(
      (fav) => fav.id === item.id && fav.media_type === item.media_type
    );
    if (index === -1) {
      this.favourites.push(item);
      this.saveFavourites();
    }
  }

  removeFavourite(item: any): void {
    const index = this.favourites.findIndex(
      (fav) => fav.id === item.id && fav.media_type === item.media_type
    );
    if (index >= 0) {
      this.favourites.splice(index, 1);
      this.saveFavourites();
    }
  }

  isFavourite(item: any): boolean {
    return this.favourites.some(
      (fav) => fav.id === item.id && fav.media_type === item.media_type
    );
  }
}
