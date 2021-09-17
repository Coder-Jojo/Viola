const { MessageEmbed } = require("discord.js");

const execute = (msg, servers) => {
  const server = servers[msg.guild.id];
  if (server) {
    if (server.index > 0) server.index -= 2;
    else server.index = -1;
    server?.dispatcher?.end();
  }
  const embed = new MessageEmbed().setDescription("backed");
  msg.channel.send(embed);
};

module.exports = { name: "back", execute };
