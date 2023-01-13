import { getReasonPhrase } from "http-status-codes"

const responseMessages = (code: number, message?: string, data?: any, count?: any): { code: number, message: string, data?: any, total?: number } => {
    const msg = message || getReasonPhrase(code)
    const pattern = { code, message: msg, data }
    if (count) Object.assign(pattern, { total: count.total })
    return pattern
}

export { 
    responseMessages
}