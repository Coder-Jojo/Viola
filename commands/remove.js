const { MessageEmbed } = require("discord.js");

const execute = (msg, args, servers) => {
  const server = servers[msg.guild.id];
  if (!args[0] || isNaN(args[0])) {
    const embed = new MessageEmbed().setDescription(
      "you need to provide an index number!\nUse -queue to find the index"
    );
    msg.channel.send(embed);
    return;
  }
  const index = parseInt(args[0]) - 1;
  if (index === servers[msg.guild.id].index) {
    servers[msg.guild.id].index--;
    servers[msg.guild.id].queue.splice(index, 1);
    servers[msg.guild.id].dispatcher.end();
  } else {
    servers[msg.guild.id].queue.splice(index, 1);
    if (servers[msg.guild.id].index > index) servers[msg.guild.id].index--;
  }

  const embed = new MessageEmbed().addField(
    "Removed",
    `${servers[msg.guild.id].title[index]}`
  );
  servers[msg.guild.id].title.splice(index, 1);
  msg.channel.send(embed);

  //   console.log(servers[msg.guild.id]);
};

module.exports = { name: "remove", execute };
