import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {AppRoutingModule} from "./app-routing.module";
import {AppComponent} from "./app.component";
import {NgOptimizedImage} from "@angular/common";
import {AdminModule} from "./admin/admin.module";
import {QuizModule} from "./quiz/quiz.module";
import {ProfilesComponent} from "./profiles/profiles.component";
import {LayoutModule} from "./layout/layout.module";
import {AdminButtonComponent} from "./profiles/admin-button/admin-button.component";
import {ProfileListComponent} from "./profiles/profile-list/profile-list.component";
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [
    AppComponent,
    ProfilesComponent,
    AdminButtonComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgOptimizedImage,
    AdminModule,
    QuizModule,
    LayoutModule,
    ProfileListComponent,
    FontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
