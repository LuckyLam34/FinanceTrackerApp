import { Injectable } from "@angular/core";
import { AngularFireAuth } from "angularfire2/auth";
import { LocalStorageService } from "./local-storage.service";
import { App } from "ionic-angular";
import { HomePage } from "../pages/home/home";
import { LoginPage } from "../pages/login/login";

@Injectable()
export class AuthService {
  constructor(
    private afAuth: AngularFireAuth,
    private localStorageService: LocalStorageService,
    private app: App
  ) { }

  userInfo: any;
  tokenId;

  loginWithEmail(email, password) {
    this.afAuth
      .auth
      .signInWithEmailAndPassword(email, password)
      .then(value => {
        this.afAuth.authState.subscribe(value => {
          if (value) {
            this.userInfo = value;
            this.afAuth.auth.currentUser.getIdToken(true).then((token) => {
              this.localStorageService.setToken(token);
              this.app.getRootNav().setRoot(HomePage);
            });
          } else {
            this.localStorageService.setToken('');
            this.app.getRootNav().setRoot(LoginPage)
          }
        });
      })
      .catch(error => alert(error.message));
  }

  logout() {
    this.afAuth
      .auth
      .signOut().then(() => {
      });
  }

  hasValidToken() {
    if (this.tokenId) {
      return true;
    }
    this.tokenId = this.localStorageService.getToken();
    return this.tokenId ? true : false;
  }
}