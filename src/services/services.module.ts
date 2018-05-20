import { NgModule } from "@angular/core";
import { AuthService } from "./auth.service";
import { LocalStorageService } from "./local-storage.service";


@NgModule({
  providers: [
    AuthService,
    LocalStorageService
  ]
})
export class ServicesModule { }