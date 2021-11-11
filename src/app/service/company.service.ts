import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Company, CompanyView } from '../company';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  private apiServerUrl = environment.apiCompanyBaseUrl;

    constructor(private http: HttpClient) {}

    public registerCompany(company: Company): Observable<Company> {
        return this.http.post<Company>(`${this.apiServerUrl}/register`, company);
    }

    public getCompany(companyCode: string): Observable<CompanyView> {
        return this.http.get<CompanyView>(`${this.apiServerUrl}/info/${companyCode}`);
    }

    public getCompanies(): Observable<CompanyView[]> {
        return this.http.get<CompanyView[]>(`${this.apiServerUrl}/getAll`);
    }

    public deleteCompany(companyCode: string): Observable<void> {
        return this.http.delete<void>(`${this.apiServerUrl}/delete/${companyCode}`);
    }
}
