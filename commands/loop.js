const { MessageEmbed } = require("discord.js");

const execute = (msg, servers) => {
  const server = servers[msg.guild.id];
  //   if (server?.loop) {
  server.loop = !server.loop;
  let info;
  if (server.loop) info = "now looping the queue";
  else info = "looping is stopped";
  //   }
  const embed = new MessageEmbed().setDescription(info);
  msg.channel.send(embed);
};

module.exports = { name: "loop", execute };
