import { TestBed } from '@angular/core/testing';
import { PageBuilderService } from './page-builder.service';
import { SocketService } from './socket.service';
import { AuthTokenService } from '../../auth/services/auth-token.service';
import { of } from 'rxjs';
import { ProjectModel } from '../projects/project.model';
import { ElementInfoModel } from "./models/element.model";

describe('PageBuilderService', () => {
  let service: PageBuilderService;
  let socketServiceSpy: jasmine.SpyObj<SocketService>;
  let authTokenServiceSpy: jasmine.SpyObj<AuthTokenService>;

  beforeEach(() => {
    const socketSpy = jasmine.createSpyObj('SocketService', ['fromEvent', 'emit', 'on']);
    const authSpy = jasmine.createSpyObj('AuthTokenService', ['token']);

    TestBed.configureTestingModule({
      providers: [
        PageBuilderService,
        { provide: SocketService, useValue: socketSpy },
        { provide: AuthTokenService, useValue: authSpy }
      ]
    });

    service = TestBed.inject(PageBuilderService);
    socketServiceSpy = TestBed.inject(SocketService) as jasmine.SpyObj<SocketService>;
    authTokenServiceSpy = TestBed.inject(AuthTokenService) as jasmine.SpyObj<AuthTokenService>;

    authTokenServiceSpy.token = 'test-user-id';
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set and get project', () => {
    const project: ProjectModel = { id: 'test-id', name: 'Test Project' };
    service.project = project;
    expect(service.projectId).toBe('test-id');
  });

  it('should emit an event when an element is added', () => {
    socketServiceSpy.emit.and.callThrough();

    service.addElement('div');
    expect(socketServiceSpy.emit).toHaveBeenCalledWith('addElementToProject', jasmine.any(Object));
  });

  it('should handle an element update', () => {
    const element: ElementInfoModel = { _tempId: 'element1', elementType: 'div', content: 'Updated Content' };
    service.updateElement(element);

    expect(socketServiceSpy.emit).toHaveBeenCalledWith('updateElement', jasmine.any(Object));
  });

  it('should join a project', () => {
    service.project = { id: 'test-project' } as ProjectModel;
    service.joinProject();

    expect(socketServiceSpy.emit).toHaveBeenCalledWith('joinProject', { projectId: 'test-project' });
  });
});
