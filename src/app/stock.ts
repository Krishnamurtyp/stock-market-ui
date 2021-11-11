export interface Stock {
    companyCode: string,
    stockPrice: number,
    stockDate: Date
}

export interface AddStock {
    companyCode: string,
    stockPrice: number
}

export interface StockList {
    allStocks: Stock[],
    max: number,
    min: number,
    avg: number,
}