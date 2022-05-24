"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _chatController = _interopRequireDefault(require("../controllers/chat-controller"));

var _messageController = _interopRequireDefault(require("../controllers/message-controller"));

var _chatMembersController = _interopRequireDefault(require("../controllers/chat-members-controller"));

var ChatRouter = (0, _express.Router)();
ChatRouter.post('/chats', _chatController["default"].storeChat);
ChatRouter.post('/chats/:id/members', _messageController["default"].addMessage);
ChatRouter.put('/chats/:id/members', _chatMembersController["default"].addChatMembers);
ChatRouter.get('/chats', _chatController["default"].showChats);
ChatRouter.get('/chat', _chatController["default"].showChat);
var _default = ChatRouter;
exports["default"] = _default;
//# sourceMappingURL=chat-router.js.map