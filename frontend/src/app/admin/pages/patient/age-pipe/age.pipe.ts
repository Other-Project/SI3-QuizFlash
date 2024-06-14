import {Pipe, PipeTransform} from "@angular/core";

@Pipe({
  standalone: true,
  name: "age"
})

export class AgePipe implements PipeTransform {
  transform(birthDate: string): number {
    return new Date(Date.now() - +new Date(birthDate)).getFullYear() - 1970;
  }
}
