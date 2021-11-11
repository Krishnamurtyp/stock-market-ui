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
            alert("You do not have privileges for this action")
          } else if (error.status == 401) {
            alert("Authentication token not provided/Expired");
            this.authService.logoutUser()
          } else {
            alert(error.message);
          }
        }
      )
    }
}
