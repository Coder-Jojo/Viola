const execute = (msg, servers) => {
  const server = servers[msg.guild.id];
  if (server.dispatcher) {
    server.dispatcher.pause();
    server.dispatcher.pause();
  }
  server.pause = true;
};

module.exports = { name: "pause", execute };
