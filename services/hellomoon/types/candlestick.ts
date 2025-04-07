export enum CandlestickGranularity {
    ONE_MIN = "ONE_MIN",
    FIVE_MIN = "FIVE_MIN", 
    ONE_HOUR = "ONE_HOUR",
    ONE_DAY = "ONE_DAY",
    ONE_WEEK = "ONE_WEEK"
}

export type TokenPriceCandlestick = {
    time: number;
    open: number;
    high: number;
    low: number;
    close: number;
    volume: number;
}


export enum CandleStickInterval {
    FOUR_HOURS = '4h',
    TWELVE_HOURS = '12h',
    ONE_DAY = '1d',
    THREE_DAYS = '3d',
    SEVEN_DAYS = '7d'
}