import { cameCaseToShortLine, shortLineToCameCase } from '@/utils/string'

// cameCaseToShortLine
describe('utils.string#cameCaseToShortLine', () => {
  it('bigCameCase', () => {
    expect(cameCaseToShortLine('HelloWorld')).toBe('hello-world')
  })

  it('smallCameCase', () => {
    expect(cameCaseToShortLine('helloWorld')).toBe('hello-world')
  })
})

// shortLineToCameCase
describe('utils.string#shortLineToCameCase', () => {
  it('smallCameCase', () => {
    expect(shortLineToCameCase('hello-world')).toBe('helloWorld')
  })

  it('bigCameCase', () => {
    expect(shortLineToCameCase('Hello-World')).toBe('HelloWorld')
  })
})
