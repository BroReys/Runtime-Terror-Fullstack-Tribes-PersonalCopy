import UserService from '../src/services/user-service';

jest.mock('../src/repositories/user-repository.js');
jest.mock('../src/utilities/mail-sender.js');

describe('createUser function tests', () => {
  const testUser = {
    id: "",
    username: "createUserTest",
    email: "createUserTest@some.exmaple",
    password: "paSSword123",
    active: false,
  };

  test('trying to create user with existing username or email', async () => {
    expect(await UserService.createUser(testUser)).toBe(201)
  });

  const testUser2 = {
    id: "",
    username: "",
    email: "createUserTest@some.exmaple",
    password: "paSSword123",
    active: false,
  };

  test('return error status when username field is missing', async () => {
    expect(await UserService.createUser(testUser2)).toBe(400)
  });

  const testUser3 = {
    id: "",
    username: "createUserTest",
    email: "createUserTest@some.exmaple",
    password: "pass",
    active: false,
  };

  test(
      'return error status when password does not meet requirements - 8 chars one big one number',
      async () => {
        expect(await UserService.createUser(testUser3)).toBe(422)
      });

  const testUser4 = {
    id: "",
    username: "existingUser",
    email: "existingEmail",
    password: "paSsword123",
    active: false,
  };

  test(
      'return error status when trying to create user with existing email or password',
      async () => {
        expect(await UserService.createUser(testUser4)).toBe(409)
      });
});

describe('setUserToActive function tests', () => {

  test('setUserToActive with null token input', async () => {
    expect(await UserService.setUserToActive(null)).toBe("not_found");
  });

  test('setUserToActive with correct token input', async () => {
    expect(await UserService.setUserToActive("anyExistingToken")).toBeTruthy();
  });

});