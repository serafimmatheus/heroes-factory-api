export class ErrorBadRequest extends Error {
  public readonly statusCode: number

  constructor(message = 'Bad request') {
    super(message)
    this.name = 'ErrorBadRequest'
    this.statusCode = 400
  }
}
