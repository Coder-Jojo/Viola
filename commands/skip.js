const { MessageEmbed } = require("discord.js");

const execute = (msg, servers) => {
  const server = servers[msg.guild.id];
  if (server.dispatcher) {
    server.dispatcher.end();
  }
  const embed = new MessageEmbed().setTitle("skipped");
  msg.channel.send(embed);
};

module.exports = { name: "skip", execute };
