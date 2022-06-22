import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HelperService } from '../../services/helper/helper.service';
import * as _ from 'lodash-es';
@Component({
  selector: 'app-questionset-draft',
  templateUrl: './questionset-draft.component.html',
  styleUrls: ['./questionset-draft.component.scss']
})
export class QuestionsetDraftComponent implements OnInit {
  questionsetList: any;
  constructor(
    public router: Router,
    public helperService: HelperService) { }

  ngOnInit(): void {
    this.getAllQuestionsetList();
  }

  navigateToQuestionset(id): void {
    this.router.navigate(['/edit/questionset/', id]);
  }

  getAllQuestionsetList(): void {
    const req = {
      request: {
        filters: {
          status: [
            'Draft'
          ],
          objectType: 'Questionset',
          channel: '01309282781705830427',
          createdBy: '5a587cc1-e018-4859-a0a8-e842650b9d64'
        },
        offset: 0,
        limit: 5,
        query: '',
        sort_by: {
          lastUpdatedOn: 'desc'
        }
      }
    };
    this.helperService.getAllQuestionsetList(req)
      .subscribe((response) => {
        this.questionsetList = _.get(response, 'result.QuestionSet');
        console.log('questionsetList', this.questionsetList);
      }, (error) => {
        console.log(error);
      });
  }

}
