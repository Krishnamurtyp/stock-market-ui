import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { CompanyInfoComponent } from './company/company-info.component';
import { DeleteCompanyComponent } from './company/delete-company.component';
import { ListAllCompaniesComponent } from './company/list-all-companies.component';
import { RegisterCompanyComponent } from './company/register-company.component';
import { LoginComponent } from './login/login.component';
import { AddStockComponent } from './stock/add-stock.component';
import { ViewCompanyStockDetailsComponent } from './stock/view-company-stock-details.component';

const routes: Routes = [
  { 
    path: 'list-all-companies',
    component: ListAllCompaniesComponent,
    canActivate: [AuthGuard]
  },
  { 
    path: 'register-company',
    component: RegisterCompanyComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'company-info',
    component: CompanyInfoComponent,
    canActivate: [AuthGuard]
  },
  {
    
    path: 'delete-company',
    component: DeleteCompanyComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'add-stock',
    component: AddStockComponent,
    canActivate: [AuthGuard]
  },
  { 
    path: 'view-company-stock-details',
    component: ViewCompanyStockDetailsComponent,
    canActivate: [AuthGuard]
  },
  { 
    path: 'login',
    component: LoginComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

export const routingComponents = [
  ListAllCompaniesComponent,
  RegisterCompanyComponent,
  CompanyInfoComponent,
  AddStockComponent,
  ViewCompanyStockDetailsComponent,
  LoginComponent,
  DeleteCompanyComponent
]
