import expiresIn from '../src/utilities/generate-day-expiration-number'

test('generate unix timestamp 24hours from now', () => {
  expect(expiresIn()).toBeGreaterThanOrEqual(Date.now()/1000 + 86399)
})