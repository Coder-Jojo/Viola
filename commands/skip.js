const execute = (msg, servers) => {
  const server = servers[msg.guild.id];
  if (server.dispatcher) {
    server.dispatcher.end();
  }
  msg.channel.send("skipped");
};

module.exports = { name: "skip", execute };
