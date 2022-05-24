import generateConfirmationToken
  from "../src/utilities/generate-confirmation-token";

jest.mock('../src/utilities/generate-confirmation-token.js');

test('generate token', async () => {
  expect(await generateConfirmationToken()).toBeTruthy()
})

test('generate token 24 characters long', async () => {
  expect(await generateConfirmationToken().length).toBe(24)
})
