import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {AppRoutingModule} from "./app-routing.module";
import {AppComponent} from "./app.component";
import {NgOptimizedImage} from "@angular/common";
import {AdminModule} from "./admin/admin.module";
import {QuizGameModule} from "./quiz/quiz-game/quiz-game.module";
import {ProfilesComponent} from "./profiles/profiles.component";
import {LayoutModule} from "./layout/layout.module";
import {AdminButtonComponent} from "./profiles/admin-button/admin-button.component";
import {ProfileListComponent} from "./profiles/profile-list/profile-list.component";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {QuizGameSelectionModule} from "./quiz/quiz-game-selection/quiz-game-selection.module";
import {provideHttpClient, withInterceptors} from "@angular/common/http";
import {errorInterceptor} from "../interceptor/auth.interceptor";

@NgModule({
  declarations: [
    AppComponent,
    ProfilesComponent,
    AdminButtonComponent
  ],
  bootstrap: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgOptimizedImage,
    AdminModule,
    QuizGameModule,
    LayoutModule,
    ProfileListComponent,
    FontAwesomeModule,
    QuizGameSelectionModule
  ],
  providers: [
    provideHttpClient(withInterceptors([errorInterceptor]))
  ]
})
export class AppModule {
}
