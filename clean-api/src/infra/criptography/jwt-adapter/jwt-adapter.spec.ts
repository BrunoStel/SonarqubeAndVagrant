import { JwtAdapter } from './jwt-adapter'
import jwt from 'jsonwebtoken'

jest.mock('jsonwebtoken', () => ({
  sign (): string {
    return 'any_token'
  }
}))

interface ISut {
  sut: JwtAdapter
}

const makeSut = (): ISut => {
  const sut = new JwtAdapter('secret')
  return {
    sut
  }
}

describe('JwtAdapter', () => {
  it('Should call sign with correct values', async () => {
    const { sut } = makeSut()

    const signSpy = jest.spyOn(jwt, 'sign')

    await sut.generate('any_value')

    expect(signSpy).toHaveBeenCalledWith({ id: 'any_value' }, 'secret')
  })
  it('Should return a token on sign success', async () => {
    const { sut } = makeSut()

    const accesToken = await sut.generate('any_value')

    expect(accesToken).toBe('any_token')
  })
  it('Should throw if sign throws', async () => {
    const { sut } = makeSut()

    jest.spyOn(jwt, 'sign').mockImplementationOnce(() => {
      throw new Error()
    })

    const promise = sut.generate('any_value')

    await expect(promise).rejects.toThrow()
  })
})
