import {HttpHeaders} from "@angular/common/http";

export const httpOptionsBase = {
  headers: new HttpHeaders({
    "Content-Type": "application/json"
  }),
  withCredentials: true
};

export const apiUrl = "/api";
