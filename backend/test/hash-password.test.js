import hash from '../src/utilities/hash-password'

test('hash password so it wont be the same', async () => {
  const password = "paSsword123";
  expect(hash(password)).not.toBe(password);
})