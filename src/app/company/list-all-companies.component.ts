import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Company, CompanyView } from '../company';
import { AuthService } from '../service/auth.service';
import { CompanyService } from '../service/company.service';

@Component({
  selector: 'list-all-companies',
  templateUrl: './list-all-companies.component.html',
  styleUrls: ['./list-all-companies.component.css']
})
export class ListAllCompaniesComponent implements OnInit {

    companies : CompanyView[];

    constructor(private companyService: CompanyService, private authService: AuthService){
    }
  
    ngOnInit() {
      this.getCompanies();
    }
  
    public getCompanies(): void {
      this.companyService.getCompanies().subscribe(
        (response: CompanyView[]) => {
          this.companies = response;
        },
        (error: HttpErrorResponse) => {
          if (error.status == 403) {
            alert("Session expired, login again")
            this.authService.logoutUser
          } else {
            alert(error.message);
          }
        }
      )
    }
}
