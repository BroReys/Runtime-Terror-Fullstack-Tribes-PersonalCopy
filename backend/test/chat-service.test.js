import ChatService from "../src/services/chat-services/chat-service";

jest.mock('../src/repositories/chat-repositories/chat-repository.js');
jest.mock('../src/repositories/chat-repositories/message-repository.js');
jest.mock('../src/repositories/chat-repositories/chat-member-repository.js');
jest.mock('../src/repositories/user-repository.js');

describe('create chat object', () => {
  let subject = 'test';
  let ownerOfChat = {
    id: 6,
    username: "test",
    email: "test@some.exmaple",
    password: "paSSword123",
    active: false,
    role: "user"
  };

  let members = ["chatUser1", "chatUser2", "test"];
  let text = 'test';

  let expected = {
    addedMembers: ["chatUser1", "chatUser2"],
    notAddedMembers: ["test"]
  };

  test(
      'test if the service adds only owner once; tests also chat-member service inside',
      async () =>
          expect(await ChatService.createChat(
              subject, ownerOfChat, members, text)).toStrictEqual(
              expected));
});


