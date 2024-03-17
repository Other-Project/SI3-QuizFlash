import {Component, OnInit} from '@angular/core';
import {Location} from "@angular/common";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'intermediate-page',
  templateUrl: './intermediate-page.component.html',
  styleUrls: ['./intermediate-page.component.scss']
})
export class IntermediatePageComponent implements OnInit{

  protected text: string = "";
  constructor(private location: Location,private route:ActivatedRoute) {
  }
  ngOnInit(): void {
    this.route.params.subscribe((param)=>{ //Parameter is pass in the url, check the parameter to know if the answer was good or not
      if(param["check"] == "true") this.text = "Bravo, bien joué \n Vous avez répondu correctement à la question !"
      else this.text = "Nous retenterons cette question une prochaine fois."
    })

  }

  back(): void{
    this.location.back(); //To go at the previous page (question page)
  }
}
