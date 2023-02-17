import { TestBed } from '@angular/core/testing';
import { HelperService } from './helper.service';
import { DataService } from '../data/data.service';
import { ActionService } from '../action/action.service';
import { HttpClientModule } from '@angular/common/http';
import { mockData } from './helper.service.spec.data';
import { of, throwError } from 'rxjs';

describe('HelperService', () => {
  let service: HelperService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientModule ],
      providers: [DataService]
    });
    service = TestBed.inject(HelperService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('#getQuestionsetList should call dataService.post', () => {
    const actionService = TestBed.inject(ActionService);
    spyOn(actionService, 'post').and.returnValue(of(mockData.questionsetListResponse));
    spyOn(service, 'getQuestionsetList').and.callThrough();
    const req = {
      request: {
        filters: {
          objectType: 'Questionset'
        }
      }
    };
    service.getQuestionsetList(req);
    expect(actionService.post).toHaveBeenCalled();
  });

  it('#createContent() should call actionService.post', () => {
    const actionService = TestBed.inject(ActionService);
    spyOn(actionService, 'post').and.returnValue(of(mockData.questionsetCreateResponse));
    spyOn(service, 'createContent').and.callThrough();
    service.createContent(mockData.questionsetCreateRequest);
    expect(actionService.post).toHaveBeenCalled();
  });

  it('#deleteQuestionset() should call actionService.delete', () => {
    const actionService = TestBed.inject(ActionService);
    spyOn(actionService, 'delete').and.returnValue(of(mockData.questionsetDeleteResponse));
    spyOn(service, 'deleteQuestionset').and.callThrough();
    service.deleteQuestionset('do_2136479707618426881375');
    expect(actionService.delete).toHaveBeenCalled();
  });

});
