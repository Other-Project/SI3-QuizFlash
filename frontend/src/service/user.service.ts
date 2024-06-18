import {Injectable} from "@angular/core";
import {BehaviorSubject, firstValueFrom} from "rxjs";
import {User} from "../models/user.models";
import {HOBBIES} from "../mocks/hobbies.mock";
import {HttpClient} from "@angular/common/http";
import {apiUrl, httpOptionsBase} from "../configs/server.config";

const USER_KEY = "user";

@Injectable({providedIn: "root"})
export class UserService {
  public users?: User[];
  public users$: BehaviorSubject<User[] | undefined> = new BehaviorSubject<User[] | undefined>(this.users);
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

  getUser(userId: string) {
    return firstValueFrom(this.http.get<User>(`${this.userUrl}/${userId}`, this.httpOptions));
  }

  async addUser(user: User) {
    this.users$.next(this.users = undefined);
    let response = await firstValueFrom(this.http.post<User>(this.userUrl, user, this.httpOptions));
    await this.retrieveUsers();
    return response;
  }

  deleteUser(userId: string): void {
    this.users$.next(this.users = undefined);
    this.http.delete<User>(`${this.userUrl}/${userId}`, this.httpOptions).subscribe(() => this.retrieveUsers().then());
  }

  updateUser(userId: string, updatedUser: User) {
    this.http.patch<User>(`${this.userUrl}/${userId}`, updatedUser, this.httpOptions).subscribe(() => this.retrieveUsers().then());
  }

  public login(username: string, password?: string) {
    this.http.post<User>(`${apiUrl}/auth/login/password`, {username: username, password: password ?? "dummy"}, this.httpOptions)
      .subscribe(user => {
        this.user$.next(this.user = user);
      });
  }

  public logout() {
    this.http.post<User>(`${apiUrl}/auth/logout`, this.httpOptions)
      .subscribe(() => this.user$.next(this.user = undefined));
  }
}
