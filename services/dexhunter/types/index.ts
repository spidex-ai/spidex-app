export interface SearchTokenInfo {
    token_id: string
    token_decimals: number
    token_policy: string
    token_ascii: string
    ticker: string
    is_verified: boolean
    supply: number
    creation_date: string
    price: number
    logo?: string
}


export interface TokenDetail {
    token_id: string
    token_ascii: string
    ticker: string
    is_verified: boolean
    logo: string
    total_supply: number 
    decimals: number
    unit:string
}