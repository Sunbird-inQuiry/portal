import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, fakeAsync, flush, TestBed, tick } from '@angular/core/testing';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ActivatedRoute, convertToParamMap, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { EMPTY, of, Subject } from 'rxjs';
import { NavigationService } from 'src/app/services/navigation.service';
import { QuestionCursorImplementationService } from 'src/app/services/question-cursor-implementation.service';

import { PlayerComponent } from './player.component';
import { mockPlayerData } from './player.spec.data';

describe('PlayerComponent', () => {
  let component: PlayerComponent;
  let fixture: ComponentFixture<PlayerComponent>;

  class questionSetService {
    getQuestions = jasmine.createSpy('getQuestions');
    getQuestion = jasmine.createSpy('getQuestion');
    getQuestionSet = () => of({ name: 'test' });
    getAllQuestionSet = jasmine.createSpy('getAllQuestionSet');
  }
  const mockActivatedRoute = {
    params: of({ 'id': '1', 'timePeriod': '7d' })
  };

  const mockDialog = {
    open: () => {
      return {
        afterClosed: () => of({ closed: true })
      };
    }
  }
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PlayerComponent],
      imports: [MatDialogModule, MatToolbarModule, RouterTestingModule,],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        { provide: QuestionCursorImplementationService, useClass: questionSetService },
        // { provide: MatDialog, useValue: mockDialog },
        { provide: ActivatedRoute, useValue: mockActivatedRoute }
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayerComponent);
    component = fixture.componentInstance;
    component.playerConfig = mockPlayerData.playerConfig;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should call ngOnInit', () => {
    spyOn(component, 'getContent');
    const navigationService = TestBed.inject(NavigationService);
    navigationService.nextContents = [{ id: '1', name: 'first' }, { id: '2', name: 'second' }];
    component.ngOnInit();
    expect(component.getContent).toHaveBeenCalled();
  });

  it('should call initializePlayer', () => {
    component.initializePlayer(mockPlayerData.playerConfig.metadata);
    expect(component.playerConfig).toBeDefined();
  });
  it('should call setConfig', () => {
    component.playerConfig = mockPlayerData.playerConfig;
    component.setConfig();
    expect(component.editConfig.showFeedback).toBeDefined();
  });

  it('should call getContent', () => {
    component.playerConfig = mockPlayerData.playerConfig;
    spyOn(component, 'initializePlayer');
    spyOn(component, 'setConfig');
    component.getContent('1');
    expect(component.initializePlayer);
    expect(component.setConfig);
  });

  it('should switch to the portrait Mode', () => {
    component.showPortrait = false;
    component.switchToPortraitMode();
    expect(component.showPortrait).toBe(true);
  });

  it('should switch to the landscape Mode', () => {
    component.showPortrait = true;
    component.switchToLandscapeMode();
    expect(component.showPortrait).toBe(false);
  });

  it('should call changeConfig', fakeAsync(() => {
    component.playerConfig = mockPlayerData.playerConfig;
    spyOn(component, 'initializePlayer');
    component.changeConfig();
    tick(1)
    expect(component.initializePlayer).toHaveBeenCalled();
    flush();
  }));

  it('should call openDialog', () => {
    const dialog = TestBed.inject(MatDialog);
    const openDialogSpy = spyOn(dialog, 'open').and.returnValue({ afterClosed: () => of({ closed: true }) } as any);
    spyOn(component, 'updateConfig');
    component.openDialog();
    expect(openDialogSpy).toHaveBeenCalled();
    expect(component.updateConfig).toHaveBeenCalled();
  });

  it('should call updateConfig when showFeedback is ON', () => {
    spyOn(component, 'setConfig');
    spyOn(component, 'changeConfig');
    component.playerConfig = mockPlayerData.playerConfig;
    component.updateConfig({ showFeedback: true, showSubmitConfirmation: true, summaryType: 'full', showTimer: true });
    expect(component.setConfig).toHaveBeenCalled();
    expect(component.changeConfig).toHaveBeenCalled();
  });

  it('should call updateConfig when showFeedback is ON', () => {
    spyOn(component, 'setConfig');
    spyOn(component, 'changeConfig');
    component.playerConfig = mockPlayerData.playerConfig;
    component.updateConfig({ showFeedback: false, showSubmitConfirmation: true, summaryType: 'full', showTimer: true });
    expect(component.setConfig).toHaveBeenCalled();
    expect(component.changeConfig).toHaveBeenCalled();
  });
});
