import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environment/environment';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  constructor(private httpClient: HttpClient) {}
  getAllCategories(): Observable<any> {
    return this.httpClient.get(`${environment.url}/api/v1/Categories`);
  }
  getspecificCategories(id: string): Observable<any> {
    return this.httpClient.get(
      `${environment.url}/api/v1/Categories/${id}/subcategories`
    );
  }
}
