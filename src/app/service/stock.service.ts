import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Stock, AddStock, StockList } from '../stock';

@Injectable({
  providedIn: 'root'
})
export class StockService {

  private apiServerUrl = environment.apiStockBaseUrl;

    constructor(private http: HttpClient) {}

    public addStock(stock: AddStock): Observable<Stock> {
        return this.http.post<Stock>(`${this.apiServerUrl}/add`, stock);
    }

    public getStockDetailsForCompany(companyCode: string, startDate: Date, endDate: Date): Observable<StockList> {
        return this.http.get<StockList>(`${this.apiServerUrl}/get/${companyCode}/${startDate}/${endDate}`);
    }

}
