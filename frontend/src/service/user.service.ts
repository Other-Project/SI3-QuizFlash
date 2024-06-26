import {Injectable} from "@angular/core";
import {BehaviorSubject, firstValueFrom} from "rxjs";
import {User} from "../models/user.models";
import {HttpClient} from "@angular/common/http";
import {apiUrl, httpOptionsBase} from "../configs/server.config";

const USER_KEY = "user";

@Injectable({providedIn: "root"})
export class UserService {
  public users?: User[];
  public users$: BehaviorSubject<User[] | undefined> = new BehaviorSubject<User[] | undefined>(this.users);
  public user?: User;
  public user$: BehaviorSubject<User | undefined> = new BehaviorSubject<User | undefined>(this.user);
  private userUrl = apiUrl + "/users";
  private httpOptions = httpOptionsBase;

  constructor(private http: HttpClient) {
    this.retrieveUsers().then();
    http.get<User>(`${apiUrl}/auth/me`).subscribe(user => this.user$.next(this.user = user));
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
    firstValueFrom(this.http.post<User>(`${apiUrl}/auth/logout`, this.httpOptions)).finally(() => this.user$.next(this.user = undefined));
  }
}
