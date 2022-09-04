const io = require('socket.io')(8900, {
    cors: {
        origin: "http://localhost:3000"
    }
});

let users = [];

/**
 * ---- Adding User ----
 * @param userId
 * @param socketId
 */
const addUser = (userId, socketId) => {
    !users.some((user) => user.userId === userId) &&
        users.push({ userId, socketId });
};

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


    // When disconnect..
    socket.on("disconnect", () => {
        console.log("A User Disconnected!");
        removeUser(socket.id);
        io.emit("getUsers", users);
    });
});
