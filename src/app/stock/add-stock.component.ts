import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Company, CompanyNameCode, CompanyView } from '../company';
import { AuthService } from '../service/auth.service';
import { CompanyService } from '../service/company.service';
import { StockService } from '../service/stock.service';
import { AddStock, Stock } from '../stock';

@Component({
  selector: 'add-stock',
  templateUrl: './add-stock.component.html',
  styleUrls: ['./add-stock.component.css']
})
export class AddStockComponent implements OnInit {

  stock: AddStock
  companyCode: string;
  stockPrice: number;
  companyList: CompanyNameCode[];
  
  constructor(private stockService: StockService, private companyService: CompanyService
    , private authService: AuthService) { }

  ngOnInit(): void {
    this.stock = {
      companyCode: '',
      stockPrice:0
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

  public addStock(): void {
    this.stock.companyCode=this.companyCode
    this.stock.stockPrice=this.stockPrice

    this.stockService.addStock(this.stock).subscribe(
      (response: Stock) => {
        alert("Successfully added stock price");
      
      },
      (error: HttpErrorResponse) => {
        if (error.status == 403) {
          alert("You do not have privileges for this action")
        } else if (error.status == 401) {
          alert("Authentication token not provided/Expired");
          this.authService.logoutUser()
        } else if (error.status == 400){
        alert("Please enter valid amount for stock")
        } else {
          alert(error.message);
        }
      }
    )
  }

}
