import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { NavigationService } from 'src/app/services/navigation.service';
import { QuestionCursorImplementationService } from 'src/app/services/question-cursor-implementation.service';
import { EditConfigurationComponent } from '../edit-configuration/edit-configuration.component';
import { SamplePlayerData } from './player-data';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit, OnDestroy {
  @ViewChild('qumlPlayer') qumlPlayer: ElementRef;
  playerConfig: any;
  editConfig: any = {
    showFeedback: '',
    showSubmitConfirmation: '',
    summaryType: '',
    showTimer: '',
  };
  showPortrait = false;
  nextContents: { id: string, name: string }[] = [];
  $unsubscribe: Subject<void> = new Subject<void>();
  constructor(
    private questionSetService: QuestionCursorImplementationService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog,
    public navigationService: NavigationService
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.pipe(takeUntil(this.$unsubscribe)).subscribe((params: any) => {
      this.getContent(params.id);

      /* istanbul ignore else */
      if (this.navigationService.nextContents.length > 1) {
        const currentContentIndex = this.navigationService.nextContents.findIndex(content => content.id === params.id);
        /* istanbul ignore else */
        if (currentContentIndex > -1) {
          this.nextContents = [...this.navigationService.nextContents.slice(currentContentIndex + 1)];
        }
      }
    });
  }

  getContent(identifier: string): void {
    this.questionSetService.getQuestionSet(identifier).pipe(takeUntil(this.$unsubscribe)).subscribe(res => {
      this.playerConfig = null;
      setTimeout(() => {
        this.initializePlayer(res);
        this.setConfig();
      });
    });
  }

  initializePlayer(metadata): void {
    this.playerConfig = {
      context: SamplePlayerData.playerConfig.context,
      config: this.nextContents.length ? { ...SamplePlayerData.playerConfig.config, ...{ nextContent: this.nextContents[0] } } : SamplePlayerData.playerConfig.config,
      metadata,
      data: {}
    };
    this.loadPlayer({changeConfig: true});
  }

  loadPlayer(changeConfig?) {
    if (changeConfig.changeConfig) {
      this.qumlPlayer.nativeElement.innerHTML = '';
    }
    const playerConfig = this.playerConfig;
    const qumlElement = document.createElement('sunbird-quml-player');
    (window as any).questionListUrl = "/api/question/v2/list";
    qumlElement.setAttribute('player-config', JSON.stringify(playerConfig));
    qumlElement.addEventListener('playerEvent', (event) => {
      const customEvent: any = event;
      if (customEvent.detail.edata.type === 'NEXT_CONTENT_PLAY') {
        this.qumlPlayer.nativeElement.innerHTML = '';
        this.router.navigate(['/player', this.nextContents[0].id]);
      }
    });
    qumlElement.addEventListener('telemetryEvent', (event) => {
      const customEvent: any = event;
      console.log("telemetryEvent", customEvent.detail);
    });

    this.qumlPlayer.nativeElement.append(qumlElement);
  }

  setConfig(): void {
    this.editConfig.showFeedback = this.playerConfig.metadata?.children?.every(child => child.showFeedback === true) ? 'Yes' : 'No';
    this.editConfig.showSubmitConfirmation = this.playerConfig.metadata.requiresSubmit ? this.playerConfig.metadata.requiresSubmit : '';
    this.editConfig.summaryType = this.playerConfig.metadata.summaryType ? this.playerConfig.metadata.summaryType : '';
    this.editConfig.showTimer = this.playerConfig.metadata.showTimer ? 'Yes' : 'No';
  }

  changeConfig(): void {
    const metadata = { ...this.playerConfig.metadata };
    this.playerConfig = undefined;
    setTimeout(() => {
      this.initializePlayer(metadata);
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(EditConfigurationComponent, {
      data: {
        config: this.editConfig
      }
    });

    dialogRef.afterClosed().pipe(takeUntil(this.$unsubscribe)).subscribe(result => {
      /* istanbul ignore else */
      if (result) {
        this.updateConfig(result);
      }
    });
  }

  updateConfig(result): void {
    /* istanbul ignore else */
    if (result.showFeedback) {
      if (result.showFeedback === 'Yes') {
        this.playerConfig.metadata.children.forEach(child => {
          child.showFeedback = true;
        });
      } else {
        this.playerConfig.metadata.children.forEach(child => {
          child.showFeedback = false;
        });
      }
    }

    /* istanbul ignore else */
    if (result.showSubmitConfirmation) {
      this.playerConfig.metadata.requiresSubmit = result.showSubmitConfirmation;
    }

    /* istanbul ignore else */
    if (result.summaryType) {
      this.playerConfig.metadata.summaryType = result.summaryType;
    }

    /* istanbul ignore else */
    if (result.showTimer) {
      this.playerConfig.metadata.showTimer = result.showTimer === 'Yes' ? true: false;

      /* istanbul ignore else */
      if (result.showTimer === 'Yes' && !this.playerConfig.metadata.timeLimits) {
        const timeLimits ={ 
          questionSet: {
            max: 120
          }
        }
        this.playerConfig.metadata = {...this.playerConfig.metadata,timeLimits }
      }
    }

    this.setConfig();
    this.changeConfig();
  }

  switchToPortraitMode() {
    this.showPortrait = true;
  }
  switchToLandscapeMode() {
    this.showPortrait = false;
  }

  ngOnDestroy(): void {
    this.$unsubscribe.next();
    this.$unsubscribe.complete();
  }
}
