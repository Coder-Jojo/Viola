const execute = (msg, servers) => {
  const server = servers[msg.guild.id];
  if (server) {
    if (server.index > 0) server.index -= 2;
    else server.index = -1;
    server?.dispatcher?.end();
  }
  msg.channel.send("backed");
};

module.exports = { name: "back", execute };
