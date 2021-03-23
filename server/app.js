const server = require("http").createServer();
const io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:3000"
  }
});

const port = process.env.PORT || 4000;

let usernames = [];
let messages = [];

io.on('connection', (socket) => {
  console.log('[server] connected');
  const newUser = {
    username: ''
  };

  socket.on('LOGIN', (username) => {
    console.log(`[server] login: ${username}`);
    usernames.push(username);
    newUser.username = username;
  
    io.emit('LOGIN', username);
  });

  socket.on('LOGOUT', () => {
    const { username } = newUser;
    if (username) {
      console.log(`[server] logout: ${username}`);
      usernames = usernames.filter(u => u !== username)
      delete newUser['username'];
  
      io.emit('LOGOUT', username);
    }
  });

  socket.on('message', (message) => {
    const newMessage = {
      id: messages.length,
      message,
      username: newUser.username,
    };
    messages.push(newMessage);
  
    io.emit('NEW_MESSAGE', newMessage);
  });

  socket.on('disconnect', () => {
    const { username } = newUser;
    if (username) {
      console.log(`[server] disconnected: ${username}`);
      usernames = usernames.filter(user => user !== username)
    }
  });
});

server.listen(port, () => {
  console.log(`[server: http://localhost:${port}] ready`);
});
