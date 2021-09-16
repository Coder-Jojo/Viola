const execute = (msg, servers) => {
  const server = servers[msg.guild.id];
  //   if (server?.loop) {
  server.loop = !server.loop;
  if (server.loop) msg.channel.send("now looping the queue");
  else msg.channel.send("looping is stopped");
  //   }
};

module.exports = { name: "loop", execute };
