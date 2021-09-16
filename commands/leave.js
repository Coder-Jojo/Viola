const execute = (msg, servers) => {
  msg.member.voice.channel.leave();
  if (msg?.guild?.connection) {
    msg.guild.voice.connection.disconnect();
  }
};

module.exports = { name: "leave", execute };
