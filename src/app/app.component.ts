import { Component } from '@angular/core';
import { ApiService } from './services/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'fyle-frontend-challenge';
  githubUsername = '';
  user: any;
  repositories: any[] = [];
  isLoading = false;
  currentPage = 1;
  itemsPerPage = 10;
  maxItemsPerPage = 100;

  constructor(private apiService: ApiService) {}

  setLoadingState(isLoading: boolean) {
    this.isLoading = isLoading;
  }

  searchUser() {
    this.setLoadingState(true);
    this.apiService.getUser(this.githubUsername).subscribe((user) => {
      this.user = user;
      this.loadRepositories();
    });
  }

  loadRepositories() {
    this.setLoadingState(true);
    this.apiService
      .getReposWithPagination(this.githubUsername, this.currentPage, this.itemsPerPage)
      .subscribe((repos) => {
        this.repositories = repos;
        this.setLoadingState(false);
      });
  }

  changePage(newPage: number) {
    this.currentPage = newPage;
    this.loadRepositories();
  }

  getTechStack(repo: any): string {
    return repo.language || 'Tech Stack not specified';
  }

  changeItemsPerPage() {
    if (this.itemsPerPage > this.maxItemsPerPage) {
      this.itemsPerPage = this.maxItemsPerPage;
    }
    this.loadRepositories();
  }
}
