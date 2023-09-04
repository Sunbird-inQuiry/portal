import { Component, OnInit } from '@angular/core';
import { HelperService } from '../../services/helper/helper.service';
import { UserService } from 'src/app/services/user/user.service'; 
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
@Component({
  selector: 'app-questionset-create',
  templateUrl: './questionset-create.component.html',
  styleUrls: ['./questionset-create.component.scss']
})
export class QuestionsetCreateComponent implements OnInit {

  constructor(
  private router: Router,
  public helperService: HelperService,
  public userService: UserService) { }

  ngOnInit(): void {
    const userRole = this.userService.userProfile.role;
    if (userRole !== 'creator') {
      this.router.navigate(['/questionset']);
    }
  }

  createContent(primaryCategory:string): void {
    const requestData = {
        questionset: {
          name: 'Untitled QuestionSet',
          mimeType: 'application/vnd.sunbird.questionset',
          primaryCategory: primaryCategory,
          createdBy: this.userService.userProfile.id,
          createdFor: [this.userService.userProfile.channelId],
          framework: this.userService.userProfile.frameworkId,
          code: '7d5aaa70-ffb8-d062-ba10-1db445a11dbc'
        }
    };
    this.helperService.createContent(requestData).subscribe(res => {
      this.navigateToQuestionset(res.result.identifier);
    }, err => {
      console.log('create content failed ::', err);
    });
  }

  navigateToQuestionset(id): void {
    this.router.navigate(['/edit/questionset/', id, 'Draft', 'create']);
  }
}
