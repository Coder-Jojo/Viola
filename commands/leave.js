const execute = (msg, servers) => {
  msg.member.voice.channel.leave();
  if (msg?.guild?.connection) {
    msg.guild.voice.connection.disconnect();
  }
  msg.channel.send("byeeee!!!!");
};

module.exports = { name: "leave", execute };
