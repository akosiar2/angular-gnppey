import { Component, OnInit } from '@angular/core';
import { QuizService } from '../service/quiz.service';
import { HelperService } from '../service/helper.service';
import { Option, Question, Quiz } from '../models/index';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css'],
  providers: [QuizService]
})
export class QuizComponent implements OnInit {
  quizes: any[];
  quiz: Quiz = new Quiz(null);
  mode = 'quiz';
  quizName: string;
  quizResults = 0;

  pager = {
    index: 0,
    size: 1,
    count: 1
  };

  quizData = {
    "id": 1,
    "name": "History",
    "description": "This is history or somethin",
    "questions": [
        {
            "id": 1010,
            "name": "Which is the largest country in the world by population?",
            "questionTypeId": 1,
            "options": [
                {
                    "id": 1055,
                    "questionId": 1010,
                    "name": "India",
                    "isAnswer": false
                },
                {
                    "id": 1056,
                    "questionId": 1010,
                    "name": "USA",
                    "isAnswer": false
                },
                {
                    "id": 1057,
                    "questionId": 1010,
                    "name": "China",
                    "isAnswer": true
                },
                {
                    "id": 1058,
                    "questionId": 1010,
                    "name": "Russia",
                    "isAnswer": false
                }
            ],
            "questionType": {
                "id": 1,
                "name": "Multiple Choice",
                "isActive": false
            }
        },
        {
            "id": 1011,
            "name": "When did the second world war end?",
            "questionTypeId": 1,
            "options": [
                {
                    "id": 1055,
                    "questionId": 1010,
                    "name": "1945",
                    "isAnswer": true
                },
                {
                    "id": 1057,
                    "questionId": 1010,
                    "name": "1939",
                    "isAnswer": false
                },
                {
                    "id": 1056,
                    "questionId": 1010,
                    "name": "1944",
                    "isAnswer": false
                },
                {
                    "id": 1058,
                    "questionId": 1010,
                    "name": "1942",
                    "isAnswer": false
                }
            ],
            "questionType": {
                "id": 1,
                "name": "Multiple Choice",
                "isActive": false
            }
        },
        {
            "id": 1012,
            "name": "Which was the first country to issue paper currency?",
            "questionTypeId": 1,
            "options": [
                {
                    "id": 1055,
                    "questionId": 1010,
                    "name": "USA",
                    "isAnswer": true
                },
                {
                    "id": 1057,
                    "questionId": 1010,
                    "name": "France",
                    "isAnswer": false
                },
                {
                    "id": 1056,
                    "questionId": 1010,
                    "name": "Italy",
                    "isAnswer": false
                },
                {
                    "id": 1058,
                    "questionId": 1010,
                    "name": "China",
                    "isAnswer": true
                }
            ],
            "questionType": {
                "id": 1,
                "name": "Multiple Choice",
                "isActive": false
            }
        },
        {
            "id": 1013,
            "name": "Which city hosted the 1996 Summer Olympics?",
            "questionTypeId": 1,
            "options": [
                {
                    "id": 1055,
                    "questionId": 1010,
                    "name": "Atlanta",
                    "isAnswer": true
                },
                {
                    "id": 1057,
                    "questionId": 1010,
                    "name": "Sydney",
                    "isAnswer": false
                },
                {
                    "id": 1056,
                    "questionId": 1010,
                    "name": "Athens",
                    "isAnswer": false
                },
                {
                    "id": 1058,
                    "questionId": 1010,
                    "name": "Beijing",
                    "isAnswer": false
                }
            ],
            "questionType": {
                "id": 1,
                "name": "Multiple Choice",
                "isActive": false
            }
        },
        {
            "id": 1014,
            "name": "Who invented telephone?",
            "questionTypeId": 1,
            "options": [
                {
                    "id": 1055,
                    "questionId": 1010,
                    "name": "Albert Einstein",
                    "isAnswer": false
                },
                {
                    "id": 1057,
                    "questionId": 1010,
                    "name": "Alexander Graham Bell",
                    "isAnswer": true
                },
                {
                    "id": 1056,
                    "questionId": 1010,
                    "name": "Isaac Newton",
                    "isAnswer": false
                },
                {
                    "id": 1058,
                    "questionId": 1010,
                    "name": "Marie Curie",
                    "isAnswer": false
                }
            ],
            "questionType": {
                "id": 1,
                "name": "Multiple Choice",
                "isActive": false
            }
        }
    ]
};

    constructor(private quizService: QuizService) { }

  ngOnInit() {
    this.mode = '';
    this.quizes = this.quizService.getAll();
    this.quizName = this.quizes[0].id;
    this.loadQuiz(this.quizName);
  }

  loadQuiz(quizName: string) {
    
    //this.quizService.get(quizName).subscribe(res => {
    //  this.quiz = new Quiz(res);
    //  this.pager.count = this.quiz.questions.length;
    //});
    this.quiz = new Quiz(this.quizData);
    this.pager.count = this.quiz.questions.length;
    this.mode = 'quiz';
    this.quizResults = 0;
    this.pager.index = 0;
  }

  get filteredQuestions() {
    return (this.quiz.questions) ?
      this.quiz.questions.slice(this.pager.index, this.pager.index + this.pager.size) : [];
  }

  onSelect(question: Question, option: Option) {
    if (question.questionTypeId === 1) {
      question.options.forEach((x) => { if (x.id !== option.id) x.selected = false; });
    }

      this.goTo(this.pager.index + 1);
  }

  goTo(index: number) {
    if (index >= 0 && index < this.pager.count) {
      this.pager.index = index;
      this.mode = 'quiz';
    }
  }

  isAnswered(question: Question) {
    return question.options.find(x => x.selected) ? 'Answered' : 'Not Answered';
  };

  isCorrect(question: Question) {
    return question.options.every(x => x.selected === x.isAnswer) ? 'correct' : 'wrong';
  };

  getSum(total, num) {
  return total + Math.round(num);
}

  onSubmit() {
    let answers = [];
    this.quiz.questions.forEach(x => answers.push({ 'quizId': this.quiz.id, 'questionId': x.id, 'answered': x.answered }));

    this.quiz.questions.forEach((x) =>{if(this.isCorrect(x) === 'correct') this.quizResults += 1;})

    console.log(this.quiz.questions);
    this.mode = 'result';
  }

}