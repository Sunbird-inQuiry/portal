import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';
import { DataService } from '../data/data.service';
import { ActionService } from '../action/action.service';
@Injectable({
  providedIn: 'root'
})
export class HelperService {

  constructor(
    private dataService: DataService,
    private actionService: ActionService) { }

  getQuestionsetList(requestData: object): Observable<any> {
    const req = {
      url: 'composite/v1/search',
      data: requestData
    };
    return this.actionService.post(req).pipe(
      map((response: any) => {
        return response;
      })
    );
  }

  getQuestionsetDetails(questionsetId: string, option: any = { params: {} }): Observable<any> {
    // const param = { fields: this.configService.editorConfig.DEFAULT_PARAMS_FIELDS };
    const param = {};
    const req = {
      url: 'questionset/v1/read/' + questionsetId,
      param: { ...param, ...option.params },
    };
    return this.dataService.get(req).pipe(
      map((response: any) => {
        return response;
      })
    );
  }

  getChannel(channelId: string): Observable<any> {
    const req = {
      url: 'channel/v1/read/' + channelId,
    };
    return this.dataService.get(req).pipe(
      map((response: any) => {
        return response;
      })
    );
  }

  createContent(reqBody): Observable<any> {
    const req = {
      url: 'questionset/v1/create',
      data: {
        request: reqBody
      }
    };
    return this.actionService.post(req);
  }
}
