import { ComponentFixture, TestBed } from '@angular/core/testing';
import { QuestionsetEditorComponent } from './questionset-editor.component';
import { RouterTestingModule } from '@angular/router/testing';
import { Router, ActivatedRoute } from '@angular/router';
import { questionSetEditorConfig } from './data';
import { of } from 'rxjs';
describe('QuestionsetEditorComponent', () => {
  class RouterStub {
    navigate = jasmine.createSpy('navigate');
    url = ['/questionset'];
  }
  const mockActivatedRoute = {
    params: of({
      id: 'do_12345',
      status: 'draft'
    })
  };
  let component: QuestionsetEditorComponent;
  let fixture: ComponentFixture<QuestionsetEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [QuestionsetEditorComponent],
      providers: [
        { provide: Router, useClass: RouterStub },
        {provide: ActivatedRoute, useValue: mockActivatedRoute}
    ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionsetEditorComponent);
    component = fixture.componentInstance;
    // fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('#ngOnInit() should set the editorConfig.config.mode', () => {
    localStorage.setItem('userRole', JSON.stringify('creator'));
    component.editorConfig = questionSetEditorConfig;
    spyOn(component, 'getEditorMode').and.callThrough();
    spyOn(component, 'ngOnInit').and.callThrough();
    component.ngOnInit();
    expect(component.editorConfig.context.identifier).toEqual('do_12345');
    expect(component.editorConfig.config.mode).toEqual('edit');
  });

  it('#editorEventListener() should route to questionset', () => {
    spyOn(component, 'editorEventListener').and.callThrough();
    component.editorEventListener({action: 'backContent'});
    // tslint:disable-next-line:no-string-literal
    expect(component['router'].navigate).toHaveBeenCalledWith(['/questionset/questionset-list']);
  });

  it('#getEditorMode() should return  value edit', () => {
    localStorage.setItem('userRole', JSON.stringify('creator'));
    spyOn(component, 'getEditorMode').and.callThrough();
    const mode = component.getEditorMode('draft');
    expect(mode).toEqual('edit');
  });

  it('#getEditorMode() should return  value read', () => {
    spyOn(component, 'getEditorMode').and.callThrough();
    const mode = component.getEditorMode('flagged');
    expect(mode).toEqual('read');
  });

  it('#getEditorMode() should return  value read', () => {
    spyOn(component, 'getEditorMode').and.callThrough();
    const mode = component.getEditorMode('flagreview');
    expect(mode).toEqual('read');
  });

  it('#getEditorMode() should return  value review', () => {
    localStorage.setItem('userRole', JSON.stringify('creator'));
    spyOn(component, 'getEditorMode').and.callThrough();
    const mode = component.getEditorMode('draft');
    expect(mode).toEqual('edit');
  });

  it('#getEditorMode() should return  value read', () => {
    localStorage.setItem('userRole', JSON.stringify('creator'));
    spyOn(component, 'getEditorMode').and.callThrough();
    const mode = component.getEditorMode('review');
    expect(mode).toEqual('read');
  });

  it('#getEditorMode() should return  value read', () => {
    localStorage.setItem('userRole', JSON.stringify('creator'));
    spyOn(component, 'getEditorMode').and.callThrough();
    const mode = component.getEditorMode('live');
    expect(mode).toEqual('edit');
  });
});
