import {Injectable} from "@angular/core";
import {BehaviorSubject} from "rxjs";
import {User} from "../models/user.models";
import {USERS} from "../mocks/users.mock";

@Injectable({providedIn: 'root'})
export class UserService {
  public users$: BehaviorSubject<User[]> = new BehaviorSubject<User[]>(USERS);
  public users: User[] = [];

  constructor() {
  }

  addUser(user: User) {
    this.users.push(user);
    this.users$.next(this.users);
  }

  deleteUser(id: string): void {
    // TODO
    this.users$.next(this.users);
  }
}
