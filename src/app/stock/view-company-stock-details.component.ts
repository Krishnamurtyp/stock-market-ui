import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CompanyNameCode, CompanyView } from '../company';
import { AuthService } from '../service/auth.service';
import { CompanyService } from '../service/company.service';
import { StockService } from '../service/stock.service';
import { Stock, StockList } from '../stock';

@Component({
  selector: 'view-company-stock-details',
  templateUrl: './view-company-stock-details.component.html',
  styleUrls: ['./view-company-stock-details.component.css']
})
export class ViewCompanyStockDetailsComponent implements OnInit {

  companyCode: string;
  startDate: Date
  endDate: Date
  stockDetails: Stock[]
  stockList: StockList
  companyList: CompanyNameCode[];

  constructor(private stockService: StockService, private companyService: CompanyService
    , private authService: AuthService) { }

  ngOnInit(): void {
    this.stockList = {
      allStocks: [],
      min:0,
      max:0,
      avg:0
    };
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
        } else if (error.status == 401) {
          alert("Authentication token not provided/Expired");
          this.authService.logoutUser()
        } else {
          alert(error.message);
        }
      }
    )
  }

  public getStockDetailsForCompany(): void {
    this.stockService.getStockDetailsForCompany(this.companyCode,this.startDate,this.endDate).subscribe(
      (response: StockList) => {
        this.stockList = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }

}
