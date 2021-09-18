const { MessageEmbed } = require("discord.js");

const err = (msg, text) => {
  const embed = new MessageEmbed().setDescription(text);
  msg.channel.send(embed);
};

const titleMsg = (msg, title, text) => {
  const embed = new MessageEmbed().addField(title, text);
  msg.channel.send(embed);
};

module.exports = { err, titleMsg };
