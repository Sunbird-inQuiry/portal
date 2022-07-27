import { Component, OnInit } from '@angular/core';
import { questionSetEditorConfig } from './data';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user/user.service';
import { HelperService } from 'src/app/services/helper/helper.service';
import * as _ from 'lodash-es';
@Component({
  selector: 'app-questionset-editor',
  templateUrl: './questionset-editor.component.html',
  styleUrls: ['./questionset-editor.component.scss']
})
export class QuestionsetEditorComponent implements OnInit {

  public editorConfig: any = questionSetEditorConfig;
  channelData: any;
  questionsetData: any;
  constructor(
    public router: Router, private activatedRoute: ActivatedRoute,
    public userService: UserService,
    public helperService: HelperService) { }

  ngOnInit(): void {
    const host = window.location.origin;
    this.activatedRoute.params.subscribe((params: any) => {
      this.editorConfig.context.identifier = params.id;
      this.editorConfig.context.host = host;
      this.getQuestionsetDetails(params.id);
      this.editorConfig.config.mode = this.getEditorMode(params.status);
    });
  }

  getQuestionsetDetails(identifier: string) {
    const options: any = { params: { mode: 'edit' } };
    this.helperService.getQuestionsetDetails(identifier, options).subscribe(data => {
      this.questionsetData = data.result.questionset;
      if (_.has(this.questionsetData, 'channel')) {
        this.getChannel(this.questionsetData.channel);
      }
    })
  }

  getChannel(channelId: string): void {
    this.helperService.getChannel(channelId).subscribe(response => {
      this.channelData = response.result.channel;
      this.setEditorConfig();
    })
  }

  setEditorConfig() {
    this.editorConfig.context.user = this.userService.userProfile;
    this.editorConfig.context.channel = this.userService.userProfile.channelId;
    this.editorConfig.context.contextRollup = {
      l1: this.userService.userProfile.channelId,
    };
    this.editorConfig.context.tags = [this.userService.userProfile.channelId];
    const additionalCategory = _.merge(this.channelData.contentAdditionalCategories, this.channelData.collectionAdditionalCategories);
    this.editorConfig.context.additionalCategories = additionalCategory;
  }

  editorEventListener(event): any {
    console.log('editor event', event);
    if (event.action === 'backContent' || event.action === 'submitContent' || event.action === 'publishContent' || event.action === 'rejectContent') {
      this.router.navigate(['/questionset/questionset-list']);
    }
  }

  getEditorMode(status): string {
    const userRole = this.userService.userProfile.role;
    const contentStatus = status.toLowerCase();
    if (contentStatus === 'draft' || contentStatus === 'live' || contentStatus === 'flagdraft'
      || contentStatus === 'unlisted') {
      if (userRole === 'creator') {
        return 'edit';
      } else if (userRole === 'reviewer') {
        return 'read';
      }
    }

    if (contentStatus === 'flagged' || contentStatus === 'flagreview') {
      return 'read';
    }

    if (contentStatus === 'review') {
      if (userRole === 'creator') {
        return 'read';
      } else if (userRole === 'reviewer') {
        return 'review';
      }
    }
  }
}
