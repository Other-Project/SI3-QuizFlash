import {Injectable} from "@angular/core";
import {BehaviorSubject, firstValueFrom} from "rxjs";
import {User} from "../models/user.models";
import {HOBBIES} from "../mocks/hobbies.mock";
import {HttpClient} from "@angular/common/http";
import {apiUrl, httpOptionsBase} from "../configs/server.config";

const USER_KEY = "user";

@Injectable({providedIn: "root"})
export class UserService {
  public users: User[] = [];
  public users$: BehaviorSubject<User[]> = new BehaviorSubject<User[]>(this.users);
  public user?: User;
  public user$: BehaviorSubject<User | undefined> = new BehaviorSubject<User | undefined>(this.user);
  public hobbies: string[] = HOBBIES;
  public hobbies$: BehaviorSubject<string[]> = new BehaviorSubject<string[]>(this.hobbies);
  private userUrl = apiUrl + "/users";
  private httpOptions = httpOptionsBase;

  constructor(private http: HttpClient) {
    this.retrieveUsers().then();
  }

  async retrieveUsers() {
    this.users = await firstValueFrom(this.http.get<User[]>(this.userUrl));
    this.users$.next(this.users);
  }

  addUser(user: User, callback: ((user: User) => void)) {
    this.http.post<User>(this.userUrl, user, this.httpOptions).subscribe(user => this.retrieveUsers().then(() => callback(user)));
  }

  deleteUser(userId: string): void {
    this.http.delete<User>(`${this.userUrl}/${userId}`, this.httpOptions).subscribe(() => this.retrieveUsers().then());
  }

  updateUser(userId: string, updatedUser: User) {
    this.http.patch<User>(`${this.userUrl}/${userId}`, updatedUser, this.httpOptions).subscribe(() => this.retrieveUsers().then());
  }

  public setLoggedUser(user?: User): void {
    if (user) sessionStorage.setItem(USER_KEY, JSON.stringify(user));
    else sessionStorage.removeItem(USER_KEY);
    this.user$.next(this.user = user);
  }
}
