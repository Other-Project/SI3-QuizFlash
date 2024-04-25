import {Injectable} from "@angular/core";
import {UserService} from "./user.service";


@Injectable({providedIn: "root"})
export class HistoricService {

  constructor(private userService: UserService) {

  }
}
