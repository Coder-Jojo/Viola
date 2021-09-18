const { MessageEmbed } = require("discord.js");

const execute = async (msg, args, servers, databases) => {
  if (!args[0]) {
    const embed = new MessageEmbed().setDescription(
      "you need to provide a command!\nTo get help with commands, use: -db help"
    );
    msg.channel.send(embed);
    return;
  }

  const command = args.shift().toLowerCase();
  const commands = [];
  databases.forEach((v, k) => {
    commands.push(k);
  });

  if (commands.includes(command)) {
    databases.get(command).execute(msg, args, servers);
  } else {
    const embed = new MessageEmbed().setDescription(
      "Could not recognise the command!\nTo get help with commands, use: -db help"
    );
    msg.channel.send(embed);
  }
};

module.exports = { name: "db", execute };
