const io = require('socket.io')(8900, {
    cors: {
        origin: "http://localhost:3000"
    }
});

/**
 * --- USERS array ----
 * @type {*[]}
 */
let users = [];

/**
 * ---- Adding User ----
 * @param userId
 * @param socketId
 */
const addUser = (userId, socketId) => {
    console.log('Add User -- ', userId, socketId);
    !users.some((user) => user.userId === userId) &&
        users.push({ userId, socketId });
};

/**
 * ---- Get User ----
 * @param userId
 * @returns {*}
 */
const getUser = (userId) => {
    console.log('getUser function scope USER -- ', users);
    return users.find(user => user.userId === userId);
};

/**
 * ---- Remove User ----
 * @param socketId
 */
const removeUser = (socketId) => {
    users = users.filter(user => user.socketId !== socketId);
};

// On Connection doing something..
io.on("connection", (socket) => {
    // When Connect...
    console.log("A User Connected!!!");
    // io.emit("welcome", "hello this is socket server!");

    // Take userId and socketId from user..
    socket.on("addUser", (userId) => {
        addUser(userId, socket.id);
        io.emit("getUsers", users);
    });

    // send and get message.
    // Taking data from client and work done here.
    socket.on("sendMessage", ({ senderId, receiverId, text }) => {
        const user = getUser(receiverId);
        console.log('RECEIVER -- ', receiverId);
        console.log('USER -- ', user);
        io.to(user?.socketId).emit("getMessage", {
            senderId,
            text
        });
    });

    // When disconnect..
    socket.on("disconnect", () => {
        console.log("A User Disconnected!");
        removeUser(socket.id);
        // io.emit("getUsers", users);
    });
});
