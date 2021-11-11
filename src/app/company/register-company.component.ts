import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Company } from '../company';
import { CompanyService } from '../service/company.service';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'register-company',
  templateUrl: './register-company.component.html',
  styleUrls: ['./register-company.component.css']
})
export class RegisterCompanyComponent implements OnInit {

  companyForm: FormGroup

  constructor(private companyService: CompanyService, private formBuilder: FormBuilder,
    private _router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    this.companyForm  = this.formBuilder.group({ 
      companyCode: '' , 
      companyName: '' , 
      companyCeo: '' , 
      companyTurnover: '' , 
      companyWebsite: '' , 
      stockExchange: '' , 
    })
  }

  onRegisterCompany(): void {
    if(this.companyForm.value.companyTurnover < 100000000) {
      alert("Company turnover must be greater than 100000000!");
    } else {
      this.companyService.registerCompany(this.companyForm.value).subscribe(
        (response: Company) => {
          alert("Successfully added Company details");
          this._router.navigate(['/company-info']);
        },
        (error: HttpErrorResponse) => {
          if (error.status == 403) {
            alert("You do not have privileges for this action")
            this.authService.logoutUser
          } else if (error.status == 401) {
            alert("Authentication token not provided");
          }else if (error.status == 400) {
            alert("Company with this company code already exists!");
          } else {
          alert(error.message)
          }
        }
      )
    }
  }
}
