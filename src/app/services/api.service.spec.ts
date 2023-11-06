import { TestBed } from '@angular/core/testing';
import { ApiService } from './api.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('ApiService', () => {
  let service: ApiService;
  let httpTestingController: HttpTestingController;
  const username = 'exampleUser';
  const apiUrl = `https://api.github.com/users/${username}`;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ApiService],
      imports: [HttpClientTestingModule],
    });

    service = TestBed.inject(ApiService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return user data', () => {
    const userData = { login: 'exampleUser', name: 'John Doe' };

    service.getUser(username).subscribe((user) => {
      expect(user).toEqual(userData);
    });

    const req = httpTestingController.expectOne(apiUrl);
    expect(req.request.method).toEqual('GET');
    req.flush(userData);
  });

  it('should handle user data error', () => {
    service.getUser(username).subscribe(
      () => fail('Should have failed with 404'),
      (error) => expect(error.status).toEqual(404)
    );

    const req = httpTestingController.expectOne(apiUrl);
    req.flush('404 error', { status: 404, statusText: 'Not Found' });
  });

  it('should return repository data', () => {
    const reposData = [
      { id: 1, name: 'Repo1' },
      { id: 2, name: 'Repo2' },
      { id: 3, name: 'Repo3' }
    ];

    service.getRepos(username).subscribe((repos) => {
      expect(repos).toEqual(reposData);
    });

    const req = httpTestingController.expectOne(`${apiUrl}/repos`);
    expect(req.request.method).toEqual('GET');
    req.flush(reposData);
  });

  it('should handle repository data error', () => {
    service.getRepos(username).subscribe(
      () => fail('Should have failed with 500'),
      (error) => expect(error.status).toEqual(500)
    );

    const req = httpTestingController.expectOne(`${apiUrl}/repos`);
    req.flush('500 error', { status: 500, statusText: 'Server Error' });
  });
});
