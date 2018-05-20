import { Injectable } from "@angular/core";

@Injectable()
export class LocalStorageService {
  setToken(tokenId) {
    localStorage.setItem('tokenId', tokenId);
  }

  getToken() {
    return localStorage.getItem('tokenId');
  }
}