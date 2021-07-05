module.exports = (server) => {
  const io = require('socket.io')(server);

  io.on('connection', (socket) => {
    socket.on('leave-chat', () => {
      socket.leave(socket.lecture_id);
      socket.to(socket.lecture_id).emit('movement', { user: socket.username, event: 'left' });
    });

    socket.on('join-chat', (data) => {
      socket.username = data.username;
      socket.user_id = data.user_id;
      socket.lecture_id = data.lecture_id;

      socket.join(socket.lecture_id);
      socket.to(socket.lecture_id).emit('movement', { user: socket.username, event: 'joined' });
    });

    socket.on('send-message', (data) => {
      let lecture_id = data.lecture_id

      socket.to(lecture_id).emit('new-message', {
        message: data.message,
        user: socket.username,
        user_id: socket.user_id,
        sentAt: data.date
      });
    });

    socket.on('disconnect', () => {
      socket.leave(socket.lecture_id);
      socket.to(socket.lecture_id).emit('movement', { user: socket.username, event: 'left' });
    })
  })
}