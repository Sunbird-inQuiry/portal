import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HelperService } from '../../services/helper/helper.service';
import { UserService } from 'src/app/services/user/user.service';
import { ToasterService } from 'src/app/services/toaster/toaster.service';
import { PaginationService } from 'src/app/services/pagination/pagination.service';
import { IPagination } from 'src/app/interfaces/pagination';
import { combineLatest as observableCombineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import {MatLegacyDialog as MatDialog } from '@angular/material/legacy-dialog';

import * as _ from 'lodash-es';
@Component({
  selector: 'app-questionset-list',
  templateUrl: './questionset-list.component.html',
  styleUrls: ['./questionset-list.component.scss']
})
export class QuestionsetListComponent implements OnInit {
  questionsetList: any;
  userRole: string;
  totalCount: number;
  pager: IPagination;
  pageNumber = 1;
  queryParams: any;
  query: any;
  public PAGE_LIMIT = 9;
  showLoader = true;
  currentQuestionsetId: string;
  dialogRef: any;
  constructor(
    private router: Router, public helperService: HelperService,
    public userService: UserService, public paginationService: PaginationService,
    private activatedRoute: ActivatedRoute, private toasterService: ToasterService,
    private dialog: MatDialog) {
    }

  ngOnInit(): void {
    observableCombineLatest([
      this.activatedRoute.params,
      this.activatedRoute.queryParams]).pipe(
        map(([params, queryParams]) => ({ params, queryParams })
      ))
      .subscribe(bothParams => {
        if (bothParams.params.pageNumber) {
          this.pageNumber = Number(bothParams.params.pageNumber);
        }
        this.queryParams = bothParams.queryParams;
        // tslint:disable-next-line:no-string-literal
        this.query = this.queryParams['query'];
        this.getAllQuestionsetList(this.PAGE_LIMIT, this.pageNumber, bothParams);
      });
  }

  navigatetoHome(): void {
    this.router.navigate(['/']);
  }

  getAllQuestionsetList(limit, pageNumber, bothParams): void {
    this.showLoader = true;
    const creatorStatus = [
      'Draft',
      'Review',
      'Live'
    ];
    const reviewerStatus = ['Review', 'FlagReview'];
    let QuestionSetStatus = [];
    if (this.userService.userProfile) {
      this.userRole = this.userService.userProfile.role;
    }
    if (this.userRole === 'creator') {
      QuestionSetStatus = creatorStatus;
    }
    if (this.userRole === 'reviewer') {
      QuestionSetStatus = reviewerStatus;
    }
    const req = {
      request: {
        filters: {
          status: QuestionSetStatus,
          objectType: ['Questionset', 'QuestionsetImage'],
          channel: this.userService.userProfile.channelId
        },
        limit: limit,
        offset: (pageNumber - 1) * (limit),
        query: this.query,
        sort_by: {
          lastUpdatedOn: 'desc'
        }
      }
    };
    if (_.get(this.userService.userProfile, 'role') === 'creator') {
      req.request.filters = { ...req.request.filters, ...{ createdBy: this.userService.userProfile.id } };
    } else if (_.get(this.userService.userProfile, 'role') === 'reviewer') {
      req.request.filters = { ...req.request.filters, ...{ createdBy: { '!=': this.userService.userProfile.id } } };
    }
    this.helperService.getQuestionsetList(req)
      .subscribe((response) => {
        this.questionsetList = _.get(response, 'result.QuestionSet');
        this.showLoader = false;
        this.totalCount = response.result.count;
        this.pager = this.paginationService.getPager(response.result.count, pageNumber, limit);
      }, (error) => {
        this.showLoader = false;
        console.log(error);
      });
  }

  navigateToQuestionset(id, status): void {
    if (this.userRole === 'creator') {
      this.router.navigate(['/edit/questionset/', id, status, 'edit']);
    }
    if (this.userRole === 'reviewer') {
      this.router.navigate(['/edit/questionset/', id, status, 'review']);
    }
  }

  navigateToPage(page: number): undefined | void {
    if (page < 1 || page > this.pager.totalPages) {
      return;
    }
    this.pageNumber = page;
    this.router.navigate(['questionset/questionset-list', this.pageNumber], { queryParams: this.queryParams });
  }

  openDeleteDialog(templateRef, questionsetId): void {
    this.currentQuestionsetId = questionsetId;
    this.dialogRef = this.dialog.open(templateRef, {
     width: '500px'
   });
  }

  deleteQuestionset(): void {
    this.showLoader = true;
    this.helperService.deleteQuestionset(this.currentQuestionsetId).subscribe((data) => {
      if (data.params.status === 'successful') {
        this.dialogRef.close();
        this.showLoader = false;
        this.questionsetList = this.removeQuestionset(this.questionsetList, this.currentQuestionsetId);
        if (this.questionsetList.length === 0) {
          this.ngOnInit();
        }
        this.toasterService.success('Questionset is deleted successfully.');
      }
    },
    (err) => {
      this.dialogRef.close();
      this.showLoader = false;
      this.toasterService.success('Something went wrong.');
    });
  }

  removeQuestionset(questionsetList, questionsetId): any {
    return questionsetList.filter((content) => {
      return questionsetId.indexOf(content.identifier) === -1;
    });
  }
}
