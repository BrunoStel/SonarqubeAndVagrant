export class MissinParamError extends Error {
  constructor (paramName: string) {
    super(`Missing param: ${paramName}`)
    this.name = `MissinParamERROR: ${paramName}`
  }
}
