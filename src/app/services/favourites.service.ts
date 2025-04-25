import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})

export class FavouritesService {
  private favourites: any[] = [];

  constructor(private storage: Storage) {
    this.init();
  }

  //Initialize the storage and load favourites from itq
  async init() {
    await this.storage.create();
    const stored = await this.storage.get('favourites');
    this.favourites = stored || [];
  }

  //Get the list of favourites
  getFavourites(): any[] {
    return this.favourites;
  }

  //Add a favourite item to the list
  async addFavourite(item: any) {
    if (!this.isFavourite(item)) {
      this.favourites.push(item);
      await this.saveFavourites();
    }
  }

  //Remove a favourite item from the list
  async removeFavourite(item: any) {
    this.favourites = this.favourites.filter(fav => fav.id !== item.id);
    await this.saveFavourites();
  }

  isFavourite(item: any): boolean {
    return this.favourites.some(fav => fav.id === item.id);
  }

  private async saveFavourites() {
    await this.storage.set('favourites', this.favourites);
  }
}
