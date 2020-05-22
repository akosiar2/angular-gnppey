import { Component } from '@angular/core';
import { QuizComponent } from './quiz/quiz.component';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent  {
  name = 'Angular 6';
  isShowComponent = false;
  showQuiz(){
    this.isShowComponent = true;
  }
}
