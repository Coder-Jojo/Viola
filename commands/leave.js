const execute = (msg, servers) => {
  msg.member.voice.channel.leave();
  const server = servers[msg.guild.id];
  if (server) {
    servers[msg.guild.id] = {
      queue: [],
      index: 0,
      title: [],
      loop: false,
      pause: false,
    };
  }
  if (msg?.guild?.connection) {
    msg.guild.voice.connection.disconnect();
  }
  msg.channel.send("byeeee!!!!");
};

module.exports = { name: "leave", execute };
