import { InvalidParamError } from '../../errors'
import { IValidation } from '../../protocols/IValidationProtocol'

export class CompareFieldsValidation implements IValidation {
  constructor (
    private readonly fieldName: string,
    private readonly fieldToComparename: string
  ) {}

  validate (input: any): Error {
    if (input[this.fieldName] !== input[this.fieldToComparename]) {
      return new InvalidParamError(this.fieldToComparename)
    }
    return null
  }
}
