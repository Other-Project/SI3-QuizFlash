import {Injectable} from "@angular/core";
import {firstValueFrom} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {apiUrl, httpOptionsBase} from "../configs/server.config";

@Injectable({providedIn: "root"})
export class UtilsService {
  private utilsUrl = apiUrl;
  private httpOptions = httpOptionsBase;

  constructor(private http: HttpClient) {
  }

  async getTags() {
    return await firstValueFrom(this.http.get<string[]>(this.utilsUrl + "/tags", this.httpOptions));
  }
}
