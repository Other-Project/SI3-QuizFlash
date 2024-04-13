import {Injectable} from "@angular/core";
import {BehaviorSubject} from "rxjs";
import {User} from "../models/user.models";
import {USERS} from "../mocks/users.mock";
import {HOBBIES} from "../mocks/hobbies.mock";
import {Patient} from "../models/patient.models";
import {AccessRestriction} from "../models/access-restriction.models";

const USER_KEY = "user";

@Injectable({providedIn: "root"})
export class UserService {
  public users: User[] = USERS;
  public users$: BehaviorSubject<User[]> = new BehaviorSubject<User[]>(this.users);
  public user?: User;
  public user$: BehaviorSubject<User | undefined> = new BehaviorSubject<User | undefined>(this.user);
  public hobbies: string[] = HOBBIES;
  public hobbies$: BehaviorSubject<string[]> = new BehaviorSubject<string[]>(this.hobbies);

  constructor() {
    let json = sessionStorage.getItem(USER_KEY);
    if (json) this.setLoggedUser(JSON.parse(json));
  }

  addUser(patient: Patient) {
    patient.id = "10000000-1000-4000-8000-100000000000".replace(/[018]/g, c =>
      (+c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> +c / 4).toString(16)
    );
    patient.access = AccessRestriction.User;
    this.users.push(patient);
    this.users$.next(this.users);
    return patient.id;
  }

  deleteUser(id: string): void {
    console.log("call to deleteUser");
    let userIndex = this.users.findIndex(user => user.id == id);
    if (userIndex < 0) return;
    this.users = this.users.filter((ele, ind) => ind !== userIndex);
    this.users$.next(this.users);
  }

  updateFontSize(userId: string, newFontSize: number): void {
    // TODO update in the server
  }

  updateDementiaLevel(userId: string, newDementiaLevel: number): void {
    // TODO update in the server
  }

  updatePatientInfo(patientId: string, newFirstName: string, newLastName: string, newAge: number) {
    // TODO update in the server
  }

  updateUser(userId: string, updatedUser: User) {
    let userIndex = this.users.findIndex(user => user.id == userId);
    if (userIndex < 0) return;
    this.users[userIndex] = Object.assign({}, this.users[userIndex], updatedUser);
    this.users$.next(this.users);
  }

  updateUserHobbies(patientId: string, newHobbies: string[]) {
    let patient = this.getUserById(patientId) as Patient;
    if (patient)
      patient.hobbies = newHobbies;
  }

  addUserHobby(patientId: string, newHobby: string) {
    let patient = this.getUserById(patientId) as Patient;
    patient?.hobbies.push(newHobby);
  }

  removeUserHobby(patientId: string, hobby: string) {
    let patient = this.getUserById(patientId) as Patient;
    if (patient) {
      let itemIndex: number = patient.hobbies.indexOf(hobby);
      if (itemIndex > -1) {
        patient.hobbies.splice(itemIndex, 1);
      }
    }
  }

  public getUserById(id: string): User | undefined {
    return this.users.find(user => user.id == id);
  }

  public setLoggedUser(user?: User): void {
    if (user) sessionStorage.setItem(USER_KEY, JSON.stringify(user));
    else sessionStorage.removeItem(USER_KEY);
    this.user$.next(this.user = user);
  }
}
