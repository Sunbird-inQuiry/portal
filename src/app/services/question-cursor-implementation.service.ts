import { Injectable } from '@angular/core';
import { forkJoin, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiEndPoints } from '../app.constant';
import { ContentService } from './content.service';

@Injectable({
  providedIn: 'root'
})
export class QuestionCursorImplementationService {

  constructor(private contentService: ContentService) { }

  getQuestions(identifiers: string[], parentId?: string): Observable<any> {
    const option: any = {
      url: `${ApiEndPoints.questionList}`,
      data: {
        request: {
          search: { identifier: identifiers }
        }
      }
    };
    return this.contentService.post(option).pipe(map((data) => {
      return data.result;
    }));
  }

  getQuestion(identifier: string): Observable<any> {
    const option: any = {
      url: `${ApiEndPoints.questionList}`,
      data: {
        request: {
          search: { identifier: [identifier] }
        }
      }
    };
    return this.contentService.post(option).pipe(map((data: any) => data.result));
  };

  getQuestionSet(identifier: string): Observable<any> {
    const hierarchy = this.contentService.get(`${ApiEndPoints.getQuestionSetHierarchy}${identifier}`);
    const questionSetResponse = this.contentService.get(`${ApiEndPoints.questionSetRead}${identifier}?fields=instructions,outcomeDeclaration`);
    return (
      forkJoin([hierarchy, questionSetResponse]).pipe(map((res: any) => {
        const questionSet = res[0]?.result.questionset;
        const { instructions, outcomeDeclaration } = res[1].result.questionset;
        if (instructions && questionSet) {
          questionSet.instructions = instructions;
        }
        if (outcomeDeclaration && questionSet) {
          questionSet.outcomeDeclaration = outcomeDeclaration;
        }
        return questionSet;
      })
      ));
  };

  getAllQuestionSet(identifiers: string[]): Observable<any> {
    return of();
  };

}
