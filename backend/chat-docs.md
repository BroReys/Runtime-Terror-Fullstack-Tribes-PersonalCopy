Tribes Chat Documentation

- user is found through authentication middleware

<strong>| POST | &emsp; /chat</strong>

- handled by chat-controller
- handled scenarios
    - no user id -> 401
    - no user found based on id -> 404
    - members not passed in body -> 400
    - subject not passed in body -> 400
    - text of message empty -> 400

    - creates chat model from subject and user model (owner)

    - sets Owner as a member of a chat through entity chat_member


    - adds passed members as members of a chat
        - checks if the 'members' is an array or not
        - based on that operates either through for loop to find each user by username and add him or adds a single player
        - conditioned in service
        - the same check is then in controller for adding new members

    - creates a message from the owner passed as text

    - creates model and sets each attribute (text, ChatId, author_id)
    - if user tries to add already a member or non existing user, they will be skipped on level of chat member service, which
      then returns two arrays of added members and not added members

<strong>| POST | &emsp; /chats/{id}/members</strong>

- handled by message controller
- handled scenarios

    - no user id -> 401
    - user not found based on id -> 404
    - chat not found based on id in params -> 404
    - user not member of the chat -> 403
    - no text -> 400


    - logic of creating a message in /chats

<strong>| PUT | &emsp; /chats/{id}/members</strong>

- handled by chat-members-controller
- handled scenarios
    - no user id -> 401
    - user not found based on id -> 404
    - chat not found based on id in params -> 404
    - user id != chat.owner_id -> 401
    - members are not passed -> 400


    - checks if 'members' is an array
        - finds user
        - if not null -> searches for chat member based on chat id and user id

    - adds users as chat_member
        - checks if the members is an array or not
        - based on that operates either through for loop to find each user by username and add him or a single player
        - if user tries to add already a member or non existing user, they will be skipped on level of chat member service, which
          then returns two arrays of added members and not added members

<strong>| GET | &emsp; /chats</strong>

- handled by chat-controller
- handled scenarios
  - no user id -> 401
  - user not found based on id -> 404
  

    - creates a chat DTO object for each chat where user is a member
        - user id is send to chat service -> user is found through userService
        - all chats of user called through user.getChats() -> function available due to sequelize settings
        - since chats found this way don't allow us use sequelize functions on them, each chat sequelize object
          is generated through for loop, added to new array of chats directy from repository
        - the dto object is generated for each chat using the array of chat and its attributes
          and helper functions to edit the members (show only userId, username, delete owner from members),
          edit messages (id, get author username, text, created at, sort by newest message)
          and getOwnerName
        - each instance of an chat in the array is passed to helper functions in the for loop
          to the chatDTO object corresponding attribute
        - each chatDTO is added to array of chatDTOs
        - array is sorted by users lastViewedChat vs newest message in the chat -> chats with unread
          messages at the top

<strong>| GET | &emsp; /chat/{id}</strong>

- handled by chat-controller
- handled scenarios
  - user not found based on id -> 404
  - chat not found based on id -> 404
  - user not member of chat based on chat/user id -> 403


    - creates a chat DTO object for specific chat where user is a member
        - user id and chat id is send to chat service -> user is found through userService, chat trough chatService
        - specificChat is created -> user is part of the chat_members row and associated with this specific chat 
        - the dto object is generated for specifc chat using the preivous checks, found objects and its attributes
          and helper functions to edit the members (show only userId, username, delete owner from members),
          edit messages (id, get author username, text, created at, sort by newest message)
          and getOwnerName
