import { Injectable } from "@angular/core";
import { AngularFireAuth } from "angularfire2/auth";
import { LocalStorageService } from "./local-storage.service";

@Injectable()
export class AuthService {
  constructor(
    private afAuth: AngularFireAuth,
    private localStorageService: LocalStorageService
  ) { }

  userInfo: any;
  tokenId;

  loginWithEmail(email, password) {
    this.afAuth
      .auth
      .signInWithEmailAndPassword(email, password)
      .then(value => {
        this.afAuth.authState.subscribe(value => {
          this.userInfo = value;
          this.afAuth.auth.currentUser.getIdToken(true).then((token) => {
            this.localStorageService.setToken(token);
          })
        });
      })
      .catch(error => console.log(error));
  }

  logout() {
    this.afAuth
      .auth
      .signOut();
  }

  hasValidToken() {
    if (this.tokenId) {
      return true;
    }
    this.tokenId = this.localStorageService.getToken();
    return this.tokenId ? true : false;
  }
}