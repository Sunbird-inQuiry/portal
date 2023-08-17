import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
<<<<<<< HEAD
import { observationEditorConfig } from './data';
=======
import { questionSetEditorConfig } from './data';
>>>>>>> inquiry/release-6.2.0
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user/user.service';
import { HelperService } from 'src/app/services/helper/helper.service';
import { NavigationService } from 'src/app/services/navigation.service';
import * as _ from 'lodash-es';
@Component({
  selector: 'app-questionset-editor',
  templateUrl: './questionset-editor.component.html',
  styleUrls: ['./questionset-editor.component.scss']
})
export class QuestionsetEditorComponent implements OnInit {

  @ViewChild('questionsetEditor') inQuiryEditor: ElementRef;
<<<<<<< HEAD
  public editorConfig: any = observationEditorConfig;
=======
  public editorConfig: any = questionSetEditorConfig;
>>>>>>> inquiry/release-6.2.0
  channelData: any;
  questionsetData: any;
  routeParams: any;
  constructor(
    public router: Router, private activatedRoute: ActivatedRoute,
    public userService: UserService,
    public helperService: HelperService,
    public navigationService: NavigationService) { }

  ngOnInit(): void {
    this.routeParams = this.activatedRoute.snapshot.params;
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
    this.editorConfig.context.framework = this.userService.userProfile.frameworkId;
    this.editorConfig.context.contextRollup = {
      l1: this.userService.userProfile.channelId,
    };
    this.editorConfig.context.tags = [this.userService.userProfile.channelId];
    const additionalCategory = _.merge(this.channelData.contentAdditionalCategories, this.channelData.collectionAdditionalCategories);
    this.editorConfig.context.additionalCategories = additionalCategory;
    setTimeout(() => {
      this.loadEditor();
    });
  }

  loadEditor() {
    const editorConfig = this.editorConfig;
    const questionsetEditorElement = document.createElement('lib-questionset-editor');
    questionsetEditorElement.setAttribute('editor-config', JSON.stringify(editorConfig));

    questionsetEditorElement.addEventListener('editorEmitter', (event) => {
      const customEvent: any = event;
      console.log("On editorEvent", customEvent.detail);
      if (customEvent.detail.action === 'backContent' || customEvent.detail.action === 'submitContent' || customEvent.detail.action === 'publishContent' || customEvent.detail.action === 'rejectContent') {
        if (_.has(this.routeParams, 'state') && this.routeParams.state === 'create') {
          this.router.navigate(['/questionset/questionset-list', 1]);
        } else {
          this.navigationService.goBack();
        }
      }
    });

    this.inQuiryEditor.nativeElement.append(questionsetEditorElement);
  }

  editorEventListener(event): any {
    if (event.action === 'backContent' || event.action === 'submitContent' || event.action === 'publishContent' || event.action === 'rejectContent') {
      if (_.has(this.routeParams, 'state') && this.routeParams.state === 'create') {
        this.router.navigate(['/questionset/questionset-list', 1]);
      } else {
        this.navigationService.goBack();
      }
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
