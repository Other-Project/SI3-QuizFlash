import {Component, Input} from "@angular/core";
import {faSignOut} from "@fortawesome/free-solid-svg-icons";
import {UserService} from "../../../service/user.service";
import {Router} from "@angular/router";
import {QuizService} from "../../../service/quiz-service.service";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"]
})
export class HeaderComponent {
  @Input() homePage?: any[] | string;
  @Input() interactive: boolean = true;
  protected loading: boolean = false;
  loggedIn: boolean = false;

  constructor(private userService: UserService, private quizService: QuizService, private router: Router) {
    userService.user$.subscribe(user => {
      if (this.loggedIn && !user) {
        this.router.navigate(["/"]).then();
        this.loading = false;
      }
      this.loggedIn = !!user;
    });
  }

  public logout() {
    if (!this.loggedIn) return;
    this.loading = true;
    this.quizService.selectQuiz("");
    this.userService.logout();
  }

  protected readonly faSignOut = faSignOut;
}
