const execute = (msg, servers) => {
  const server = servers[msg.guild.id];
  if (msg?.guild?.voice?.connection) {
    server.queue = [];
    if (server?.dispatcher) server.dispatcher.end();
  }
  if (msg?.guild?.connection) {
    msg.guild.voice.connection.disconnect();
  }
};

module.exports = { name: "stop", execute };
