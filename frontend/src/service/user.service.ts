import {Injectable} from "@angular/core";
import {BehaviorSubject} from "rxjs";
import {User} from "../models/user.models";
import {USERS} from "../mocks/users.mock";
import {USER_BERNARD} from "../mocks/user-bernard.mock";
import {USER_MARTINE} from "../mocks/user-martine.mock";

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

  updateFontSize(userId: string, newFontSize: number): void {
    // TODO update in the server
  }

  updateDementiaLevel(userId: string, newDementiaLevel: number): void {
    // TODO update in the server
  }

  updatePatientInfo(userId: string, newFirstName: string, newLastName: string, newAge: number) {
    // TODO update in the server
  }
  public getUserById(id: string): User {
    return USER_MARTINE;
  }

  getCurrentUser(): User {
    // TODO return the current user
    return USER_BERNARD;
  }
}
