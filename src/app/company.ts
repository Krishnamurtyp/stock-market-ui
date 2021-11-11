export interface Company {
    companyCode: string;
    companyName: string;
    companyCeo: string;
    companyTurnover: number;
    companyWebsite: string;
    stockExchange: string;
}

export interface CompanyView {
    companyCode: string;
    companyName: string;
    companyCeo: string;
    companyTurnover: number;
    companyWebsite: string;
    stockPrice: string;
}

export interface CompanyNameCode {
    companyCode: string;
    companyName: string;
}