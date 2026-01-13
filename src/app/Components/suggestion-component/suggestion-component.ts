import { Component } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { SuggestionService } from '../../services/suggestion-service';

@Component({
  selector: 'app-suggestion-component',
  imports: [FormsModule, ],
  templateUrl: './suggestion-component.html',
  styleUrls: ['./suggestion-component.css'],
})
export class SuggestionComponent {
  constructor(private suggestionService:SuggestionService){}

  suggestionData:any='';
  ngOnInit(){
    this.suggestionService.suggestionProduct(this.suggestionData).subscribe((data:any)=>{
      this.suggestionData=data;
    })
  }

  suggestionClick(){
    console.log(this.suggestionData.value);
  }

}
