import {Injectable} from "@angular/core";
import {BehaviorSubject} from "rxjs";
import {User} from "../models/user.models";
import {USERS} from "../mocks/users.mock";
import {USER_BERNARD} from "../mocks/user-bernard.mock";
import {USER_MARTINE} from "../mocks/user-martine.mock";

@Injectable({providedIn: 'root'})
export class UserService {
  public users: User[] = USERS;
  public users$: BehaviorSubject<User[]> = new BehaviorSubject<User[]>(this.users);
  public user?: User = USER_MARTINE;
  public user$: BehaviorSubject<User | undefined> = new BehaviorSubject<User | undefined>(this.user);

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

  public getUserById(id: string): User | undefined {
    return this.users.find(user => user.id == id);
  }

  public setLoggedUser(user: User): void {
    this.user$.next(this.user = user);
  }
}
