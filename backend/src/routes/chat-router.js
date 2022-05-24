import {Router} from 'express';
import ChatController from "../controllers/chat-controller";
import MessageController from "../controllers/message-controller";
import ChatMembersController from "../controllers/chat-members-controller";

const ChatRouter = Router();

ChatRouter.post('/chats', ChatController.storeChat);

ChatRouter.post('/chats/:id/members', MessageController.addMessage);

ChatRouter.put('/chats/:id/members', ChatMembersController.addChatMembers);

ChatRouter.get('/chats', ChatController.showChats);

ChatRouter.get('/chat/:id', ChatController.showChat);

ChatRouter.delete('/chats/:id/members', ChatMembersController.removeChatMember);

export default ChatRouter;

