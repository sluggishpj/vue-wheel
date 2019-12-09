// 请求错误
export class ReqError extends Error {
  constructor(message: string) {
    super()
    this.name = 'RequestError'
    this.message = message
  }
}
