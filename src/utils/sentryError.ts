import Vue from 'vue'
import * as Sentry from '@sentry/browser'
import * as Integrations from '@sentry/integrations'
import { SENTRY_DSN } from '@/config/index'

// sentry 配置
Sentry.init({
  dsn: SENTRY_DSN,
  integrations: [new Integrations.Vue({ Vue, attachProps: true, logErrors: true })],
  release: process.env.VERSION
})

Sentry.configureScope(function(scope) {
  scope.setUser({ username: '用户名' })
})

// 根据不同的错误类，返回不同的处理函数
function wrapError<T extends Error>(
  ErrClass: { new (message: string): T },
  level: Sentry.Severity = Sentry.Severity.Error
): Function {
  return (msg: string, needProd: boolean = true) => {
    if (needProd) {
      if (process.env.NODE_ENV === 'production') {
        Sentry.withScope(function(scope) {
          scope.setLevel(level)
          Sentry.captureException(new ErrClass(msg))
        })
      }
    } else {
      Sentry.withScope(function(scope) {
        scope.setLevel(level)
        Sentry.captureException(new ErrClass(msg))
      })
    }
  }
}

// 请求错误
export class ReqError extends Error {
  public constructor(message: string) {
    super(message)
    this.name = 'Request-Error'
    this.message = message
  }
}

export class ResError extends Error {
  public constructor(message: string) {
    super(message)
    this.name = 'Response-Error'
    this.message = message
  }
}

export class OtherError extends Error {
  public constructor(message: string) {
    super(message)
    this.name = 'Other-Error'
    this.message = message
  }
}

export const sendReqError = wrapError(ReqError)
export const sendResError = wrapError(ResError)
export const sendOtherError = wrapError(OtherError, Sentry.Severity.Warning)

sendOtherError('有人访问')
