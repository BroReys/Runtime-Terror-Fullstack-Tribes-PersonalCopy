import AuthenticationMiddleware
  from "../src/middlewares/authentication-middleware";
import UserService from "../src/services/user-service";

jest.mock('../src/repositories/user-repository.js');
jest.mock('../src/repositories/kingdom-repository.js');

test("token will NOT be generated - empty username check", async () => {
  let user = {
    username: "Lord",
  }
  expect(await AuthenticationMiddleware.authentication(user) === null).toBe(
      true)
})

test("token will NOT be generated - empty password check", async () => {
  let user = {
    password: "Supersecretpassword12345",
  }
  expect(await AuthenticationMiddleware.authentication(user) === null).toBe(
      true)
})

test("token is not provided - response with 403", () => {
  let token = null
  expect(AuthenticationMiddleware.authorization(token)).toBe(
      403)
})

test("token is expired and user is not authorized - response with 403 ", () => {
  let token = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9"
      + ".eyJpZCI6NCwidXNlcm5hbWUiOiJMb2dpblRlc3RlcjIzIiwiaWF0IjoxNjQ2ODM1OTQyLCJleHAiOjE2NDY4NDMxNDJ9"
      + ".lXielPpY7FLxylGTEMmR9UogNUjUO29mH9RzNUvGmDs"
  expect(AuthenticationMiddleware.authorization(token)).toBe(
      403)
})

// TODO move this to user-service AND add findByUsername to __mocks__ after merge
test(
    "user will get logged in - is active,has kingdom, username and psw matches",
    async () => {
      let possibleUser = {
        id: 1,
        username: "MockTester",
        password: "Supernoexpire123455"
      }

      expect(await UserService.loginUser(possibleUser)).toBe(200)
    })

test("user is NOT active and will NOT get logged in", async () => {
  let possibleUser = {
    username: "MockTesterNotActive",
    password: "Bleblebleble1456"
  }

  expect(await UserService.loginUser(possibleUser)).toBe(403)
})

test("password does not match", async () => {
  let possibleUser = {
    username: "MockNoPassword",
    password: "Wrongpassword12345"
  }

  expect(await UserService.loginUser(possibleUser)).toBe(409)
})

test("invalid username", async () => {
  let possibleUser = {
    username: "MockTesterInvalid",
    password: "Supernoexpire123455"
  }

  expect(await UserService.loginUser(possibleUser)).toBe(404)
})

test("no kingdom created", async () => {
  let possibleUser = {
    username: "MockTesterNoKingdom",
    password: "Bleblebleble1456"
  }

  expect(await UserService.loginUser(possibleUser)).toBe(412)
})