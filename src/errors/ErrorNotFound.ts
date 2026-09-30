export class ErrorNotFound extends Error {
  public readonly statusCode: number

  constructor(message = 'Resource not found') {
    super(message)
    this.name = 'ErrorNotFound'
    this.statusCode = 404
  }
}
