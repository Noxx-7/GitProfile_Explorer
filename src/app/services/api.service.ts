import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl = 'https://api.github.com/users';

  constructor(private http: HttpClient) {}

  private constructUrl(username: string, path?: string): string {
    return `${this.apiUrl}/${username}${path ? `/${path}` : ''}`;
  }

  getUser(username: string): Observable<any> {
    const url = this.constructUrl(username);
    return this.http.get(url);
  }

  getRepos(username: string): Observable<any[]> {
    const url = this.constructUrl(username, 'repos');
    return this.http.get<any[]>(url);
  }

  getReposWithPagination(username: string, page: number, perPage: number): Observable<any[]> {
    const url = `${this.constructUrl(username, 'repos')}?page=${page}&per_page=${perPage}`;
    return this.http.get<any[]>(url);
  }

  // Add more service methods here
}
