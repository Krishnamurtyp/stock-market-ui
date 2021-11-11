import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Company, CompanyNameCode, CompanyView } from '../company';
import { AuthService } from '../service/auth.service';
import { CompanyService } from '../service/company.service';

@Component({
  selector: 'delete-company',
  templateUrl: './delete-company.component.html',
  styleUrls: ['./delete-company.component.css']
})
export class DeleteCompanyComponent implements OnInit {

  company: CompanyView
  companyCode: string
  companyList: CompanyNameCode[]
  companies : Company[];

  constructor(private companyService: CompanyService, private authService: AuthService) {
   }

   ngOnInit() {
    this.getCompanies();
  }

  public getCompanies(): void {
    this.companyService.getCompanies().subscribe(
      (response: CompanyView[]) => {
        this.companyList = response;

      },
      (error: HttpErrorResponse) => {
        if (error.status == 403) {
          alert("You do not have privileges for this action")
          this.authService.logoutUser
        } else if (error.status == 401) {
          alert("Authentication token not provided/Expired");
          this.authService.logoutUser()
        } else {
        alert(error.message)
        }
      }
    )
  }


  public deleteCompany(): void {
    this.companyService.deleteCompany(this.companyCode).subscribe(
      (response) => {
        alert("Deleted company successfully");
      },
      (error: HttpErrorResponse) => {
        if (error.status == 403) {
            alert("You do not have privileges for this action")
          } else if (error.status == 401) {
            alert("Authentication token not provided/Expired");
            this.authService.logoutUser()
          } else {
          alert(error.message)
        }
      }
    )
  }
}
